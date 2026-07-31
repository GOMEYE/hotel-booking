import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { unlink } from "fs/promises";
import { getAuth } from "@clerk/express";

//API to create a new room for a hotel
export const createRoom = async (req: Request, res: Response) => {
  // console.log(req.body);
  // console.log(req.files);
  // console.log(req.auth);
  let parsedAmenities: string[] = [];
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const { userId } = getAuth(req);

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const hotel = await Hotel.findOne({ owner: userId });

    if (!hotel)
      return res
        .status(404)
        .json({ success: false, message: "No hotel found" });

    // Upload images to cloudinary
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image.",
      });
    }
    const files = req.files;

    const images = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const response = await cloudinary.uploader.upload(file.path, {
          folder: "hotel-booking/rooms",
        });

        await unlink(file.path); // cleanup
        return response.secure_url;
      }),
    );

    parsedAmenities =
      typeof amenities === "string" ? JSON.parse(amenities) : amenities;

    await Room.create({
      hotel: hotel._id.toString(),
      roomType,
      pricePerNight: +pricePerNight,
      amenities: parsedAmenities,
      images,
    });

    return res.status(200).json({
      success: true,
      message: "Room created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

// API to get all rooms belonging to a particular owner
export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, rooms });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

// API to get all rooms for a specific owner
export const getOwnerRooms = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const hotelData = await Hotel.findOne({ owner: userId });

    if (!hotelData) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel",
    );
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

// API to toggle availability of room
export const toggleRoomAvailability = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { isAvailable } = req.body;

    const roomData = await Room.findById(roomId);

    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    roomData.isAvailable = isAvailable;
    await roomData.save();

    return res.status(200).json({
      success: true,
      message: "Room availability updated",
      isAvailable: roomData.isAvailable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
