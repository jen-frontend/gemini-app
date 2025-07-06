import React, { useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import * as styles from "./Auth.module.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // firebase auth로 로그인
      await signInWithEmailAndPassword(auth, email, password);
      toast("로그인에 성공했습니다");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleClickSignup = () => {
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>로그인</h1>
      <input
        type="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={styles.formInput}
      />
      <input
        type="password"
        placeholder="비밀번호 (최소 8자리)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.formInput}
      />
      <button
        type="submit"
        disabled={!email && !password}
        className={styles.primaryBtn}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={handleClickSignup}
        className={styles.secondaryBtn}
      >
        회원가입
      </button>
    </form>
  );
};

export default LoginPage;
