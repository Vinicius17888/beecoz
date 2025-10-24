import { z } from "zod";

export const nomeSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo")
});

export const contatoSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  telefone: z.string().min(10, "Informe um telefone válido").optional()
}).refine(v => v.email || v.telefone, { message: "Informe email ou telefone" });

export const enderecoSchema = z.object({
  cep: z.string().min(8, "CEP inválido"),
  endereco: z.string().min(3, "Endereço obrigatório"),
  cidade: z.string().min(2, "Cidade obrigatória"),
  uf: z.string().min(2, "UF inválida")
});

export const docClienteSchema = z.object({
  cpf: z.string().min(11, "CPF inválido")
});

export const docAutonomoSchema = z.object({
  cnpj: z.string().min(14, "CNPJ inválido")
});

export const senhaSchema = z.object({
  senha: z.string().min(6, "Mínimo 6 caracteres"),
  senha2: z.string().min(6, "Confirmação necessária")
}).refine(v => v.senha === v.senha2, { message: "Senhas não conferem", path: ["senha2"] });
