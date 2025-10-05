import express from "express";
import cors from "cors";

const app = express();
app.use(cors());               // libera acesso de outros dispositivos
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

// exemplo (src/server.ts ou similar)
app.listen(Number(process.env.APP_PORT) || 3333, "0.0.0.0", () => {
  console.log("API on 0.0.0.0:3333");
});

