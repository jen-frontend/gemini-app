import React from "react";
import * as styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../store/modalStore";

export default function Header() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  return (
    <div className={styles.header}>
      <div
        role="presentation"
        className={styles.logo}
        onClick={() => navigate("/")}
      >
        Gemini App
      </div>
      <div className={styles.profile} onClick={openModal}>
        Profile
      </div>
    </div>
  );
}
