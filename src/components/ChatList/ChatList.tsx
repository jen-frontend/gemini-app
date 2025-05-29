import React, { useEffect, useRef } from "react";
import * as styles from "./ChatList.module.css";
import cn from "classnames";
import { useChatStore } from "../../store/chatStore";

import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
import { MarkdownCodeBlock } from "./MarkdownCodeBlock";

export default function ChatList() {
  const { messages, loading } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

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
