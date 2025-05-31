import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./configs/db.js";

import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());

// ✅ Use raw body parser ONLY for Clerk webhook route
app.use("/api/clerk", bodyParser.raw({ type: "application/json" }));

// ✅ Use JSON parser for other routes
app.use(bodyParser.json());

// Clerk middleware
app.use(clerkMiddleware());

// Clerk webhook route
app.use("/api/clerk", clerkWebhooks);

// Default route
app.get("/", (req, res) => res.send("API is working fine"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running at ${PORT}`));
