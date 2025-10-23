import { theme } from "@theme";
import React from "react";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, style, ...rest }: Props) {
  return (
    <View style={s.wrap}>
      {!!label && <Text style={s.label}>{label}</Text>}
      <TextInput
        placeholderTextColor={theme.colors.muted}
        style={[s.input, style]}
        {...rest}
      />
      {!!error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { width: "100%", gap: 6 },
  label: { color: theme.colors.text, fontSize: 14, opacity: 0.9 },
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    backgroundColor: "#141414"
  },
  error: { color: theme.colors.danger, fontSize: 12 }
});
