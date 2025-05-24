import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import * as styles from "./ChatInput.module.css";

export default function ChatInput() {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    console.log("메세지 전송: ", message);
    setMessage("");
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
