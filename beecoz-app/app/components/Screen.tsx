import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
function Screen({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  return <View style={[s.c, style]}>{children}</View>;
}
const s = StyleSheet.create({ c: { flex: 1, backgroundColor: "#2F3338", padding: 16 } });
export { Screen };
export default Screen;

