import { View, Text, StyleSheet } from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import Button from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { theme } from "../../../theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import { useCadastro } from "../../../lib/cadastroStore";
import { nomeSchema } from "../../../lib/validate";

export default function NomeCliente(){
  const { set } = useCadastro();
  const [nome, setNome] = useState("");

  function next(){
    const ok = nomeSchema.safeParse(nome);
    if(!ok.success) return alert(ok.error.issues[0].message);
    set({ nome });
    router.push("/(auth)/cadastro/cliente/contato");
  }

  return (
    <View style={s.c}>
      <HeaderBack />
      <Text style={s.h1}>Bem-vindo à Beecoz!{"\n"}Qual seu nome?</Text>
      <TextField placeholder="Seu nome" value={nome} onChangeText={setNome}/>
      <Button title="Continuar" onPress={next} />
    </View>
  );
}
const s=StyleSheet.create({
  c:{flex:1,backgroundColor:theme.bg,padding:16},
  h1:{color:"#fff",fontSize:18,marginBottom:12}
});
