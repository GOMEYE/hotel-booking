import type { IHotel } from "./hotel.interface.js";

export interface IRoom {
  hotel: string | IHotel;
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

