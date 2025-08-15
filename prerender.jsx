// prerender.jsx
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./src/App.jsx"; // ajusta si tu App está en otra ruta

// Mapea URL -> clave internade tu SPA
const ROUTE_TO_PAGE = {
  "/": "inicio",
  "/historia/": "historia",
  "/servicios/": "servicios",
  "/faq/": "faq",
  "/contacto/": "contacto",
};

// El plugin llamará a esta función por cada ruta (data.url)
export async function prerender(data) {
  const url = data?.url || "/";
  const initialPage = ROUTE_TO_PAGE[url] || "inicio";

  // Render de tu App a string con la página adecuada
  const html = renderToString(<App initialPage={initialPage} />);

  // Opcional: inyectamos datos para que el cliente "hidrate" con el mismo estado
  return {
    html,
    data: { initialPage },
    // También podrías personalizar <title> y metas aquí por ruta si quieres.
    head: {
      title: (
        {
          inicio: "Manos a la Obra | Mantenimiento y construcción en Cuenca",
          historia: "Nuestra historia | Manos a la Obra",
          servicios: "Servicios | Manos a la Obra",
          faq: "Preguntas frecuentes | Manos a la Obra",
          contacto: "Contacto | Manos a la Obra",
        }[initialPage] || "Manos a la Obra"
      ),
      lang: "es-EC",
    },
  };
}
