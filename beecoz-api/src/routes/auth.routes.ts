import { Router } from "express";
import { PrismaClient, Perfil } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { requireAuth } from "../middlewares/auth";

const prisma = new PrismaClient();
const router = Router();

const sign = (payload: object) =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "30d" });

// POST /auth/register
router.post("/register", async (req, res) => {
  const schema = z.object({
    email: z.string().email().optional(),
    telefone: z.string().min(8).optional(),
    senha: z.string().min(6),
    perfil: z.enum(["CLIENTE", "AUTONOMO"]),
    nome: z.string().min(2),
  }).refine(v => v.email || v.telefone, { message: "Informe email ou telefone" });

  const body = schema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ message: body.error.issues[0].message });

  const { email, telefone, senha, perfil, nome } = body.data;

  const exists = await prisma.login.findFirst({
    where: { OR: [{ email: email ?? undefined }, { telefone: telefone ?? undefined }] }
  });
  if (exists) return res.status(409).json({ message: "Login já existe" });

  const senhaHash = await bcrypt.hash(senha, 10);
  const login = await prisma.login.create({
    data: { email, telefone, senhaHash, perfil: perfil as Perfil }
  });

  if (perfil === "CLIENTE") {
    await prisma.cliente.create({ data: { loginId: login.id, nome } });
  } else {
    await prisma.autonomo.create({ data: { loginId: login.id, nome } });
  }

  const token = sign({ userId: login.id, perfil });
  return res.json({ token, userId: login.id, perfil });
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const schema = z.object({
    login: z.string().min(3), // email OU telefone
    senha: z.string().min(6),
  });
  const body = schema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ message: body.error.issues[0].message });

  const { login, senha } = body.data;

  const user = await prisma.login.findFirst({
    where: { OR: [{ email: login }, { telefone: login }] }
  });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const ok = await bcrypt.compare(senha, user.senhaHash);
  if (!ok) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = sign({ userId: user.id, perfil: user.perfil });
  return res.json({ token, userId: user.id, perfil: user.perfil });
});

// GET /auth/me
router.get("/me", requireAuth, async (req, res) => {
  const { userId, perfil } = (req as any).user as { userId: number; perfil: Perfil };

  if (perfil === "CLIENTE") {
    const c = await prisma.cliente.findUnique({ where: { loginId: userId } });
    return res.json({ userId, perfil, nome: c?.nome ?? null });
  } else {
    const a = await prisma.autonomo.findUnique({ where: { loginId: userId } });
    return res.json({ userId, perfil, nome: a?.nome ?? null });
  }
});

export default router;
