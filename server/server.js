import express from "express";
import cors from "cors";
import "dotenv/confi";

const app = express();

app.use(cors());

app.get("/", (req, res) => res.send("API is working fine"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
