import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "@theme";
import { Ionicons } from "@expo/vector-icons";

export default function ImagePickerField({ label, onChange }:{ label: string; onChange:(uri:string)=>void }) {
  const [uri, setUri] = useState<string | null>(null);
  async function pick() {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.canceled && res.assets?.[0]?.uri) { setUri(res.assets[0].uri); onChange(res.assets[0].uri); }
  }
  return (
    <View style={{ alignItems:"center", gap: 12, marginVertical: 12 }}>
      <Text style={{ color: theme.colors.text }}>{label}</Text>
      <TouchableOpacity onPress={pick} style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: theme.colors.surface, alignItems:"center", justifyContent:"center", borderWidth:1, borderColor: theme.colors.border }}>
        {!uri ? <Ionicons name="person-circle-outline" size={64} color={theme.colors.muted}/> : <Image source={{ uri }} style={{ width: 96, height: 96, borderRadius: 48 }} />}
      </TouchableOpacity>
      <Text style={{ color: theme.colors.muted, fontSize: 12 }}>Adicione uma foto nítida</Text>
    </View>
  );
}
