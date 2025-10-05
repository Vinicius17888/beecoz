import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const C = {
  bg: "#2E3137",
  yellow: "#F1B82D",
  text: "#EAECEF",
  sub: "#9AA3AD",
  border: "#4A4F56",
  black: "#0B0B0B",
  card: "#3B3F45",
};

export default function Sexo() {
  const { role } = useLocalSearchParams<{ role?: "CLIENTE" | "AUTONOMO" }>();
  const [sexo, setSexo] = useState<"M" | "F" | null>(null);

  function goNext() {
    if (!sexo) return;
    if (role === "AUTONOMO") router.replace("/(auth)/autonomo/cadastro");
    else router.replace("/(auth)/cliente/cadastro");
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg, paddingHorizontal: 22, paddingTop: 22 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        <Ionicons name="chevron-back" size={24} color={C.text} />
      </TouchableOpacity>

      <Text style={{ color: C.text, fontSize: 18, fontWeight: "700", marginBottom: 6 }}>Bem-vindo à Beecoz!</Text>
      <Text style={{ color: C.sub, fontSize: 14, marginBottom: 18 }}>Por favor, selecione o seu sexo:</Text>

      <View style={{ flexDirection: "row", gap: 18, justifyContent: "center", marginTop: 12 }}>
        <CardIcon label="Masculino" selected={sexo === "M"} onPress={() => setSexo("M")} icon="male" />
        <CardIcon label="Feminino" selected={sexo === "F"} onPress={() => setSexo("F")} icon="female" />
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ backgroundColor: C.black, paddingHorizontal: 22, paddingVertical: 12, borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
        <TouchableOpacity onPress={goNext} disabled={!sexo} style={{ height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: !sexo ? C.card : C.yellow }}>
          <Text style={{ color: !sexo ? "#9AA3AD" : "#0B0B0B", fontWeight: "700" }}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CardIcon({
  label, selected, onPress, icon,
}: { label: string; selected: boolean; onPress: () => void; icon: "male" | "female"; }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 120, height: 140, borderRadius: 12,
        borderWidth: selected ? 2 : 1, borderColor: selected ? C.yellow : C.border,
        alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: C.card,
      }}
    >
      <Ionicons name={icon} size={40} color={selected ? C.yellow : C.text} />
      <Text style={{ color: selected ? C.yellow : C.text }}>{label}</Text>
    </TouchableOpacity>
  );
}
