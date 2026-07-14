# Estrategia de blog (sin implementar todavía)

No existen artículos reales, autores identificables ni material original en el repositorio. Por eso **no se publica `/blog/`** en esta fase — un blog vacío o con artículos genéricos generados sin experiencia real de la empresa no aporta valor y puede perjudicar la percepción de calidad del sitio.

Esta estrategia propone temas viables, cada uno atado a un servicio o hecho ya verídico del repositorio (`SERVICES`, `COMPANY`, historia de la empresa) — no se ha redactado ningún artículo.

| # | Tema | Intención de búsqueda | Página de servicio a la que apoya | Evidencia/experiencia que debería aportar la empresa | Fotografías/datos necesarios | Autor o revisor sugerido | Riesgo de contenido genérico | Prioridad |
|---|---|---|---|---|---|---|---|---|
| 1 | Cómo elegir el sistema correcto de paredes de gypsum para oficinas comerciales | Informacional, previa a contratar | Paredes Gypsum (`#paredes-gypsum`) | Criterios reales que usa el equipo técnico para recomendar un sistema u otro | Fotos de instalaciones propias, ejemplos reales | Responsable técnico del servicio | Alto si se redacta sin detalle técnico propio — evitar genérico | Media |
| 2 | Mantenimiento eléctrico preventivo en edificios comerciales e industriales: qué se revisa | Informacional/transaccional | Sistema Eléctrico (`#sistema-electrico`) | Checklist real de mantenimiento que aplica la empresa | Fotos de tableros/canalizaciones reales (con permiso del cliente si aplica) | Técnico eléctrico responsable | Medio | Media |
| 3 | Pintura industrial vs. pintura decorativa: diferencias y cuándo usar cada una | Informacional | Pintura Integral (`#pintura-integral`) | Casos reales donde se recomendó una u otra según el entorno | Fotos de acabados propios | Encargado del área de pintura | Medio | Baja |
| 4 | Qué considerar al instalar puertas y fachadas de aluminio en locales comerciales | Informacional/transaccional | Puertas de Aluminio (`#puertas-aluminio`) | Criterios reales de diseño/seguridad que aplica la empresa | Fotos de proyectos propios | Responsable de fabricación/instalación | Medio | Baja |
| 5 | Cubiertas metálicas: mantenimiento preventivo para evitar filtraciones | Informacional | Cubiertas Metálicas (`#cubiertas-metalicas`) | Señales de alerta reales que el equipo identifica en inspecciones | Fotos de cubiertas antes/después (con autorización) | Técnico responsable de cubiertas | Medio | Media |
| 6 | De Cuenca a cobertura nacional: la evolución de Manos a la Obra desde 2014 | Marca / posicionamiento de entidad | Historia | Detalle real de los hitos ya listados en `HistoriaPage` (2014, 2015-2018, 2019, 2022) — ampliar con contexto real, no inventado | Fotos históricas si existen | Dirección de la empresa | Bajo (ya hay hechos base verídicos) — evitar añadir cifras no verificadas | Alta |

## Condiciones para implementar `/blog/`

Solo cuando exista al menos un artículo real que cumpla: autor identificable, experiencia u opinión propia de la empresa (no reescritura genérica de fuentes externas), material original (fotos o datos propios cuando aplique), y capacidad demostrada de mantener el contenido actualizado. En ese momento, implementar `/blog/` y `/blog/:slug/` con: autor, fecha, contenido semántico, metadatos propios, `Article` schema, breadcrumbs, enlaces internos hacia el servicio relacionado, inclusión en sitemap y prerenderizado — siguiendo el mismo patrón ya usado para las rutas actuales (`META_BY_PAGE` / `site-data.js`).

No se redactan artículos ni se genera contenido masivo con IA en esta fase.
