import { View, Text, StyleSheet } from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import Button from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { theme } from "../../../theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import { useCadastro } from "../../../lib/cadastroStore";
import { contatoClienteSchema } from "../../../lib/validate";

export default function ContatoCliente(){
  const { set } = useCadastro();
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  function next() {
    try {
      const payload = { email: email.trim(), telefone: telefone.trim() };
      const ok = contatoClienteSchema.safeParse(payload);
      if (!ok.success) {
        alert(ok.error.issues[0].message);
        return;
      }
      // usa os dados normalizados ("" vira undefined)
      set({ email: ok.data.email, telefone: ok.data.telefone });
      router.push("./senha");
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? "Falha ao validar contato");
    }
  }


  return (
    <View style={s.c}>
      <HeaderBack />
      <Text style={s.h1}>Informe seu e-mail, ou se preferir, seu telefone celular.</Text>
      <TextField placeholder="email@dominio.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
      <TextField placeholder="(00) 00000-0000" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad"/>
      <Button title="Continuar" onPress={next} />
    </View>
  );
}
const s=StyleSheet.create({
  c:{flex:1,backgroundColor:theme.bg,padding:16},
  h1:{color:"#fff",fontSize:16,marginBottom:12}
});
