import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ChatInput from "../components/ChatInput/ChatInput";
import * as styles from "./Page.module.css";
import Main from "../components/Main/Main";

const MainPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <Header />
        <Main />
        <ChatInput />
      </div>
    </div>
  );
};

export default MainPage;
