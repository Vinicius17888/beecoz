import { View, Text } from "react-native";
import GenderChoice from "@components/GenderChoice";
import Button from "@components/Button";
import { theme } from "@theme";
import { router, useLocalSearchParams } from "expo-router";
import { useCadastro } from "@lib/cadastroStore";

export default function Genero() {
  const { tipo } = useLocalSearchParams<{ tipo: "cliente" | "autonomo" }>();
  const { setCliente, setAutonomo } = useCadastro();
  const [val, setVal] = useState<"M"|"F">("M");

  function continuar() {
    (tipo === "cliente" ? setCliente : setAutonomo)({ genero: val });
    router.back(); // volta para o passo onde estava; se preferir, vá para o próximo passo
  }

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 20, justifyContent:"center", gap: 24 }}>
      <Text style={{ color: theme.text, ...theme.typography.h1 }}>Por favor, selecione o seu <Text style={{ color: theme.colors.primary }}>sexo</Text>:</Text>
      <GenderChoice value={val} onChange={setVal} />
      <Button onPress={continuar}>Continuar</Button>
    </View>
  );
}
import { useState } from "react";
