import mongoose, { Schema } from "mongoose";
import type { IHotel } from "../types/hotel.interface.ts";

const hotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    owner: { type: String, required: true, ref: "User" },
    city: { type: String, required: true },
  },
  { timestamps: true },
);

const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);
export default Hotel;
