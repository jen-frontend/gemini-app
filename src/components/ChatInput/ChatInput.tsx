import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useChatStore, Message } from "../../store/chatStore";

import * as styles from "./ChatInput.module.css";
import { useLocation, useNavigate } from "react-router-dom";

interface ChatInputProps {
  threadId: number;
}

export default function ChatInput({ threadId }: ChatInputProps) {
  const [input, setInput] = useState<string>("");
  const { threads, setThreadMessages, messages, setLoading } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();

  const currentThreadMessage = threads[threadId] || [];

  const handleSend = async () => {
    if (!input.trim()) return; // 빈 메세지 방지

    // 사용자 메세지 생성
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: input,
    };

    // 사용자 메세지 전역상태 추가
    const updatedMessages = [...currentThreadMessage, userMessage];
    setThreadMessages(threadId, updatedMessages);

    // 요청 시작: 로딩 상태 활성화
    setLoading(true);

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

      // 어시스턴스 메세지 생성
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: aiResponse,
      };

      // 전역 상태에 어시스턴스 메세지 추가
      setThreadMessages(threadId, [...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message: ", error);
      // 에러 발생시 에러 메세지 추가
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: "문제가 생겼습니다. 다시 시도해주세요",
      };
      // 전역 상태에 에러 메세지 추가
      setThreadMessages(threadId, [...updatedMessages, errorMessage]);
    } finally {
      setInput("");
      // 요청 종료
      setLoading(false);

      // 현재 경로가 루트 ("/"), 새 스레드 상세 페이지 (chatList) 라우팅
      if (location.pathname === "/") {
        navigate(`/chats/${threadId}`);
      }
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
