import { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { Screen } from "@components/Screen";
import { Button } from "@components/Button";

type Msg = { id: string; from: "eu" | "outro"; text: string };

export default function ChatInterno() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "1", from: "outro", text: "Olá! Como posso ajudar?" }
  ]);

  function send() {
    if (!text.trim()) return;
    setMsgs((prev) => [...prev, { id: String(prev.length + 1), from: "eu", text }]);
    setText("");
  }

  return (
    <Screen title="Chat Interno">
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 8 }}
        data={msgs}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.from === "eu" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
            <Text style={{
              backgroundColor: item.from === "eu" ? "#2563EB" : "#E2E8F0",
              color: item.from === "eu" ? "#fff" : "#0F172A",
              paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12
            }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Digite sua mensagem"
          style={{ flex: 1, borderWidth: 1, borderColor: "#E2E8F0", backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 }}
          placeholderTextColor="#94A3B8"
        />
        <Button label="Enviar" onPress={send} />
      </View>
    </Screen>
  );
}

