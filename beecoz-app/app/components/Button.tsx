import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

function Button({ title, onPress, style }: { title:string; onPress?:()=>void; style?:ViewStyle }) {
  return (
    <TouchableOpacity style={[s.btn, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={s.txt}>{title}</Text>
    </TouchableOpacity>
  );
}
const s = StyleSheet.create({
  btn:{ backgroundColor: "#FBC02D", paddingVertical:14, borderRadius:12, alignItems:"center" },
  txt:{ fontWeight:"800" }
});
export { Button };
export default Button;

