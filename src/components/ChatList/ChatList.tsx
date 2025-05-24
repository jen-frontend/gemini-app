import React from "react";
import * as styles from "./ChatList.module.css";
import cn from "classnames";

interface Message {
  id: number;
  text: string;
  sent: boolean;
}

const fakeMessages: Message[] = [
  { id: 1, text: "Hello! How can I help you today?", sent: false },
  { id: 2, text: "I'm looking for information on Gemini API.", sent: true },
  { id: 3, text: "Sure, here are some details...", sent: false },
  {
    id: 4,
    text: "Hello! How can I help you today? Hello! How can I help you today? Hello! How can I help you today? Hello! How can I help you today? Hello! How can I help you today? ",
    sent: true,
  },
  {
    id: 5,
    text: "I'm looking for information on Gemini API. I'm looking for information on Gemini API. I'm looking for information on Gemini API. I'm looking for information on Gemini API. I'm looking for information on Gemini API. I'm looking for information on Gemini API.",
    sent: false,
  },
  { id: 6, text: "Sure, here are some details...", sent: true },
];

export default function ChatList() {
  return (
    <div className={styles.chatList}>
      {fakeMessages.map((message) => (
        <div
          key={message.id}
          className={cn(styles.chatMessage, { [styles.sent]: message.sent })}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
