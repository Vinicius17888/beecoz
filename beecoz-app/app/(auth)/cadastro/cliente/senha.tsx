import AppBarBack from "@components/AppBarBack";
import FormField from "@components/FormField";
import Button from "@components/Button";
import { senhaSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { View } from "react-native";
import { theme } from "@theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

export default function ClienteSenha(){
  const { cliente, setCliente } = useCadastro();
  const { control, handleSubmit } = useForm({ resolver: zodResolver(senhaSchema), defaultValues: { senha: cliente.senha || "", senha2: cliente.senha || "" } });
  const onSubmit = (v:any)=>{ setCliente({ senha: v.senha }); router.push("/cadastro/cliente/endereco"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Crie uma senha" />
      <FormField control={control} name="senha"  inputProps={{ placeholder:"******", secureTextEntry:true }}/>
      <FormField control={control} name="senha2" inputProps={{ placeholder:"Repita a senha", secureTextEntry:true }}/>
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>Continuar</Button>
    </View>
  );
}
