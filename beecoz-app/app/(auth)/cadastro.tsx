import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { apiRegister } from "@lib/api";

export default function Cadastro(){
  const [perfil, setPerfil] = useState<"CLIENTE"|"AUTONOMO">("CLIENTE");
  const [nome, setNome] = useState(""); const [login, setLogin] = useState(""); const [senha, setSenha] = useState("");

  async function cadastrar(){
    try{
      const payload = login.includes("@")
        ? { email: login, senha, perfil, nome }
        : { telefone: login, senha, perfil, nome };
      await apiRegister(payload as any);
      Alert.alert("Conta criada","Faça login.");
      router.replace("/(auth)/login");
    }catch(e:any){
      Alert.alert("Erro", e?.response?.data?.error ?? "Falha no cadastro");
    }
  }

  return (
    <View style={s.c}>
      <Text style={s.h1}>Criar conta</Text>
      <View style={{flexDirection:"row",gap:8}}>
        <TouchableOpacity onPress={()=>setPerfil("CLIENTE")}><Text style={[s.chip, perfil==="CLIENTE"&&s.active]}>Cliente</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setPerfil("AUTONOMO")}><Text style={[s.chip, perfil==="AUTONOMO"&&s.active]}>Autônomo</Text></TouchableOpacity>
      </View>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={s.in}/>
      <TextInput placeholder="Email ou telefone" value={login} onChangeText={setLogin} style={s.in}/>
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={s.in}/>
      <TouchableOpacity style={s.btn} onPress={cadastrar}><Text style={s.btnt}>Criar</Text></TouchableOpacity>
    </View>
  );
}
const s = StyleSheet.create({ c:{flex:1,padding:24,gap:12,justifyContent:"center"}, h1:{fontSize:24,fontWeight:"800",marginBottom:8},
  in:{borderWidth:1,borderColor:"#ddd",borderRadius:12,padding:12}, chip:{paddingHorizontal:10,paddingVertical:6,borderRadius:8,backgroundColor:"#eee"},
  active:{backgroundColor:"#cde"}, btn:{backgroundColor:"#0057e7",padding:14,borderRadius:12,alignItems:"center"}, btnt:{color:"#fff",fontWeight:"700"} });

