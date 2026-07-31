import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getUserData,
  storeRecentSearcedCities,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearcedCities);

export default userRouter;


