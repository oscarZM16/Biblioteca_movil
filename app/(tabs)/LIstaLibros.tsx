import React, { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";

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

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const agregarLibro = () => {
    if (!titulo || !autor) {
      Alert.alert("Campos incompletos", "Completa el título y el autor.");
      return;
    }

    if (editandoId) {
      setLibros((prev) =>
        prev.map((libro) =>
          libro.id === editandoId ? { ...libro, titulo, autor } : libro
        )
      );
      setEditandoId(null);
    } else {
      const nuevoLibro: Libro = {
        id: Date.now().toString(),
        titulo,
        autor,
      };
      setLibros((prev) => [...prev, nuevoLibro]);
    }

    setTitulo("");
    setAutor("");
  };

  const eliminarLibro = (id: string) => {
    Alert.alert("Eliminar libro", "¿Estás seguro que deseas eliminar este libro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setLibros((prev) => prev.filter((libro) => libro.id !== id));
          if (editandoId === id) {
            setEditandoId(null);
            setTitulo("");
            setAutor("");
          }
        },
      },
    ]);
  };

  const editarLibro = (libro: Libro) => {
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setEditandoId(libro.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Lista de Libros</Text>

      <TextInput placeholder="Título del libro" value={titulo} onChangeText={setTitulo} style={styles.input}/>
      <TextInput placeholder="Autor" value={autor} onChangeText={setAutor} style={styles.input}/>

      <Button title={editandoId ? "Guardar cambios" : "Agregar libro"} onPress={agregarLibro} />

      <FlatList style={{ marginTop: 20 }} data={libros} keyExtractor={(item) => item.id} renderItem={({ item }) => (
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
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
