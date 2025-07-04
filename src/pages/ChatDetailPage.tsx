import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ChatList from "../components/ChatList/ChatList";
import ChatInput from "../components/ChatInput/ChatInput";
import * as styles from "./Page.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { subscribeToChatThreads } from "../firestoreUtils";
import { useChatStore } from "../store/chatStore";

const ChatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const threadId = parseInt(id ?? "");
  const { setThreads } = useChatStore();
  const navigate = useNavigate();

  // chatThreads 컬렉션 전체 구독
  useEffect(() => {
    const unsubscribe = subscribeToChatThreads((threads) => {
      setThreads(threads);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isNaN(threadId) || threadId === 0) {
      navigate("/");
    }
  }, [threadId]);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <Header />
        <ChatList threadId={threadId} />
        <ChatInput threadId={threadId} />
      </div>
    </div>
  );
};

export default ChatDetailPage;
