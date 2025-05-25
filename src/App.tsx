import React from "react";
import "./global.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ChatList from "./components/ChatList/ChatList";
import ChatInput from "./components/ChatInput/ChatInput";
import TestPage from "./pages/TestPage";

const App: React.FC = () => {
  return (
    <TestPage />
    // <div style={{ display: "flex", height: "100vh" }}>
    //   <Sidebar />
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       flex: 1,
    //       position: "relative",
    //     }}
    //   >
    //     <Header />
    //     <ChatList />
    //     <ChatInput />
    //   </div>
    // </div>
  );
};

export default App;
