import { Request, Response } from "express";
import { z } from "zod";
import {
  register as registerSvc,
  login as loginSvc,
  requestPasswordReset as requestPasswordResetSvc,
  resetPassword as resetPasswordSvc,
  me as meSvc,
} from "../services/auth.service";

/** POST /auth/register */
export async function registerCtrl(req: Request, res: Response) {
  const schema = z.object({
    perfil: z.enum(["CLIENTE", "AUTONOMO"]),
    nome: z.string().min(2),
    email: z.string().email().optional(),
    telefone: z.string().optional(),
    senha: z.string().min(6),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  try {
    const result = await registerSvc(parsed.data);
    // result = { token, userId, perfil }
    return res.json(result);
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.includes("P2002") || /unique|existe|duplicad/i.test(msg)) {
      return res.status(409).json({ message: "Já existe uma conta com esse e-mail ou telefone." });
    }
    return res.status(400).json({ message: msg || "Falha no cadastro." });
  }
}

/** POST /auth/login */
export async function loginCtrl(req: Request, res: Response) {
  const schema = z.object({ login: z.string().min(3), senha: z.string().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  try {
    const result = await loginSvc(parsed.data);
    // result = { token, userId, perfil }
    return res.json(result);
  } catch (e: any) {
    return res.status(401).json({ message: e?.message || "Credenciais inválidas." });
  }
}

/** GET /auth/me */
export async function meCtrl(req: any, res: Response) {
  try {
    const { userId } = req.user as { userId: number };
    const result = await meSvc(userId);
    return res.json(result);
  } catch (e: any) {
    return res.status(401).json({ message: e?.message || "Não autorizado." });
  }
}

/** POST /auth/request-password-reset */
export async function requestPasswordResetCtrl(req: Request, res: Response) {
  const schema = z.object({ login: z.string().min(3) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  try {
    const result = await requestPasswordResetSvc(parsed.data); // { ok: true, devCode }
    return res.json(result); // não adicione { ok: true } de novo
  } catch (e: any) {
    return res.status(400).json({ message: e?.message || "Falha ao solicitar reset." });
  }
}

/** POST /auth/reset-password */
export async function resetPasswordCtrl(req: Request, res: Response) {
  const schema = z.object({
    login: z.string().min(3),
    token: z.string().min(4),       // código recebido (6 dígitos no serviço)
    novaSenha: z.string().min(6),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  try {
    const result = await resetPasswordSvc(parsed.data); // { ok: true }
    return res.json(result); // não duplique { ok: true }
  } catch (e: any) {
    return res.status(400).json({ message: e?.message || "Falha ao resetar senha." });
  }
}
