import React from "react";
import { useModalStore } from "../../store/modalStore";
import useAuth from "../../hooks/useAuth";
import * as styles from "./Modal.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const Modal: React.FC = () => {
  const { user } = useAuth();

  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      closeModal();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const createdAt = user?.metadata?.creationTime || "정보 없음";
  const lastLoginAt = user?.metadata?.lastSignInTime || "정보 없음";

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 상단 헤어 영억 */}
        <header className={styles.modalHeader}>
          <span className={styles.modalTitle}>프로필</span>
          <button className={styles.closeIcon} onClick={closeModal}>
            <AiOutlineClose />
          </button>
        </header>

        {/* 구분선 */}
        <div className={styles.divider} />

        {/* 정보 섹션 */}
        <div className={styles.profileContent}>
          {/* 이메일 / 생성 날짜 / 최근 로그인 */}
          <div className={styles.profileRow}>
            <span className={styles.label}>이메일</span>
            <span className={styles.value}>{user?.email}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.label}>생성 날짜</span>
            <span className={styles.value}>{createdAt}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.label}>최근 로그인</span>
            <span className={styles.value}>{lastLoginAt}</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className={styles.divider} />

        {/* 로그아웃 버튼 */}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Modal;
