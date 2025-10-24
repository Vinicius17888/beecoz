import { Controller, Control } from "react-hook-form";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";
import { theme } from "@theme";

type Props = { control: Control<any>; name: string; label?: string; inputProps?: TextInputProps };

export default function FormField({ control, name, label, inputProps }: Props) {
  return (
    <Controller control={control} name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 12 }}>
          {!!label && <Text style={s.label}>{label}</Text>}
          <TextInput
            style={[s.input, error && { borderColor: theme.colors.danger }]}
            placeholderTextColor={theme.colors.muted}
            onBlur={onBlur} onChangeText={onChange} value={value as any}
            {...inputProps}
          />
          {!!error && <Text style={s.err}>{error.message}</Text>}
        </View>
      )}
    />
  );
}
const s = StyleSheet.create({
  label: { color: theme.colors.text, marginBottom: 6 },
  input: {
    height: 52,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    color: theme.colors.text,
  },
  err: { color: theme.colors.danger, fontSize: 12, marginTop: 6 },
});
