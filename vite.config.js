import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root", // donde se monta tu App en index.html
      prerenderScript: resolve(__dirname, "prerender.jsx"),
      additionalPrerenderRoutes: [
        "/", "/historia/", "/servicios/", "/faq/", "/contacto/", "/404.html"
      ],
      // previewMiddlewareFallback: '/index.html' // por defecto
    }),
  ],
  base: "/", // con dominio propio o GH Pages por dominio, deja '/'
  resolve: { dedupe: ["react", "react-dom"] },
});
