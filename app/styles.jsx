import { StyleSheet, Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 320;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(12),
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: normalize(26),
    fontWeight: "bold",
    marginBottom: normalize(16),
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    padding: normalize(12),
    marginBottom: normalize(12),
    borderRadius: normalize(8),
    backgroundColor: "#FFF",
  },
  boton: {
    backgroundColor: "#3F51B5",
    padding: normalize(12),
    borderRadius: normalize(8),
    alignItems: "center",
    marginBottom: normalize(12),
    elevation: 2, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  textoBoton: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: normalize(16),
  },
  tareaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize(12),
    padding: normalize(12),
    backgroundColor: "#FFF",
    borderRadius: normalize(8),
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  tareaInfo: {
    flex: 1,
    marginLeft: normalize(12),
  },
  tareaNombre: {
    fontSize: normalize(18),
    fontWeight: "bold",
    color: "#333",
  },
  tareaDescripcion: {
    color: "#777",
  },
  tareaImagen: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(5),
    backgroundColor: "#E0E0E0",
  },
  tareaSwitch: {
    marginRight: normalize(12),
  },
  iconButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
});
