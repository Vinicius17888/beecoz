import { View, Text } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Input from "@components/Input";
import Button from "@components/Button";
import { theme } from "@theme";
import { useState } from "react";
import { router } from "expo-router";

export default function AutonomoCPF(){
  const [cpf,setCpf]=useState("");
  return (
    <View style={{flex:1,backgroundColor:theme.bg}}>
      <HeaderBack />
      <View style={{padding:16,gap:12}}>
        <Text style={{color:theme.text}}>Falta pouco! Informe seu <Text style={{fontWeight:"800"}}>CPF</Text>:</Text>
        <Input placeholder="000.000.000-00" value={cpf} onChangeText={setCpf}/>
      </View>
      <Button title="Continuar" style={{position:"absolute",left:16,right:16,bottom:16}} onPress={()=>router.push("/(auth)/cadastro/autonomo/fotos")} />
    </View>
  );
}

