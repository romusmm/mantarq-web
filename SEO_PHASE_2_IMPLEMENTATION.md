# Fase 2 SEO — Registro de implementación

Fecha: 2026-07-14. Repositorio: `mantarq-web`. Plan de referencia: `SEO_PHASE_2_PLAN.md`.

## 1. Análisis realizado

Verificación de línea base (Fase 1 ya desplegada y confirmada en vivo en `www.mantarq.com`), auditoría de contenido real (`SERVICES`, `FAQS`, `HistoriaPage`, `CLIENT_LOGOS`, `COMPANY`), matriz de intenciones→páginas, y detección de una regresión de Fase 1 (CTA de `/faq/` accidentalmente oculto). El plan fue revisado por un agente de diseño independiente y corregido en 3 rondas directas con el propietario antes de aprobarse (ver `SEO_PHASE_2_PLAN.md`, sección "Historial de revisión").

## 2. Decisión sobre la página objetivo para "Manos a la Obra Ecuador"

**Home**, consolidada. No se crea `/manos-a-la-obra-ecuador/`: no existe una intención de búsqueda ni contenido sustancialmente diferentes de Home/Historia; crearla generaría duplicación temática y competencia interna innecesaria entre páginas propias.

## 3. Páginas mejoradas

- **Home**: nueva frase que conecta explícitamente "Manos a la Obra" como nombre comercial de "MANTARQ S.A.S." (con el dato ya verídico "desde 2014 en Cuenca, cobertura nacional") y enlace a Historia.
- **Historia**: 2 CTAs de cierre nuevos ("Conoce nuestros servicios" → Servicios, "Contáctanos" → Contacto) — antes tenía 0 enlaces salientes.
- **Servicios**: enlace contextual nuevo a Historia; `id` ancla estable por tarjeta de servicio (deep-linking).
- **FAQ**: CTA "Escríbenos → Contacto" restaurado (regresión de Fase 1 corregida).
- **Footer** (visible en las 5 rutas): nueva frase reforzando el par "Manos a la Obra" / "MANTARQ S.A.S." en texto, no solo en el logo/maquetación.

## 4. Páginas creadas

Ninguna ruta nueva. Los cambios son de contenido/enlazado dentro de las 5 rutas ya existentes.

## 5. Páginas descartadas y razón

- `/manos-a-la-obra-ecuador/`: ver punto 2.
- Páginas individuales por servicio: cada uno de los 5 servicios solo tiene icono + nombre + una frase de ~20-25 palabras — sin proceso de trabajo, público objetivo, casos reales, imágenes propias ni FAQs específicas. Publicar una URL por servicio hoy sería contenido delgado. Documentado en `SEO_CONTENT_GAPS.md`.
- `/proyectos/`: no existe ningún proyecto real documentado en el repositorio. Documentado en `PROJECT_CONTENT_TEMPLATE.md`.
- `/blog/`: no existen artículos reales ni autores identificables. Documentado en `BLOG_CONTENT_STRATEGY.md`.

## 6. Servicios con página propia

Ninguno todavía — ver punto 5 y `SEO_CONTENT_GAPS.md` para los criterios cualitativos (sin mínimo de palabras arbitrario) que un servicio debe cumplir para justificarla.

## 7. Servicios mantenidos en la página general

Los 5: Paredes Gypsum, Sistema Eléctrico, Pintura Integral, Puertas de Aluminio, Cubiertas Metálicas — cada uno ahora con un `id` ancla estable (`#paredes-gypsum`, `#sistema-electrico`, `#pintura-integral`, `#puertas-aluminio`, `#cubiertas-metalicas`) para deep-linking, sin ser sustituto de una URL individual.

## 8. Cambios de schema

Se reescribió `buildLocalBusinessSchema`/`buildBreadcrumbSchema`/`buildFAQSchema`/`buildServicesSchema` (antes funciones sueltas que generaban scripts JSON-LD independientes) en una única función `buildPageGraph()` (`src/site-data.js`) que arma **un solo `@graph` por página**, usado tanto por `prerender.jsx` (HTML estático) como por el componente `SEO` en `src/App.jsx` (actualización client-side al navegar):

