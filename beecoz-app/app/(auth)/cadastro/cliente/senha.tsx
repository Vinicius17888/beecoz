import { View, Text, StyleSheet } from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import Button from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { theme } from "../../../theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import { useCadastro } from "../../../lib/cadastroStore";
import { senhaSchema } from "../../../lib/validate";

export default function SenhaCliente(){
  const { set } = useCadastro();
  const [senha, setSenha] = useState("");

  function next(){
    const ok = senhaSchema.safeParse(senha);
    if(!ok.success) return alert(ok.error.issues[0].message);
    set({ senha });
    router.push("./endereco"); // navegação RELATIVA
  }

  return (
    <View style={s.c}>
      <HeaderBack />
      <Text style={s.h1}>Crie uma senha</Text>
      <TextField placeholder="Sua senha" value={senha} onChangeText={setSenha} secureTextEntry/>
      <Button title="Continuar" onPress={next} />
    </View>
  );
}
const s=StyleSheet.create({
  c:{flex:1,backgroundColor:theme.bg,padding:16},
  h1:{color:"#fff",fontSize:16,marginBottom:12}
});
