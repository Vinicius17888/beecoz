import AppBarBack from "@components/AppBarBack";
import FormField from "@components/FormField";
import Button from "@components/Button";
import { theme } from "@theme";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enderecoSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { router } from "expo-router";

export default function AutonomoEndereco(){
  const { autonomo, setAutonomo } = useCadastro();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(enderecoSchema),
    defaultValues: { estado: autonomo.estado || "", cidade: autonomo.cidade || "" }
  });
  const onSubmit = (v:any)=>{ setAutonomo(v); router.push("/cadastro/autonomo/cpf"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Onde você mora?" />
      <FormField control={control} name="estado" inputProps={{ placeholder:"Seu estado (UF)" }}/>
      <FormField control={control} name="cidade" inputProps={{ placeholder:"Sua cidade" }}/>
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>
        Continuar
      </Button>
    </View>
  );
}
