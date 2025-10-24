import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@theme";

export default function GenderChoice({ value, onChange }:{ value?: "M" | "F"; onChange:(v:"M"|"F")=>void }) {
  const Item = ({v, icon}:{v:"M"|"F"; icon:any}) => {
    const active = value === v;
    return (
      <TouchableOpacity
        onPress={() => onChange(v)}
        style={{
          width: 72, height: 72, borderRadius: 12, alignItems:"center", justifyContent:"center",
          backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: active ? theme.colors.primary : "transparent"
        }}
      >
        <Ionicons name={icon} size={32} color={active ? theme.colors.primary : theme.colors.text} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flexDirection:"row", justifyContent:"center", gap: 24 }}>
      <Item v="M" icon="man-outline" />
      <Item v="F" icon="woman-outline" />
    </View>
  );
}
