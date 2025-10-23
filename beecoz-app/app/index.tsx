import { Redirect } from "expo-router";

export default function Index() {
  // leve o usuário direto para login (ajuste se houver uma tela de escolha de perfil)
  return <Redirect href="/(auth)/login" />;
}
