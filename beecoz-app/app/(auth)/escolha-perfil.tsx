import { View, Text } from "react-native";
import Button from "@components/Button";
import { router } from "expo-router";
import { theme } from "@theme";

export default function EscolhaPerfil() {
  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 20, gap: 16, justifyContent:"center" }}>
      <Text style={{ color: theme.text, ...theme.typography.h1, marginBottom: 8 }}>Bem-vindo à <Text style={{ color: theme.colors.primary }}>Beecoz!</Text></Text>
      <Text style={{ color: theme.colors.muted, marginBottom: 16 }}>Para começar, você se encontra como:</Text>

      <Button onPress={() => router.push("/cadastro/cliente/nome")} style={{ backgroundColor: "#000", borderWidth:1, borderColor: theme.colors.primary }}>
        <Text style={{ color: theme.colors.text, fontWeight:"700" }}>Cliente</Text>
      </Button>
      <Button onPress={() => router.push("/cadastro/autonomo/nome")}>Prestador de serviços</Button>

      <Text style={{ color: theme.colors.muted, marginTop: 12 }}>
        Já tem uma conta? <Text onPress={() => router.push("/login")} style={{ color: "#8ad7ff" }}>Faça login!</Text>
      </Text>
    </View>
  );
}
