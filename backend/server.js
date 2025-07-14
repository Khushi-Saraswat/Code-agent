import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || "5000";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// api endpoints
app.use("/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default app;
