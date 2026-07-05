import type { Request, Response } from "express";
import { Webhook } from "svix";

import User from "../models/User.js";
import type { IUser } from "../models/User.js";

type ClerkEvent = {
  type: string;
  data: any;
};

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

    // IMPORTANT: must be raw string body for Svix
    const payload = req.body.stringify();

    const event = whook.verify(payload, headers) as ClerkEvent;

    const parsedEvent = JSON.parse(payload) as ClerkEvent;

    console.log("Verified event:", event);

    const { data } = parsedEvent;

    const userData: IUser = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address,
      username: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
      image: data.image_url,
      role: "user",
      recentSearchedCities: [],
    };

    switch (parsedEvent.type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          upsert: true,
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).json({ message: "Webhook verification failed" });
  }
};

export default clerkWebhooks;

// wife be submissive, husband love your love your wife, if you are not submissive where the love wan come from
// Run away from princess. I dey always run away from princess
// Any woman that cannot support you when you are down should'nt be in your life
// any brain wey no fit support your vision delete am
