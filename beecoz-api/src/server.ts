import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
// se já existir, mantenha:
import { extraRoutes } from "./routes/extra.routes";

const app = express();
app.use(cors());
app.use(express.json());

// ROTAS DE AUTH
app.use("/auth", authRoutes);

// OUTRAS ROTAS
app.use(extraRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT) || Number(process.env.APP_PORT) || 3333;
app.listen(port, "0.0.0.0", () => console.log(`API on http://0.0.0.0:${port}`));
