import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockLogin, LoginResponse } from '../services/authService';

interface User {
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      // Mocked login logic with separation of concerns
      login: async (username, password) => {
        try {
          const data: LoginResponse = await mockLogin(username, password);
          set({ isAuthenticated: true, user: { username: data.username } });
        } catch (error) {
          console.error("Login failed:", error);
          throw error; // Re-throw for the UI to handle
        }
      },

      // Clear state during logout
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'dex-PKMTGCPKT-auth-store', // Key used for localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
