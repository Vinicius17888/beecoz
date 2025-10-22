import { View, Text, StyleSheet } from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import Button from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { theme } from "../../../theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import { useCadastro } from "../../../lib/cadastroStore";
import { estadoSchema, municipioSchema } from "../../../lib/validate";

export default function EnderecoCliente(){
  const { set } = useCadastro();
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");

  function next(){
    const eok = estadoSchema.safeParse(estado);
    if(!eok.success) return alert(eok.error.issues[0].message);
    const mok = municipioSchema.safeParse(municipio);
    if(!mok.success) return alert(mok.error.issues[0].message);
    set({ estado, municipio });
    router.push("/(auth)/cadastro/cliente/cpf");
  }

  return (
    <View style={s.c}>
      <HeaderBack />
      <Text style={s.h1}>Agora, informe onde você mora, por gentileza:</Text>
      <TextField placeholder="Estado" value={estado} onChangeText={setEstado}/>
      <TextField placeholder="Cidade/Município" value={municipio} onChangeText={setMunicipio}/>
      <Button title="Continuar" onPress={next} />
    </View>
  );
}
const s=StyleSheet.create({
  c:{flex:1,backgroundColor:theme.bg,padding:16},
  h1:{color:"#fff",fontSize:16,marginBottom:12}
});
