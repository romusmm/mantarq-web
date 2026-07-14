# Auditoría SEO y Plan de Implementación — Manos a la Obra / MANTARQ S.A.S.

Fecha de auditoría: 2026-07-13
Repositorio: `mantarq-web`

## 1. Resumen ejecutivo

El sitio es una **SPA (Single Page Application) en React 18 + Vite**, sin React Router ni ningún sistema de rutas. Toda la navegación (Inicio, Historia, Servicios, FAQ, Contacto) es un `useState` interno en `src/App.jsx` (`const [page, setPage] = useState("inicio")`); los enlaces del navbar son `<button onClick>` que solo cambian ese estado, nunca la URL del navegador.

El proyecto **ya contenía el andamiaje para prerenderizado** (`prerender.jsx`, dependencia `vite-prerender-plugin`, script `scripts/generate-sitemap.mjs`, lectura de `#prerender-data` en `main.jsx`), pero **el plugin nunca se registró en `vite.config.js`** (`plugins: [react()]` únicamente). Resultado verificado con `npm run build`:

- Se genera un único `dist/index.html`, con `<title>Vite + React</title>` (el placeholder de la plantilla, no la marca), sin `<meta name="description">`, `lang="en"` y `<div id="root"></div>` completamente vacío.
- No existen `dist/historia/index.html`, `dist/servicios/index.html`, `dist/faq/index.html` ni `dist/contacto/index.html`.
- El workflow de despliegue (`.github/workflows/deploy.yml`) copia `dist/index.html` a `dist/404.html` como fallback SPA de GitHub Pages. Esto significa que **una visita directa a `/historia/`, `/servicios/`, `/faq/` o `/contacto/` responde HTTP 404** y solo después se sirve el mismo `index.html` vacío vía el truco de 404 de GitHub Pages.
- Incluso si el HTML llegara a cargar, `App()` nunca lee la URL: siempre inicia en `page = "inicio"`. Es decir, ni siquiera del lado del cliente existe hoy una forma de acceder directamente a "Servicios" o "Contacto" mediante URL — todas las rutas muestran el contenido de Inicio.
- El `sitemap.xml` generado en CI y el `robots.txt` sí declaran las 5 URLs (`/`, `/historia/`, `/servicios/`, `/faq/`, `/contacto/`), pero como se explicó, esas URLs no sirven contenido distinto ni código 200 real por ruta. Esto es un problema grave de **contenido duplicado / soft-404** que impide que Google indexe o posicione cualquier página que no sea la home.

Conclusión: hoy Google prácticamente solo puede indexar la home, y de forma deficiente (sin meta description, con `<title>` genérico, sin canonical real en `<head>`). El resto del sitio es invisible para buscadores como páginas independientes, a pesar de que el contenido (Historia, Servicios, FAQ, Contacto) ya existe y está bien escrito.

La buena noticia: la arquitectura elegida (SPA + `vite-prerender-plugin`, sin backend, compatible con GitHub Pages) es correcta y no requiere migrar de framework ni de hosting. El trabajo es **terminar de conectar piezas que ya existían a medias** más corregir un puñado de bugs concretos.

## 2. Hallazgos confirmados

### Confirmados en el código (críticos)

