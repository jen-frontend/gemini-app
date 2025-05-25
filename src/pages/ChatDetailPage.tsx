import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ChatList from "../components/ChatList/ChatList";
import ChatInput from "../components/ChatInput/ChatInput";
import * as styles from "./Page.module.css";

import { useParams } from "react-router-dom";

const ChatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  console.log("chat id: ", id);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <Header />
        <ChatList />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatDetailPage;
