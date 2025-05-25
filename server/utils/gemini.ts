import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function getGeminiResponse(prompt: string) {
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  // 두번째 콘솔
  console.log(response.text);

  return response.text;
}

export async function streamGeminiResponse(
  prompt: string,
  onText: (text?: string) => Promise<void> | void
) {
  const reponse = await genAI.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  for await (const chunk of reponse) {
    console.log(chunk.text);
    const chunkText = chunk.text;
    await onText(chunkText);
  }
}
