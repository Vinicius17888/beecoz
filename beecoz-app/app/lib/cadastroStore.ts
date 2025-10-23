import { create } from "zustand";

type Common = { nome: string; email?: string; telefone?: string; senha?: string };
type Cliente = Common & { cpf?: string; cep?: string; cidade?: string; uf?: string; endereco?: string; };
type Autonomo = Common & { cnpj?: string; area?: string; };

type State = {
  cliente: Cliente;
  autonomo: Autonomo;
};
type Actions = {
  setCliente: (patch: Partial<Cliente>) => void;
  setAutonomo: (patch: Partial<Autonomo>) => void;
  reset: () => void;
};

export const useCadastro = create<State & Actions>((set) => ({
  cliente: { nome: "" },
  autonomo: { nome: "" },
  setCliente: (patch) => set((s) => ({ cliente: { ...s.cliente, ...patch } })),
  setAutonomo: (patch) => set((s) => ({ autonomo: { ...s.autonomo, ...patch } })),
  reset: () => set({ cliente: { nome: "" }, autonomo: { nome: "" } })
}));
