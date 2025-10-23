import { View, Text, Image, Alert } from "react-native";
import Button from "@components/Button";
import { theme } from "@theme";
import logo from "@assets/logo.png";
import { useCadastro } from "@lib/cadastroStore";
import { apiRegister } from "@lib/api";
import { useAuth } from "@lib/authStore";
import { router } from "expo-router";
import { useState } from "react";

export default function FinalizadoAutonomo(){
  const { autonomo, reset } = useCadastro();
  const { setSession } = useAuth();
  const [loading, setLoading] = useState(false);

  async function concluir() {
    try {
      setLoading(true);
      if(!autonomo.nome || !(autonomo.email || autonomo.telefone) || !autonomo.senha){
        Alert.alert("Dados incompletos", "Preencha nome, email/telefone e senha nas etapas anteriores.");
        return;
      }
      const res = await apiRegister({
        perfil: "AUTONOMO",
        nome: autonomo.nome,
        email: autonomo.email,
        telefone: autonomo.telefone,
        senha: autonomo.senha
      });
      setSession(res.token, res.userId, res.perfil);
      reset();
      router.replace("/(autonomo)");
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
        Revise seus dados. Ao confirmar, sua conta de Autônomo será criada e você irá para a Home do Autônomo.
      </Text>
      <Button onPress={concluir} disabled={loading}>{loading ? "Enviando..." : "Concluir cadastro"}</Button>
    </View>
  );
}
