import { create } from "zustand";

export interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

interface ChatState {
  loading: boolean;
  messages: Message[];
  threads: Record<number, Message[]>;
  addMessage: (message: Message) => void;
  setThreadMessages: (threadId: number, messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  loading: false,
  messages: [],
  threads: JSON.parse(localStorage.getItem("chatThreads") || "{}") as Record<
    number,
    Message[]
  >,
  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setThreadMessages: (threadId: number, messages: Message[]) =>
    set((state) => {
      const updateThreads = { ...state.threads, [threadId]: messages };

      // localStorage 저장
      localStorage.setItem("chatThreads", JSON.stringify(updateThreads));
      return { threads: updateThreads };
    }),
  setLoading: (loading: boolean) => set({ loading }),
}));
