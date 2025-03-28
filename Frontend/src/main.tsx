import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "@pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import "./styles/globalStyles.css";
import { lightTheme } from "./styles/themesMui";
import { Provider } from "react-redux";
import { store } from "./store";
import { axiosConfiguration } from "./configuration/configurationAxios";

axiosConfiguration();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Home />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
