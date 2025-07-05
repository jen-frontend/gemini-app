import React, { useEffect, useState } from "react";
import {
  getAllChatThreads,
  subscribeToChatThreads,
  ThreadListItem,
} from "../firestoreUtils";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ThreadList from "../components/ThreadList/ThreadList";

const ThreadListPage: React.FC = () => {
  const [threadList, setThreadList] = useState<ThreadListItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToChatThreads((threads) => {
      const allThreads = getAllChatThreads(threads);
      setThreadList(allThreads);
    });

    return () => unsubscribe();
  }, []);

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
