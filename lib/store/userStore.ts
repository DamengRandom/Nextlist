import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string;
  jobTitle: string;
  setUsername: (username: string) => void;
  setJobTitle: (jobTitle: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      jobTitle: '',
      setUsername: (username) => set({ username }),
      setJobTitle: (jobTitle) => set({ jobTitle }),
    }),
    { name: 'user-store' }
  )
);