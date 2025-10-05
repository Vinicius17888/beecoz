import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
function HeaderBack({ title }:{title?:string}){
  const r = useRouter();
  return (
    <View style={s.h}>
      <TouchableOpacity onPress={()=>r.back()}><Text style={s.arrow}>←</Text></TouchableOpacity>
      <Text style={s.t}>{title}</Text>
      <View style={{width:24}}/>
    </View>
  );
}
const s = StyleSheet.create({
  h:{ flexDirection:"row", alignItems:"center", gap:8, padding:16 },
  arrow:{ color: "#fff", fontSize:20 }, t:{ color:"#fff", fontWeight:"700", fontSize:16 }
});
export { HeaderBack };
export default HeaderBack;

