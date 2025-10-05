import { View, Text, StyleSheet } from "react-native";
import { theme } from "@theme";
export default function HomeCliente(){
  return <View style={s.c}><Text style={s.h1}>Home do Cliente</Text></View>;
}
const s=StyleSheet.create({
  c:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.bg},
  h1:{fontSize:22,fontWeight:"800",color:"#fff"}
});

