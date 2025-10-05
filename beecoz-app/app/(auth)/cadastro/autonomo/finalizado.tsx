import { View, Text, Image } from "react-native";
import Button from "@components/Button";
import { router } from "expo-router";
import { theme } from "@theme";

export default function AutonomoFinalizado(){
  return (
    <View style={{flex:1,backgroundColor:theme.bg,justifyContent:"center",alignItems:"center",padding:16}}>
      <Image source={require("@assets/logo.png")} style={{width:96,height:96,marginBottom:16}}/>
      <Text style={{color:theme.text,textAlign:"center",marginBottom:24}}>
        Os dados apresentados estão em análise. Quando analisarmos estes, enviaremos uma mensagem ao e-mail informado no cadastro.
      </Text>
      <Button title="Início" onPress={()=>router.replace("/(autonomo)")}/>
    </View>
  );
}

