import AppBarBack from "@components/AppBarBack";
import FormField from "@components/FormField";
import Button from "@components/Button";
import { theme } from "@theme";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contatoSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { router } from "expo-router";

export default function AutonomoContato(){
  const { autonomo, setAutonomo } = useCadastro();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(contatoSchema),
    defaultValues: { email: autonomo.email || "", telefone: autonomo.telefone || "" }
  });
  const onSubmit = (v:any)=>{ setAutonomo(v); router.push("/cadastro/autonomo/senha"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Informe seu e-mail ou telefone" />
      <FormField control={control} name="email" inputProps={{ placeholder:"email@exemplo.com", autoCapitalize:"none", keyboardType:"email-address" }}/>
      <FormField control={control} name="telefone" inputProps={{ placeholder:"(00) 00000-0000", keyboardType:"phone-pad" }}/>
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>
        Continuar
      </Button>
    </View>
  );
}
