import { View, Text } from "react-native";
import { Screen } from "../../components/Screen";

export default function AutonomoHome() {
  return (
    <Screen title="Início (Autônomo)">
      <View style={{ gap: 8 }}>
        <Text>Oportunidades e ações do autônomo.</Text>
      </View>
    </Screen>
  );
}
