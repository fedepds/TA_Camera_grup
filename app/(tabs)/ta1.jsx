import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  Switch,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ListaTareas() {
  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [fotoUri, setFotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso Denegado",
          "Se necesita acceso a la cámara para tomar fotos."
        );
      }
    })();
  }, []);

  const seleccionarFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const agregarTarea = useCallback(() => {
    if (nombreTarea.trim() && descripcionTarea.trim()) {
      const nuevaTarea = {
        id: Date.now().toString(),
        nombre: nombreTarea,
        descripcion: descripcionTarea,
        fotoUri,
        hecha: false,
      };
      setTareas((prevTareas) => [...prevTareas, nuevaTarea]);
      setNombreTarea("");
      setDescripcionTarea("");
      setFotoUri(null);
    } else {
      Alert.alert(
        "Campos vacíos",
        "Por favor completa el nombre y la descripción de la tarea."
      );
    }
  }, [nombreTarea, descripcionTarea, fotoUri]);

  const cambiarEstadoTarea = useCallback((id) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      )
    );
  }, []);

  const eliminarTarea = useCallback((id) => {
    setTareas((prevTareas) => prevTareas.filter((item) => item.id !== id));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
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
      marginBottom: 10,
    },
    textoBoton: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    tareaContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#f9f9f9",
      borderRadius: 5,
    },
    tareaInfo: {
      flex: 1,
      marginLeft: 10,
    },
    tareaNombre: {
      fontSize: 18,
      fontWeight: "bold",
    },
    tareaDescripcion: {
      color: "#666",
    },
    tareaImagen: {
      width: 50,
      height: 50,
      borderRadius: 5,
    },
    tareaSwitch: {
      marginRight: 10,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Lista de Tareas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la tarea"
          value={nombreTarea}
          onChangeText={setNombreTarea}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción de la tarea"
          value={descripcionTarea}
          onChangeText={setDescripcionTarea}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="Tomar Foto" onPress={tomarFoto} />
          <Button title="Seleccionar Foto" onPress={seleccionarFoto} />
        </View>
        {fotoUri && (
          <Image
            source={{ uri: fotoUri }}
            style={{ width: 100, height: 100, marginVertical: 10 }}
          />
        )}
        <TouchableOpacity style={styles.boton} onPress={agregarTarea}>
          <Text style={styles.textoBoton}>Agregar Tarea</Text>
        </TouchableOpacity>
        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tareaContainer}>
              {item.fotoUri && (
                <Image
                  source={{ uri: item.fotoUri }}
                  style={styles.tareaImagen}
                />
              )}
              <View style={styles.tareaInfo}>
                <Text style={styles.tareaNombre}>{item.nombre}</Text>
                <Text style={styles.tareaDescripcion}>{item.descripcion}</Text>
              </View>
              <Switch
                style={styles.tareaSwitch}
                value={item.hecha}
                onValueChange={() => cambiarEstadoTarea(item.id)}
              />
              <TouchableOpacity onPress={() => eliminarTarea(item.id)}>
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
