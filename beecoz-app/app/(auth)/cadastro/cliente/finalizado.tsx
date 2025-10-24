import { View, Text, Image, Alert } from "react-native";
import Button from "@components/Button";
import { theme } from "@theme";
import logo from "@assets/logo.png";
import { useCadastro } from "@lib/cadastroStore";
import { apiRegister, apiUpdateCliente } from "@lib/api";
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
      if(!cliente.nome || !(cliente.email || cliente.telefone) || !cliente.senha) {
        Alert.alert("Dados incompletos", "Volte e preencha os campos obrigatórios.");
        return;
      }
      // cria login
      const res = await apiRegister({
        perfil: "CLIENTE",
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        senha: cliente.senha
      });
      setSession(res.token, res.userId, res.perfil);
      // completa perfil
      await apiUpdateCliente(res.token, {
        nome: cliente.nome,
        cpf: cliente.cpf,
        cidade: cliente.cidade,
        estado: cliente.estado,
      });
      reset();
      router.replace("/(cliente)");
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
