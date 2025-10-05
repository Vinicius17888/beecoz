import bcrypt from "bcrypt";
import crypto from "crypto";
export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);
export const comparePassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);
export const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
export const randomToken = (len = 32) => crypto.randomBytes(len).toString("hex");
