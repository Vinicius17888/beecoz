import { View, Text } from "react-native";
import Button from "@components/Button";
import { router } from "expo-router";
import { theme } from "@theme";

export default function CadastroClienteIndex() {
  return (
    <View style={{ flex:1, backgroundColor: theme.bg, justifyContent:"center", alignItems:"center", gap:12, padding:16 }}>
      <Text style={{ color: theme.text, fontSize:18, marginBottom:8 }}>Cadastro do Cliente</Text>
      {/* Troque a rota abaixo para o próximo passo real do seu fluxo */}
      <Button onPress={() => router.push("/cadastro/cliente/finalizado")}>Avançar</Button>
    </View>
  );
}
