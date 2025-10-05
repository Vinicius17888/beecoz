import { View, Text, StyleSheet } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Input from "@components/Input";
import Button from "@components/Button";
import { theme } from "@theme";
import { useState } from "react";
import { router } from "expo-router";

export default function AutonomoNome(){
  const [nome,setNome] = useState("");
  return (
    <View style={s.c}>
      <HeaderBack />
      <View style={s.body}>
        <Text style={s.h1}>Bem-vindo à <Text style={{color:theme.primary}}>Beecoz</Text>!</Text>
        <Text style={s.p}>Para começar, qual <Text style={{fontWeight:"800"}}>seu nome</Text>?</Text>
        <Input value={nome} onChangeText={setNome} placeholder="Seu nome"/>
      </View>
      <Button title="Continuar" style={s.fab} onPress={()=>router.push("/(auth)/cadastro/autonomo/contato")} />
    </View>
  );
}
const s=StyleSheet.create({ c:{flex:1,backgroundColor:theme.bg}, body:{padding:16,gap:12}, h1:{color:theme.text,fontWeight:"800"}, p:{color:theme.sub}, fab:{position:"absolute", left:16, right:16, bottom:16} });

