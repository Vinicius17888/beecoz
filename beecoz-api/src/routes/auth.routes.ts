import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const r = Router();
r.post("/register", AuthController.register);
r.post("/login",    AuthController.login);
r.post("/request-reset", AuthController.requestReset);
r.post("/reset",         AuthController.reset);
export default r;
