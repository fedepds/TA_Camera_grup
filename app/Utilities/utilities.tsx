import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { nuevasTareas } from "./types";
export const cargarTareas = async () => {
  try {
    const tareasGuardadas = await AsyncStorage.getItem("tareas");
    return tareasGuardadas;
  } catch (error) {
    console.error("Error al cargar tareas", error);
  }
};

export const guardarTareas = async (nuevasTareas: nuevasTareas[]) => {
  try {
    await AsyncStorage.setItem("tareas", JSON.stringify(nuevasTareas));
  } catch (error) {
    console.error("Error al guardar tareas", error);
  }
};

export const seleccionarFoto = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

export const tomarFoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};
