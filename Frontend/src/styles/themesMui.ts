import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#598164", // Azul primario
    },
    secondary: {
      main: "#ff9800", // Naranja secundario
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

export default theme;
