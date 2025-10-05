import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "@lib/api";

const C = {
  bg: "#2E3137",
  card: "#3B3F45",
  yellow: "#F1B82D",
  text: "#EAECEF",
  sub: "#9AA3AD",
};

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onLogin() {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: login, password: senha }),
      });
      if (!res.ok) throw new Error(await res.text());
      await res.json();
      router.replace("/(public)/login-e-cadastro"); // depois do login, vai para a escolha Cliente/Prestador
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Não foi possível entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.bg }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 42 }}>
        {/* Logo (placeholder) */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Text style={{ fontSize: 52 }}>🐝</Text>
        </View>

        {/* Campos */}
        <View style={{ gap: 12 }}>
          <View style={{ backgroundColor: C.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 14 }}>
            <TextInput
              placeholder="Seu login"
              placeholderTextColor={C.sub}
              value={login}
              onChangeText={setLogin}
              autoCapitalize="none"
              style={{ color: C.text, fontSize: 16 }}
            />
          </View>

          <View style={{ backgroundColor: C.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 14 }}>
            <TextInput
              placeholder="Sua senha"
              placeholderTextColor={C.sub}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              style={{ color: C.text, fontSize: 16 }}
            />
          </View>

          {/* Lembrar de mim / Esqueceu */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Switch value={lembrar} onValueChange={setLembrar} thumbColor={lembrar ? C.yellow : "#EEE"} />
              <Text style={{ color: C.sub }}>Lembrar de mim</Text>
            </View>
            <Text style={{ color: C.sub }}>Esqueceu a senha?</Text>
          </View>

          {/* Botão Login */}
          <TouchableOpacity
            onPress={onLogin}
            disabled={loading}
            style={{ backgroundColor: C.yellow, height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 8 }}
          >
            <Text style={{ color: "#1B1B1B", fontWeight: "700", fontSize: 16 }}>{loading ? "Entrando..." : "Login"}</Text>
          </TouchableOpacity>
        </View>

        {/* Social */}
        <View style={{ marginTop: 18, flexDirection: "row", justifyContent: "center", gap: 12 }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: C.card, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 }}>
            <Ionicons name="logo-facebook" size={18} color={C.text} />
            <Text style={{ color: C.text }}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: C.card, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 }}>
            <Ionicons name="logo-google" size={18} color={C.text} />
            <Text style={{ color: C.text }}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

