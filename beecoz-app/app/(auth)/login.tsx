import { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Button from "@components/Button";
import { apiLogin } from "@lib/api";
import { useAuth } from "@lib/authStore";
import { useRouter } from "expo-router";
import { theme } from "@theme";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
  const router = useRouter();

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await apiLogin(login.trim(), senha);
      setSession(res.token, res.userId, res.perfil);
      router.replace(res.perfil === "CLIENTE" ? "/(cliente)" : "/(autonomo)");
    } catch (e: any) {
      Alert.alert("Falha no login", e?.response?.data?.message ?? "Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 20, gap: 12, justifyContent:"center" }}>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: "700" }}>Entrar</Text>
      <TextInput style={s.input} placeholder="Email ou telefone" placeholderTextColor="#9AA0A6"
        autoCapitalize="none" value={login} onChangeText={setLogin}/>
      <TextInput style={s.input} placeholder="Senha" placeholderTextColor="#9AA0A6"
        secureTextEntry value={senha} onChangeText={setSenha}/>
      <Button disabled={loading} onPress={onSubmit}>{loading ? "Entrando..." : "Entrar"}</Button>
      <Text style={{ color: "#9AA0A6" }}>Precisa de conta? Vá para o cadastro.</Text>
    </View>
  );
}
const s = { input: { height: 48, borderWidth:1, borderColor:"#2A2A2A", borderRadius:12, paddingHorizontal:12, color:"#fff", backgroundColor:"#141414" } };
