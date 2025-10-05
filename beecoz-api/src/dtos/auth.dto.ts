export type RegisterDTO = {
  email?: string;
  telefone?: string;
  senha: string;
  perfil: "CLIENTE" | "AUTONOMO";
  nome: string;
};
export type LoginDTO = {
  login: string; // email OU telefone
  senha: string;
};
