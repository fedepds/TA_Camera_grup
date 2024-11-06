import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  Switch,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles"; // Importa los estilos
import { MaterialIcons } from "@expo/vector-icons";

export default function ListaTareas() {
  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [fotoUri, setFotoUri] = useState(null);
  const [tareaEditando, setTareaEditando] = useState(null);

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

    // Cargar tareas desde AsyncStorage al iniciar
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const tareasGuardadas = await AsyncStorage.getItem("tareas");
      if (tareasGuardadas) {
        setTareas(JSON.parse(tareasGuardadas));
      }
    } catch (error) {
      console.error("Error al cargar tareas", error);
    }
  };

  const guardarTareas = async (nuevasTareas) => {
    try {
      await AsyncStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    } catch (error) {
      console.error("Error al guardar tareas", error);
    }
  };

  const seleccionarFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const agregarTarea = useCallback(() => {
    if (nombreTarea.trim() && descripcionTarea.trim() && fotoUri) {
      if (tareaEditando) {
        // Editar tarea existente
        const nuevasTareas = tareas.map((tarea) =>
          tarea.id === tareaEditando.id
            ? {
                ...tarea,
                nombre: nombreTarea,
                descripcion: descripcionTarea,
                fotoUri,
              }
            : tarea
        );
        setTareas(nuevasTareas);
        guardarTareas(nuevasTareas);
        setTareaEditando(null); // Reiniciar edición
      } else {
        // Agregar nueva tarea
        const nuevaTarea = {
          id: Date.now().toString(),
          nombre: nombreTarea,
          descripcion: descripcionTarea,
          fotoUri,
          hecha: false,
        };
        const nuevasTareas = [...tareas, nuevaTarea];
        setTareas(nuevasTareas);
        guardarTareas(nuevasTareas);
      }
      setNombreTarea("");
      setDescripcionTarea("");
      setFotoUri(null);
    } else {
      Alert.alert(
        "Campos vacíos",
        "Por favor completa el nombre, descripción y foto de la tarea."
      );
    }
  }, [nombreTarea, descripcionTarea, fotoUri, tareas, tareaEditando]);

  const cambiarEstadoTarea = useCallback(
    (id) => {
      const nuevasTareas = tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      );
      setTareas(nuevasTareas);
      guardarTareas(nuevasTareas);
    },
    [tareas]
  );

  const eliminarTarea = useCallback(
    (id) => {
      const nuevasTareas = tareas.filter((item) => item.id !== id);
      setTareas(nuevasTareas);
      guardarTareas(nuevasTareas);
    },
    [tareas]
  );

  const cargarTareaParaEditar = (tarea) => {
    setNombreTarea(tarea.nombre);
    setDescripcionTarea(tarea.descripcion);
    setFotoUri(tarea.fotoUri);
    setTareaEditando(tarea);
  };

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
          <Text style={styles.textoBoton}>
            {tareaEditando ? "Guardar Cambios" : "Agregar Tarea"}
          </Text>
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
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => cargarTareaParaEditar(item)}
              >
                <MaterialIcons name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => eliminarTarea(item.id)}
              >
                <MaterialIcons name="delete" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
