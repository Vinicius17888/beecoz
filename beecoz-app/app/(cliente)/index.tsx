import { View, Text } from "react-native";
import { Screen } from "../../components/Screen";

export default function ClienteHome() {
  return (
    <Screen title="Início (Cliente)">
      <View style={{ gap: 8 }}>
        <Text>Feed de publicações, filtros e ações do cliente.</Text>
      </View>
    </Screen>
  );
}
