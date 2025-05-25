import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import * as styles from "./ChatInput.module.css";

export default function ChatInput() {
  const [message, setMessage] = useState<string>("");

  const handleSend = async () => {
    if (!message.trim()) return; // 빈 메세지 방지

    console.log("Sending message: ", message);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        throw new Error("Response not ko");
      }

      const data = await response.json();
      console.log("Chat API response: ", data);
    } catch (error) {
      console.error("Error sending message: ", error);
    } finally {
      setMessage("");
    }
  };

  return (
    <div className={styles.chatInputWrapper}>
      <textarea
        className={styles.chatInput}
        placeholder="메세지를 입력해주세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend} className={styles.sendButton}>
        <AiOutlineSend className={styles.sendIcon} />
      </button>
    </div>
  );
}
