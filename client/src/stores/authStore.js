import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  apiLoading: false,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsLoading: (value) => set({ isLoading: value }),
  setApiLoading: (value) => set({ apiLoading: value }),
}));
