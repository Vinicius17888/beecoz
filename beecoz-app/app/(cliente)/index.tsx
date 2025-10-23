import { View, Text } from "react-native"; import { useAuth } from "@lib/authStore";
export default function ClienteHome(){
  const { userId } = useAuth();
  return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Home Cliente (user {userId})</Text></View>;
}
