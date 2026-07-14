# Contenido faltante — Fase 2 SEO

Este documento no inventa contenido. Enumera, por página o elemento, qué información necesita proporcionar el propietario para que una mejora concreta sea posible sin fabricar datos.

| Información faltante | Página que la necesita | Razón | Formato requerido | Ejemplo de estructura (sin inventar contenido) | Prioridad | ¿Bloquea publicación? |
|---|---|---|---|---|---|---|
| Contenido diferenciado por servicio (proceso de trabajo, público objetivo, casos de uso, preguntas específicas) | Servicios → posibles páginas individuales futuras | Cada servicio hoy solo tiene una frase de ~20-25 palabras; no hay contenido original y diferenciado suficiente para una URL propia | Texto redactado por el propietario o el equipo técnico, por servicio | `{ slug, resumen (1-2 frases), proceso o forma de trabajo real, para quién es útil, 1-2 casos de uso reales, 2-3 preguntas específicas con respuesta }` | Alta | Sí, para crear una página individual de ese servicio |
| Fotografías propias por servicio | Servicios (páginas individuales futuras) | No existen imágenes propias de los trabajos realizados por servicio; solo hay logos de clientes | Imágenes propiedad de la empresa, con autorización de uso, en formato optimizable (WebP/JPG) | — | Alta | Sí |
| Proyectos reales (nombre, descripción, ubicación general, servicio relacionado, alcance, resultados, autorización de publicación) | `/proyectos/` (no existe) | No hay ningún proyecto documentado en el repositorio | Uno por proyecto, siguiendo `PROJECT_CONTENT_TEMPLATE.md` | Ver plantilla | Alta | Sí, bloquea toda la sección de proyectos |
| Artículos reales con autor identificable | `/blog/` (no existe) | No hay ningún artículo redactado ni tema con evidencia propia de la empresa | Uno por artículo, siguiendo `BLOG_CONTENT_STRATEGY.md` | Ver estrategia | Media | Sí, bloquea el blog |
| Certificaciones, premios o normativas específicas que la empresa cumpla realmente | Servicios / Historia | El copy actual ya evita afirmar certificaciones no verificadas; si existen, deben mencionarse con el nombre exacto y, de ser posible, evidencia pública | Nombre de la certificación/norma + entidad emisora + vigencia | — | Media | No |
| Testimonios o reseñas reales de clientes (con consentimiento) | Home / Servicios | Hoy no se muestran testimonios ni ratings — correcto mientras no existan reseñas reales verificables; si el propietario las consigue, pueden añadirse sin usar `AggregateRating`/`Review` inventados | Texto del cliente + nombre/empresa + consentimiento explícito de publicación | — | Baja | No |
| Cifras verificables (años de experiencia ya cubiertos por Historia, pero número de proyectos, clientes atendidos, etc.) | Home / Historia | No se deben inventar cifras; si el propietario las tiene y puede sustentarlas, pueden incorporarse | Cifra + fuente/forma de verificación interna | — | Baja | No |

## Criterios cualitativos para decidir si un servicio merece página individual

No se usa ningún mínimo de palabras. Un servicio es candidato a página propia cuando, en conjunto, se puede documentar:

- Contenido original y diferenciado (no una reformulación de la frase ya existente en `/servicios/`).
- Alcance real del servicio (qué incluye y qué no).
- Problemas concretos que resuelve para el cliente.
- Proceso o forma de trabajo verificable (no genérico ni copiado de otro servicio).
- Al menos un caso de uso o proyecto real asociado.
- Fotografías propias del trabajo realizado.
- Preguntas específicas de ese servicio (distintas de las 5 preguntas generales de `/faq/`).
- Utilidad suficiente para que un visitante real tome una decisión distinta a la que ya tomaría en `/servicios/`.

Mientras un servicio no reúna esto, se mantiene dentro de `/servicios/` (con su ancla `id` propia) en vez de publicarse como página delgada.
