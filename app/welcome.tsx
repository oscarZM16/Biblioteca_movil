import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bienvenido</Text>
      <Button title="Ir a Login" onPress={() => router.push("/login")} />
    </View>
  );
}

