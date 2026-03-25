// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 👇 usa la base del repositorio mientras estés en Project Pages
  base: "/mantarq-web/",
  resolve: { dedupe: ["react", "react-dom"] },
});
