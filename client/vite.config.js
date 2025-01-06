import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "http://localhost:6000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
