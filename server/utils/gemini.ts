import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface GenerationConfig {
  maxOutputTokens: number;
  temperature: number;
  topP: number;
  topK: number;
  candidateCount: number;
}

export async function getGeminiResponse(
  prompt: string,
  messages?: ChatMessage[],
  modelParameters?: GenerationConfig
) {
  // 이전 대화 내역을 history 배열로 파싱
  const history =
    messages?.map((msg: ChatMessage) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    })) || [];

  // 마지막 호출된 prompt 추가
  history.push({ role: "user", parts: [{ text: prompt }] });

  // 대화 세션 생성
  const chat = genAI.chats.create({
    model: "gemini-2.0-flash",
    history,
    config: modelParameters,
  });

  try {
    const response = await chat.sendMessage({
      message: prompt,
    });
    return response.text!;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function streamGeminiResponse(
  prompt: string,
  onText: (text?: string) => Promise<void> | void,
  messages: ChatMessage[] | [],
  modelParameters?: GenerationConfig
) {
  // 이전 대화 내역을 history 배열로 파싱
  const history =
    messages?.map((msg: ChatMessage) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    })) || [];

  // 마지막 호출된 prompt 추가
  history.push({ role: "user", parts: [{ text: prompt }] });

  // 대화 세션 생성
  const chat = genAI.chats.create({
    model: "gemini-2.0-flash",
    history,
    config: modelParameters,
  });

  try {
    // 스트리밍 응답 호출
    const stream = await chat.sendMessageStream({
      message: prompt,
    });

    for await (const chunk of stream) {
      console.log(chunk.text);
      const chunkText: string = chunk.text!;
      onText(chunkText);
    }
  } catch (error) {
    console.error("Error in streamGeminiResponse: ", error);
    throw error;
  }
}
