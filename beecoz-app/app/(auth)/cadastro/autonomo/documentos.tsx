import AppBarBack from "@components/AppBarBack";
import ImagePickerField from "@components/ImagePickerField";
import Button from "@components/Button";
import { useCadastro } from "@lib/cadastroStore";
import { View } from "react-native";
import { theme } from "@theme";
import { router } from "expo-router";

export default function AutonomoDocs(){
  const { setAutonomo } = useCadastro();
  let rg = "", comp = "", selfie = "";
  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding:16 }}>
      <AppBarBack title="Envie seus documentos" />
      <ImagePickerField label="Foto do RG ou CPF (frente/verso)" onChange={(u)=> rg = u }/>
      <ImagePickerField label="Comprovante de residência (últimos 3 meses)" onChange={(u)=> comp = u }/>
      <ImagePickerField label="Selfie nítida" onChange={(u)=> selfie = u }/>
      <Button onPress={()=>{ setAutonomo({ docRg: rg, docComp: comp, selfie }); router.push("/cadastro/autonomo/cnpj"); }}
        style={{ position:"absolute", left:16, right:16, bottom:16 }}>Continuar</Button>
    </View>
  );
}
