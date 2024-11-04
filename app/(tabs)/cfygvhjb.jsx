import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

export default function ListaTareas() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [contadorTareas, setContadorTareas] = useState(0);

  const agregarTarea = useCallback(() => {
    if (tarea.trim()) {
      setTareas((prevTareas) => [
        ...prevTareas,
        { id: Date.now().toString(), texto: tarea },
      ]);
      setTarea("");
      setContadorTareas(contadorTareas + 1);
    }
  }, [tarea, contadorTareas]);

  const eliminarTarea = useCallback(
    (id) => {
      setTareas((prevTareas) => prevTareas.filter((item) => item.id !== id));
      if (contadorTareas > 0) {
        setContadorTareas(contadorTareas - 1);
      }
    },
    [contadorTareas]
  );

  const aumentarContador = useCallback(() => {
    setContadorTareas(contadorTareas + 1);
  }, [contadorTareas]);

  const disminuirContador = useCallback(() => {
    if (contadorTareas > 0) {
      setContadorTareas(contadorTareas - 1);
    }
  }, [contadorTareas]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
      textAlign: "center",
    },
    contadorTareas: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 15,
      fontWeight: "bold",
    },
    input: {
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    boton: {
      backgroundColor: "#4CAF50",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 20,
    },
    textoBoton: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    botonEliminar: {
      backgroundColor: "#FF6347",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    botonesAD: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    botonAD: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      marginHorizontal: 5,
    },
    botonAumentar: {
      backgroundColor: "blue",
      borderRadius: 5,
    },
    botonDisminuir: {
      backgroundColor: "red",
      borderRadius: 5,
    },
    tareaContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
      padding: 10,
      backgroundColor: "#f9f9f9",
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Lista de Tareas</Text>
        <Text style={styles.contadorTareas}>
          {contadorTareas} Tareas Pendientes
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea"
          value={tarea}
          onChangeText={setTarea}
        />
        <TouchableOpacity
          style={styles.boton}
          onPress={agregarTarea}
          disabled={!tarea.trim()} // Deshabilita el botón si el input está vacío :)
        >
          <Text style={styles.textoBoton}>Agregar Tarea</Text>
        </TouchableOpacity>
        <View style={styles.botonesAD}>
          <TouchableOpacity
            style={[styles.botonAD, styles.botonAumentar]}
            onPress={aumentarContador}
          >
            <Text style={styles.textoBoton}>Aumentar Contador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botonAD, styles.botonDisminuir]}
            onPress={disminuirContador}
          >
            <Text style={styles.textoBoton}>Disminuir Contador</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tareaContainer}>
              <Text>{item.texto}</Text>
              <TouchableOpacity
                style={styles.botonEliminar}
                onPress={() => eliminarTarea(item.id)}
              >
                <Text style={styles.textoBoton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
