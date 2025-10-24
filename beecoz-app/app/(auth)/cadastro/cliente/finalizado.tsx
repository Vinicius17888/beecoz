import { View, Text, Image, Alert } from "react-native";
import Button from "@components/Button";
import { theme } from "@theme";
import logo from "@assets/logo.png";
import { useCadastro } from "@lib/cadastroStore";
import { apiRegister, apiUpdateCliente, apiLogin } from "@lib/api";
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

      let token: string, userId: number, perfil: "CLIENTE" | "AUTONOMO";
      try {
        // 1) Tenta cadastrar
        const res = await apiRegister({
          perfil: "CLIENTE",
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          senha: cliente.senha,
        });
        ({ token, userId, perfil } = res);
      } catch (e: any) {
        const status = e?.response?.status;
        const msg = String(e?.message || "");
        // 2) Se já existe, faz login automático
        if (status === 409 || /unique|existe|duplicad/i.test(msg)) {
          const loginId = cliente.email || cliente.telefone || "";
          const res = await apiLogin(loginId, cliente.senha!);
          ({ token, userId, perfil } = res);
        } else {
          throw e;
        }
      }

      setSession(token, userId, perfil as any);

      // 3) Completa perfil (não é obrigatório, mas bom salvar)
      try {
        await apiUpdateCliente(token, {
          nome: cliente.nome,
          cpf: cliente.cpf,
          cidade: cliente.cidade,
          estado: cliente.estado,
        });
      } catch {}

      reset();
      router.replace("/(cliente)");
    } catch (e:any) {
      Alert.alert("Falha no cadastro", e?.message || "Tente novamente.");
    } finally { setLoading(false); }
  }

  return (
    <View style={{flex:1,backgroundColor:theme.bg,justifyContent:"center",alignItems:"center",padding:16}}>
      <Image source={logo} style={{ width:96, height:96, marginBottom:16 }} />
      <Text style={{ color: theme.text, textAlign:"center", marginBottom: 24 }}>
        Tudo pronto! Clique em “Início” para entrar no app.
      </Text>
      <Button onPress={concluir} disabled={loading}>{loading ? "Enviando..." : "Início"}</Button>
    </View>
  );
}
