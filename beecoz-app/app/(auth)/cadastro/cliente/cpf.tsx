import { View, Text, StyleSheet } from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import Button from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { theme } from "../../../theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import { useCadastro } from "../../../lib/cadastroStore";
import { cpfSchema } from "../../../lib/validate";

export default function CPFCliente(){
  const { set } = useCadastro();
  const [cpf, setCpf] = useState("");

  function next(){
    const ok = cpfSchema.safeParse(cpf.replace(/\D/g,""));
    if(!ok.success) return alert(ok.error.issues[0].message);
    set({ cpf });
    router.push("/(auth)/cadastro/cliente/finalizado");
  }

  return (
    <View style={s.c}>
      <HeaderBack />
      <Text style={s.h1}>Falta pouco! Informe seu CPF:</Text>
      <TextField placeholder="000.000.000-00" value={cpf} onChangeText={setCpf} keyboardType="number-pad"/>
      <Button title="Continuar" onPress={next} />
    </View>
  );
}
const s=StyleSheet.create({
  c:{flex:1,backgroundColor:theme.bg,padding:16},
  h1:{color:"#fff",fontSize:16,marginBottom:12}
});
