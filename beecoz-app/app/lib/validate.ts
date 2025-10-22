import { z } from "zod";

// helper que transforma "" -> undefined e aplica o schema opcional
const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), schema.optional());

// campos básicos
export const emailSchema = z.string().email("E-mail inválido");
export const nomeSchema = z.string().min(2, "Informe seu nome");
export const senhaSchema = z.string().min(6, "Mínimo 6 caracteres");
export const cpfSchema = z.string().regex(/^\d{11}$/, "CPF inválido");
export const estadoSchema = z.string().min(2, "Informe o estado");
export const municipioSchema = z.string().min(2, "Informe o município");

// contato: e-mail OU telefone
const emailOpt = emptyToUndefined(emailSchema);
const telefoneOpt = emptyToUndefined(z.string());

export const contatoClienteSchema = z.object({
  email: emailOpt,
  telefone: telefoneOpt,
}).refine((v) => !!v.email || !!v.telefone, { message: "Informe e-mail ou telefone" });

export const cadastroClienteSchema = z.object({
  nome: nomeSchema,
  email: emailOpt,
  telefone: telefoneOpt,
  senha: senhaSchema,
  estado: estadoSchema,
  municipio: municipioSchema,
  cpf: cpfSchema,
}).refine((v) => !!v.email || !!v.telefone, { message: "Informe e-mail ou telefone" });

// AUTÔNOMO (mesma ideia)
export const cadastroAutonomoSchema = z.object({
  nome: nomeSchema,
  email: emailOpt,
  telefone: telefoneOpt,
  senha: senhaSchema,
  estado: estadoSchema,
  municipio: municipioSchema,
  cpf: cpfSchema,
  cnpj: emptyToUndefined(z.string()),
  area: z.string().min(2, "Informe sua área"),
}).refine((v) => !!v.email || !!v.telefone, { message: "Informe e-mail ou telefone" });
