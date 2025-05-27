import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors());

// middlewares
app.use(express.json());
app.use(clerkMiddleware());

// clerk webhook api
app.post(
  "/api/clerk",
  bodyParser.raw({ type: "*/*" }), // <-- Important for verifying signature
  clerkWebhooks
);
// app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API is working fine"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
