import { useRouter } from "expo-router";
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const libros = [
  { id: "1", titulo: "Cien años de soledad" },
  { id: "2", titulo: "Don Quijote de la Mancha" },
  { id: "3", titulo: "La sombra del viento" },
];

export default function HomeTab() {
  const router = useRouter();

  const verLibro = (titulo: string) => {
    Alert.alert("Libro seleccionado", titulo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Libros disponibles</Text>

      <ScrollView contentContainerStyle={styles.lista}>
        {libros.map((libro) => (
          <TouchableOpacity key={libro.id} style={styles.casilla} onPress={() => verLibro(libro.titulo)}>
            <Text style={styles.textoBoton}>{libro.titulo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Button title="Cerrar sesión" onPress={() => router.replace("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  lista: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 20,
  },
  casilla: {
    width: "48%", // dos por fila con espacio
    aspectRatio: 1, // altura = ancho (cuadrado)
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
