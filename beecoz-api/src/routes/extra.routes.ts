import { Router } from "express";
import { prisma } from "../prisma/client";
export const extraRoutes = Router();

extraRoutes.post("/clientes", async (req,res)=>{
  try{
    const { loginId, nome, genero } = req.body;
    const cli = await prisma.cliente.create({ data:{ loginId, nome, genero: genero ?? null } });
    res.json(cli);
  }catch(e:any){ res.status(400).json({ error: e.message }); }
});

extraRoutes.post("/autonomos", async (req,res)=>{
  try{
    const { loginId, nome, area } = req.body;
    const aut = await prisma.autonomo.create({ data:{ loginId, nome, area: area ?? null } });
    res.json(aut);
  }catch(e:any){ res.status(400).json({ error: e.message }); }
});
