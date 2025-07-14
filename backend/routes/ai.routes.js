import express from "express";
import { generateAIContent } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/code-review", generateAIContent);

export default aiRouter;
