import type { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { getAuth } from "@clerk/express";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = getAuth(req);

  // console.log("Clerk userId:", userId);

  const user = await User.findById(userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // console.log("typeof req.auth:", typeof req.auth);
  // console.log("req.auth:", req.auth);
  // console.log("keys:", req.auth && Object.keys(req.auth));

  // console.log("userId:", userId);

  console.log("Mongo user:", user);

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }
  req.user = user;
  next();
};