1. **`vite-prerender-plugin` no está registrado** en `vite.config.js` → `prerender.jsx` es código muerto, nunca se ejecuta. (`vite.config.js`)
2. **`App()` no acepta `initialPage`** — la firma es `export default function App()`, ignorando la prop que `prerender.jsx` intenta pasarle (`<App initialPage={initialPage} />`). Aunque se arreglara (1), todas las páginas prerenderizarían "inicio". (`src/App.jsx:838`)
3. **No hay routing por URL real**: `goTo()` solo hace `setPage(key)`, nunca `history.pushState`. Los enlaces de navegación son `<button onClick>`, no `<a href>`. El crawler de rutas de `vite-prerender-plugin` (que descubre rutas siguiendo `<a href>`) no encontraría ninguna ruta nueva aunque el plugin estuviera activo. (`src/App.jsx` Navbar, Footer)
4. **Metadatos fuera de `<head>`**: React 18 (no 19) no hace "hoisting" automático de `<title>/<meta>/<link>` renderizados en el árbol de componentes. El componente `SEO` devuelve JSX con `<meta>`, `<link rel="canonical">`, `og:*`, `twitter:*` y `<script type="application/ld+json">` como hijos normales de `App`, que terminan montados dentro de `<div id="root">`, es decir **dentro de `<body>`, no en `<head>`**. Google exige el canonical (y recomienda meta description/OG) en `<head>` para que sea fiable; los scrapers de redes sociales (WhatsApp, Facebook, LinkedIn) **solo leen `<head>`**, por lo que las vistas previas de enlaces compartidos fallan. Curiosamente el propio código ya resuelve esto correctamente para favicons (`upsert` manual a `document.head` en un `useEffect`, líneas 259-277) pero no aplica el mismo patrón al resto de metadatos. (`src/App.jsx:232-315`)
5. **`index.html` sin fallback branded**: `lang="en"` (el contenido es español de Ecuador), `<title>Vite + React</title>`, sin meta description. Es lo que ve cualquier crawler que no ejecute JS o falle en ejecutarlo, y es la base sobre la que se prerenderiza cada ruta.
6. **`public/robots.txt` apunta a un dominio obsoleto**: `https://romusmm.github.io/mantarq-web/sitemap.xml`, mientras que `CNAME` y el workflow usan `www.mantarq.com`. En producción el CI sobreescribe este archivo correctamente vía `scripts/generate-sitemap.mjs`, pero el archivo committeado es inconsistente y engañoso para cualquier build/preview local o despliegue manual.
7. **H1 ausente o duplicado por página**: `HistoriaPage`, `ServiciosPage`, `ContactoPage` y `FAQPage` usan `<h2>` como título principal (no hay ningún `<h1>` en esas vistas). `FAQPage` además duplica el texto "Preguntas frecuentes": un `<h2>` propio más el `<h3>` que ya trae `FAQSection` quien no lo suprime cuando `full={true}`. (`src/App.jsx:619-806`)

### Correctamente implementado ya (no tocar)

- Identidad de marca coherente en el código: `COMPANY.brandName = "Manos a la Obra"`, `COMPANY.legalName = "MANTARQ S.A.S."`, usados de forma consistente en Navbar, Footer y structured data.
- `META_BY_PAGE` ya tiene títulos y descripciones únicos, bien escritos, por página, sin keyword stuffing evidente.
- JSON-LD ya modela `HomeAndConstructionBusiness` (con `legalName`/`name` separados = MANTARQ/Manos a la Obra), `BreadcrumbList`, `FAQPage` y `Service` — tipos correctos y justificados para el contenido real. Los datos (dirección, teléfono, redes) vienen de una única fuente `COMPANY`, sin inventar reseñas ni ratings.
- Imágenes del carrusel de logos ya tienen `alt`, `width`/`height` explícitos y `loading="lazy"`.
- `scripts/generate-sitemap.mjs` calcula correctamente `origin`/`base` combinando `CUSTOM_DOMAIN` (prod) o `owner/repo` (GitHub Pages de proyecto) — no requiere cambios.
- El listado de rutas en `ROUTES` (sitemap), `ROUTE_TO_PAGE` (prerender) y `META_BY_PAGE` (App) ya son consistentes entre sí (`/`, `/historia/`, `/servicios/`, `/faq/`, `/contacto/`).
- Accesibilidad básica: navegación con `aria-label` en el botón de menú móvil, formulario de contacto con `<label>` asociados, foco visible via `focus:ring` en inputs/botones.

### Riesgos probables (no bloqueantes, vigilar)

- Imágenes de logos de clientes y del logo principal se sirven desde `i.ibb.co` (hosting externo de terceros): si ese servicio cae o cambia URLs, rompe imágenes sin aviso. Fuera de alcance de esta tarea (no se inventan activos nuevos), se documenta como pendiente de migrar a `public/` cuando se disponga de los archivos originales.
- `@types/react`/`@types/react-dom` en `devDependencies` apuntan a `^19.x` mientras `react`/`react-dom` están en `^18.3.1` — desalineación de tipos que no afecta runtime pero puede confundir en IDEs.
- El mapa embebido de Google Maps (`iframe`) no tiene `title` alternativo para todos los lectores de pantalla más allá del genérico ya puesto ("Mapa Manos a la Obra") — aceptable.

