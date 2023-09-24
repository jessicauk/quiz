import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";
import { Login } from "../data/dummy-login";
import { User } from "./interfaces";

interface LoginState {
  isLogged: boolean;
  user: User | null;
  defaultUser: User;
  setUser: (user: User) => void;
  setIsLoggedIn: () => void;
  setIsLoggedOut: () => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLogged: false,
      user: null,
      defaultUser: Login,
      setUser: (user: User) => set({ user }),
      setIsLoggedIn: () => set({ isLogged: true }),
      setIsLoggedOut: () => set({ isLogged: false }),
    }),
    {
      name: "login-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
