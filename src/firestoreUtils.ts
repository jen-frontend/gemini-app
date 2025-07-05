import { db } from "./firebase";
import { Message } from "./store/chatStore";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

export async function saveThreadMessages(
  threadId: number,
  messages: Message[]
) {
  // 저장할 firestore doc ref 정의
  const threadDocRef = doc(db, "chatThreads", String(threadId));
  // setDoc으로 실제 데이터 저장
  await setDoc(threadDocRef, { messages }, { merge: true });
}

// 모든 chatThread 컬렉션 실시간 구독
export const subscribeToChatThreads = (
  callback: (threads: Record<number, Message[]>) => void
) => {
  const colRef = collection(db, "chatThreads");
  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const threads: Record<number, Message[]> = {};
    snapshot.forEach((doc) => {
      threads[Number(doc.id)] = doc.data().messages || [];
    });
    callback(threads);
  });

  return unsubscribe;
};

// 최신 5개 스레드 제목 리턴
export const getLatestChatThreads = (
  threads: Record<number, Message[]>
): { id: number; title: string }[] => {
  const threadsObj = Object.entries(threads);

  const threadList = threadsObj
    .map(([id, msg]) => ({
      id: Number(id),
      title: msg.find((m) => m.role === "user")?.text || "Untitled Chat",
    }))
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return threadList;
};

// 새로운 스레드 아이디 계산
export async function getNextThreadId(): Promise<number> {
  const snapshot = await getDocs(collection(db, "chatThreads"));

  const ids = snapshot.docs
    .map((doc) => Number(doc.id))
    .filter((id) => !isNaN(id));

  return (Math.max(0, ...ids) || 0) + 1;
}

// 전체 스레드 데이터 가져오기
export interface ThreadListItem {
  id: number;
  question: string;
  answer: string;
}

export const getAllChatThreads = (
  threads: Record<number, Message[]>
): ThreadListItem[] => {
  const threadArray: ThreadListItem[] = Object.entries(threads)
    .map(([idStr, msgs]) => {
      const id = Number(idStr);
      if (isNaN(id)) return null;

      let question = "";
      let answer = "";

      if (msgs.length > 0) {
        const userMsg = msgs.find((msg) => msg.role === "user");
        question = userMsg?.text ?? "질문이 없습니다";

        const assistantMsg = msgs.find((msg) => msg.role === "assistant");
        answer = assistantMsg?.text ?? "답변이 없습니다";
      }

      return { id, question, answer };
    })
    .filter((item) => item !== null)
    .sort((a, b) => b!.id - a!.id);

  return threadArray;
};
