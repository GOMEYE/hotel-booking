import type { Request, Response } from "express";
import Booking from "../models/Booking.ts";
import Room from "../models/Room.ts";
import Hotel from "../models/Hotel.ts";
import { getAuth } from "@clerk/express";
import { transporter } from "../configs/nodemailer.ts";

// Function to check availability of room
// POST api/bookings/check-availability
interface CheckAvailabilityParams {
  checkInDate: Date;
  checkOutDate: Date;
  room: string;
}

const checkAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
}: CheckAvailabilityParams) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    if (error instanceof Error) {
      console.error("checkAvailability error:", error);
      return false;
    }
  }
};

// API to check availability of room
export const checkAvailabilityAPI = async (req: Request, res: Response) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.status(200).json({ success: true, isAvailable });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    res.status(500).json({ success: false, message });
  }
};

// Booking function
// POST /api/bookings/book
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = req.user._id;

    // Before booking check Availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res
        .status(404)
        .json({ success: false, message: "Room is not available" });
    }

    // Get total price from Room
    const roomData = await Room.findById(room).populate("hotel");

    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (typeof roomData.hotel === "string") {
      throw new Error("Hotel was not populated");
    }

    const hotel = roomData.hotel;
    console.log(`Hotel data: ${hotel}`);

    let totalPrice = roomData.pricePerNight;

    // Calculate total price based on nights
    const checkIn = new Date(checkInDate);
    const checkout = new Date(checkOutDate);
    const timeDiff = checkout.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights < 1) {
      return res.status(400).json({
        success: false,
        message: "Booking must be at least one night",
      });
    }

    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel Booking Details",
      html: `
      <h2>Your Booking Details</h2>
      <p>Dear ${req.user.username},</p>
      <p>Thank you for booking with us! Here are your details:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${booking._id}</li>
        <li><strong>Hotel Name:</strong> ${hotel.name}</li>
        <li><strong>Location:</strong> ${hotel.address}</li>
        <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
        <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || "$"} ${booking.totalPrice} /night</li>
      </ul>
      <p>We look forward to welcome you</p>
      <p>if you need to make any changes, feel free to contact us</p>
  `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

// APi to get all bookings for a user
// Get /api/bookings/user
export const getUserBooking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = req.user._id;

    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message });
  }
};

export const getHotelBookings = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const hotel = await Hotel.findOne({ owner: userId });
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "No hotel found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0,
    );

    res.status(200).json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message });
  }
};
