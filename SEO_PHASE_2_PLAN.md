# Fase 2 SEO — Plan de arquitectura de contenidos y consolidación de marca

Aprobado por el propietario el 2026-07-14, con correcciones incorporadas en tres rondas de revisión (ver "Historial de revisión" al final).

## 1. Resumen del estado actual

Fase 1 (commits `097c178`, `d5ef6bd`, en `origin/main` y **confirmado desplegado en vivo** en `www.mantarq.com`) resolvió el problema estructural: el sitio pasó de SPA 100% client-side a prerenderizado real por ruta (`/`, `/historia/`, `/servicios/`, `/faq/`, `/contacto/`), con título/description únicos, canonical, OG, JSON-LD y un H1 por página, y navegación con `pushState`/`popstate`.

Verificación de línea base repetida en esta fase: `npm run build` genera las 5 rutas correctamente; `npm run lint` solo muestra 2 errores pre-existentes sin relación (falsos positivos `motion`/`As` por falta de `eslint-plugin-react`); fetch en vivo a `www.mantarq.com/` y `/servicios/` confirma HTML prerenderizado correcto por ruta. No hay regresión de Fase 1 que bloquee avanzar, salvo el hallazgo puntual descrito abajo.

Fase 2 no toca framework, hosting ni prerenderizado. Se limita a contenido, enlazado interno y datos estructurados.

## 2. Matriz de intenciones y páginas

| Intención | Página | Nota |
|---|---|---|
| Manos a la Obra Ecuador | Home | consolidada; sin landing exact-match nueva |
| Manos a la Obra, MANTARQ S.A.S. | Home | relación reforzada en prosa, sin repetir la frase completa de forma forzada |
| MANTARQ / MANTARQ Ecuador | Home | ya aparece "MANTARQ" en el `<title>`; reforzado con `alternateName` en JSON-LD |
| Historia de la empresa | Historia | + cierre con CTA a Servicios/Contacto |
| Servicios generales | Servicios | única página de servicios por ahora |
| Servicio específico | Servicios (ancla `id`) | mejora de navegación/deep-linking, no sustituto de URL propia |
| Preguntas frecuentes | FAQ | + enlace contextual a Contacto restaurado |
| Contactar | Contacto | sin cambios |

## 3. Contenido real disponible

- `COMPANY` (`src/site-data.js`): nombre legal/comercial, oficina única en Cuenca, contacto, redes oficiales, coordenadas. Cobertura "Guayaquil y cobertura nacional" confirmada como veraz por el propietario (equipos que viajan por proyecto, sin oficina física) — no se modifica.
- `SERVICES` (5): Paredes Gypsum, Sistema Eléctrico, Pintura Integral, Puertas de Aluminio, Cubiertas Metálicas — cada uno solo tiene icono + nombre + una frase de ~20-25 palabras. Sin proceso de trabajo, público objetivo, casos reales, imágenes propias ni FAQs específicas.
- `FAQS` (5, genéricas de empresa, no atadas a servicio).
- `HistoriaPage`: timeline de 5 hitos (2014→hoy), sin cifras ni nombres de cliente. Sin enlaces salientes (se corrige).
- 8 logos de clientes reales (carrusel Home).
- Sin proyectos/portafolio ni artículos de blog en el repositorio.

## 4. Páginas que conviene mejorar

Home (relación de marca en prosa), Historia (CTAs de cierre), Servicios (anclas + link a Historia), FAQ (CTA de conversión restaurado), Footer (refuerzo de nombres de marca, visible en las 5 rutas).

## 5. Páginas nuevas que conviene crear

Ninguna. No se crean `/manos-a-la-obra-ecuador/`, páginas de servicio individuales, `/proyectos/` ni `/blog/` — ver razones en las secciones 6 y 12.

## 6. Páginas que no deben crearse

- **`/manos-a-la-obra-ecuador/`**: no existe una intención de búsqueda ni contenido sustancialmente diferentes de Home/Historia — repetiría presentación de empresa, servicios, relación de marcas, ubicación y CTAs, generando duplicación temática y competencia interna innecesaria entre páginas propias. Home queda consolidada como página objetivo para esa consulta.
- **Páginas individuales por servicio**: cada servicio hoy solo tiene una frase de 20-25 palabras — no hay contenido original y diferenciado suficiente (ver criterios cualitativos en `SEO_CONTENT_GAPS.md`). Publicar una URL por servicio hoy produciría contenido delgado.
- **`/proyectos/`**: no existen proyectos reales documentados en el repositorio (sin nombre, descripción, imágenes, ubicación, alcance).
- **`/blog/`**: no existen artículos reales, autores identificables ni material original para publicar.

