import React from "react";
import * as styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div
        role="presentation"
        className={styles.logo}
        onClick={() => navigate("/")}
      >
        Gemini App
      </div>
      <div className={styles.profile}>Profile</div>
    </div>
  );
}
