import AppBarBack from "@components/AppBarBack";
import Masked from "@components/Masked";
import Button from "@components/Button";
import { theme } from "@theme";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cnpjSchema } from "@lib/schemas";
import { useCadastro } from "@lib/cadastroStore";
import { router } from "expo-router";

export default function AutonomoCNPJ(){
  const { autonomo, setAutonomo } = useCadastro();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(cnpjSchema),
    defaultValues: { cnpj: autonomo.cnpj || "" }
  });
  const onSubmit = (v:any)=>{ setAutonomo(v); router.push("/cadastro/autonomo/area"); };

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="(Opcional) Informe o CNPJ" />
      <Masked control={control} name="cnpj" mask="99.999.999/9999-99" keyboardType="numeric" />
      <Button onPress={handleSubmit(onSubmit)} style={{ position:"absolute", left:16, right:16, bottom:16 }}>
        Continuar
      </Button>
    </View>
  );
}
