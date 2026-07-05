import type { IHotel } from "./hotel.interface";
import type { IRooms } from "./rooms.interface";
import type { IUser } from "./user.interface";

export interface IUserBookingData {
  _id: string;
  user: IUser;
  room: IRooms;
  hotel: IHotel;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  guests: number;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
