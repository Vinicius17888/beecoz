import jwt from "jsonwebtoken";

const SECRET = (process.env.JWT_SECRET ?? "dev-secret") as jwt.Secret;

export function signJwt(payload: object, expiresIn: string | number = "7d") {
  return jwt.sign(payload, SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, SECRET) as T;
}
