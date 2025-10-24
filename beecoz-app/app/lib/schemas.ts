import { z } from "zod";
export const nomeSchema = z.object({ nome: z.string().min(2, "Informe seu nome completo") });

export const contatoSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  telefone: z.string().min(10, "Telefone inválido").optional(),
}).refine(v => v.email || v.telefone, { message: "Informe email ou telefone" });

export const senhaSchema = z.object({
  senha: z.string().min(6, "Mínimo 6 caracteres"),
  senha2: z.string().min(6, "Confirme a senha"),
}).refine(v => v.senha === v.senha2, { message: "Senhas não conferem", path: ["senha2"] });

export const enderecoSchema = z.object({
  estado: z.string().min(2, "UF inválida"),
  cidade: z.string().min(2, "Cidade obrigatória"),
});
export const cpfSchema  = z.object({ cpf: z.string().min(11, "CPF inválido") });
export const cnpjSchema = z.object({ cnpj: z.string().min(14, "CNPJ inválido") });
