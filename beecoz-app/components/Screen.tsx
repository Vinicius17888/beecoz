import { ReactNode } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { THEME } from "../lib/theme";

export function Screen({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.bg }}>
      <View style={{ padding: 20, gap: 16 }}>
        {title ? <Text style={{ fontSize: 24, fontWeight: "700", color: THEME.colors.text }}>{title}</Text> : null}
        <View>{children}</View>
      </View>
    </SafeAreaView>
  );
}
