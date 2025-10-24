import { View, Text, Image, Alert } from "react-native";
import Button from "@components/Button";
import { theme } from "@theme";
import logo from "@assets/logo.png";
import { useCadastro } from "@lib/cadastroStore";
import { apiRegister, apiUpdateAutonomo } from "@lib/api";
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
      if(!autonomo.nome || !(autonomo.email || autonomo.telefone) || !autonomo.senha) {
        Alert.alert("Dados incompletos", "Volte e preencha os campos obrigatórios.");
        return;
      }
      // cria login
      const res = await apiRegister({
        perfil: "AUTONOMO",
        nome: autonomo.nome,
        email: autonomo.email,
        telefone: autonomo.telefone,
        senha: autonomo.senha
      });
      setSession(res.token, res.userId, res.perfil);
      // completa perfil
      await apiUpdateAutonomo(res.token, {
        nome: autonomo.nome,
        cpf: autonomo.cpf,
        cnpj: autonomo.cnpj,
        area: autonomo.area
      });
      reset();
      router.replace("/(autonomo)");
    } catch (e:any) {
      Alert.alert("Falha no cadastro", e?.response?.data?.message ?? "Tente novamente.");
    } finally { setLoading(false); }
  }

  return (
    <View style={{flex:1,backgroundColor:theme.bg,justifyContent:"center",alignItems:"center",padding:16}}>
      <Image source={logo} style={{ width:96, height:96, marginBottom:16 }} />
      <Text style={{ color: theme.text, textAlign:"center", marginBottom: 24 }}>
        Os dados apresentados estão em análise. Quando analisarmos estes, enviaremos uma mensagem ao e-mail informado no cadastro.
      </Text>
      <Button onPress={concluir} disabled={loading}>{loading ? "Enviando..." : "Início"}</Button>
    </View>
  );
}