### Mejoras opcionales (no implementadas en esta pasada, quedan documentadas)

- Blog: no existe contenido de blog real; por restricción explícita del encargo no se crea infraestructura de blog sin artículos reales que ofrecer. Cuando exista contenido, se recomienda ruta `/blog/` + `/blog/:slug/` reutilizando el mismo mecanismo de prerender + `additionalPrerenderRoutes`.
- Páginas de proyectos/portafolio: el sitio actual no tiene sección de proyectos/portafolio en el código; no se inventa contenido. Si en el futuro se añade, debe seguir el mismo patrón de ruta real + metadatos propios que se implementa aquí para Historia/Servicios/FAQ/Contacto.
- Migrar imágenes externas (`i.ibb.co`) a `public/` con formatos modernos (`webp`/`avif`) cuando se disponga de los archivos fuente.

## 3. Prioridades

### Crítica

| # | Problema | Impacto | Solución | Archivos | Riesgo |
|---|---|---|---|---|---|
| C1 | Plugin de prerender no registrado | Ninguna ruta aparte de `/` existe como HTML real; todo el sitio salvo home es invisible para crawlers | Registrar `vitePrerenderPlugin` en `vite.config.js` con `renderTarget:'#root'`, `prerenderScript` apuntando a `prerender.jsx`, `additionalPrerenderRoutes` con las 5 rutas conocidas | `vite.config.js` | Bajo: no cambia diseño, solo build |
| C2 | `App` ignora `initialPage` | Aunque se prerenderice, todas las páginas mostrarían "Inicio" | Aceptar `initialPage` en la firma y usarlo como estado inicial | `src/App.jsx` | Bajo |
| C3 | Sin routing por URL (pushState/popstate) | No hay URLs reales navegables ni de cliente; back/forward roto; enlaces no compartibles | Implementar mapeo ruta↔página, `history.pushState` en `goTo`, listener `popstate`, y enlaces `<a href>` reales en vez de solo botones | `src/App.jsx` | Medio: toca navegación central, requiere pruebas manuales exhaustivas |
| C4 | Metadatos fuera de `<head>` | Canonical no fiable, OG/Twitter no leídos por redes sociales, meta description no confiable | Extender el patrón de `upsert` a `document.head` (ya usado para favicons) a: title, description, canonical, OG, Twitter, robots, theme-color, JSON-LD; y usar `head.elements` del plugin de prerender para que el HTML estático ya los traiga sin depender de JS | `src/App.jsx`, `prerender.jsx` | Medio: hay que verificar visualmente que nada se rompe |

### Alta

| # | Problema | Impacto | Solución | Archivos | Riesgo |
|---|---|---|---|---|---|
| A1 | H1 ausente en páginas internas | Peor comprensión semántica/SEO de la jerarquía de contenido por página | Promover el `<h2>` principal de Historia/Servicios/FAQ/Contacto a `<h1>` | `src/App.jsx` | Bajo, solo cambia el tag |
| A2 | H1/H3 duplicados en FAQ | Contenido duplicado de encabezado en la misma página | Suprimir el `<h3>` de `FAQSection` cuando se usa dentro de `FAQPage` (`full`) | `src/App.jsx` | Bajo |
| A3 | `index.html` sin `lang` correcto ni fallback branded | Mala señal de idioma; mal preview si JS falla o antes de hidratar | `lang="es-EC"`, `<title>`/`<meta description>` de respaldo con la marca | `index.html` | Bajo |
| A4 | `robots.txt` committeado con dominio incorrecto | Confuso para builds/despliegues manuales fuera del workflow de CI | Cambiar a `www.mantarq.com` como valor por defecto coherente con `CNAME` | `public/robots.txt` | Bajo |

### Media / Baja

- Migrar imágenes externas a almacenamiento propio (`public/`) — pendiente de recibir activos.
- Alinear versiones de `@types/react`/`@types/react-dom` con la versión real de React instalada.
- Preparar infraestructura de blog/proyectos cuando exista contenido real.

## 4. Estrategia de arquitectura

