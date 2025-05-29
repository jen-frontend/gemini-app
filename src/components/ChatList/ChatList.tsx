import React from "react";
import * as styles from "./ChatList.module.css";
import cn from "classnames";
import { useChatStore } from "../../store/chatStore";

interface Message {
  id: number;
  text: string;
  sent: boolean;
}

export default function ChatList() {
  const { messages } = useChatStore();
  return (
    <div className={styles.chatList}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(styles.chatMessage, {
            [styles.sent]: message.role === "user",
          })}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
