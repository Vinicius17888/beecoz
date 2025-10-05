import { View, Text } from "react-native";
import { THEME } from "@lib/theme";
import { Link } from "expo-router";
import { Button } from "./Button";

export function RoleSection({
  title, onPressLoginHref, onPressCadastroHref,
}: { title: string; onPressLoginHref: string; onPressCadastroHref: string }) {
  return (
    <View style={{
      backgroundColor: "#fff",
      borderRadius: THEME.radius.lg,
      borderWidth: 1,
      borderColor: THEME.colors.border,
      padding: 16,
      gap: 12
    }}>
      <Text style={{ fontSize: 18, fontWeight: "700", color: THEME.colors.text }}>{title}</Text>
      <Link href={onPressLoginHref as any} asChild>
        <Button label={`Entrar como ${title}`} />
      </Link>
      <Link href={onPressCadastroHref as any} asChild>
        <Button label={`Criar conta como ${title}`} variant="ghost" />
      </Link>
    </View>
  );
}

