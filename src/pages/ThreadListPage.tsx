import React, { useEffect, useState } from "react";
import {
  getAllChatThreads,
  subscribeToChatThreads,
  ThreadListItem,
} from "../firestoreUtils";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ThreadList from "../components/ThreadList/ThreadList";
import useAuth from "../hooks/useAuth";

const ThreadListPage: React.FC = () => {
  const { uid } = useAuth();
  const [threadList, setThreadList] = useState<ThreadListItem[]>([]);

  useEffect(() => {
    if (!uid) return;
    const unsubscribe = subscribeToChatThreads(uid, (threads) => {
      const allThreads = getAllChatThreads(threads);
      setThreadList(allThreads);
    });

    return () => unsubscribe();
  }, [uid]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Header />
        <ThreadList threads={threadList} />
      </div>
    </div>
  );
};

export default ThreadListPage;
