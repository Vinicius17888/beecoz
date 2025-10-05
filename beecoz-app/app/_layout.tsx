import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useAuth } from "@lib/authStore";

export default function RootLayout(){
  const hydrated = useAuth(s=>s.hydrated); const hydrate = useAuth(s=>s._hydrate);
  useEffect(()=>{ hydrate(); },[]);
  if(!hydrated) return <View style={{flex:1,backgroundColor:"#2F3338",justifyContent:"center",alignItems:"center"}}><ActivityIndicator color="#FBC02D"/></View>;
  return (<SafeAreaProvider><Stack screenOptions={{ headerShown:false }}/></SafeAreaProvider>);
}

