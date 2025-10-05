import { View, Text, TextInput, TextInputProps } from "react-native";
import { THEME } from "../lib/theme";

export function TextField({ label, ...props }: { label: string } & TextInputProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: THEME.colors.text, fontSize: 14, fontWeight: "600" }}>{label}</Text>
      <TextInput
        {...props}
        style={{
          borderWidth: 1,
          borderColor: THEME.colors.border,
          backgroundColor: "#fff",
          borderRadius: THEME.radius.md,
          paddingHorizontal: 12,
          paddingVertical: 12,
          color: THEME.colors.text,
        }}
        placeholderTextColor={THEME.colors.placeholder}
      />
    </View>
  );
}
