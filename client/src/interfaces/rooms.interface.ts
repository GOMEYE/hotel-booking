import type { IHotel } from "./hotel.interface";
export interface IRooms {
  _id: string;
  hotel: IHotel;
  roomType?: string;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  createAt?: string;
  updatedAt?: string;
  isAvailable: boolean;
  __v: number;
}