## 7. Riesgos de contenido duplicado o canibalización

- `/manos-a-la-obra-ecuador/` habría canibalizado a Home para la misma intención — evitado al no crearla.
- El nuevo `@graph` de JSON-LD podría duplicar información de organización en cada ruta si no se referencia por `@id`; se evita emitiendo el nodo completo de `WebSite`/`Organization` solo en Home y referenciándolo por `@id` en el resto (ver sección 10).
- La frase de conexión de marca en Home reutiliza el mismo dato ("2014", "Cuenca") ya presente en Historia — es repetición intencional y mínima (un dato, no un párrafo), no duplicación de contenido sustancial.

## 8. Cambios de arquitectura

Ninguno a nivel de framework/rutas. Los únicos cambios estructurales son: (a) consolidación del grafo JSON-LD con `@id` estables y un único `@graph` por página, y (b) anclas `id` internas dentro de `/servicios/` (no son rutas nuevas).

## 9. Cambios de navegación

- `HistoriaPage`: agrega dos CTAs de cierre ("Conoce nuestros servicios" → Servicios, "Contáctanos" → Contacto).
- `ServiciosPage`: agrega un enlace contextual hacia Historia ("Conoce nuestra trayectoria desde 2014").
- `FAQSection`/`FAQPage`: se restaura el CTA "Escríbenos → Contacto" en modo `full` (hoy solo se suprime el título duplicado, no el CTA).
- Footer: refuerza en texto (no solo en logo) el par "Manos a la Obra" / "MANTARQ S.A.S.".

## 10. Cambios de datos estructurados

Se consolida todo el JSON-LD de cada página en **un único** `<script type="application/ld+json">` con `"@graph": [...]`, usando `@id` estables para permitir referencias cruzadas sin duplicar información completa:

- **Home** (`https://www.mantarq.com/#organization`, `#website`, `#webpage`): emite los nodos **completos** de:
  - `HomeAndConstructionBusiness` (`@id: #organization`): `name: "Manos a la Obra"`, `legalName: "MANTARQ S.A.S."`, `alternateName: "MANTARQ"`, dirección, teléfono, email, geo, `sameAs`, `areaServed`, `hasMap` (sin cambios respecto a los datos ya existentes, solo se agrega `@id` y `alternateName`).
  - `WebSite` (`@id: #website`): `name: "Manos a la Obra"`, `alternateName: "MANTARQ"`, `publisher: {"@id": "#organization"}`. (Los dos `alternateName: "MANTARQ"` —en organización y en sitio— son intencionales: uno identifica una alternativa del nombre del sitio y el otro del nombre de la organización.)
  - `WebPage` (`@id: #webpage`): `isPartOf: {"@id": "#website"}`, `about: {"@id": "#organization"}`.
- **Páginas internas** (`/historia/`, `/servicios/`, `/faq/`, `/contacto/`): **no** repiten los nodos completos de `WebSite`/`Organization`. Solo incluyen:
  - `WebPage` propio de la ruta, con `isPartOf`/`about` referenciando `https://www.mantarq.com/#website` y `#organization` por `@id` (sin duplicar sus datos), y `breadcrumb: {"@id": "{canonical}#breadcrumb"}`.
  - `BreadcrumbList` propio (ya existente, se le agrega `@id` estable).
  - Nodos específicos de la página: `Service` x5 en `/servicios/`, `FAQPage` en `/faq/`.
- **`FAQPage` schema**: se conserva únicamente como marcado semántico Schema.org (no añade complejidad ni mantenimiento especial — es una función pura ya existente). **No se presenta ni se documenta como oportunidad de resultado enriquecido, ranking o apariencia especial en Google**: Google retiró el soporte de rich results para FAQ en mayo de 2026 y la documentación correspondiente en junio de 2026. La página y su contenido de preguntas frecuentes se conservan sin cambios.
- Objetivo declarado de estos cambios: **consistencia y comprensión de entidad** para motores de búsqueda (desambiguar "Manos a la Obra" / "MANTARQ" / "MANTARQ S.A.S." como la misma entidad), no una promesa de mejora directa de ranking ni de resultados enriquecidos.

## 11. Cambios de enlazado interno

