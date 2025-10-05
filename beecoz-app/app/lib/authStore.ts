import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Perfil } from "./api";

type State = {
  token?: string;
  userId?: number;
  perfil?: Perfil;
  hydrated: boolean;
  setAuth: (p: { token: string; userId: number; perfil: Perfil }) => Promise<void>;
  logout: () => Promise<void>;
  _hydrate: () => Promise<void>;
};

export const useAuth = create<State>((set, get) => ({
  token: undefined, userId: undefined, perfil: undefined, hydrated: false,
  setAuth: async (p) => {
    await AsyncStorage.setItem("@auth", JSON.stringify(p));
    set({ ...p });
  },
  logout: async () => {
    await AsyncStorage.removeItem("@auth");
    set({ token: undefined, userId: undefined, perfil: undefined });
  },
  _hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem("@auth");
      if (raw) set(JSON.parse(raw));
    } finally {
      set({ hydrated: true });
    }
  }
}));
