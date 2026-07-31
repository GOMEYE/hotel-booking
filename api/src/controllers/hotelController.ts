import type { Request, Response } from "express";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req: Request, res: Response) => {
  try {
    const { name, address, contact, city } = req.body;

    const owner = req.user?._id;

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const existingHotel = await Hotel.findOne({ owner });

    if (existingHotel) {
      return res.status(401).json({
        success: false,
        message: "Hotel already registered",
      });
    }

    await Hotel.create({ name, address, contact, city, owner });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    return res.status(201).json({
      success: true,
      message: "Hotel registered successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    return res.status(500).json({
      success: false,
      message,
    });
  }
};

