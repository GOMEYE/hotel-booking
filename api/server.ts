import express, { type Request, type Response } from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./src/configs/db.ts";
import connectCloudinary from "./src/configs/cloudinary.ts";

import clerkWebhooks from "./src/controllers/ClerkWebhook.ts";
import userRouter from "./src/routes/userRouters.ts";
import hotelRouter from "./src/routes/hotelRouters.ts";
import roomRouter from "./src/routes/roomRoute.ts";
import bookingRouter from "./src/routes/bookingRoutes.ts";

connectDB();
connectCloudinary();

const app = express();

app.use(cors());

// Clerk webhook BEFORE express.json()
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks,
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello");
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;
