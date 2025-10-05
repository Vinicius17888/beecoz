import { View, Text } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { router } from "expo-router";

export default function TelaInicialCliente() {
  return (
    <Screen title="Tela Inicial do Cliente">
      <View style={{ gap: 12 }}>
        <Text>Busca de serviço, filtros e acesso ao modo Beecoz Queen.</Text>
        <Button label="Ver Perfil do Prestador" onPress={() => router.push("/(cliente)/perfil-prestador")} />
        <Button label="Abrir Chat Interno" onPress={() => router.push("/chat-interno")} variant="ghost" />
      </View>
    </Screen>
  );
}
