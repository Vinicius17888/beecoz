import AppBarBack from "@components/AppBarBack";
import FormField from "@components/FormField";
import Button from "@components/Button";
import { theme } from "@theme";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { senhaSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { router } from "expo-router";

export default function AutonomoSenha(){
  const { autonomo, setAutonomo } = useCadastro();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(senhaSchema),
    defaultValues: { senha: autonomo.senha || "", senha2: autonomo.senha || "" }
  });
  const onSubmit = (v:any)=>{ setAutonomo({ senha: v.senha }); router.push("/cadastro/autonomo/endereco"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Crie uma senha" />
      <FormField control={control} name="senha"  inputProps={{ placeholder:"******", secureTextEntry:true }}/>
      <FormField control={control} name="senha2" inputProps={{ placeholder:"Repita a senha", secureTextEntry:true }}/>
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>
        Continuar
      </Button>
    </View>
  );
}
