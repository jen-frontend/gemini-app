import React, { useEffect, useState } from "react";
import * as styles from "./Sidebar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import cn from "classnames";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getLatestChatThreads,
  subscribeToChatThreads,
} from "../../firestoreUtils";
import useAuth from "../../hooks/useAuth";
import { useModalStore } from "../../store/modalStore";

interface ChatThread {
  id: number;
  title: string;
}

export default function Sidebar() {
  const [chatList, setChatList] = useState<ChatThread[]>([]);
  const { openModal } = useModalStore();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentId = parseInt(id ?? "");
  const currentPath = useLocation();
  const { uid } = useAuth();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    if (!uid) return;
    const unsubscribe = subscribeToChatThreads(uid, (threads) => {
      // 최신 5개 가져오기
      const latestThreads = getLatestChatThreads(threads);
      // setChatList에 저장하기
      setChatList(latestThreads);
    });

    return () => unsubscribe();
  }, [uid]);

  return (
    <div className={cn(styles.sidebar, { [styles.collapsed]: isCollapsed })}>
      <div
        role="presentation"
        onClick={toggleSidebar}
        className={styles.menuButton}
      >
        <AiOutlineMenu className={styles.menuIcon} />
      </div>
      {!isCollapsed && (
        <>
          <div
            role="presentation"
            className={styles.navItem}
            onClick={() => navigate("/")}
          >
            New Chat
          </div>
          <div
            role="presentation"
            className={cn(styles.navItem, {
              [styles.active]: currentPath.pathname === "/threads",
            })}
            onClick={() => navigate("/threads")}
          >
            Chat List
          </div>
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
          <div className={styles.navItem} onClick={openModal}>
            Profile
          </div>
        </>
      )}
    </div>
  );
}
