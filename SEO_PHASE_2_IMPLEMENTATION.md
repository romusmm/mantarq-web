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
