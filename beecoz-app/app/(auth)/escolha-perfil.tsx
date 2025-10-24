import { View, Text } from "react-native";
import Button from "@components/Button";
import { router } from "expo-router";
import { theme } from "@theme";

export default function EscolhaPerfil() {
  return (
    <View style={{ flex:1, backgroundColor: theme.bg, justifyContent:"center", alignItems:"center", gap:16, padding:24 }}>
      <Text style={{ color: theme.text, fontSize:22, fontWeight:"700" }}>Como deseja usar?</Text>

      {/* sem o grupo na URL */}
      <Button onPress={() => router.push("/cadastro/cliente")}>Sou Cliente</Button>
      <Button onPress={() => router.push("/cadastro/autonomo")}>Sou Autônomo</Button>
    </View>
  );
}
