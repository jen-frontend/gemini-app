import React, { useEffect, useState } from "react";
import * as styles from "./Sidebar.module.css";

import cn from "classnames";
import { Message } from "../../store/chatStore";
import { useNavigate, useParams } from "react-router-dom";

interface ChatThread {
  id: number;
  title: string;
}

export default function Sidebar() {
  const [chatList, setChatList] = useState<ChatThread[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentId = parseInt(id ?? "");

  useEffect(() => {
    const stored = localStorage.getItem("chatThreads");

    if (!stored) return;

    const threadsObj = Object.entries(
      JSON.parse(stored) as Record<string, Message[]>
    );

    const threads = threadsObj
      .map(([id, msg]) => ({
        id: Number(id),
        title: msg.find((m) => m.role === "user")?.text || "Untitled Chat",
      }))
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    setChatList(threads);
  }, []);

  return (
    <div className={styles.sidebar}>
      <div
        role="presentation"
        className={styles.navItem}
        onClick={() => navigate("/")}
      >
        New Chat
      </div>
      <div className={styles.navItem}>Chat List</div>
      {chatList?.map((item, index) => (
        <div
          role="presentation"
          key={item?.id}
          className={cn(styles.chatList, {
            [styles.active]: item.id === currentId,
          })}
          onClick={() => navigate(`/chats/${item.id}`)}
        >
          {item?.title}
        </div>
      ))}
      <div className={styles.navItem}>Profile</div>
    </div>
  );
}
