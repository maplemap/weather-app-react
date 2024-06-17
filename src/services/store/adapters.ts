import {StoreApi, UseBoundStore, create} from 'zustand';
import {persist} from 'zustand/middleware';
import {TUser} from '@/types/user';

type TState = {
  user: TUser | null;
  loading: boolean;
};

type TActions = {
  setUser: (user: TUser) => void;
  setLoading: (loading: boolean) => void;
  deleteUser: () => void;
};

export const initialState: TState = {
  user: null,
  loading: false,
};

export const useAppStore: UseBoundStore<StoreApi<TState & TActions>> = create(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set(() => ({user})),
      deleteUser: () => set(() => ({user: null})),
      setLoading: (loading) => set(() => ({loading})),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({user: state.user}),
    },
  ),
);