- **Home** emite los nodos completos: `HomeAndConstructionBusiness` (`@id` estable, `alternateName: "MANTARQ"` agregado) y `WebSite` (`@id` estable, `name: "Manos a la Obra"`, `alternateName: "MANTARQ"`, `publisher` → `@id` de la organización).
- **Las 4 páginas internas** (Historia, Servicios, FAQ, Contacto) **no repiten** esos nodos completos — solo su propio `WebPage` (con `isPartOf`/`about` referenciando los `@id` de Home) y su propio `BreadcrumbList` (ahora con `@id` estable), más los nodos específicos de la ruta (`Service` x5 en Servicios, `FAQPage` en FAQ).
- `FAQPage` se conserva únicamente como marcado semántico Schema.org (función pura, sin lógica ni mantenimiento adicional) — **no se presenta como oportunidad de rich result**: Google retiró el soporte de resultados enriquecidos para FAQ en mayo de 2026 y su documentación en junio de 2026.
- Objetivo declarado: consistencia y comprensión de entidad (desambiguar "Manos a la Obra" / "MANTARQ" / "MANTARQ S.A.S." como la misma entidad) — no se documenta como promesa de mejora de ranking ni de resultados enriquecidos.

## 9. Cambios de navegación

Historia → Servicios y Contacto (nuevo). Servicios → Contacto (ya existente) y → Historia (nuevo). FAQ → Contacto (restaurado). Además, **todos** los CTAs internos que antes eran `<button onClick>` disparando `goTo(...)` (Hero "Conócenos", Historia, Servicios "Ir a contacto", ServiciosCTA "Ver servicios", FAQ "Escríbenos") se convirtieron a `<a href>` reales (vía la prop `as="a"` ya soportada por el componente `Button`), para que sean rastreables sin depender de JavaScript — no solo los del navbar/footer, que ya lo eran desde Fase 1.

## 10. Cambios de imágenes

`alt` de los 8 logos de clientes corregido de `{nombre}` plano a `"Logo de {nombre}"` — breve, factual, sin agregar relación comercial ni palabras clave que la imagen no comunique. No se migraron imágenes de `i.ibb.co` (mismo riesgo documentado en Fase 1: sin archivos fuente propios confirmados).

## 11. Archivos modificados

`src/App.jsx`, `src/site-data.js`, `prerender.jsx`. Nuevos: `SEO_PHASE_2_PLAN.md`, `SEO_CONTENT_GAPS.md`, `PROJECT_CONTENT_TEMPLATE.md`, `BLOG_CONTENT_STRATEGY.md`, `SEO_PHASE_2_IMPLEMENTATION.md` (este archivo). Actualizados: `SEO_AUDIT_AND_IMPLEMENTATION.md`, `activity.md`.

## 12. Pruebas ejecutadas

- `npm run build`: 5 rutas prerenderizadas sin error.
- `npm run lint`: sin errores nuevos (solo los 2 pre-existentes ya documentados en Fase 1, sin relación con esta fase).
- Inspección directa del HTML generado en `dist/`: un único `<script type="application/ld+json" id="ld-graph">` por página; Home con nodos completos de organización/sitio; las 4 internas solo con referencias `@id` (sin duplicar campos); conteo de `<a href>` internos confirma las 5 rutas enlazadas desde cada página.
- `npm run preview`: navegación directa a las 5 rutas, recarga completa en cada una, sin errores de consola ni requests de red fallidas; confirmado que `/historia/` y `/faq/` ahora tienen enlaces de salida (antes: 0 y 0 tras la regresión, respectivamente); anclas por servicio verificadas en `/servicios/`.
- `node scripts/generate-sitemap.mjs`: sigue listando exactamente las 5 URLs existentes — ninguna ancla ni ruta nueva se agregó.
- Revisión independiente vía subagente sobre el diff completo contra `SEO_PHASE_2.md`/`SEO_PHASE_2_PLAN.md`/`SEO_AUDIT_AND_IMPLEMENTATION.md`: ver punto 19.

