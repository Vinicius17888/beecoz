import AppBarBack from "@components/AppBarBack";
import Masked from "@components/Masked";
import Button from "@components/Button";
import { theme } from "@theme";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cpfSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { router } from "expo-router";

export default function AutonomoCPF(){
  const { autonomo, setAutonomo } = useCadastro();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(cpfSchema),
    defaultValues: { cpf: autonomo.cpf || "" }
  });
  const onSubmit = (v:any)=>{ setAutonomo(v); router.push("/cadastro/autonomo/documentos"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Informe seu CPF" />
      <Masked control={control} name="cpf" mask="999.999.999-99" keyboardType="numeric" />
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>
        Continuar
      </Button>
    </View>
  );
}
