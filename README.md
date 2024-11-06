

```markdown
# Lista de Tareas - React Native App

Esta es una aplicación de lista de tareas desarrollada en **React Native**. Permite a los usuarios agregar, editar, eliminar tareas, marcar las tareas como hechas, y asociar fotos a las tareas usando la cámara o la galería de imágenes.

## Requisitos

Asegúrate de tener los siguientes requisitos antes de ejecutar la aplicación:

- [Node.js](https://nodejs.org/) instalado en tu sistema.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente. Si no lo tienes, instálalo ejecutando el siguiente comando:

  ```bash
  npm install -g expo-cli
  ```

- Un emulador de dispositivo o un dispositivo físico para probar la aplicación.

## Instalación

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local:

1. **Clonar el repositorio:**

   Primero, clona el repositorio en tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Instalar dependencias:**

   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

3. **Iniciar la aplicación:**

   Una vez que las dependencias estén instaladas, puedes iniciar la aplicación utilizando Expo:

   ```bash
   expo start
   ```

   Esto abrirá una página en tu navegador. Puedes escanear el código QR con la aplicación **Expo Go** en tu dispositivo físico para ejecutar la aplicación, o utilizar un emulador de Android o iOS.

## Uso de la aplicación

- **Agregar una tarea:** Ingresa el nombre y la descripción de la tarea, y selecciona o toma una foto. Luego presiona el botón "Agregar Tarea".
- **Editar una tarea:** Haz clic en el ícono de editar de una tarea existente para modificarla.
- **Eliminar una tarea:** Haz clic en el ícono de eliminar de una tarea para borrarla de la lista.
- **Marcar como hecha:** Usa el interruptor junto a cada tarea para marcarla como completada.

## Permisos necesarios

La aplicación requiere acceso a la cámara para tomar fotos, y acceso a la galería para seleccionar imágenes.

- **Cámara:** Se solicita acceso a la cámara al iniciar la aplicación.
- **Galería de imágenes:** Puedes seleccionar una foto desde la galería de imágenes del dispositivo.

## Tecnologías utilizadas

- **React Native**
- **Expo**
- **AsyncStorage**
- **Expo ImagePicker**

