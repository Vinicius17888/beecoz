import axios from "axios";
export const BASE_URL = "https://beecoz.onrender.com";
export const API = axios.create({ baseURL: BASE_URL });

export type Perfil = "CLIENTE" | "AUTONOMO";

export async function apiLogin(login: string, senha: string) {
  const { data } = await API.post("/auth/login", { login, senha });
  return data as { token: string; userId: number; perfil: Perfil };
}
export async function apiRegister(p: { email?: string; telefone?: string; senha: string; perfil: Perfil; nome: string }) {
  const { data } = await API.post("/auth/register", p);
  return data as { token: string; userId: number; perfil: Perfil };
}
