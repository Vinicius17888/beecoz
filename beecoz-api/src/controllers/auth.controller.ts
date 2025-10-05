import { Request, Response } from "express";
import { register, login, requestPasswordReset, resetPassword } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { email, telefone, senha, perfil, nome } = req.body;
      const result = await register({ email, telefone, senha, perfil, nome });
      res.status(201).json(result);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  },
  async login(req: Request, res: Response) {
    try {
      const { login: loginField, senha } = req.body;
      const result = await login({ login: loginField, senha });
      res.json(result);
    } catch (e: any) { res.status(401).json({ error: e.message }); }
  },
  async requestReset(req: Request, res: Response) {
    try {
      const { identifier } = req.body;
      const result = await requestPasswordReset(identifier);
      res.json({ ok: true, ...(result ?? {}) });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  },
  async reset(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      await resetPassword(token, newPassword);
      res.json({ ok: true });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  }
};