## 13. Resultados de build y lint

Build: éxito, 5 páginas prerenderizadas (`/`, `/historia/`, `/servicios/`, `/faq/`, `/contacto/`). Lint: 2 errores, ambos pre-existentes de antes de esta fase (`'motion' is defined but never used` y `'As' is assigned a value but never used` en `src/App.jsx` — falsos positivos por falta de `eslint-plugin-react` en la configuración; no se agregó esa dependencia por no ser necesaria para el objetivo de esta fase).

## 14. Problemas pendientes

Ver punto 19 (hallazgos de la revisión independiente, si los hubo) y `SEO_CONTENT_GAPS.md` para el contenido que falta por servicio.

## 15. Contenido que debe proporcionar el propietario

Ver el detalle completo en `SEO_CONTENT_GAPS.md` (servicios), `PROJECT_CONTENT_TEMPLATE.md` (proyectos) y `BLOG_CONTENT_STRATEGY.md` (artículos). En resumen: contenido diferenciado y fotografías propias por servicio; proyectos reales con autorización de publicación; artículos con autor identificable y experiencia propia de la empresa.

## 16. Cómo agregar un nuevo servicio

1. Agregar la entrada en `SERVICES` (`src/site-data.js`) con `slug`, `icon`, `name`, `desc`.
2. El `id` ancla y el nodo `Service` en el JSON-LD se generan automáticamente (`ServiciosPage` usa `s.slug` como `id`; `buildPageGraph` incluye todos los `SERVICES` en `/servicios/`).
3. Si el servicio acumula contenido suficiente (ver criterios en `SEO_CONTENT_GAPS.md`) para una página propia: agregar una entrada en `META_BY_PAGE`, una ruta en `additionalPrerenderRoutes` (`vite.config.js`) y en `ROUTES` (`scripts/generate-sitemap.mjs`), y un enlace desde `/servicios/`.

## 17. Cómo agregar un proyecto

No aplica todavía (no existe `/proyectos/`). Cuando el propietario entregue al menos un proyecto real completo según `PROJECT_CONTENT_TEMPLATE.md`, implementar siguiendo el mismo patrón: fuente de datos en `site-data.js`, rutas prerenderizadas, metadatos propios, inclusión en sitemap.

## 18. Cómo agregar un artículo en el futuro

No aplica todavía (no existe `/blog/`). Cuando exista al menos un artículo real (autor identificable, experiencia propia, material original), implementar `/blog/` y `/blog/:slug/` siguiendo `BLOG_CONTENT_STRATEGY.md` y el mismo patrón de `site-data.js` + prerenderizado + sitemap.

## 19. Revisión independiente

Se lanzó un subagente independiente (sin contexto previo de esta sesión) a auditar el `git diff` completo contra `SEO_PHASE_2.md`, `SEO_PHASE_2_PLAN.md` y `SEO_AUDIT_AND_IMPLEMENTATION.md`, buscando exclusivamente: requisitos omitidos, errores de rutas, problemas de indexación, contenido duplicado, datos inventados, regresiones, fallos de accesibilidad y problemas de mantenibilidad.

**Hallazgos y resolución:**

1. **`Service.provider` con `LocalBusiness` inline en vez de referencia `@id` (medio, real)** — `buildServiceNodes()` generaba, para cada uno de los 5 servicios en `/servicios/`, un nodo `provider` embebido (`{"@type": "LocalBusiness", name, url}`) en lugar de referenciar la organización ya declarada en Home por `@id`. Esto contradecía el propio objetivo del refactor de evitar duplicar/inconsistencias de entidad. **Corregido**: ahora `provider: {"@id": orgId}`, verificado en el HTML generado.
2. **`SEO_PHASE_2_IMPLEMENTATION.md` "prometido pero no creado"** — falso positivo por carrera de tiempos: el subagente revisó el repo mientras este archivo se estaba escribiendo en paralelo en la sesión principal. El archivo existe y tiene el contenido completo exigido por `SEO_PHASE_2.md`.
3. Sin hallazgos de: regresiones de Fase 1, datos inventados, contenido duplicado sustancial (el `@graph` evita correctamente repetir `Organization`/`WebSite` fuera de Home), rutas rotas, o problemas de mantenibilidad (`buildPageGraph` es la única fuente usada tanto por `prerender.jsx` como por `App.jsx`).
4. Confirmado como preexistente y de bajo impacto (no introducido en esta fase): patrón `<a><Button></a>` anidado en los enlaces de WhatsApp — los `Button as="a"` nuevos de esta fase no repiten ese anidamiento.

