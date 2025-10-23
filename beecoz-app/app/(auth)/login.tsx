import { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import Button from "../components/Button";
import { apiLogin } from "../lib/api";
import { useAuth } from "../lib/authStore";
import { useRouter } from "expo-router";

export default function Login() {
  const [login, setLogin] = useState("");   // email OU telefone
  const [senha, setSenha] = useState("");
  const { setSession } = useAuth();
  const router = useRouter();

  async function onSubmit() {
    try {
      const res = await apiLogin(login, senha);
      setSession(res.token, res.userId, res.perfil);
      router.replace(res.perfil === "CLIENTE" ? "/(cliente)" : "/(autonomo)");
    } catch (e: any) {
      Alert.alert("Erro", e?.response?.data?.message || "Falha no login");
    }
  }

  return (
    <View style={{ flex:1, padding:20, justifyContent:"center", gap:12 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:8 }}>Entrar</Text>
      <TextInput
        placeholder="Email ou telefone"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:12 }}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{ borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:12 }}
        value={senha}
        onChangeText={setSenha}
      />
      <Button onPress={onSubmit}>Entrar</Button>
      <Text style={{ color:"#666", marginTop:8 }}>Ainda não tem conta? Faça seu cadastro na próxima tela.</Text>
    </View>
  );
}
