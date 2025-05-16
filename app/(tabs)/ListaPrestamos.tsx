import React, { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";

type Prestamo = {
  id: string;
  nombreUsuario: string;
  nombreLibro: string;
};

export default function ListaPrestamos() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([
    { id: "1", nombreUsuario: "Juan Pérez", nombreLibro: "Cien años de soledad" },
    { id: "2", nombreUsuario: "Ana Gómez", nombreLibro: "Don Quijote de la Mancha" },
    { id: "3", nombreUsuario: "Carlos Ruiz", nombreLibro: "La sombra del viento" },
  ]);

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombreLibro, setNombreLibro] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const agregarPrestamo = () => {
    if (!nombreUsuario || !nombreLibro) {
      Alert.alert("Campos incompletos", "Completa el nombre del usuario y el libro.");
      return;
    }

    if (editandoId) {
      setPrestamos((prev) =>
        prev.map((prestamo) =>
          prestamo.id === editandoId
            ? { ...prestamo, nombreUsuario, nombreLibro }
            : prestamo
        )
      );
      setEditandoId(null);
    } else {
      const nuevoPrestamo: Prestamo = {
        id: Date.now().toString(),
        nombreUsuario,
        nombreLibro,
      };
      setPrestamos((prev) => [...prev, nuevoPrestamo]);
    }

    setNombreUsuario("");
    setNombreLibro("");
  };

  const eliminarPrestamo = (id: string) => {
    Alert.alert("Eliminar préstamo", "¿Estás seguro que deseas eliminar este préstamo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setPrestamos((prev) => prev.filter((prestamo) => prestamo.id !== id));
          if (editandoId === id) {
            setEditandoId(null);
            setNombreUsuario("");
            setNombreLibro("");
          }
        },
      },
    ]);
  };

  const editarPrestamo = (prestamo: Prestamo) => {
    setNombreUsuario(prestamo.nombreUsuario);
    setNombreLibro(prestamo.nombreLibro);
    setEditandoId(prestamo.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Lista de Préstamos</Text>

      <TextInput placeholder="Nombre del usuario" value={nombreUsuario} onChangeText={setNombreUsuario} style={styles.input}/>
      <TextInput placeholder="Nombre del libro" value={nombreLibro} onChangeText={setNombreLibro} style={styles.input}/>

      <Button title={editandoId ? "Guardar cambios" : "Agregar préstamo"} onPress={agregarPrestamo}/>

      <FlatList style={{ marginTop: 20 }} data={prestamos} keyExtractor={(item) => item.id} renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.libro}>{item.nombreLibro}</Text>
              <Text style={styles.autor}>prestado a {item.nombreUsuario}</Text>
            </View>
            <View style={styles.botones}>
              <TouchableOpacity onPress={() => editarPrestamo(item)}>
                <Text style={styles.btnEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminarPrestamo(item.id)}>
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
