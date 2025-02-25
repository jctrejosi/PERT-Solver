import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#81b29a",
      light: "#F0F5F2",
    },
    secondary: {
      main: "#3d405b",
    },
    background: {
      default: "#f2cc8f",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
    success: {
      main: "#3d405b",
    },
    info: {
      main: "#3d405b",
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
