import React from "react";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatDetailPage from "./pages/ChatDetailPage";
import ThreadListPage from "./pages/ThreadListPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TestPage from "./pages/TestPage";
import { ToastContainer } from "react-toastify";
import TestFirestorePage from "./pages/TestFirestorePage";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chats/:id" element={<ChatDetailPage />} />
          <Route path="/threads" element={<ThreadListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test-firestore" element={<TestFirestorePage />} />
        </Routes>
      </Router>
      <ToastContainer
        theme="dark"
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
        closeOnClick={false}
      />
    </>
  );
};

export default App;
