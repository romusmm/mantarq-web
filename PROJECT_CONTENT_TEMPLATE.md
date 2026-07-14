# Plantilla de contenido por proyecto

No existen proyectos documentados en el repositorio actual (sin nombre, descripción, imágenes, ubicación ni alcance de ningún proyecto real). Por eso no se implementa `/proyectos/` ni `/proyectos/:slug/` en esta fase — publicar la sección sin contenido real produciría una sección vacía o tarjetas genéricas, algo que este proyecto evita explícitamente.

Cuando el propietario quiera publicar proyectos reales, cada uno debe entregarse con esta información mínima:

| Campo | Descripción | Obligatorio |
|---|---|---|
| Nombre público del proyecto | Nombre con el que se mostrará (puede omitir el nombre del cliente si no hay autorización) | Sí |
| Resumen | 1-2 frases: qué se hizo | Sí |
| Problema inicial | Qué necesidad o problema tenía el cliente | Sí |
| Solución | Qué hizo la empresa para resolverlo | Sí |
| Servicio relacionado | Cuál de los servicios existentes (`paredes-gypsum`, `sistema-electrico`, `pintura-integral`, `puertas-aluminio`, `cubiertas-metalicas`) o combinación | Sí |
| Ciudad o ubicación publicable | Solo si el cliente autoriza mencionarla | No |
| Fecha | Mes/año de ejecución o entrega | Sí |
| Superficie u otra métrica, si es publicable | Ej. m² intervenidos | No |
| Fotografías | Archivos propios, en buena resolución, con autorización de uso | Sí (al menos 1) |
| Texto alternativo por fotografía | Descripción breve y factual de lo que muestra cada imagen | Sí |
| Autorización | Confirmación explícita de que el cliente permite publicar nombre/ubicación/fotos | Sí |
| Testimonio, si existe | Cita textual del cliente, con su consentimiento | No |
| Resultados | Qué logró el cliente con el trabajo (sin inventar cifras no verificadas) | No |
| Llamada a la acción relacionada | A qué página enlazar desde el proyecto (normalmente Contacto o el servicio relacionado) | Sí |

## Cuándo se implementa `/proyectos/`

Solo cuando exista al menos un proyecto real con todos los campos obligatorios completos. La implementación seguirá el mismo patrón ya usado para `META_BY_PAGE`/`site-data.js`: una fuente de datos mantenible (no componentes duplicados por proyecto), rutas prerenderizadas (`/proyectos/`, `/proyectos/:slug/`), metadatos propios, breadcrumbs, inclusión en sitemap solo cuando el contenido sea real e indexable, y enlaces desde Servicios (por el campo "servicio relacionado") y desde el listado general.
