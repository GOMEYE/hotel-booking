import express from "express";
import { registerHotel } from "../controllers/hotelController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const hotelRouter = express.Router();

hotelRouter.post("/", protect, registerHotel);

export default hotelRouter;
