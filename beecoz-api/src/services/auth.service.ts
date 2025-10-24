import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";
import { Perfil } from "@prisma/client";
import { normEmail, normPhone } from "../utils/normalize";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const TOKEN_TTL = "7d";

// Bloqueio simples após N tentativas
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 10;

function signToken(userId: number, perfil: Perfil) {
  return jwt.sign({ userId, perfil }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export async function registerUser(input: {
  perfil: Perfil | "CLIENTE" | "AUTONOMO";
  nome: string;
  email?: string;
  telefone?: string;
  senha: string;
}) {
  const email = normEmail(input.email);
  const telefone = normPhone(input.telefone);
  if (!email && !telefone) throw new Error("Informe email ou telefone.");

  const senhaHash = await bcrypt.hash(input.senha, 10);

  const user = await prisma.login.create({
    data: {
      email,
      telefone,
      senhaHash,
      perfil: input.perfil as Perfil,
      Cliente: input.perfil === "CLIENTE" ? { create: { nome: input.nome } } : undefined,
      Autonomo: input.perfil === "AUTONOMO" ? { create: { nome: input.nome } } : undefined,
    },
  });

  const token = signToken(user.id, user.perfil);
  return { token, userId: user.id, perfil: user.perfil };
}

export async function loginUser(input: { login: string; senha: string }) {
  const isEmail = input.login.includes("@");
  const email = isEmail ? normEmail(input.login) : null;
  const telefone = isEmail ? null : normPhone(input.login);

  const user = await prisma.login.findFirst({
    where: {
      OR: [{ email: email ?? undefined }, { telefone: telefone ?? undefined }],
    },
  });

  if (!user) throw new Error("Credenciais inválidas.");

  // lock
  if (user.lockUntil && user.lockUntil > new Date()) {
    const minutes = Math.ceil((+user.lockUntil - Date.now()) / 60000);
    throw new Error(`Conta temporariamente bloqueada. Tente em ${minutes} min.`);
  }

  const ok = await bcrypt.compare(input.senha, user.senhaHash);
  if (!ok) {
    const attempts = (user.failedAttempts ?? 0) + 1;
    let lockUntil: Date | null = null;
    if (attempts >= MAX_ATTEMPTS) {
      lockUntil = new Date(Date.now() + LOCK_MINUTES * 60000);
    }
    await prisma.login.update({
      where: { id: user.id },
      data: { failedAttempts: attempts, lockUntil },
    });
    throw new Error("Credenciais inválidas.");
  }

  // reset contador
  await prisma.login.update({
    where: { id: user.id },
    data: { failedAttempts: 0, lockUntil: null },
  });

  const token = signToken(user.id, user.perfil);
  return { token, userId: user.id, perfil: user.perfil };
}

export async function me(userId: number) {
  const user = await prisma.login.findUnique({ where: { id: userId }, include: { Cliente: true, Autonomo: true } });
  if (!user) throw new Error("Usuário não encontrado.");
  return {
    userId: user.id,
    perfil: user.perfil,
    nome: user.Cliente?.nome ?? user.Autonomo?.nome ?? "",
  };
}
