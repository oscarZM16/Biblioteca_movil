import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Libro = {
  id: string;
  titulo: string;
  autor: string;
};

export default function ListaLibros() {
  const [libros, setLibros] = useState<Libro[]>([
    { id: "1", titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
    { id: "2", titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes" },
    { id: "3", titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón" },
  ]);

  const router = useRouter();

  const eliminarLibro = (id: string) => {
    Alert.alert("Eliminar libro", "¿Estás seguro que deseas eliminar este libro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setLibros((prev) => prev.filter((libro) => libro.id !== id));
        },
      },
    ]);
  };

  const editarLibro = (libro: Libro) => {
    // Aquí podrías redirigir a una pantalla de edición si lo deseas
    Alert.alert("Editar libro", `Funcionalidad aún no implementada para ${libro.titulo}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📚 Lista de Libros</Text>

      <Button title="➕ Crear libro" onPress={() => router.push("/CrearLibro")} />

      <FlatList
        style={{ marginTop: 20 }}
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.libro}>{item.titulo}</Text>
              <Text style={styles.autor}>por {item.autor}</Text>
            </View>
            <View style={styles.botones}>
              <TouchableOpacity onPress={() => editarLibro(item)}>
                <Text style={styles.btnEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminarLibro(item.id)}>
                <Text style={styles.btnEliminar}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  libro: {
    fontSize: 16,
    fontWeight: "600",
  },
  autor: {
    fontSize: 14,
    color: "#555",
  },
  botones: {
    flexDirection: "row",
    gap: 10,
  },
  btnEditar: {
    color: "#007AFF",
    marginHorizontal: 8,
  },
  btnEliminar: {
    color: "#FF3B30",
    marginHorizontal: 8,
  },
});
