import { View, Text, TouchableOpacity } from "react-native";
import HeaderBack from "@components/HeaderBack";
import Button from "@components/Button";
import { theme } from "@theme";
import { useState } from "react";
import { router } from "expo-router";

const AREAS = ["Marcenaria","Manutenção","Elétrica","Hidráulica","Pintura","Limpeza"];

export default function AutonomoArea(){
  const [sel,setSel]=useState<string[]>([]);
  function toggle(a:string){ setSel(s=> s.includes(a) ? s.filter(x=>x!==a) : [...s,a]); }
  return (
    <View style={{flex:1,backgroundColor:theme.bg}}>
      <HeaderBack />
      <View style={{padding:16,gap:12}}>
        <Text style={{color:theme.text}}>Qual é a sua <Text style={{fontWeight:"800"}}>área de atuação</Text>?</Text>
        {AREAS.map(a=>(
          <TouchableOpacity key={a} onPress={()=>toggle(a)} style={{padding:12,borderRadius:10,backgroundColor:"#3A3F45",borderWidth:2,borderColor: sel.includes(a)? theme.primary:"#4A4F56"}}>
            <Text style={{color:"#fff"}}>{a}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Continuar" style={{position:"absolute",left:16,right:16,bottom:16}} onPress={()=>router.push("/(auth)/cadastro/autonomo/finalizado")} />
    </View>
  );
}

