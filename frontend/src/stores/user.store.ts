import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IUser } from '../models/user.model';

interface AuthState {
  user: null | IUser;
  logout: () => void;
  setUser: (user: IUser) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      logout: () => {
        set({ user: null })
      },
      setUser: (user) => {
        set({ user: user })
      }
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
