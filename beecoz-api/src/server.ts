import 'dotenv/config';
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT) || Number(process.env.APP_PORT) || 3333;
app.listen(port, "0.0.0.0", () => {
  console.log(`API on 0.0.0.0:${port}`);
});
