import type { Types } from "mongoose";
import type { IHotel } from "./hotel.interface.ts";

export interface IRoom {
  hotel: string | IHotel;
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}
