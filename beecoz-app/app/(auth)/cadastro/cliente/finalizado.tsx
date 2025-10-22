import { View, Text, Image, StyleSheet, Alert } from "react-native";
import Button from "../../../components/Button";
import { theme } from "../../../theme/theme";
import { router } from "expo-router";
import { submitCliente } from "../../../lib/submit";

export default function FinalizadoCliente(){
  async function handleSubmit(){
    try{
      await submitCliente();
      Alert.alert("Tudo certo!","Cadastro enviado para análise.");
      router.replace("/(public)/login-e-cadastro");
    }catch(e:any){ Alert.alert("Erro", e?.message ?? "Falha ao enviar cadastro"); }
  }
  return (
    <View style={s.c}>
      <Image source={require("../../../assets/logo.png")} style={{width:96,height:96,marginBottom:16}}/>
      <Text style={s.txt}>Os dados foram enviados para análise.</Text>
      <Button title="Enviar cadastro" onPress={handleSubmit}/>
    </View>
  );
}
const s=StyleSheet.create({ c:{flex:1,backgroundColor:theme.bg,alignItems:"center",justifyContent:"center",padding:16},
  txt:{color:theme.text,textAlign:"center",marginBottom:24} });
