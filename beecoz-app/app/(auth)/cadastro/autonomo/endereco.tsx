import { View, Text } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Input from "@components/Input";
import Button from "@components/Button";
import { theme } from "@theme";
import { useState } from "react";
import { router } from "expo-router";

export default function AutonomoEndereco(){
  const [uf,setUf]=useState(""); const [cidade,setCidade]=useState("");
  return (
    <View style={{flex:1,backgroundColor:theme.bg}}>
      <HeaderBack />
      <View style={{padding:16,gap:12}}>
        <Text style={{color:theme.text,fontWeight:"800"}}>Agora, informe onde você mora, por gentileza:</Text>
        <Input placeholder="Seu estado" value={uf} onChangeText={setUf}/>
        <Input placeholder="Sua Cidade ou Município" value={cidade} onChangeText={setCidade}/>
      </View>
      <Button title="Continuar" style={{position:"absolute",left:16,right:16,bottom:16}} onPress={()=>router.push("/(auth)/cadastro/autonomo/cpf")} />
    </View>
  );
}

