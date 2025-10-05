import { View } from "react-native";
import { Screen } from "../../components/Screen";
import { RoleSection } from "../../components/RoleSection";

export default function LoginECadastro() {
  return (
    <Screen title="Entrar ou Cadastrar">
      <View style={{ gap: 20 }}>
        <RoleSection
          title="Cliente"
          onPressLoginHref="/(auth)/cliente/login"
          onPressCadastroHref="/(auth)/cliente/cadastro"
        />
        <RoleSection
          title="Autônomo"
          onPressLoginHref="/(auth)/autonomo/login"
          onPressCadastroHref="/(auth)/autonomo/cadastro"
        />
      </View>
    </Screen>
  );
}
