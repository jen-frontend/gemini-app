import React, { useEffect, useRef } from "react";
import * as styles from "./ChatList.module.css";
import cn from "classnames";
import { useChatStore } from "../../store/chatStore";

import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
import { MarkdownCodeBlock } from "./MarkdownCodeBlock";

interface ChatListProps {
  threadId: number;
}

export default function ChatList({ threadId }: ChatListProps) {
  const { threads, loading } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  // threadId에 맞는 메세지 가져오기
  const messages = threads[threadId] || [];

  const scrollToBottom = () => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.chatList}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(styles.chatMessage, {
            [styles.sent]: message.role === "user",
          })}
        >
          {message.role === "assistant" ? (
            <div className={styles.markdown}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownCodeBlock}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          ) : (
            message.text
          )}
        </div>
      ))}
      {loading && <div className={styles.loader} />}
      <div ref={messageEndRef} />
    </div>
  );
}
