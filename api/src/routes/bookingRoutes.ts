import express from "express";
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBookings,
  getUserBooking,
} from "../controllers/bookingController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBooking);
bookingRouter.get("/hotel", protect, getHotelBookings);

export default bookingRouter;
