import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function CrearLibro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const router = useRouter();

  const guardarLibro = () => {
    if (!titulo.trim() || !autor.trim()) {
      Alert.alert("Campos incompletos", "Por favor ingresa título y autor.");
      return;
    }

    Alert.alert("Libro guardado", `Título: ${titulo}\nAutor: ${autor}`);

    setTitulo("");
    setAutor("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear Libro</Text>

      <TextInput
        style={styles.input}
        placeholder="Título del libro"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
      />

      <Button title="Guardar" onPress={guardarLibro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
});
