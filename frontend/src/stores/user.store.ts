import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IUser } from '../models/user.model';
import { IRegister } from '../models/auth.model';
import { login } from '../services/auth.service';


interface AuthState {
  user: null | IUser;
  token: null | string;
  login: (email: string, password: string) => Promise<void>;
  register: (userInfo: IRegister) => Promise<void>;
  logout: () => void;
  setUser: (user: IUser) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const result = await login({ email: email, password: password });
        set({ token: result.access_token, user: result.user })
      },
      register: async (data) => {
        // const result = await register(data);
        // set({ token: result.access_token, user: result.user })
      },
      logout: () => {
        set({ token: null, user: null })
      },
      setUser: (user) => {
        set({user: user})
      }
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;

function register(data: IRegister) {
    throw new Error('Function not implemented.');
}
