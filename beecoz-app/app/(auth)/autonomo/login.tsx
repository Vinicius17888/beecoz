// app/(auth)/autonomo/login.tsx
import { router } from "expo-router";
import { useState } from "react";
import { View, Alert } from "react-native";
import { Screen } from "../../../components/Screen";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { BASE_URL } from "../../../lib/api";

export default function LoginAutonomo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin() {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "AUTONOMO" }),
      });
      if (!res.ok) throw new Error(await res.text());
      await res.json();
      router.replace("/(autonomo)"); // home do autônomo (você já tem /index.tsx)
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen title="Login (Autônomo)">
      <View style={{ gap: 12 }}>
        <TextField label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextField label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
        <Button label={loading ? "Entrando..." : "Entrar"} onPress={onLogin} disabled={loading} />
        <Button label="Criar conta como Autônomo" onPress={() => router.push("/(auth)/autonomo/cadastro")} variant="ghost" />
      </View>
    </Screen>
  );
}
