import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Perfil = "CLIENTE" | "AUTONOMO";
type State = {
  token: string | null;
  userId: number | null;
  perfil: Perfil | null;
};
type Actions = {
  setSession: (token: string, userId: number, perfil: Perfil) => void;
  logout: () => void;
};

export const useAuth = create<State & Actions>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      perfil: null,
      setSession: (token, userId, perfil) => set({ token, userId, perfil }),
      logout: () => set({ token: null, userId: null, perfil: null }),
    }),
    { name: "auth", storage: createJSONStorage(() => AsyncStorage) }
  )
);
