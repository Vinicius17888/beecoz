import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../lib/authStore";

export default function AutonomoLayout() {
  const { hydrated, token, perfil } = useAuth();
  if (!hydrated) return null;
  if (!token) return <Redirect href="/(auth)/login" />;
  if (perfil !== "AUTONOMO") return <Redirect href="/(cliente)" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
