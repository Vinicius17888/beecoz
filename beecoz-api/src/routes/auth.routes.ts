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
    const msg = String(e?.message || "");
    // Prisma unique (P2002) ou mensagens de duplicidade
    if (msg.includes("P2002") || /unique|existe|duplicad/i.test(msg)) {
      return res.status(409).json({ message: "Já existe uma conta com esse e-mail ou telefone." });
    }
    return res.status(400).json({ message: msg || "Falha no cadastro." });
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
    return res.status(401).json({ message: e.message || "Credenciais inválidas." });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const { userId } = (req as any).user as { userId: number };
    const data = await me(userId);
    return res.json(data);
  } catch (e: any) {
    return res.status(401).json({ message: e.message || "Não autorizado." });
  }
});

export default router;
