import express from "express";
import { getGeminiResponse } from "../utils/gemini";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    // 첫번째 콘솔
    console.log("prompt: ", prompt);

    if (!prompt) return;

    const response = await getGeminiResponse(prompt);

    // 세번째 콘솔
    console.log("response :", response);

    res.json({ response });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
