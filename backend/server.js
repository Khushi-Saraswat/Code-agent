import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || "5000";

// Only allow these origins
const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// api endpoints
app.use("/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default app;
