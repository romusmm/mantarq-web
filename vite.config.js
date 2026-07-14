import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { fileURLToPath } from "node:url";

const prerenderScript = fileURLToPath(new URL("./prerender.jsx", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript,
      additionalPrerenderRoutes: ["/", "/historia/", "/servicios/", "/faq/", "/contacto/"],
    }),
  ],
  // 👇 Cambiado a la raíz para dominio personalizado
  base: "/",
  resolve: { dedupe: ["react", "react-dom"] },
});
