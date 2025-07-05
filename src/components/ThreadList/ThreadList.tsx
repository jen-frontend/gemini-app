import React from "react";
import { ThreadListItem } from "../../firestoreUtils";
import * as styles from "./ThreadList.module.css";
import { useNavigate } from "react-router-dom";

interface ThreadListProps {
  threads: ThreadListItem[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {threads.map((item) => (
        <div
          key={item.id}
          className={styles.threadItem}
          onClick={() => navigate(`/chats/${item.id}`)}
        >
          <div className={styles.question}>{item.question}</div>
          <div className={styles.answer}>{item.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
