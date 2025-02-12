import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@utils": resolve(__dirname, "src/utils"),
      "@customTypes": resolve(__dirname, "src/types"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@pages": resolve(__dirname, "src/pages"),
      "@styles": resolve(__dirname, "src/styles"),
      "@store": resolve(__dirname, "src/store"),
      "@services": resolve(__dirname, "src/services"),
    },
  },
});
