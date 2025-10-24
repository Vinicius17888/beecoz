import { Redirect } from "expo-router";
export default function Index() {
  // grupos () não aparecem na URL; a rota é só /escolha-perfil
  return <Redirect href="/escolha-perfil" />;
}
