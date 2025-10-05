import { View, Text, StyleSheet, Switch } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Input from "@components/Input";
import Button from "@components/Button";
import { theme } from "@theme";
import { useState } from "react";
import { router } from "expo-router";

export default function AutonomoContato(){
  const [email,setEmail]=useState(""); const [usaTelefone,setUsaTelefone]=useState(false); const [tel,setTel]=useState("");
  return (
    <View style={s.c}>
      <HeaderBack />
      <View style={s.body}>
        <Text style={s.h1}>Muito bem, <Text style={{color:theme.primary}}>Thiago</Text>!</Text>
        <Text style={s.p}>Informe seu melhor <Text style={{fontWeight:"800"}}>email</Text> ou seu <Text style={{fontWeight:"800"}}>telefone</Text>.</Text>
        <Input placeholder="email@dominio.com" value={email} onChangeText={setEmail}/>
        <View style={{flexDirection:"row",alignItems:"center",gap:8}}>
          <Switch value={usaTelefone} onValueChange={setUsaTelefone}/>
          <Text style={{color:theme.text}}>registrar com meu número</Text>
        </View>
        {usaTelefone && <Input placeholder="(00) 00000-0000" value={tel} onChangeText={setTel}/>}
      </View>
      <Button title="Continuar" style={s.fab} onPress={()=>router.push("/(auth)/cadastro/autonomo/senha")} />
    </View>
  );
}
const s=StyleSheet.create({ c:{flex:1,backgroundColor:theme.bg}, body:{padding:16,gap:12}, h1:{color:theme.text,fontWeight:"800"}, p:{color:theme.sub}, fab:{position:"absolute",left:16,right:16,bottom:16} });

