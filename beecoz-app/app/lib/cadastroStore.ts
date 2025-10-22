import { create } from "zustand";
type State = {
  nome?: string; email?: string; telefone?: string; senha?: string;
  estado?: string; municipio?: string; cpf?: string; sexo?: "M"|"F"|null;
  cnpj?: string; area?: string;
  set: (v: Partial<State>) => void; reset: () => void;
};
export const useCadastro = create<State>((set)=>({
  set:(v)=>set(v),
  reset:()=>set({ nome:undefined,email:undefined,telefone:undefined,senha:undefined,
    estado:undefined,municipio:undefined,cpf:undefined,sexo:null,cnpj:undefined,area:undefined })
}));