Tras aplicar la corrección del punto 1, se volvió a ejecutar `npm run build` + `npm run lint` (sin errores nuevos) y se reinspeccionó el JSON-LD de `/servicios/` para confirmar el `@id` correcto en los 5 nodos `Service`.

## 20. Riesgos conocidos y recomendaciones para Fase 3

- Imágenes externas en `i.ibb.co` (logo, logos de clientes) sin migrar — riesgo si el servicio cambia o cae (heredado de Fase 1).
- 2 errores de lint pre-existentes sin corregir (requerirían `eslint-plugin-react`).
- Cuando exista contenido real de servicios/proyectos/blog, priorizar en Fase 3: (a) primer servicio con página propia (el que tenga más contenido diferenciado disponible), (b) primer proyecto real publicado, (c) 1-2 artículos del `BLOG_CONTENT_STRATEGY.md` con mayor evidencia propia disponible.
- Considerar recolectar reseñas/testimonios reales con consentimiento explícito para reforzar confianza sin usar `AggregateRating`/`Review` inventados.

No se hizo commit ni push en esta fase.

---

## 21. Ronda de corrección (revisión post-implementación, 2026-07-14)

Tras la implementación inicial de Fase 2, el propietario pidió una revisión y corrección explícita de 12 puntos sobre el código ya escrito (sin commit/push hasta entonces). Este apartado registra qué se encontró y qué se corrigió.

### Contexto empresarial confirmado

Se diferenciaron explícitamente tres valores en `COMPANY` (`src/site-data.js`): `publicName: "Manos a la Obra, MANTARQ S.A.S."`, `brandName: "Manos a la Obra"`, `legalName: "MANTARQ S.A.S."`. Se agregaron campos explícitos de ubicación: `officeCity: "Cuenca"`, `officeRegion: "Azuay"`, `officeCountry: "EC"`, `officeDisplayLocation: "Cuenca, Ecuador"`, `serviceArea: "Ecuador"` — reemplazando el campo genérico `city` anterior. Esto permite distinguir en todo el código entre **oficina física** (Cuenca) y **cobertura de proyectos** (todo Ecuador, incluido Guayaquil vía desplazamiento de equipos, no oficina). Se ajustaron `META_BY_PAGE`, la frase de marca en Home/Footer, y la respuesta de FAQ sobre ciudades atendidas para reflejar esta distinción.

### 1. FAQ en HTML prerenderizado

`AccordionItem` usaba `useState` + `AnimatePresence`/`motion.div`, montando la respuesta solo cuando `open===true` — invisible para crawlers y para el HTML estático. Reemplazado por `<details>`/`<summary>` nativo (sin JS de por medio): la respuesta ahora vive siempre en el DOM (oculta por el navegador vía el atributo `open`, no por React), visible en el HTML crudo. El icono `ChevronDown` rota vía CSS (`group-open:rotate-180`, sin estado). Verificado: `dist/index.html` y `dist/faq/index.html` contienen literalmente el texto de las 5 respuestas.

### 2. Scroll simplificado

`useScrollTopOnRoute` tenía 2 `setTimeout` + 2 `requestAnimationFrame` redundantes. Se simplificó a una sola llamada — pero con una corrección importante descubierta en el proceso: el sitio define `scroll-behavior: smooth` globalmente (`src/index.css`), y `behavior: "auto"` **respeta** esa preferencia (anima el salto) en vez de forzarlo instantáneo; solo `behavior: "instant"` lo sobreescribe. Además, se detectó que un `scrollTo` instantáneo **síncrono** en el mismo ciclo de commit interfiere con la medición de salida de `AnimatePresence` (ver hallazgo de pruebas más abajo), por lo que la llamada se difiere un frame vía `requestAnimationFrame`. Resultado: una sola llamada real, comportamiento instantáneo correcto, sin los timers redundantes.

