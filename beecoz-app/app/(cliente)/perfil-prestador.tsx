import { View, Text } from "react-native";
import { Screen } from "@components/Screen";
import { Button } from "@components/Button";
import { router } from "expo-router";

export default function PerfilPrestador() {
  return (
    <Screen title="Perfil do Prestador">
      <View style={{ gap: 8 }}>
        <Text>Nome do profissional • Nível • Avaliações • Portfólio</Text>
        <Button label="Solicitar Atendimento" onPress={() => router.push("/chat-interno")} />
      </View>
    </Screen>
  );
}

