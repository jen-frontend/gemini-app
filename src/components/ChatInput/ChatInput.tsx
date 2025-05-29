import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useChatStore, Message } from "../../store/chatStore";

import * as styles from "./ChatInput.module.css";

export default function ChatInput() {
  const [input, setInput] = useState<string>("");
  const { addMessage, messages } = useChatStore();

  console.log(messages, " 전역 상태 메세지 배열");

  const handleSend = async () => {
    if (!input.trim()) return; // 빈 메세지 방지

    console.log("Sending message: ", input);

    // 사용자 메세지 생성
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: input,
    };

    // 사용자 메세지 전역상태 추가
    addMessage(userMessage);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error("Response not ko");
      }

      const { response: aiResponse } = await response.json();

      console.log(aiResponse);

      // 어시스턴스 메세지 생성
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: aiResponse,
      };

      // 전역 상태에 어시스턴스 메세지 추가
      addMessage(assistantMessage);
    } catch (error) {
      console.error("Error sending message: ", error);
      // 에러 발생시 에러 메세지 추가
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: "문제가 생겼습니다. 다시 시도해주세요",
      };
      // 전역 상태에 에러 메세지 추가
      addMessage(errorMessage);
    } finally {
      setInput("");
    }
  };

  return (
    <div className={styles.chatInputWrapper}>
      <textarea
        className={styles.chatInput}
        placeholder="메세지를 입력해주세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend} className={styles.sendButton}>
        <AiOutlineSend className={styles.sendIcon} />
      </button>
    </div>
  );
}