**Se conserva la arquitectura actual: SPA en React + Vite, con prerenderizado estático vía `vite-prerender-plugin` (SSG por ruta) para GitHub Pages.** No se migra a Next.js/Remix ni se introduce SSR con servidor Node, porque:

- El hosting actual es GitHub Pages (estático, sin servidor) — SSR real requeriría cambiar de hosting, fuera de alcance y no solicitado.
- `vite-prerender-plugin` ya estaba integrado como dependencia y con script (`prerender.jsx`) casi completo — terminar de conectarlo es la solución de menor costo, menor riesgo y mayor compatibilidad con el stack existente.
- El resultado final es equivalente a SSG: cada ruta (`/`, `/historia/`, `/servicios/`, `/faq/`, `/contacto/`) obtiene su propio `index.html` con HTML completo (contenido + metadatos) generado en build time, servible por cualquier host estático, sin JS obligatorio para ser indexado, y con hidratación posterior que preserva la experiencia de SPA (animaciones de `framer-motion`, transición sin recarga completa al navegar dentro del sitio).

## 5. Estructura de información recomendada (ya existente, se preserva)

Rutas reales, una por vista de navbar, ya definidas en el contenido existente — no se inventan páginas nuevas:

- `/` — Inicio
- `/historia/` — Historia
- `/servicios/` — Servicios
- `/faq/` — Preguntas frecuentes
- `/contacto/` — Contacto

No se crean páginas de proyectos, blog ni ubicaciones por ciudad porque no existe contenido real para ellas en el repositorio (cumpliendo restricción de no inventar contenido).

## 6. Estrategia de marca

`COMPANY.brandName = "Manos a la Obra"` y `COMPANY.legalName = "MANTARQ S.A.S."` ya se usan de forma consistente (Navbar, Footer, JSON-LD `name`/`legalName`). Se mantiene esa distinción explícita en el structured data (`LocalBusiness`/`HomeAndConstructionBusiness` con ambos campos) para que Google entienda que son la misma entidad bajo dos denominaciones (comercial y legal), sin repetir la frase completa de forma antinatural en el copy visible (no se toca el copy existente).

## 7. Plan de implementación (orden de ejecución)

1. Registrar `vite-prerender-plugin` en `vite.config.js` (habilita todo lo demás).
2. Corregir `App.jsx` para aceptar `initialPage` y derivar la página inicial también de `window.location.pathname` en cliente puro (dev/sin prerender).
3. Implementar routing real: `pushState`/`popstate`, enlaces `<a href>` reales en Navbar/Footer con `preventDefault` + navegación SPA.
4. Mover metadatos (`title`, description, canonical, OG, Twitter, robots, JSON-LD) a `document.head` real vía upsert imperativo, y a `head.elements`/`head.title`/`head.lang` en `prerender.jsx` para que el HTML estático ya los incluya.
5. Corregir jerarquía de encabezados (H1 por página, quitar duplicado de FAQ).
6. Corregir `index.html` (`lang`, fallback de `title`/`description`) y `public/robots.txt` (dominio).
7. Build, lint, pruebas manuales completas (rutas directas, reload, back/forward, sitemap, robots, structured data, consola).

---

## Registro de cambios (Fase 3 completada — 2026-07-13)

### Cambios implementados

