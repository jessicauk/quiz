import { create } from "zustand";
import { Question } from "./interfaces";

interface LoginState {
  current: Question | null;
  questions: Question[];
  setCurrent: (question: Question) => void;
}

export const useQuestionStore = create<LoginState>()((set) => ({
  current: null,
  questions: [],
  setCurrent: (question) => set({ current: question }),
}));
