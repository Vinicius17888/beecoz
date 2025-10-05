import { create } from "zustand";
import type { Perfil } from "./api";

type State = {
  token?: string;
  userId?: number;
  perfil?: Perfil;
  setAuth: (p: { token: string; userId: number; perfil: Perfil }) => void;
  logout: () => void;
};

export const useAuth = create<State>((set) => ({
  token: undefined,
  userId: undefined,
  perfil: undefined,
  setAuth: (p) => set({ ...p }),
  logout: () => set({ token: undefined, userId: undefined, perfil: undefined }),
}));
