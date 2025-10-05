import { TextInput, StyleSheet, TextInputProps } from "react-native";
function Input(p:TextInputProps){
  return <TextInput placeholderTextColor="#AEB4BB" style={s.in} {...p} />;
}
const s = StyleSheet.create({
  in:{ backgroundColor: "#3A3F45", color:"#fff", borderRadius:12, padding:12, borderWidth:1, borderColor:"#4A4F56" }
});
export { Input };
export default Input;

