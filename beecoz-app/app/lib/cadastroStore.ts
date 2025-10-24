import { create } from "zustand";

export type Common = { nome: string; email?: string; telefone?: string; senha?: string; genero?: "M"|"F" };
export type Cliente = Common & {
  estado?: string; cidade?: string; cpf?: string;
  docRg?: string; docComp?: string; selfie?: string;
};
export type Autonomo = Common & {
  estado?: string; cidade?: string; cpf?: string; cnpj?: string; area?: string;
  docRg?: string; docComp?: string; selfie?: string;
};

type State = { cliente: Cliente; autonomo: Autonomo };
type Actions = {
  setCliente: (p: Partial<Cliente>) => void;
  setAutonomo: (p: Partial<Autonomo>) => void;
  reset: () => void;
};
export const useCadastro = create<State & Actions>((set) => ({
  cliente: { nome: "" },
  autonomo: { nome: "" },
  setCliente: (p) => set((s) => ({ cliente: { ...s.cliente, ...p } })),
  setAutonomo: (p) => set((s) => ({ autonomo: { ...s.autonomo, ...p } })),
  reset: () => set({ cliente: { nome: "" }, autonomo: { nome: "" } }),
}));
