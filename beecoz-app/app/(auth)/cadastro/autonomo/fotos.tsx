import { View, Text } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Button from "@components/Button";
import { theme } from "@theme";
import { router } from "expo-router";

export default function AutonomoFotos(){
  return (
    <View style={{flex:1,backgroundColor:theme.bg}}>
      <HeaderBack />
      <View style={{padding:16,gap:12}}>
        <Text style={{color:theme.text, fontWeight:"700"}}>Insira fotos de RG/CPF (frente/verso), comprovante de residência e uma selfie nítida.</Text>
        <Text style={{color:theme.sub}}>— aqui vamos integrar o seletor de imagens</Text>
      </View>
      <Button title="Continuar" style={{position:"absolute",left:16,right:16,bottom:16}} onPress={()=>router.push("/(auth)/cadastro/autonomo/cnpj")} />
    </View>
  );
}

