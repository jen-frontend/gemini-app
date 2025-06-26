import React, { useState } from "react";
import { AiOutlineSend, AiOutlineStop } from "react-icons/ai";
import { useChatStore, Message } from "../../store/chatStore";
import { toast } from "react-toastify";

import * as styles from "./ChatInput.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useStreamStore } from "../../store/streamStore";

interface ChatInputProps {
  threadId: number;
}

export default function ChatInput({ threadId }: ChatInputProps) {
  const [input, setInput] = useState<string>("");
  const { threads, setThreadMessages, messages, setLoading, loading } =
    useChatStore();
  const { setAbortController, abortController } = useStreamStore();
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

    // 어시스턴트의 스트리밍 응답을 받을 자리 확보
    const placeholderAssistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      text: "",
    };

    setThreadMessages(threadId, [
      ...updatedMessages,
      placeholderAssistantMessage,
    ]);

    const payload = {
      prompt: input,
      messages: updatedMessages,
      modelParameters: {
        maxOutputTokens: 2048,
        temperature: 0.3,
        topP: 0.1,
        topK: 1,
        candidateCount: 1,
      },
    };

    // 일반 chat 호출 api
    // try {
    //   const response = await fetch("/api/chat", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Response not ko");
    //   }

    //   const { response: aiResponse } = await response.json();

    //   // 어시스턴스 메세지 생성
    //   const assistantMessage: Message = {
    //     id: Date.now() + 1,
    //     role: "assistant",
    //     text: aiResponse,
    //   };

    //   // 전역 상태에 어시스턴스 메세지 추가
    //   setThreadMessages(threadId, [...updatedMessages, assistantMessage]);
    // } catch (error) {
    //   console.error("Error sending message: ", error);
    //   // 에러 발생시 에러 메세지 추가
    //   const errorMessage: Message = {
    //     id: Date.now() + 1,
    //     role: "assistant",
    //     text: "문제가 생겼습니다. 다시 시도해주세요",
    //   };
    //   // 전역 상태에 에러 메세지 추가
    //   setThreadMessages(threadId, [...updatedMessages, errorMessage]);
    // } finally {
    //   setInput("");
    //   // 요청 종료
    //   setLoading(false);

    //   // 현재 경로가 루트 ("/"), 새 스레드 상세 페이지 (chatList) 라우팅
    //   if (location.pathname === "/") {
    //     navigate(`/chats/${threadId}`);
    //   }
    // }

    const fetchStreamData = async () => {
      // 새로운 AbortController 생성 및 streamStore에 저장
      const controller = new AbortController();
      setAbortController(controller);

      try {
        const headerConfig = {
          Accept: "text/event-stream, text/plain",
          "Content-Type": "application/json",
        };

        const response = await fetch("/api/gemini-stream", {
          method: "POST",
          headers: headerConfig,
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        if (!response.body) {
          throw new Error("Error");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (reader) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const rawData = line.slice(6).trim();
              if (rawData === "[DONE]") break;

              try {
                const data = JSON.parse(rawData);
                // 최신 스레드 상태 가져오기
                const currentThread =
                  useChatStore.getState().threads[threadId] || [];
                const updatedThread = currentThread.map((msg, idx) => {
                  if (
                    msg.role === "assistant" &&
                    idx === currentThread.length - 1
                  ) {
                    // 스트리밍 데이터 누적 업데이트
                    return { ...msg, text: msg.text + data.text };
                  }
                  return msg;
                });

                setThreadMessages(threadId, updatedThread);
              } catch (err) {
                console.error("JSON parsing error: ", err);
              }
            }
          }
        }
      } catch (error: any) {
        if (error?.name === "AbortError") {
          console.log("Streaming aborted: ", error);
        } else {
          // 일반 에러처리
          const errorMsg: Message = {
            id: Date.now() + 1,
            role: "assistant",
            text: "문제가 생겼습니다. 다시 시도해주세요",
          };
          setThreadMessages(threadId, [...updatedMessages, errorMsg]);
        }
      } finally {
        setInput("");
        setLoading(false);
        // 현재 경로가 메인 페이지인 경우, 상세 chat으로 라우팅
        if (location.pathname === "/") {
          navigate(`/chats/${threadId}`);
        }
      }
    };

    // SSE 스트리밍 시작
    fetchStreamData();
  };

  const handleStopAnswer = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      toast.info("답변이 중지되었습니다.");
      console.log("Streaming aborted");
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
      {loading ? (
        <button className={styles.sendButton} onClick={handleStopAnswer}>
          <AiOutlineStop className={styles.sendIcon} />
        </button>
      ) : (
        <button
          onClick={handleSend}
          className={styles.sendButton}
          disabled={loading}
        >
          <AiOutlineSend className={styles.sendIcon} />
        </button>
      )}
    </div>
  );
}
