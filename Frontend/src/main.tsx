import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import "./styles/globalStyles.css";
import theme from "./styles/themesMui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </StrictMode>
);
