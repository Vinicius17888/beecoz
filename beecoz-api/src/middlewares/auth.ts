import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Token ausente" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; perfil: "CLIENTE" | "AUTONOMO" };
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
