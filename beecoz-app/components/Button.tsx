import { TouchableOpacity, Text } from "react-native";
import { THEME } from "../lib/theme";

export function Button({
  label, onPress, disabled, variant = "solid",
}: { label: string; onPress?: () => void; disabled?: boolean; variant?: "solid" | "ghost" }) {
  const solid = variant === "solid";
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: solid ? (disabled ? THEME.colors.muted : THEME.colors.primary) : "transparent",
        paddingVertical: 14,
        borderRadius: THEME.radius.lg,
        alignItems: "center",
        borderWidth: solid ? 0 : 1,
        borderColor: THEME.colors.border,
      }}
    >
      <Text style={{ color: solid ? "#fff" : THEME.colors.text, fontSize: 16, fontWeight: "600" }}>{label}</Text>
    </TouchableOpacity>
  );
}
