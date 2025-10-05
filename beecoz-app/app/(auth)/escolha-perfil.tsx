import { View, Text, StyleSheet } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Button from "@components/Button";
import { theme } from "@theme";
import { router } from "expo-router";

export default function EscolhaPerfil(){
  return (
    <View style={s.c}>
      <HeaderBack />
      <View style={{padding:16, gap:10}}>
        <Text style={s.h1}>Bem-vindo à <Text style={{color:theme.primary}}>Beecoz</Text>!</Text>
        <Text style={s.p}>Para começar, você se encontra como:</Text>
        <Button title="Cliente" onPress={()=>router.push("/(auth)/cadastro/cliente/nome")}/>
        <Button title="Prestador de serviços" onPress={()=>router.push("/(auth)/cadastro/autonomo/nome")} />
      </View>
    </View>
  );
}
const s=StyleSheet.create({ c:{flex:1,backgroundColor:theme.bg}, h1:{color:theme.text,fontWeight:"800",fontSize:18}, p:{color:theme.sub, marginBottom:8} });

