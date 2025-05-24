import React from "react";
import * as styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Gemini App</div>
      <div className={styles.profile}>Profile</div>
    </div>
  );
}