- Home → Servicios (ya existente) y ahora también mención/enlace a Historia junto a la frase de marca.
- Historia → Servicios y Contacto (nuevo).
- Servicios → Contacto (ya existente) y ahora también → Historia (nuevo).
- FAQ → Contacto (restaurado).
- Anclas internas por servicio dentro de `/servicios/` (nuevo) — mejora de navegación y deep-linking, no un mecanismo de posicionamiento independiente.

## 12. Contenido o recursos que faltan

Documentado en tres archivos nuevos, sin fabricar contenido:

- `SEO_CONTENT_GAPS.md`: qué falta por servicio para justificar página propia (criterios cualitativos, sin mínimo de palabras arbitrario).
- `PROJECT_CONTENT_TEMPLATE.md`: qué información/archivos debe proporcionar el propietario por proyecto.
- `BLOG_CONTENT_STRATEGY.md`: temas viables atados a hechos ya verídicos del repositorio, sin redactar artículos.

## 13. Orden de implementación

1. Restaurar CTA de `/faq/` (mejora de UX/conversión, no incidencia crítica de SEO — la página conserva navbar/footer navegables).
2. CTAs de cierre en Historia.
3. Frase de conexión de marca en Home + refuerzo en Footer.
4. Enlace cruzado Servicios → Historia.
5. Anclas `id` por servicio + `alt` factual de logos de clientes.
6. Refactor de JSON-LD a `@graph` único con `@id` (Home completo, internas por referencia).
7. Documentos de contenido faltante (gaps, proyectos, blog).
8. Verificación completa (build, lint, preview, rutas, sitemap, robots) y revisión independiente del diff.

## 14. Pruebas que demostrarán que el resultado funciona

- `npm run build` genera las 5 rutas sin error, cada una con un único `<script type="application/ld+json">` cuyo `@graph` es JSON válido.
- Inspección por ruta: un H1, título/description únicos, canonical, OG sin cambios respecto a Fase 1.
- Home contiene los nodos completos de `Organization`/`WebSite`; las 4 páginas internas solo referencian esos `@id` sin duplicar sus campos.
- `/historia/` y `/faq/` tienen al menos un enlace de salida nuevo verificable en el DOM.
- `npm run preview`: navegación directa + recarga en las 5 rutas, back/forward, menú móvil, formulario de contacto — sin errores de consola.
- `node scripts/generate-sitemap.mjs` sigue listando solo las 5 URLs existentes.
- Revisión independiente de un subagente comparando el diff contra este documento y `SEO_PHASE_2.md`.

## Clasificación de prioridad por cambio

| Cambio | Prioridad |
|---|---|
| CTA `/faq/` restaurado | Alta (UX/conversión/enlazado) |
| CTAs de cierre en Historia | Alta |
| Frase de marca en Home + Footer | Alta |
| Enlace cruzado Servicios↔Historia | Media |
| Anclas `id` por servicio | Media (navegación/deep-linking, no SEO de alto impacto) |
| `alt` factual de logos | Media |
| JSON-LD `@graph`/`@id`/`WebSite`/`WebPage` | Media (consistencia de entidad, no promesa de ranking) |
| `SEO_CONTENT_GAPS.md` / `PROJECT_CONTENT_TEMPLATE.md` / `BLOG_CONTENT_STRATEGY.md` | Alta (documentación) |
| Páginas individuales de servicio, `/proyectos/`, `/blog/` | Bloqueada por falta de contenido |

## Historial de revisión

1. **Borrador inicial** (agente de diseño independiente): validó decisiones A–I, propuso grafo JSON-LD con nodos completos repetidos por página.
2. **Corrección del propietario (ronda 1, 8 puntos)**: eliminar "presupuesto de rastreo" como justificación; reclasificar CTA de FAQ como mejora UX no crítica; eliminar mínimo arbitrario de palabras; corregir estrategia de `alt` de logos (breve y factual, sin inventar relación comercial); evitar duplicar "Manos a la Obra" dentro de `alternateName`; documentar que el `@graph` mejora consistencia de entidad, no ranking directo; clasificar anclas como navegación, no SEO de alto impacto; frase de Home natural, sin repetición forzada.
3. **Corrección del propietario (ronda 2, 3 puntos)**: no repetir los nodos completos de `WebSite`/`Organization` en cada ruta — solo en Home, referenciados por `@id` en el resto; documentar que Google retiró rich results de FAQ (mayo 2026) y su documentación (junio 2026), sin presentar `FAQPage` como oportunidad de rich result; confirmar que los dos `alternateName: "MANTARQ"` (organización y sitio) son válidos por identificar alternativas de nombres distintos.

Plan aprobado para implementación completa el 2026-07-14. Sin commit/push salvo solicitud explícita.
