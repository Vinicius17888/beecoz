import { API } from "./api";
import { useCadastro } from "./cadastroStore";
import { cadastroClienteSchema, cadastroAutonomoSchema } from "./validate";

export async function submitCliente() {
  const s = useCadastro.getState();
  const parsed = cadastroClienteSchema.parse({
    nome:s.nome, email:s.email, telefone:s.telefone, senha:s.senha,
    estado:s.estado, municipio:s.municipio, cpf:(s.cpf||"").replace(/\D/g,""),
  });
  const { data: reg } = await API.post("/auth/register", {
    email: parsed.email, telefone: parsed.telefone, senha: parsed.senha, perfil: "CLIENTE", nome: parsed.nome,
  });
  await API.post("/clientes", {
    loginId: reg.userId, nome: parsed.nome, genero: s.sexo || null
  });
  return reg;
}

export async function submitAutonomo() {
  const s = useCadastro.getState();
  const parsed = cadastroAutonomoSchema.parse({
    nome:s.nome, email:s.email, telefone:s.telefone, senha:s.senha,
    estado:s.estado, municipio:s.municipio,
    cpf:(s.cpf||"").replace(/\D/g,""),
    cnpj: s.cnpj ? s.cnpj.replace(/\D/g,"") : undefined,
    area: s.area,
  });
  const { data: reg } = await API.post("/auth/register", {
    email: parsed.email, telefone: parsed.telefone, senha: parsed.senha, perfil: "AUTONOMO", nome: parsed.nome,
  });
  await API.post("/autonomos", {
    loginId: reg.userId, nome: parsed.nome, area: parsed.area
  });
  return reg;
}