1. **`vite.config.js`** — se registró `vitePrerenderPlugin({ renderTarget: "#root", prerenderScript, additionalPrerenderRoutes: ["/", "/historia/", "/servicios/", "/faq/", "/contacto/"] })`. Antes no estaba activo; ahora `npm run build` genera un `index.html` real por cada ruta.
2. **`src/site-data.js` (nuevo)** — se extrajeron a este módulo los datos y funciones puras que antes vivían solo en `App.jsx` (`BRAND`, `COMPANY`, `META_BY_PAGE`, `SERVICES`, `FAQS`, `ICON_URL`, `pageFromPathname`, `normalizePath`, `withBase`, `buildLocalBusinessSchema`, `buildBreadcrumbSchema`, `buildFAQSchema`, `buildServicesSchema`). Se hizo así para que tanto `App.jsx` (cliente) como `prerender.jsx` (build-time) usen la misma fuente de verdad sin duplicar lógica, y para no romper el Fast Refresh de Vite (que exige que un archivo de componente solo exporte componentes).
3. **`src/App.jsx`**:
   - `App` ahora acepta `initialPage` y, si no viene (modo cliente puro sin prerender), deriva la página inicial de `window.location.pathname`.
   - Navegación real: `goTo()` hace `history.pushState` con la URL de cada página; se añadió un listener de `popstate` para que el botón atrás/adelante del navegador funcione.
   - Los enlaces del navbar (desktop y móvil) y del footer pasaron de `<button onClick>` a `<a href>` reales con manejo de click que permite abrir en pestaña nueva (`ctrl/cmd/shift/click central`) y hace `preventDefault` + navegación SPA en el resto de casos.
   - El componente `SEO` ya no devuelve `<meta>/<link>/<script>` como JSX (en React 18 esos nodos quedaban montados dentro de `<div id="root">`, es decir dentro de `<body>`, nunca en `<head>`). Ahora gestiona `document.head` de forma imperativa (título, meta description, robots, theme-color, canonical, Open Graph, Twitter Card, favicons y los `<script type="application/ld+json">`), igual que ya se hacía —de forma parcial— solo para favicons.
   - Se corrigió la jerarquía de encabezados: `HistoriaPage`, `ServiciosPage`, `ContactoPage` y `FAQPage` ahora usan `<h1>` como título principal (antes `<h2>`, sin ningún H1 en esas vistas).
   - Se eliminó el `<h3>` duplicado ("Preguntas frecuentes") que aparecía dos veces en `/faq/` (una vez como H1 de la página, otra como H3 de `FAQSection`); `FAQSection` ahora omite su propio título cuando se usa en modo `full`.
   - Limpieza de lint pre-existente sin cambiar comportamiento: bloques `catch {}` vacíos ahora tienen un comentario (`/* noop */`) para satisfacer `no-empty`, y un `catch (e)` con `e` sin usar pasó a `catch {}`.
4. **`prerender.jsx`** — reescrito para: resolver la página real a partir de `data.url` (vía `pageFromPathname`, la misma función que usa el cliente), calcular la URL canónica absoluta según `CUSTOM_DOMAIN`/`GITHUB_REPOSITORY` (misma lógica que `scripts/generate-sitemap.mjs`), y devolver `head: { lang: "es-EC", title, elements }` con meta description, robots, theme-color, canonical, Open Graph, Twitter Card y todos los `<script type="application/ld+json">` (local business, breadcrumb, FAQ, servicios) ya incluidos en el HTML estático de cada ruta — sin depender de que el navegador ejecute JavaScript.
5. **`index.html`** — `lang="en"` → `lang="es-EC"`; `<title>Vite + React</title>` → título de marca real. Se probó incluir también una meta description de respaldo, pero se retiró tras confirmar que el plugin de prerender no deduplica `<meta>` existentes: cada ruta generada terminaba con dos `<meta name="description">`. Como el build siempre pasa por el prerenderizado (tanto en CI como localmente), no hace falta un respaldo estático.
6. **`public/robots.txt`** — `Sitemap: https://romusmm.github.io/mantarq-web/sitemap.xml` (dominio obsoleto) → `https://www.mantarq.com/sitemap.xml`, coherente con `CNAME`. En producción `scripts/generate-sitemap.mjs` sigue siendo la fuente autoritativa (se ejecuta en CI después del build), este cambio solo corrige el valor por defecto committeado.
7. **`eslint.config.js`** — se añadió un override para `prerender.jsx` con globals de Node (`process`), ya que ese script corre en Node durante `vite build`, no en el navegador.
8. **`.claude/launch.json` (nuevo)** — configuración local para poder previsualizar `npm run preview` durante las pruebas de esta sesión.

### Archivos modificados/creados

`vite.config.js`, `src/App.jsx`, `src/site-data.js` (nuevo), `prerender.jsx`, `index.html`, `public/robots.txt`, `eslint.config.js`, `.claude/launch.json` (nuevo).

### Verificación realizada

