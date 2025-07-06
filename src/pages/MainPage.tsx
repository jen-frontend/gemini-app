import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ChatInput from "../components/ChatInput/ChatInput";
import * as styles from "./Page.module.css";
import Main from "../components/Main/Main";
import { getNextThreadId } from "../firestoreUtils";
import useAuth from "../hooks/useAuth";

const MainPage: React.FC = () => {
  const [newThreadId, setNewThreadId] = useState<number>(0);
  const { uid } = useAuth();

  useEffect(() => {
    if (!uid) return;

    (async () => {
      const nextId = await getNextThreadId(uid);
      setNewThreadId(nextId);
    })();
  }, [uid]);

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
