﻿import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "beecoz-api" }));
app.use("/auth", authRoutes);

export default app;
