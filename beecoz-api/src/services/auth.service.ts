import { Perfil } from "@prisma/client";
import { prisma } from "../prisma/client";
import { comparePassword, hashPassword, randomToken, sha256 } from "../utils/crypto";
import { signJwt } from "../utils/jwt";

const LOCK_MINUTES = 10;
const MAX_FAILS = 5;

export async function register(data: {
  email?: string; telefone?: string; senha: string; perfil: Perfil; nome: string;
}) {
  if (!data.email && !data.telefone) throw new Error("Informe email ou telefone.");
  const exists = await prisma.login.findFirst({ where: { OR: [{ email: data.email }, { telefone: data.telefone }] } });
  if (exists) throw new Error("Já existe usuário com esse email/telefone.");

  const senhaHash = await hashPassword(data.senha);
  const login = await prisma.login.create({
    data: { email: data.email, telefone: data.telefone, senhaHash, perfil: data.perfil }
  });

  if (data.perfil === "CLIENTE") {
    await prisma.cliente.create({ data: { loginId: login.id, nome: data.nome } });
  } else {
    await prisma.autonomo.create({ data: { loginId: login.id, nome: data.nome } });
  }

  const token = signJwt({ sub: login.id, perfil: login.perfil });
  return { token, userId: login.id, perfil: login.perfil };
}

export async function login({ login, senha }: { login: string; senha: string; }) {
  const where = login.includes("@") ? { email: login } : { telefone: login };
  const user = await prisma.login.findFirst({ where });
  if (!user) throw new Error("Credenciais inválidas.");

  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new Error("Conta temporariamente bloqueada. Tente novamente mais tarde.");
  }

  const ok = await comparePassword(senha, user.senhaHash);
  if (!ok) {
    const fails = user.failedAttempts + 1;
    const lockUntil = fails >= MAX_FAILS ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000) : null;
    await prisma.login.update({ where: { id: user.id }, data: { failedAttempts: fails, lockUntil } });
    throw new Error("Credenciais inválidas.");
  }

  await prisma.login.update({ where: { id: user.id }, data: { failedAttempts: 0, lockUntil: null } });
  const token = signJwt({ sub: user.id, perfil: user.perfil });
  return { token, userId: user.id, perfil: user.perfil };
}

export async function requestPasswordReset(identifier: string) {
  const where = identifier.includes("@") ? { email: identifier } : { telefone: identifier };
  const user = await prisma.login.findFirst({ where });
  if (!user) return;

  const raw = randomToken(32);
  const tokenHash = sha256(raw);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordReset.create({ data: { loginId: user.id, tokenHash, expiresAt } });
  // Em produção: enviar "raw" por email/SMS. Para testes locais retornamos:
  return { resetToken: raw };
}

export async function resetPassword(rawToken: string, newPassword: string) {
  const tokenHash = sha256(rawToken);
  const pr = await prisma.passwordReset.findFirst({
    where: { tokenHash, used: false, expiresAt: { gt: new Date() } }
  });
  if (!pr) throw new Error("Token inválido ou expirado.");

  await prisma.$transaction([
    prisma.passwordReset.update({ where: { id: pr.id }, data: { used: true } }),
    prisma.login.update({ where: { id: pr.loginId }, data: { senhaHash: await hashPassword(newPassword) } })
  ]);
}
