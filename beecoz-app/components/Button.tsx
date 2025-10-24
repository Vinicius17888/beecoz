import { theme } from "@theme";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";

export default function Button({ children, style, ...rest }: TouchableOpacityProps & { children: React.ReactNode }) {
  return (
    <TouchableOpacity style={[s.btn, style]} activeOpacity={0.92} {...rest}>
      <Text style={s.txt}>{children}</Text>
    </TouchableOpacity>
  );
}
const s = StyleSheet.create({
  btn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  txt: { color: "#0B0B0B", fontWeight: "700" },
});
