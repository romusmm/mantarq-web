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

### Cómo continuar si se interrumpe la sesión (estado al cierre de Fase 1)
1. Todo lo planeado en esa pasada (Fase 1) está **completo y verificado** — ver `SEO_AUDIT_AND_IMPLEMENTATION.md` sección "Registro de cambios" para el detalle exacto de qué se tocó y por qué.
2. Antes de tocar nada nuevo: `npm run build` (debe generar 5 HTML en `dist/`), `npm run lint` (solo deben quedar los 2 errores pre-existentes documentados), `npm run preview` y probar navegación directa + recarga en cada ruta.
3. Para añadir contenido nuevo (páginas, proyectos, blog), seguir la guía al final de `SEO_AUDIT_AND_IMPLEMENTATION.md` ("Cómo mantener el SEO al agregar contenido nuevo").

## 2026-07-14 — Fase 2 SEO (arquitectura de contenidos y consolidación de marca)

### Analizado
- Releído `SEO_PHASE_2.md`, `SEO_AUDIT_AND_IMPLEMENTATION.md`, `activity.md`, `package.json`, `git log`/`git status` para confirmar que Fase 1 seguía intacta antes de tocar nada.
- Verificación de línea base: `npm run build` (5 rutas OK), `npm run lint` (2 errores pre-existentes, sin cambios), y **fetch en vivo a `www.mantarq.com/`, `/servicios/`, `/historia/`** confirmando que Fase 1 ya está desplegada y sirviendo contenido correcto por ruta en producción.
- Inventario de contenido real: `SERVICES` (5, solo nombre + una frase cada uno — sin proceso, público objetivo, casos reales, imágenes propias ni FAQs específicas), `FAQS` (5 genéricas), `HistoriaPage` (timeline sin ningún enlace saliente), 8 logos de clientes reales, sin proyectos ni artículos de blog en el repo.
- Hallazgo: en Fase 1, al arreglar el H3 duplicado de `/faq/`, quedó también oculto el CTA "Escríbenos → Contacto" (mismo `!full` condicionaba ambos). Reclasificado como mejora de UX/conversión, no incidencia crítica de SEO (la página conservaba navbar/footer).
- Decisión (confirmada con el propietario): **no crear** `/manos-a-la-obra-ecuador/` — repetiría Home/Historia sin intención ni contenido distintos.
- Proceso de planificación: agente de diseño independiente validó arquitectura + grafo JSON-LD; 3 rondas de corrección directa del propietario sobre el plan (ver `SEO_PHASE_2_PLAN.md`, sección "Historial de revisión") antes de aprobar implementación.

### Modificado
- `src/App.jsx`: CTA de `/faq/` restaurado (desacoplado del `!full` que solo debía ocultar el título duplicado); `HistoriaPage` recibe `goTo` y agrega 2 CTAs de cierre (Servicios, Contacto); `ServiciosPage` agrega enlace contextual a Historia; tarjetas de servicio en `/servicios/` con `id` ancla estable (`slug` de `SERVICES`); `alt` de logos de clientes corregido a formato breve/factual (`"Logo de {nombre}"`, antes solo `{nombre}`); frase nueva en `Hero` conectando "Manos a la Obra" como nombre comercial de "MANTARQ S.A.S." (con enlace a Historia); `Footer` refuerza el mismo par de nombres en prosa (visible en las 5 rutas); todos los CTAs internos que llamaban `goTo(...)` desde un `<button>` se convirtieron a `<a href>` reales (vía `Button as="a"`) para que sean rastreables sin JS, no solo los del navbar/footer.
- `src/site-data.js`: `SERVICES` con campo `slug` por servicio; JSON-LD reescrito por completo — nuevo `buildPageGraph()` que arma un único `@graph` por página con `@id` estables: **Home** emite los nodos completos de `HomeAndConstructionBusiness` (`alternateName: "MANTARQ"` agregado) y `WebSite` (`alternateName: "MANTARQ"`, `publisher` → organización); las **4 páginas internas** no repiten esos nodos completos, solo los referencian por `@id` desde su propio `WebPage`/`BreadcrumbList`, más los nodos específicos de esa ruta (`Service` x5 en Servicios, `FAQPage` en FAQ — este último documentado explícitamente como marcado semántico, sin promesa de rich result). Se eliminaron las funciones sueltas `buildLocalBusinessSchema`/`buildBreadcrumbSchema`/`buildFAQSchema`/`buildServicesSchema` como API pública (ahora son helpers internos usados solo por `buildPageGraph`).
- `prerender.jsx`: usa `buildPageGraph()` en vez de armar 4 scripts JSON-LD sueltos — ahora un único `<script id="ld-graph">` por ruta, igual en cliente y en el HTML estático prerenderizado.
- Documentos nuevos: `SEO_PHASE_2_PLAN.md` (plan aprobado, con historial de las 3 rondas de corrección), `SEO_CONTENT_GAPS.md` (criterios cualitativos —sin mínimo de palabras— para justificar página propia por servicio, más huecos de proyectos/testimonios/cifras), `PROJECT_CONTENT_TEMPLATE.md` (qué debe entregar el propietario por proyecto; no se crea `/proyectos/`), `BLOG_CONTENT_STRATEGY.md` (6 temas atados a servicios/historia reales; no se crea `/blog/`, no se redactó ningún artículo).

### Verificación
- `npm run build` + `npm run lint`: limpio (solo los 2 errores pre-existentes de siempre).
- Por ruta: un único `<script type="application/ld+json" id="ld-graph">` con JSON válido; Home con nodos completos de organización/sitio; las 4 internas solo con `@id` de referencia (sin duplicar campos) — confirmado inspeccionando el HTML generado en `dist/`.
- `npm run preview`: navegación directa a las 5 rutas, recarga, sin errores de consola ni requests fallidos; `/historia/` y `/faq/` confirmadas con enlaces de salida nuevos (antes: 0 en Historia, 0 en FAQ tras la regresión de Fase 1); anclas por servicio presentes en `/servicios/`; conteo de `<a href>` internos por ruta confirma las 5 rutas enlazadas de forma rastreable desde cada página (incluyendo los CTAs, no solo nav/footer).
- `node scripts/generate-sitemap.mjs`: sigue listando exactamente las 5 URLs — ninguna ancla ni ruta nueva se agregó al sitemap.
- Revisión independiente vía subagente: ver resultado y cualquier corrección aplicada en `SEO_PHASE_2_IMPLEMENTATION.md`.

### Falta / decisiones pendientes
- Igual que Fase 1: imágenes en `i.ibb.co` sin migrar (pendiente de archivos fuente del propietario); 2 errores de lint pre-existentes sin tocar.
- Servicios individuales, `/proyectos/` y `/blog/`: bloqueados por falta de contenido real, documentado en los 3 archivos nuevos — no se generó contenido de relleno.

### Cómo continuar si se interrumpe la sesión
1. Ver `SEO_PHASE_2_PLAN.md` para el plan completo aprobado (con las 3 rondas de corrección) y `SEO_PHASE_2_IMPLEMENTATION.md` para el registro final de qué se implementó.
2. Antes de tocar nada nuevo: `npm run build`, `npm run lint`, `npm run preview` y repetir las comprobaciones de rutas/enlaces/JSON-LD descritas arriba.
3. Para servicios individuales/proyectos/blog reales en el futuro, seguir `SEO_CONTENT_GAPS.md` / `PROJECT_CONTENT_TEMPLATE.md` / `BLOG_CONTENT_STRATEGY.md` respectivamente.
