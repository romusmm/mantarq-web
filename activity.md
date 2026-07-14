# Registro de actividad — Mejora SEO Manos a la Obra / MANTARQ

## 2026-07-13

### Analizado
- Stack completo: React 18.3 + Vite 7, sin React Router, `vite-prerender-plugin` en devDependencies, `prerender.jsx` en raíz, `scripts/generate-sitemap.mjs`, workflow `.github/workflows/deploy.yml` (GitHub Pages, dominio `www.mantarq.com` vía `CNAME`).
- `npm ci` + `npm run build` para ver el output real de producción.

### Descubierto
- `vite-prerender-plugin` **nunca registrado** en `vite.config.js` → build genera un único `dist/index.html` vacío/genérico, sin las 5 rutas.
- `App()` no acepta `initialPage` (prop que `prerender.jsx` ya intentaba pasarle) → aunque se active el plugin, todo prerenderiza "inicio".
- Sin routing real (`pushState`/`popstate`), nav son `<button onClick>` no `<a href>`.
- Metadatos (`meta description`, canonical, OG, Twitter, JSON-LD) devueltos como JSX normal desde `SEO()` → en React 18 quedan montados dentro de `div#root` en `<body>`, no en `<head>`. El propio código ya resuelve esto correctamente solo para favicons vía `upsert` manual a `document.head`.
- `public/robots.txt` commiteado apunta a dominio viejo `romusmm.github.io` (CI lo sobreescribe en prod, pero es inconsistente localmente).
- H1 ausente en Historia/Servicios/FAQ/Contacto (usan h2); FAQPage duplica "Preguntas frecuentes" (h2 propio + h3 de `FAQSection` reusado).
- `index.html` con `lang="en"` (contenido es español EC) y `<title>Vite + React</title>` placeholder.

### Modificado
- `vite.config.js`: registrado `vitePrerenderPlugin` (`renderTarget:"#root"`, `prerenderScript`, `additionalPrerenderRoutes` con las 5 rutas).
- `src/site-data.js` (nuevo): datos/funciones puras compartidas entre `App.jsx` y `prerender.jsx` (evita duplicar lógica y respeta la regla de Fast Refresh que exige que un archivo de componente solo exporte componentes).
- `src/App.jsx`: `App` acepta `initialPage` + fallback a `pageFromPathname(location.pathname)`; `goTo()` hace `pushState`; listener `popstate`; nav/footer con `<a href>` reales; `SEO` gestiona `document.head` de forma imperativa (título, description, robots, theme-color, canonical, OG, Twitter, favicons, JSON-LD) en vez de devolver JSX; H1 promovido en Historia/Servicios/Contacto/FAQ; eliminado H3 duplicado en `/faq/`; limpieza de `catch {}` vacíos pre-existentes.
- `prerender.jsx`: reescrito para inyectar `head.title`/`head.lang`/`head.elements` (meta, canonical, OG, Twitter, JSON-LD) directamente en el HTML estático de cada ruta, usando la misma fuente de datos que el cliente.
- `index.html`: `lang="es-EC"`, título de marca real (se probó y se retiró una meta description de respaldo porque el plugin no deduplica `<meta>` — quedaba duplicada en cada ruta prerenderizada).
- `public/robots.txt`: dominio corregido a `www.mantarq.com`.
- `eslint.config.js`: globals de Node para `prerender.jsx` (usa `process.env`).
- `.claude/launch.json` (nuevo): config local para `npm run preview`/`npm run dev` (usado para las pruebas de esta sesión).

### Falta / decisiones pendientes
- 2 errores de lint pre-existentes sin corregir (`motion`/`As` "unused" — falso positivo por falta de `eslint-plugin-react`; corregirlo de raíz añadiría una dependencia nueva, fuera de alcance).
- Imágenes en `i.ibb.co` (logo y logos de clientes) sin migrar a `public/` — pendiente de recibir los archivos fuente.
- Blog y páginas de proyectos: no implementados por falta de contenido real (no se debe generar contenido de relleno).

### Cómo continuar si se interrumpe la sesión
1. Todo lo planeado en esta pasada (Fase 1, 2 y 3 críticas/altas) está **completo y verificado** — ver `SEO_AUDIT_AND_IMPLEMENTATION.md` sección "Registro de cambios" para el detalle exacto de qué se tocó y por qué.
2. Antes de tocar nada nuevo: `npm run build` (debe generar 5 HTML en `dist/`), `npm run lint` (solo deben quedar los 2 errores pre-existentes documentados), `npm run preview` y probar navegación directa + recarga en cada ruta.
3. Para añadir contenido nuevo (páginas, proyectos, blog), seguir la guía al final de `SEO_AUDIT_AND_IMPLEMENTATION.md` ("Cómo mantener el SEO al agregar contenido nuevo").
