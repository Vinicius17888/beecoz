import { View, Text } from "react-native";
import Button from "@components/Button";
import { router } from "expo-router";
import { theme } from "@theme";

export default function CadastroAutonomoIndex() {
  return (
    <View style={{ flex:1, backgroundColor: theme.bg, justifyContent:"center", alignItems:"center", gap:12, padding:16 }}>
      <Text style={{ color: theme.text, fontSize:18, marginBottom:8 }}>Cadastro do Autônomo</Text>
      {/* Se o próximo passo for CNPJ, navegue para lá */}
      <Button onPress={() => router.push("/cadastro/autonomo/cnpj")}>Avançar</Button>
    </View>
  );
}
