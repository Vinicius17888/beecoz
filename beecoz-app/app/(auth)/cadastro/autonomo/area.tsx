import AppBarBack from "@components/AppBarBack";
import Button from "@components/Button";
import { theme } from "@theme";
import { AREAS } from "@lib/areas";
import { useCadastro } from "@lib/cadastroStore";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function AutonomoArea(){
  const { autonomo, setAutonomo } = useCadastro();
  const [sel, setSel] = useState<string>(autonomo.area || "");

  function continuar(){
    if(!sel) return; // simples: exige 1 seleção
    setAutonomo({ area: sel });
    router.push("/cadastro/autonomo/finalizado");
  }

  return (
    <View style={{ flex:1, backgroundColor: theme.bg, padding: 16 }}>
      <AppBarBack title="Qual sua área de atuação?" />
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 96 }}>
        {AREAS.map((a) => (
          <TouchableOpacity key={a} onPress={()=> setSel(a)}
            style={{
              padding: 14, borderRadius: 12,
              backgroundColor: theme.colors.surface,
              borderWidth: 2,
              borderColor: sel === a ? theme.colors.primary : "transparent"
            }}>
            <Text style={{ color: theme.colors.text }}>{a}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button onPress={continuar} style={{ position:"absolute", left:16, right:16, bottom:16 }}>
        Continuar
      </Button>
    </View>
  );
}
