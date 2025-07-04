import { create } from "zustand";
import { saveThreadMessages } from "../firestoreUtils";

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
  setThreads: (threads: Record<number, Message[]>) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  loading: false,
  messages: [],
  threads: {},
  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setThreadMessages: (threadId: number, messages: Message[]) =>
    set((state) => {
      const updateThreads = { ...state.threads, [threadId]: messages };
      saveThreadMessages(threadId, messages);
      return { threads: updateThreads };
    }),
  setLoading: (loading: boolean) => set({ loading }),
  setThreads: (threads: Record<number, Message[]>) => set({ threads }),
}));
