import { View, Text, Image, Alert } from "react-native";
import Button from "@components/Button";
import { theme } from "@theme";
import logo from "@assets/logo.png";
import { useCadastro } from "@lib/cadastroStore";
import { apiRegister, apiUpdateAutonomo, apiLogin } from "@lib/api";
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

      let token: string, userId: number, perfil: "CLIENTE" | "AUTONOMO";
      try {
        const res = await apiRegister({
          perfil: "AUTONOMO",
          nome: autonomo.nome,
          email: autonomo.email,
          telefone: autonomo.telefone,
          senha: autonomo.senha,
        });
        ({ token, userId, perfil } = res);
      } catch (e:any) {
        const status = e?.response?.status;
        const msg = String(e?.message || "");
        if (status === 409 || /unique|existe|duplicad/i.test(msg)) {
          const loginId = autonomo.email || autonomo.telefone || "";
          const res = await apiLogin(loginId, autonomo.senha!);
          ({ token, userId, perfil } = res);
        } else {
          throw e;
        }
      }

      setSession(token, userId, perfil as any);

      try {
        await apiUpdateAutonomo(token, {
          nome: autonomo.nome,
          cpf: autonomo.cpf,
          cnpj: autonomo.cnpj,
          area: autonomo.area,
          cidade: autonomo.cidade,
          estado: autonomo.estado,
        });
      } catch {}

      reset();
      router.replace("/(autonomo)");
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
