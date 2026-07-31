import { Types } from "mongoose";

export interface IBooking {
  user: string;
  room: Types.ObjectId;
  hotel: Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentMethod: string;
  isPaid: boolean;
}
