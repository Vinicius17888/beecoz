import { View, Text } from "react-native"; import { useAuth } from "@lib/authStore";
export default function AutonomoHome(){
  const { userId } = useAuth();
  return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Home Autônomo (user {userId})</Text></View>;
}
