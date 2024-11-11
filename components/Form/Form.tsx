import { useState, useCallback, useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Switch,
  Button,
  Alert
} from "react-native";
import styles from "../../app/styles";
import { seleccionarFoto, tomarFoto , guardarTareas, cargarTareas} from "@/app/Utilities/utilities";
import { MaterialIcons } from "@expo/vector-icons";
import { nuevasTareas } from "@/app/Utilities/types";
import * as ImagePicker from "expo-image-picker";

const Form = () => {
  const [nombreTarea, setNombreTarea] = useState<string>("");
  const [descripcionTarea, setDescripcionTarea] = useState<string>("");
  const [fotoUri, setFotoUri] = useState<string | undefined | null>(undefined);
  const [tareas, setTareas] = useState<nuevasTareas[]>([]);
  const [tareaEditando, setTareaEditando] = useState<nuevasTareas | null>(null);


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
  const handleSeleccionarFoto = async () => {
    const result =  await seleccionarFoto();
      setFotoUri(result);
  }

  const handleTomarFoto = async () => {
    const result = await tomarFoto();
    setFotoUri(result);
  }


   const agregarTarea = useCallback(() => {
     if (nombreTarea.trim() && descripcionTarea.trim() && fotoUri) {
       if (tareaEditando) {
         // Editar tarea existente
         const nuevasTareas = tareas.map((tarea: nuevasTareas) =>
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
     (id: string) => {
       const nuevasTareas = tareas.map((tarea) =>
         tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
       );
       setTareas(nuevasTareas);
       guardarTareas(nuevasTareas);
     },
     [tareas]
   );

   const eliminarTarea = useCallback(
     (id: string) => {
       const nuevasTareas = tareas.filter((item) => item.id !== id);
       setTareas(nuevasTareas);
       guardarTareas(nuevasTareas);
     },
     [tareas]
   );

   const cargarTareaParaEditar = (tarea: nuevasTareas) => {
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
          <Button title="Tomar Foto" onPress={handleTomarFoto} />
          <Button title="Seleccionar Foto" onPress={handleSeleccionarFoto} />
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
          renderItem={({ item}) => (
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
};

export default Form;
