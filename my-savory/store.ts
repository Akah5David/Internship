import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isSignedIn: false,
  signin: () => set({ isSignedIn: true }),
  signout: () => set({ isSignedIn: false }),
}));