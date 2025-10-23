import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../lib/authStore";

export default function ClienteLayout() {
  const { hydrated, token, perfil } = useAuth();
  if (!hydrated) return null;
  if (!token) return <Redirect href="/(auth)/login" />;
  if (perfil !== "CLIENTE") return <Redirect href="/(autonomo)" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
