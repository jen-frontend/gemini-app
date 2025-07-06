import React, { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import * as styles from "./Auth.module.css";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("비밀번호는 8자리 이상 입력해주세요");
      return;
    }

    try {
      // firebase auth로 회원가입
      await createUserWithEmailAndPassword(auth, email, password);
      toast("회원가입에 성공했습니다");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>회원가입</h1>
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
        회원가입
      </button>
      <button
        type="button"
        onClick={handleClickLogin}
        className={styles.secondaryBtn}
      >
        로그인
      </button>
    </form>
  );
};

export default SignupPage;