- `npm run build`: genera `dist/index.html`, `dist/historia/index.html`, `dist/servicios/index.html`, `dist/faq/index.html`, `dist/contacto/index.html` — 5 documentos HTML completos e independientes (antes solo existía uno).
- Confirmado por inspección de cada archivo: `<title>` único, `<meta name="description">` único (sin duplicados), `<link rel="canonical">` apuntando a la URL absoluta correcta de esa ruta, exactamente un `<h1>` por página, y el número correcto de `<script type="application/ld+json">` por página (home: 1 — LocalBusiness; historia/contacto: 2 — + Breadcrumb; faq: 3 — + FAQPage; servicios: 7 — + 5 Service).
- `npm run lint`: 0 errores relacionados con los cambios de esta tarea. Quedan 2 errores pre-existentes no relacionados (ver "Riesgos probables").
- Probado con `npm run preview` (servidor estático real, igual que producción):
  - Carga directa de `/`, `/servicios/`, `/contacto/` (sin pasar por Inicio primero) → cada una muestra su propio contenido, título y H1 correctos desde el primer render.
  - Recarga completa (`location.reload()`) estando en `/historia/` → se mantiene en Historia (antes de este cambio, cualquier ruta que no fuera `/` habría mostrado el contenido de Inicio).
  - Navegación interna (click en enlaces del navbar/footer) actualiza la URL vía `pushState` sin recarga completa, y actualiza título/H1/canonical/meta description dinámicamente.
  - Botón "atrás" del navegador (`history.back()`) restaura correctamente la página anterior.
  - Sin errores en consola del navegador ni solicitudes de red fallidas en ninguna de las pruebas.
  - Menú móvil (hamburguesa) abre/cierra correctamente y sus enlaces navegan igual que el navbar de escritorio.
- `node scripts/generate-sitemap.mjs` con `CUSTOM_DOMAIN=www.mantarq.com`: genera `sitemap.xml` con las 5 URLs absolutas correctas y `robots.txt` apuntando al sitemap correcto.

### Riesgos conocidos / no corregidos (fuera de alcance de esta tarea)

- **2 errores de lint pre-existentes** (`'motion' is defined but never used` y `'As' is assigned a value but never used` en `src/App.jsx`) son falsos positivos: el proyecto no tiene instalado `eslint-plugin-react`, por lo que `no-unused-vars` no reconoce el uso de esas variables como nombre de etiqueta JSX (`<motion.nav>`, `<As>`). Existían antes de esta tarea y no se corrigieron porque arreglarlos de raíz requeriría añadir una dependencia nueva, fuera del alcance de esta tarea (restricción: no agregar dependencias innecesarias).
- Imágenes (logo y logos de clientes) siguen alojadas en `i.ibb.co` (hosting externo de terceros). No se migraron porque no se dispone de los archivos fuente originales; si el servicio cambia o cae, las imágenes se romperían. Recomendado: mover a `public/` cuando se tengan los archivos.
- `@types/react`/`@types/react-dom` en `devDependencies` siguen en `^19.x` mientras el runtime usa React `^18.3.1`. No afecta producción, solo autocompletado en el editor.

### Información empresarial pendiente de proporcionar

Ninguna requerida para los cambios de esta fase. Si en el futuro se agregan proyectos/portafolio o blog, se necesitará: contenido real (texto, fecha, autor si aplica) por cada elemento — no se debe generar contenido de relleno.

### Cómo mantener el SEO al agregar contenido nuevo

- **Nueva página de nivel superior** (ej. una ciudad, un servicio nuevo con página propia): añadir la ruta en `src/site-data.js` → `META_BY_PAGE` (con `title`, `desc`, `path` únicos), en `prerender.jsx` no hace falta tocar nada (usa `META_BY_PAGE` automáticamente), añadir la ruta a `additionalPrerenderRoutes` en `vite.config.js`, a `ROUTES` en `scripts/generate-sitemap.mjs`, y a `NAV_ITEMS`/enlaces donde corresponda en `src/App.jsx`.
- **Proyectos o blog**: seguir el mismo patrón — una entrada en `META_BY_PAGE` por cada URL indexable, con `title`/`desc` propios y no genéricos. No crear URLs sin contenido real.
- Cualquier página nueva debe tener exactamente un `<h1>`, meta description única, y (si aplica) su propio `BreadcrumbList` — ya se genera automáticamente vía `buildBreadcrumbSchema` para cualquier página distinta de `inicio`.