### 3–5. Ubicación, nombre público y datos estructurados

`buildPageGraph`/`buildOrganizationNode`/`buildWebsiteNode`/`buildServiceNodes` (`src/site-data.js`) actualizados:
- Organización: `name: COMPANY.publicName` ("Manos a la Obra, MANTARQ S.A.S."), `legalName`, `alternateName: [brandName, "MANTARQ"]`, `logo: ICON_URL`, `address` con `officeCity`/`officeRegion`/`officeCountry`, `areaServed: [serviceArea, officeCity, "Guayaquil"]`, `sameAs` ahora incluye LinkedIn (antes solo Facebook/Instagram).
- `WebSite`: `name: brandName`, `alternateName: "MANTARQ"` (intencionalmente igual al de la organización — identifican alternativas de nombres de entidades distintas).
- `Service`: cada nodo ahora tiene `@id` estable (`{canonical}#service-{slug}`), `url` apuntando a `/servicios/`, y `provider: {"@id": orgId}` (ya corregido en la ronda anterior).
- Verificado en `dist/index.html`: el `@graph` de Home contiene exactamente estos campos (ver comando de verificación en la sección de pruebas).

### 6. Botones anidados en enlaces

Se encontraron 5 instancias del patrón `<a href=...><Button>...</Button></a>` (WhatsApp en Navbar desktop/móvil, Hero, Servicios "Solicitar cotización", Contacto "WhatsApp directo") — botón real anidado dentro de un enlace real, HTML inválido y confuso para lectores de pantalla. Todas convertidas a `<Button as="a" href=... target="_blank" rel="noreferrer">` (el componente `Button` ya soportaba `as` para renderizar como cualquier etiqueta). Verificado con una búsqueda de patrón `<a...><button` sobre los 5 HTML generados: cero coincidencias.

### 7. Formulario de contacto

Cada campo (`nombre`, `email`, `empresa`, `teléfono`, `mensaje`) recibió `id` único, `<label htmlFor>` asociado, y `autoComplete` (`name`, `email`, `organization`, `tel` respectivamente); el campo teléfono además pasó a `type="tel"`. El mensaje de éxito usa `role="status" aria-live="polite"`; el de error, `role="alert"`. Se conservó el envío vía FormSubmit y el fallback por `mailto:`.

### 8. Carrusel de logos

La copia duplicada (usada solo para el loop visual continuo) ahora lleva `aria-hidden="true"` en cada tarjeta y `alt=""` en su imagen — evita que lectores de pantalla anuncien los mismos 8 logos dos veces. La primera copia conserva su `alt` factual (`"Logo de {nombre}"`). Para `prefers-reduced-motion: reduce`, la animación se detiene por completo (`animation: none`, antes solo se alargaba a 56s).

### 9. Textos alternativos

El logo principal (`BrandLogo`) cambió de `alt="Logo"` a `alt={COMPANY.publicName}` ("Manos a la Obra, MANTARQ S.A.S.").

### 10. Copy empresarial

Se revisaron y suavizaron expresiones absolutas/no verificables: "Consolidados como referente de mantenimiento empresarial en Ecuador" → "Seguimos brindando servicios de mantenimiento empresarial en Ecuador"; "compromiso con la excelencia" → "compromiso con la calidad"; se quitó "cumplimiento normativo" y "acabados premium" (Servicios/Pintura Integral) por afirmaciones no verificables desde el contenido disponible; "Respuesta rápida garantizada" → "Te responderemos a la brevedad". `META_BY_PAGE` y la respuesta de FAQ sobre ciudades se reescribieron para distinguir oficina (Cuenca) de cobertura de proyectos (Guayaquil y todo el país, vía desplazamiento de equipos).

### 11. Limpieza de código

