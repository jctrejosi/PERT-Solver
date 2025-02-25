import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2D632D", // Verde primario
    },
    secondary: {
      main: "#252973", // Naranja secundario
    },
    background: {
      default: "#f5f5f5", // Fondo general
      paper: "#fff", // Fondo de tarjetas
    },
    text: {
      primary: "#333", // Color de texto principal
      secondary: "#666", // Color de texto secundario
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#598164", // Azul primario
    },
    secondary: {
      main: "#ff9800", // Naranja secundario
    },
    background: {
      default: "#121212", // Fondo general oscuro
      paper: "#1d1d1d", // Fondo de tarjetas oscuro
    },
    text: {
      primary: "#fff", // Color de texto principal en modo oscuro
      secondary: "#bbb", // Color de texto secundario en modo oscuro
    },
  },
});

export { lightTheme, darkTheme };
