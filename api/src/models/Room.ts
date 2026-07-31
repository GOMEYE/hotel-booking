import mongoose, { Schema } from "mongoose";
import type { IRoom } from "../types/room.interface.js";

const roomSchema = new Schema<IRoom>(
  {
    hotel: { type: String, ref: "Hotel", required: true },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: [{ type: String, required: true }],
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Room = mongoose.model<IRoom>("Room", roomSchema);
export default Room;
