import React, { useEffect, useState } from "react";
import * as styles from "./Sidebar.module.css";

import cn from "classnames";
import { Message } from "../../store/chatStore";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLatestChatThreads,
  subscribeToChatThreads,
} from "../../firestoreUtils";

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
    const unsubscribe = subscribeToChatThreads((threads) => {
      // 최신 5개 가져오기
      const latestThreads = getLatestChatThreads(threads);
      // setChatList에 저장하기
      setChatList(latestThreads);
    });

    return () => unsubscribe();
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
