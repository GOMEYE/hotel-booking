import mongoose, { Schema } from "mongoose";
import type { IBooking } from "../types/booking.interface.js";

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Pay At Hotel", "paystack"],
      default: "Pay At Hotel",
    },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;


