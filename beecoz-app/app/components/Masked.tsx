import { Controller, Control } from "react-hook-form";
import { MaskedTextInput } from "react-native-mask-text";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "@theme";

type Props = { control: Control<any>; name: string; label?: string; mask: string; keyboardType?: any };

export default function Masked({ control, name, label, mask, keyboardType }: Props) {
  return (
    <Controller control={control} name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 12 }}>
          {!!label && <Text style={s.label}>{label}</Text>}
          <MaskedTextInput
            style={[s.input, error && { borderColor: theme.colors.danger }]}
            mask={mask}
            keyboardType={keyboardType}
            placeholderTextColor={theme.colors.muted}
            onBlur={onBlur} onChangeText={(t) => onChange(t)} value={value}
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
    height: 52, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md,
    borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 14, color: theme.colors.text,
  },
  err: { color: theme.colors.danger, fontSize: 12, marginTop: 6 },
});
