import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Login</Text>
      <Button title="Entrar" onPress={() => router.replace("/(tabs)")} />
    </View>
  );
}
