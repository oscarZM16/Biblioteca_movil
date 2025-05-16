import React, { useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
};

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: "1", nombre: "Juan Pérez", correo: "juan@example.com" },
    { id: "2", nombre: "Ana Gómez", correo: "ana@example.com" },
    { id: "3", nombre: "Carlos Ruiz", correo: "carlos@example.com" },
  ]);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const agregarUsuario = () => {
    if (!nombre || !correo) {
      Alert.alert("Campos incompletos", "Completa el nombre y el correo.");
      return;
    }

    if (editandoId) {
      setUsuarios((prev) =>
        prev.map((usuario) =>
          usuario.id === editandoId ? { ...usuario, nombre, correo } : usuario
        )
      );
      setEditandoId(null);
    } else {
      const nuevoUsuario: Usuario = {
        id: Date.now().toString(),
        nombre,
        correo,
      };
      setUsuarios((prev) => [...prev, nuevoUsuario]);
    }

    setNombre("");
    setCorreo("");
  };

  const eliminarUsuario = (id: string) => {
    Alert.alert("Eliminar usuario", "¿Estás seguro que deseas eliminar este usuario?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
          if (editandoId === id) {
            setEditandoId(null);
            setNombre("");
            setCorreo("");
          }
        },
      },
    ]);
  };

  const editarUsuario = (usuario: Usuario) => {
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setEditandoId(usuario.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👥 Lista de Usuarios</Text>

      <TextInput
        placeholder="Nombre del usuario"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
        keyboardType="email-address"
      />

      <Button title={editandoId ? "Guardar cambios" : "Agregar usuario"} onPress={agregarUsuario} />

      <FlatList
        style={{ marginTop: 20 }}
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.correo}>{item.correo}</Text>
            </View>
            <View style={styles.botones}>
              <TouchableOpacity onPress={() => editarUsuario(item)}>
                <Text style={styles.btnEditar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminarUsuario(item.id)}>
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
  nombre: {
    fontSize: 16,
    fontWeight: "600",
  },
  correo: {
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
