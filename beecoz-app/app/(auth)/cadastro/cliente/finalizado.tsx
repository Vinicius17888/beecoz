import { View, Text, Image, Alert } from "react-native";
import Button from "@components/Button";
import { theme } from "@theme";
import logo from "@assets/logo.png";
import { useCadastro } from "@lib/cadastroStore";
import { apiRegister } from "@lib/api";
import { useAuth } from "@lib/authStore";
import { router } from "expo-router";
import { useState } from "react";

export default function FinalizadoCliente(){
  const { cliente, reset } = useCadastro();
  const { setSession } = useAuth();
  const [loading, setLoading] = useState(false);

  async function concluir() {
    try {
      setLoading(true);
      if(!cliente.nome || !(cliente.email || cliente.telefone) || !cliente.senha){
        Alert.alert("Dados incompletos", "Preencha nome, email/telefone e senha nas etapas anteriores.");
        return;
      }
      const res = await apiRegister({
        perfil: "CLIENTE",
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        senha: cliente.senha
      });
      setSession(res.token, res.userId, res.perfil);
      reset();
      router.replace("/(cliente)");
    } catch (e: any) {
      Alert.alert("Falha no cadastro", e?.response?.data?.message ?? "Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{flex:1,backgroundColor:theme.bg,justifyContent:"center",alignItems:"center",padding:16}}>
      <Image source={logo} style={{width:96,height:96,marginBottom:16}}/>
      <Text style={{color:theme.text,textAlign:"center",marginBottom:24}}>
        Revise seus dados. Quando confirmar, criaremos sua conta e você será direcionado à Home do Cliente.
      </Text>
      <Button onPress={concluir} disabled={loading}>{loading ? "Enviando..." : "Concluir cadastro"}</Button>
    </View>
  );
}
