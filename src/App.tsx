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
import useAuth from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner/Spinner";

const App: React.FC = () => {
  const { user, loading } = useAuth();
  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <Router>
          <Routes>
            {/* 모든 사용자 접근 가능 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* 인증된 사용자만 접근 가능 */}
            <Route
              path="/*"
              element={
                <PrivateRoute isAuthenticated={!!user}>
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/chats/:id" element={<ChatDetailPage />} />
                    <Route path="/threads" element={<ThreadListPage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route
                      path="/test-firestore"
                      element={<TestFirestorePage />}
                    />
                  </Routes>
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Router>
      )}
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
    </main>
  );
};

export default App;
