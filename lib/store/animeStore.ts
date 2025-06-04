import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnimeStates {
  type: string | undefined;
  sort: string | undefined;
  page: number;
  searchName: string | undefined;
  setType: (type: string) => void;
  setSort: (sort: string) => void;
  setPage: (page: number) => void;
  setSearchName: (searchName: string) => void;
  reset: () => void;
}

export const useAnimeStore = create<AnimeStates>()(
  persist(
    (set) => ({
      type: undefined,
      sort: undefined,
      page: 1,
      searchName: undefined,
      setType: (type) => set({ type }),
      setSort: (sort) => set({ sort }),
      setPage: (page) => set({ page }),
      setSearchName: (searchName) => set({ searchName }),
      reset: () => set({ page: 1, searchName: undefined }),
    }),
    { name: 'anime-store' }
  )
);
