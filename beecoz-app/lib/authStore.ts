import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Perfil } from "./api";

type State = {
  hydrated: boolean;
  token: string | null;
  userId: number | null;
  perfil: Perfil | null;
};

type Actions = {
  setSession: (token: string, userId: number, perfil: Perfil) => void;
  clear: () => void;
  setHydrated: (v: boolean) => void;
};

export const useAuth = create<State & Actions>()(
  persist(
    (set) => ({
      hydrated: false,
      token: null,
      userId: null,
      perfil: null,
      setSession: (token, userId, perfil) => set({ token, userId, perfil }),
      clear: () => set({ token: null, userId: null, perfil: null }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "beecoz-auth",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);
