import express from "express";
import upload from "../middlewares/uploadMiddleware.ts";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailability,
} from "../controllers/roomController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const roomRouter = express.Router();

roomRouter.post("/", protect, upload.array("images", 4), createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
// roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);
roomRouter.patch("/:roomId/availability", protect, toggleRoomAvailability);

export default roomRouter;
