import type { Request, Response } from "express";
import { Webhook } from "svix";

import User from "../models/User.js";
import type { IUser } from "../types/user.interface.js";
import type { ClerkEvent } from "../types/clerkEvent.type.js";

const clerkWebhooks = async (req: Request, res: Response) => {
  try {
    const secret = process.env.CLERK_WEBHOOK_SECRET;

    if (!secret) {
      return res.status(500).json({ message: "Missing webhook secret" });
    }

    const whook = new Webhook(secret);

    const headers = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };

    // req.body is a raw Buffer (thanks to express.raw()) — convert to string
    const payload = req.body.toString();

    const event = whook.verify(payload, headers) as ClerkEvent;

    const parsedEvent = JSON.parse(payload) as ClerkEvent;

    // console.log("Verified event:", event);

    const { data } = parsedEvent;

    switch (parsedEvent.type) {
      case "user.created": {
        const userData: IUser = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          username: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          image: data.image_url,
          role: "user",
          recentSearchedCities: [],
        };
        // console.log("Created Mongo user:", createdUser);
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData: IUser = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          username: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          image: data.image_url,
          role: "user",
          recentSearchedCities: [],
        };
        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          upsert: true,
        });
        break;
      }

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    // console.error("Webhook error:", error);
    return res.status(400).json({ message: "Webhook verification failed" });
  }
};

export default clerkWebhooks;


