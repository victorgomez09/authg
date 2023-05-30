import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IUser } from '../models/user.model';
import { ACCESS_TOKEN } from '../constants';

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
        localStorage.removeItem(ACCESS_TOKEN);
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
