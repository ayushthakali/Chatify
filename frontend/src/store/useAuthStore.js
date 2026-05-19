import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: {},
  isLoggedIn: false,

  login: () => {
    set({ isLoggedIn: true });
  },
}));
