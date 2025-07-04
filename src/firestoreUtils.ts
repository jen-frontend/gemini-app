import { db } from "./firebase";
import { Message } from "./store/chatStore";
import { doc, setDoc } from "firebase/firestore";

export async function saveThreadMessages(
  threadId: number,
  messages: Message[]
) {
  // 저장할 firestore doc ref 정의
  const threadDocRef = doc(db, "chatThreads", String(threadId));
  // setDoc으로 실제 데이터 저장
  await setDoc(threadDocRef, { messages }, { merge: true });
}
