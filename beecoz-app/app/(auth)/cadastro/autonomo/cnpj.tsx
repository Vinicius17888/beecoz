import { View, Text } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Input from "@components/Input";
import Button from "@components/Button";
import { theme } from "@theme";
import { useState } from "react";
import { router } from "expo-router";

export default function AutonomoCNPJ(){
  const [cnpj,setCnpj]=useState("");
  return (
    <View style={{flex:1,backgroundColor:theme.bg}}>
      <HeaderBack />
      <View style={{padding:16,gap:12}}>
        <Text style={{color:theme.text}}>Se for do seu interesse, informe o <Text style={{fontWeight:"800"}}>CNPJ</Text> da sua empresa:</Text>
        <Input placeholder="00.000.000/0001-00" value={cnpj} onChangeText={setCnpj}/>
      </View>
      <Button title="Continuar" style={{position:"absolute",left:16,right:16,bottom:16}} onPress={()=>router.push("/(auth)/cadastro/autonomo/area-atuacao")} />
    </View>
  );
}