- Eliminada la constante `TIMELINE` (y su único consumidor, `CURRENT_YEAR` a nivel de módulo) — estaba duplicada por el array `STEPS` local de `HistoriaPage` y no se usaba en ningún otro lado.
- Medición de Core Web Vitals (`onCLS`/`onINP`/`onLCP`) ahora solo se ejecuta si `import.meta.env.DEV` es verdadero — no corre en producción.
- Se instaló `eslint-plugin-react` (devDependency) y se habilitó únicamente la regla `react/jsx-uses-vars` (sin adoptar el ruleset `recommended` completo, para no introducir reglas nuevas no solicitadas). Esto resuelve el falso positivo de `no-unused-vars` sobre `motion` y `As`, que solo se usaban como nombre de etiqueta JSX (`<motion.nav>`, `<As>`) — un caso que `no-unused-vars` no reconoce sin esta regla.
- `npm run lint` termina con **0 errores** (antes: 2 falsos positivos documentados).

### Hallazgo de pruebas: interferencia entre scroll instantáneo síncrono y `AnimatePresence`

Durante la verificación de navegación se detectó que un `window.scrollTo(..., {behavior: "instant"})` ejecutado de forma síncrona en el mismo ciclo de render que un cambio de página podía dejar la transición de `AnimatePresence` (`mode="wait"`) sin completar — el título/URL/estado de navegación se actualizaban correctamente pero el contenido visible de la página no cambiaba. Se corrigió difiriendo el scroll un frame vía `requestAnimationFrame` (ver punto 2), lo que resolvió el caso de una sola transición de forma consistente.

Sin embargo, se confirmó por separado (comparando contra el código ya mergeado de la fase anterior, sin ninguno de los cambios de esta sesión) que la combinación `AnimatePresence mode="wait"` + navegaciones repetidas ya presentaba comportamiento inconsistente **antes** de esta sesión también, y que se reproduce de forma más marcada en el navegador automatizado usado para las pruebas porque **la pestaña de prueba corre en segundo plano** (`document.hidden === true`, `document.hasFocus() === false`), condición en la que los navegadores pausan/throttlean `requestAnimationFrame` y las animaciones CSS — justamente el mecanismo del que depende `framer-motion` para detectar que una animación de salida terminó. No se pudo confirmar si esto afecta a usuarios reales (con la pestaña visible y enfocada) fuera de este entorno de prueba automatizado. Se documenta aquí de forma transparente en vez de reportarse como resuelto sin evidencia sólida; no estaba en el alcance de los 12 puntos solicitados y no se continuó investigando más allá de aislar la causa. Recomendación para Fase 3: probar la navegación manualmente en un navegador real (pestaña visible) y, si el problema persiste, considerar reemplazar `mode="wait"` por `mode="sync"` o quitar la animación de transición de página.

### Pruebas ejecutadas en esta ronda

- `npm run build`: éxito, 5 rutas prerenderizadas.
- `npm run lint`: **0 errores** (ver punto 11).
- Verificación estática sobre los 5 HTML generados: 1 `<h1>` por página, título/description únicos, canonical correcto, **cero** patrones `<a><button` anidados, `<details>` con las respuestas de FAQ presentes en `dist/index.html` y `dist/faq/index.html`, formulario con `id`/`label for` asociados correctamente.
- JSON-LD de Home verificado con Node: `name` público completo, `legalName`, `alternateName` (organización y sitio), oficina Cuenca/Azuay/EC, `areaServed` con Ecuador/Cuenca/Guayaquil, `sameAs` con Facebook/Instagram/LinkedIn, `logo`.
- `node scripts/generate-sitemap.mjs`: sigue listando exactamente las 5 URLs.
- Navegación SPA (click → cambio de página) verificada exitosamente de forma aislada (recarga limpia + click único + espera); la limitación de pruebas con múltiples navegaciones rápidas en el mismo entorno automatizado se documenta arriba.

### Archivos modificados en esta ronda

`src/site-data.js`, `src/App.jsx`, `prerender.jsx`, `eslint.config.js`, `package.json`/`package-lock.json` (nueva devDependency `eslint-plugin-react`).

No se hizo commit ni push en esta ronda de corrección.
