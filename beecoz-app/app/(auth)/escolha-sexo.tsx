import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HeaderBack from "@components/HeaderBack";
import { theme } from "@theme";
import { router, useLocalSearchParams } from "expo-router";

export default function EscolhaSexo(){
  const { proxima } = useLocalSearchParams<{proxima:string}>(); // rota de destino
  return (
    <View style={{flex:1,backgroundColor:theme.bg}}>
      <HeaderBack />
      <View style={{padding:16, gap:16}}>
        <Text style={{color:theme.text, fontWeight:"800"}}>Por favor, selecione o seu sexo:</Text>
        <View style={{flexDirection:"row", gap:16}}>
          <TouchableOpacity style={s.box} onPress={()=>router.push(String(proxima))}><Text style={s.t}>♂</Text></TouchableOpacity>
          <TouchableOpacity style={s.box} onPress={()=>router.push(String(proxima))}><Text style={s.t}>♀</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const s = StyleSheet.create({ box:{width:80,height:80,backgroundColor:"#3A3F45",borderRadius:12,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"#4A4F56"}, t:{color:"#fff",fontSize:28} });

