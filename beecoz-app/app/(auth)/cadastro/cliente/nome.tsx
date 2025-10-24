import AppBarBack from "@components/AppBarBack";
import FormField from "@components/FormField";
import Button from "@components/Button";
import { theme } from "@theme";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nomeSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { router } from "expo-router";

export default function ClienteNome(){
  const { cliente, setCliente } = useCadastro();
  const { control, handleSubmit } = useForm({ resolver: zodResolver(nomeSchema), defaultValues: { nome: cliente.nome }});
  const onSubmit = (v:any)=>{ setCliente(v); router.push("/cadastro/cliente/contato"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Bem-vindo à Beecoz! Para começar, qual seu nome?" />
      <FormField control={control} name="nome" inputProps={{ placeholder:"Seu nome" }}/>
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>Continuar</Button>
    </View>
  );
}
