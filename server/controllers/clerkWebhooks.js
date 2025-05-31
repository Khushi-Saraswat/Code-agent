import { Webhook } from "svix";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const clerkWebhooks = async (req, res) => {
  try {
    // Create Svix instance using secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Extract headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ Verify signature using raw body buffer
    const payload = req.body; // This is a Buffer because of raw body-parser
    const event = whook.verify(payload, headers);

    // ✅ Parse payload data from buffer
    const { data, type } = JSON.parse(payload.toString());

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    // Handle webhook event types
    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
