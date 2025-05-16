import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="ListaLibros" options={{ title: "Lista de Libros" }} />
      <Tabs.Screen name="ListaUsuarios" options={{ title: "Lista de usuarios" }} />
      <Tabs.Screen name="ListaPrestamos" options={{ title: "Lista de Prestamos" }} />
    </Tabs>
  );
}
