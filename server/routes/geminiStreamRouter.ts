import express from "express";
import { streamGeminiResponse } from "../utils/gemini";

const router = express.Router();

router.post("/gemini-stream", async (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Content-Encoding": "none",
    Connection: "keep-alive",
  });
  try {
    const { prompt } = req.body;
    await streamGeminiResponse(prompt, async (text) => {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    });
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).end();
  }
});

export default router;
