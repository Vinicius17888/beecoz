import { Router } from "express";
import { z } from "zod";
import { registerUser, loginUser, me } from "../services/auth.service";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/register", async (req, res) => {
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
    const result = await registerUser(parsed.data);
    return res.json(result);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  const schema = z.object({ login: z.string().min(3), senha: z.string().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

  try {
    const result = await loginUser(parsed.data);
    return res.json(result);
  } catch (e: any) {
    return res.status(401).json({ message: e.message });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const { userId } = (req as any).user as { userId: number };
    const data = await me(userId);
    return res.json(data);
  } catch (e: any) {
    return res.status(401).json({ message: e.message });
  }
});

export default router;
