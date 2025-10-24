import { View } from "react-native";
import { theme } from "@theme";
export default function Stepper({ step, total }: { step: number; total: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 6, marginBottom: 16 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i}
          style={{
            height: 6,
            flex: 1,
            borderRadius: 999,
            backgroundColor: i < step ? theme.colors.primary : theme.colors.border
          }}
        />
      ))}
    </View>
  );
}
