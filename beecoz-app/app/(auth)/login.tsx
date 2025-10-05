import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { apiLogin } from "@lib/api";
import { useAuth } from "@lib/authStore";

export default function Login(){
  const [login, setLogin] = useState(""); const [senha, setSenha] = useState("");
  const setAuth = useAuth(s=>s.setAuth);

  async function entrar(){
    try{
      const auth = await apiLogin(login, senha);
      await setAuth(auth);
      router.replace(auth.perfil === "CLIENTE" ? "/(cliente)" : "/(autonomo)");
    }catch(e:any){
      Alert.alert("Erro", e?.response?.data?.error ?? "Falha no login");
    }
  }

  return (
    <View style={s.c}>
      <Text style={s.h1}>BEECOZ</Text>
      <TextInput placeholder="Email ou telefone" value={login} onChangeText={setLogin} autoCapitalize="none" style={s.in}/>
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={s.in}/>
      <TouchableOpacity style={s.btn} onPress={entrar}><Text style={s.btnt}>Entrar</Text></TouchableOpacity>
      <Link href="/(auth)/cadastro" style={{marginTop:8}}>Criar conta</Link>
    </View>
  );
}
const s = StyleSheet.create({ c:{flex:1,padding:24,justifyContent:"center",gap:12}, h1:{fontSize:28,fontWeight:"800",textAlign:"center"},
  in:{borderWidth:1,borderColor:"#ddd",borderRadius:12,padding:12}, btn:{backgroundColor:"#0057e7",padding:14,borderRadius:12,alignItems:"center"},
  btnt:{color:"#fff",fontWeight:"700"} });

