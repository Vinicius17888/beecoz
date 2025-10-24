import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@theme";
import { router } from "expo-router";

export default function AppBarBack({ title }: { title?: string }) {
  return (
    <View style={{ height: 56, flexDirection: "row", alignItems: "center", gap: 8 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      {!!title && <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>{title}</Text>}
    </View>
  );
}
