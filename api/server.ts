import express, { type Request, type Response } from "express";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./src/db.js";
import clerkWebhooks from "./src/controllers/ClerkWebhook.js";

connectDB();

const app = express();

app.use(cors());

// Midleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to clerkwebhook
app.use("api/clerk", clerkWebhooks);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello");
});

export default app;
// user12345
