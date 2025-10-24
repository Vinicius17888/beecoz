import axios from "axios";

const API_BASE =
  (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/+$/, "") || "http://localhost:3333";

export const API = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// Puxa a mensagem do servidor para error.message
API.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg = err?.response?.data?.message;
    if (msg) err.message = msg;
    return Promise.reject(err);
  }
);

export async function ping() {
  const { data } = await API.get("/health");
  return data;
}

export async function apiRegister(payload: {
  perfil: "CLIENTE" | "AUTONOMO";
  nome: string;
  email?: string;
  telefone?: string;
  senha: string;
}) {
  const { data } = await API.post("/auth/register", payload);
  return data;
}

export async function apiLogin(login: string, senha: string) {
  const { data } = await API.post("/auth/login", { login, senha });
  return data;
}

export async function apiUpdateCliente(token: string, payload: any) {
  const { data } = await API.put("/profile/cliente", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function apiUpdateAutonomo(token: string, payload: any) {
  const { data } = await API.put("/profile/autonomo", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
