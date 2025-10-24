import AppBarBack from "@components/AppBarBack";
import FormField from "@components/FormField";
import Button from "@components/Button";
import { enderecoSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { View } from "react-native";
import { theme } from "@theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

export default function ClienteEndereco(){
  const { cliente, setCliente } = useCadastro();
  const { control, handleSubmit } = useForm({ resolver: zodResolver(enderecoSchema), defaultValues: { estado: cliente.estado || "", cidade: cliente.cidade || "" } });
  const onSubmit = (v:any)=>{ setCliente(v); router.push("/cadastro/cliente/cpf"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Informe onde você mora" />
      <FormField control={control} name="estado" inputProps={{ placeholder:"Seu estado (UF)" }}/>
      <FormField control={control} name="cidade" inputProps={{ placeholder:"Sua cidade" }}/>
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>Continuar</Button>
    </View>
  );
}
