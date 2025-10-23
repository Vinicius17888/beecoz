import axios from "axios";
export type Perfil = "CLIENTE" | "AUTONOMO";

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL!;
export const API = axios.create({ baseURL: BASE_URL });

export async function apiLogin(login: string, senha: string) {
  const { data } = await API.post("/auth/login", { login, senha });
  return data as { token: string; userId: number; perfil: Perfil };
}

export async function apiRegister(p: { email?: string; telefone?: string; senha: string; perfil: Perfil; nome: string }) {
  const { data } = await API.post("/auth/register", p);
  return data as { token: string; userId: number; perfil: Perfil };
}

export async function apiMe(token: string) {
  const { data } = await API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
  return data as { userId: number; perfil: Perfil; nome: string };
}
