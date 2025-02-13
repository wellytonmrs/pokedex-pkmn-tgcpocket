import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockLogin, LoginResponse, GoogleUser } from "../services/authService";

interface User {
  username: string;
  picture?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    username?: string,
    password?: string,
    googleData?: GoogleUser
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      // Mocked login logic with separation of concerns
      login: async (username, password, googleData) => {
        try {
          const data: LoginResponse = await mockLogin(
            username,
            password,
            googleData
          );
          set({
            isAuthenticated: true,
            user: { username: data.username, picture: data?.picture },
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      // Clear state during logout
      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("dex-PKMTGCPKT-auth-store");
      },
    }),
    {
      name: "dex-PKMTGCPKT-auth-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
