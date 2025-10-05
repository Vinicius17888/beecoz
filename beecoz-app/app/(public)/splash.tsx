import { Image, View, Text, StyleSheet } from "react-native";
import Button from "@components/Button";
import { Link, router } from "expo-router";
import { theme } from "@theme";

export default function Splash(){
  return (
    <View style={s.c}>
      <Image source={require("@assets/logo.png")} style={{width:120,height:120,marginBottom:24}} />
      <View style={{gap:8, width:"100%"}}>
        <Button title="Entrar" onPress={()=>router.push("/(auth)/login")} />
        <Link href="/(auth)/escolha-perfil" style={s.link}>Criar conta</Link>
      </View>
    </View>
  );
}
const s=StyleSheet.create({
  c:{ flex:1, backgroundColor:theme.bg, alignItems:"center", justifyContent:"center", padding:24 },
  link:{ color: theme.text, textAlign:"center", marginTop:8 }
});

