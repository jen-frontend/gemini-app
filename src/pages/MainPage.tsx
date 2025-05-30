import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ChatInput from "../components/ChatInput/ChatInput";
import * as styles from "./Page.module.css";
import Main from "../components/Main/Main";

const MainPage: React.FC = () => {
  const [newThreadId, setNewThreadId] = useState<number>(0);

  useEffect(() => {
    // 로컬 스토리지에서 객체 꺼내기
    const stored = JSON.parse(localStorage.getItem("chatThreads") ?? "{}");

    const ids = Object.keys(stored).map((id) => Number(id));

    const maxId = ids?.length ? Math.max(...ids) : 0;

    setNewThreadId(maxId + 1);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <Header />
        <Main />
        <ChatInput threadId={newThreadId} />
      </div>
    </div>
  );
};

export default MainPage;
