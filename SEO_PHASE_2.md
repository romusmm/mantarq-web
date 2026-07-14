\# Fase 2 SEO — Arquitectura de contenidos, servicios y consolidación de marca



Actúa como ingeniero senior de frontend y especialista en SEO técnico, arquitectura de información, SEO local, datos estructurados, rendimiento y optimización de conversión.



Estás trabajando en el repositorio real del sitio web de:



\*\*Manos a la Obra, MANTARQ S.A.S.\*\*



Esta tarea es la continuación directa de una primera fase de auditoría e implementación técnica.



\## Documentos obligatorios



Antes de formular cualquier solución, lee completos:



\* `SEO\_AUDIT\_AND\_IMPLEMENTATION.md`

\* `activity.md`

\* `CLAUDE.md`

\* `package.json`

\* los archivos actuales del proyecto;

\* el diff y el historial reciente de Git necesario para comprender la fase anterior.



No repitas desde cero la auditoría técnica ya completada. Verifica que sus conclusiones todavía correspondan al código actual y utiliza la implementación existente como línea base.



\## Estado esperado de la fase anterior



La fase 1 ya debería haber resuelto:



\* prerenderizado estático por ruta;

\* rutas reales para Inicio, Historia, Servicios, FAQ y Contacto;

\* navegación con enlaces rastreables;

\* acceso directo y recarga de rutas internas;

\* metadatos dentro de `<head>`;

\* títulos y descripciones por ruta;

\* canonical;

\* Open Graph y Twitter Cards;

\* datos estructurados;

\* sitemap;

\* robots.txt;

\* idioma `es-EC`;

\* un H1 principal por página;

\* funcionamiento de `pushState` y `popstate`.



No deshagas estas decisiones ni sustituyas React, Vite, GitHub Pages o el sistema de prerenderizado salvo que encuentres un defecto confirmado que obligue a corregirlos.



\## Objetivo de la fase 2



Mejorar la capacidad del sitio para:



1\. Posicionarse como resultado oficial de la marca \*\*“Manos a la Obra, MANTARQ S.A.S.”\*\*.

2\. Reforzar su relación con búsquedas como:



&#x20;  \* Manos a la Obra Ecuador;

&#x20;  \* Manos a la Obra MANTARQ;

&#x20;  \* MANTARQ;

&#x20;  \* MANTARQ Ecuador;

&#x20;  \* Manos a la Obra arquitectura;

&#x20;  \* Manos a la Obra construcción;

&#x20;  \* búsquedas relacionadas con sus servicios reales.

3\. Dar suficiente profundidad y utilidad a las páginas principales.

4\. Permitir que cada servicio importante pueda posicionarse individualmente cuando exista contenido auténtico suficiente.

5\. Preparar una estructura sostenible para incorporar proyectos y contenido editorial real en el futuro.

6\. Mejorar el enlazado interno, la comprensión de la entidad, la experiencia del usuario y la conversión.

7\. Mantener el rendimiento, diseño, accesibilidad y funcionamiento alcanzados en la fase 1.



Esta fase se limita al sitio web y al repositorio. No modifiques Google Business Profile, redes sociales, DNS, Search Console, Google Ads ni servicios externos.



\---



\# Modo de trabajo obligatorio



\## Si estás en Plan Mode



Durante Plan Mode:



1\. Inspecciona el proyecto.

2\. Evalúa el contenido disponible.

3\. Define la arquitectura recomendada.

4\. Crea un plan preciso.

5\. No modifiques archivos todavía.

6\. Presenta qué cambios ejecutarías, qué contenido real reutilizarías y qué no puede implementarse por falta de información.

7\. Espera la aprobación del plan antes de editar.



\## Después de aprobarse el plan



Implementa directamente las mejoras aprobadas.



No te limites a producir recomendaciones. Modifica el código, ejecuta las pruebas y documenta el resultado.



\---



\# Fase A — Verificación de la línea base



Antes de diseñar la nueva arquitectura:



1\. Ejecuta:



&#x20;  \* instalación de dependencias si es necesaria;

&#x20;  \* build de producción;

&#x20;  \* linter;

&#x20;  \* comprobación de tipos, si existe;

&#x20;  \* preview local.

2\. Verifica que las cinco rutas existentes sigan generándose correctamente.

3\. Comprueba por cada ruta:



&#x20;  \* HTML prerenderizado;

&#x20;  \* código de respuesta esperado en el entorno disponible;

&#x20;  \* título;

&#x20;  \* meta description;

&#x20;  \* canonical;

&#x20;  \* H1;

&#x20;  \* Open Graph;

&#x20;  \* datos estructurados;

&#x20;  \* navegación directa;

&#x20;  \* recarga;

&#x20;  \* botones atrás y adelante.

4\. Si tienes acceso de red, prueba también las rutas desplegadas en `www.mantarq.com`.

5\. No avances sobre una base rota. Corrige primero cualquier regresión real de la fase 1.



\---



\# Fase B — Auditoría de contenido e intención de búsqueda



Realiza un inventario del contenido real presente en el repositorio.



Determina:



1\. Qué servicios ofrece realmente la empresa.

2\. Cuáles servicios aparecen solo como tarjetas o fragmentos.

3\. Cuánto contenido único existe para cada servicio.

4\. Qué información de marca, empresa, equipo, ubicación, contacto y experiencia está disponible.

5\. Qué fotografías y recursos propios existen.

6\. Qué afirmaciones están respaldadas por el contenido actual.

7\. Qué información se repite entre Inicio, Historia, Servicios, FAQ y Contacto.

8\. Qué páginas tienen contenido demasiado superficial.

9\. Qué preguntas reales del cliente ya están respondidas.

10\. Qué preguntas importantes siguen sin respuesta.

11\. Qué enlaces internos existen y cuáles faltan.

12\. Qué llamadas a la acción existen.

13\. Si el usuario puede comprender rápidamente:



&#x20;   \* qué hace la empresa;

&#x20;   \* en qué lugar opera;

&#x20;   \* cuáles son sus servicios;

&#x20;   \* por qué debería contactarla;

&#x20;   \* cuál es la relación entre “Manos a la Obra” y “MANTARQ S.A.S.”.



\## Mapa de consultas a páginas



Crea una matriz que asigne cada intención a una sola página principal.



Como mínimo, evalúa:



| Intención                         | Página candidata               |

| --------------------------------- | ------------------------------ |

| Manos a la Obra Ecuador           | Home                           |

| Manos a la Obra, MANTARQ S.A.S.   | Home                           |

| MANTARQ Ecuador                   | Home o Historia                |

| Historia de la empresa            | Historia                       |

| Servicios generales               | Servicios                      |

| Servicio específico               | Página individual del servicio |

| Preguntas frecuentes              | FAQ                            |

| Contactar o solicitar información | Contacto                       |



Evita que dos páginas intenten posicionarse para exactamente la misma intención sin una diferencia clara.



\## Decisión sobre `/manos-a-la-obra-ecuador/`



Analiza expresamente si debe existir una ruta:



`/manos-a-la-obra-ecuador/`



No la crees automáticamente.



Solo créala si puede ofrecer una intención y contenido sustancialmente distintos de Inicio e Historia.



Si la página terminaría repitiendo:



\* la presentación de la empresa;

\* los servicios;

\* la relación entre las marcas;

\* la ubicación;

\* los mismos llamados a la acción;



entonces no la implementes. En ese caso, consolida la home como la página principal para la búsqueda “Manos a la Obra Ecuador”.



Documenta la decisión y su justificación.



\---



\# Fase C — Plan de arquitectura de contenidos



Antes de modificar código, crea:



`SEO\_PHASE\_2\_PLAN.md`



Debe incluir:



1\. Resumen del estado actual.

2\. Matriz de intenciones y páginas.

3\. Contenido real disponible.

4\. Páginas que conviene mejorar.

5\. Páginas nuevas que conviene crear.

6\. Páginas que no deben crearse.

7\. Riesgos de contenido duplicado o canibalización.

8\. Cambios de arquitectura.

9\. Cambios de navegación.

10\. Cambios de datos estructurados.

11\. Cambios de enlazado interno.

12\. Contenido o recursos que faltan.

13\. Orden de implementación.

14\. Pruebas que demostrarán que el resultado funciona.



Clasifica cada propuesta como:



\* crítica;

\* alta;

\* media;

\* opcional;

\* bloqueada por falta de contenido.



\---



\# Fase D — Consolidación de la página principal y de la entidad



Evalúa y mejora la página principal para que sea la representación oficial y principal de:



\*\*Manos a la Obra, MANTARQ S.A.S.\*\*



Debe permitir entender naturalmente:



\* nombre completo del negocio;

\* relación entre “Manos a la Obra” y “MANTARQ S.A.S.”;

\* servicios principales;

\* ubicación o área real de servicio;

\* propuesta de valor;

\* acceso a servicios;

\* acceso a contacto;

\* señales de confianza disponibles.



No conviertas la home en un bloque de palabras clave.



No repitas “Manos a la Obra Ecuador” mecánicamente.



No inventes:



\* años de experiencia;

\* número de proyectos;

\* premios;

\* certificaciones;

\* clientes;

\* testimonios;

\* garantías;

\* ciudades atendidas;

\* materiales;

\* especialidades;

\* personal;

\* resultados.



Aprovecha y reorganiza únicamente información verificable existente en el repositorio.



La home debe funcionar como una página útil para usuarios reales, no como una landing artificial creada para Google.



\---



\# Fase E — Páginas individuales de servicios



Analiza los servicios reales definidos en el proyecto.



Para cada servicio, decide entre:



\## Opción 1: página individual indexable



Créala solo cuando exista suficiente contenido auténtico para diferenciarla.



Cada página deberá tener:



\* ruta permanente y descriptiva;

\* título único;

\* meta description única;

\* canonical propio;

\* H1 único;

\* explicación concreta del servicio;

\* para quién es útil;

\* alcance real;

\* proceso o forma de trabajo, únicamente si consta en la información disponible;

\* preguntas relevantes;

\* llamada a la acción;

\* enlaces hacia Servicios, FAQ y Contacto;

\* breadcrumb;

\* datos estructurados apropiados cuando correspondan;

\* HTML prerenderizado;

\* inclusión en sitemap;

\* enlaces rastreables desde el resto del sitio.



\## Opción 2: mantenerlo dentro de `/servicios/`



Si el contenido disponible para un servicio es demasiado escaso o repetitivo, no publiques una página delgada.



Mantén el servicio dentro de la página general y registra exactamente qué contenido faltaría para justificar una URL independiente.



\## Arquitectura técnica



Cuando se creen páginas de servicios:



1\. Utiliza una fuente de datos mantenible.

2\. Evita copiar componentes completos por cada servicio.

3\. Conserva la posibilidad de asignar:



&#x20;  \* slug;

&#x20;  \* nombre;

&#x20;  \* resumen;

&#x20;  \* contenido;

&#x20;  \* metadatos;

&#x20;  \* preguntas;

&#x20;  \* imágenes;

&#x20;  \* schema;

&#x20;  \* enlaces relacionados.

4\. Integra las rutas con:



&#x20;  \* `META\_BY\_PAGE` o la estructura que la haya sustituido;

&#x20;  \* prerenderizado;

&#x20;  \* sitemap;

&#x20;  \* navegación interna;

&#x20;  \* breadcrumbs;

&#x20;  \* canonical;

&#x20;  \* structured data.

5\. No agregues rutas al sitemap hasta que tengan contenido indexable real.



\---



\# Fase F — Proyectos y portafolio



Comprueba si el repositorio contiene proyectos reales con:



\* nombre;

\* descripción;

\* imágenes;

\* ubicación general;

\* servicio relacionado;

\* alcance;

\* resultados;

\* autorización razonable para publicación.



\## Si existen proyectos suficientes



Implementa:



\* `/proyectos/`;

\* `/proyectos/:slug/`;

\* listado de proyectos;

\* página individual por proyecto;

\* navegación e interenlazado;

\* metadatos;

\* breadcrumbs;

\* imágenes accesibles;

\* prerenderizado;

\* sitemap.



\## Si no existen contenidos suficientes



No publiques:



\* una sección vacía;

\* proyectos ficticios;

\* tarjetas con texto genérico;

\* rutas indexables sin contenido.



En su lugar, crea:



`PROJECT\_CONTENT\_TEMPLATE.md`



Debe indicar exactamente qué información y archivos deben proporcionarse por proyecto:



\* nombre público;

\* resumen;

\* problema inicial;

\* solución;

\* servicio;

\* ciudad o ubicación publicable;

\* fecha;

\* superficie, si es publicable;

\* fotografías;

\* texto alternativo;

\* autorización;

\* testimonio, si existe;

\* resultados;

\* llamada a la acción relacionada.



No desarrolles infraestructura innecesaria que quede muerta si todavía no existe ningún proyecto para mostrar.



\---



\# Fase G — Blog



No implementes un blog únicamente porque “un blog ayuda al SEO”.



Primero determina si existen:



\* artículos reales;

\* temas respaldados por experiencia de la empresa;

\* autores identificables;

\* capacidad de mantener el contenido;

\* material original;

\* imágenes;

\* casos reales.



\## Si no hay artículos reales



No publiques `/blog/` ni artículos vacíos.



Crea únicamente:



`BLOG\_CONTENT\_STRATEGY.md`



Incluye:



1\. Temas estrechamente relacionados con los servicios reales.

2\. Intención de búsqueda de cada tema.

3\. Página de servicio a la que apoyaría.

4\. Experiencia o evidencia que debería aportar la empresa.

5\. Fotografías, datos o ejemplos necesarios.

6\. Autor o profesional que debería revisar el artículo.

7\. Riesgo de producir contenido genérico.

8\. Prioridad sugerida.



No redactes decenas de artículos automáticamente.



\## Si sí existen artículos auténticos



Implementa la infraestructura completa:



\* `/blog/`;

\* `/blog/:slug/`;

\* autor;

\* fecha;

\* contenido semántico;

\* metadatos;

\* Article schema;

\* breadcrumbs;

\* enlaces internos;

\* sitemap;

\* prerenderizado.



\---



\# Fase H — Datos estructurados y entidad



Audita los datos estructurados existentes y mejora solo lo justificable.



Evalúa:



\* `Organization`;

\* `LocalBusiness` o el subtipo actual;

\* `WebSite`;

\* `WebPage`;

\* `BreadcrumbList`;

\* `Service`;

\* `FAQPage`;

\* otros tipos realmente aplicables.



Asegura:



1\. Un `@id` estable para la organización.

2\. Referencias coherentes entre WebSite, WebPage y organización.

3\. Nombre comercial y nombre legal correctamente representados.

4\. Uso de `alternateName` únicamente cuando sea verdadero.

5\. `sameAs` únicamente con perfiles oficiales confirmados.

6\. Logo, URL, teléfono, dirección y área de servicio solo cuando estén disponibles.

7\. Ausencia de datos falsos.

8\. Ausencia de reseñas o ratings inventados.

9\. Correspondencia entre schema y contenido visible.

10\. Que no se emitan esquemas incompatibles o duplicados.



No añadas schema únicamente para aumentar la cantidad de JSON-LD.



\---



\# Fase I — Enlazado interno y navegación



Mejora la arquitectura de enlaces para que:



\* Inicio enlace a servicios principales;

\* Servicios enlace a páginas individuales válidas;

\* páginas individuales enlacen a Contacto;

\* FAQ enlace a servicios relacionados cuando sea natural;

\* Historia enlace a Inicio, Servicios o Contacto;

\* nuevas páginas no queden huérfanas;

\* todos los enlaces sean `<a href>` rastreables;

\* el texto de enlace sea descriptivo;

\* se mantenga la navegación SPA sin impedir acceso directo.



No satures el footer ni el navbar con todas las URLs.



Diseña una jerarquía comprensible.



\---



\# Fase J — Imágenes y activos



Revisa:



\* logo;

\* imagen social;

\* fotografías;

\* logos de clientes;

\* imágenes externas de `i.ibb.co`;

\* tamaño;

\* dimensiones;

\* texto alternativo;

\* carga diferida;

\* formatos;

\* estabilidad visual;

\* dependencia de terceros.



Si los archivos externos son claramente activos de la empresa, son descargables y pueden migrarse de forma segura:



\* muévelos a almacenamiento propio dentro del proyecto;

\* conserva su calidad;

\* actualiza referencias;

\* verifica que no se rompa ninguna imagen.



Si no puedes confirmar propiedad, disponibilidad o calidad:



\* no los sustituyas;

\* documenta el riesgo;

\* especifica qué archivos originales debe proporcionar el propietario.



No generes imágenes ficticias ni sustituyas fotografías reales por imágenes genéricas.



\---



\# Fase K — Conversión y experiencia



Sin rediseñar el sitio innecesariamente, evalúa:



\* claridad de la propuesta principal;

\* facilidad para identificar servicios;

\* visibilidad de teléfono, WhatsApp u otros medios existentes;

\* contacto desde cada servicio;

\* claridad del formulario;

\* navegación móvil;

\* confianza;

\* accesibilidad;

\* consistencia de llamadas a la acción;

\* ausencia de callejones sin salida.



Implementa únicamente mejoras compatibles con el diseño actual.



No conviertas todas las secciones en botones comerciales ni uses mensajes agresivos.



\---



\# Fase L — Información faltante



Crea:



`SEO\_CONTENT\_GAPS.md`



Incluye una tabla concreta con:



\* información faltante;

\* página que la necesita;

\* razón;

\* formato requerido;

\* ejemplo de estructura, sin inventar el contenido;

\* prioridad;

\* si bloquea o no la publicación.



Debe servir para que el propietario entregue después contenido utilizable.



No detengas toda la fase por datos faltantes. Implementa lo que pueda hacerse con seguridad y documenta el resto.



\---



\# Restricciones obligatorias



1\. No migres de framework.

2\. No cambies de hosting.

3\. No deshagas el prerenderizado.

4\. No introduzcas React Router salvo que exista una justificación técnica real y demostrable.

5\. No crees páginas delgadas.

6\. No dupliques la home en una landing exact-match.

7\. No inventes datos empresariales.

8\. No generes testimonios.

9\. No inventes proyectos.

10\. No publiques un blog vacío.

11\. No produzcas artículos masivos con IA.

12\. No hagas keyword stuffing.

13\. No crees páginas por ciudad sin presencia, contenido o experiencia real.

14\. No alteres URLs existentes sin redirecciones.

15\. No elimines contenido útil.

16\. No rompas navegación, animaciones o diseño.

17\. No añadas dependencias innecesarias.

18\. No agregues schema no respaldado.

19\. No publiques ni hagas push a `main`.

20\. No hagas commit salvo que se solicite expresamente.



\---



\# Verificación obligatoria



Después de implementar:



1\. Ejecuta el build.

2\. Ejecuta el linter.

3\. Ejecuta typecheck si existe.

4\. Ejecuta preview.

5\. Comprueba todas las rutas actuales y nuevas.

6\. Comprueba acceso directo.

7\. Comprueba recarga.

8\. Comprueba atrás y adelante.

9\. Verifica un H1 por página.

10\. Verifica títulos y descriptions únicos.

11\. Verifica canonicals.

12\. Verifica Open Graph.

13\. Verifica structured data.

14\. Verifica sitemap.

15\. Verifica robots.txt.

16\. Verifica enlaces internos.

17\. Verifica inexistencia de páginas huérfanas.

18\. Verifica que no exista contenido duplicado sustancial.

19\. Verifica menú móvil.

20\. Verifica formularios y medios de contacto.

21\. Verifica que no haya errores en consola.

22\. Verifica que cada nueva ruta tenga HTML prerenderizado.

23\. Verifica que rutas inexistentes no aparezcan en el sitemap.

24\. Compara el resultado contra `SEO\_PHASE\_2\_PLAN.md`.



Muestra evidencia de las pruebas, no afirmes simplemente que “todo funciona”.



\---



\# Revisión independiente



Cuando termines la implementación:



1\. Usa un subagente o una revisión en contexto separado.

2\. Haz que compare el diff contra:



&#x20;  \* `SEO\_PHASE\_2.md`;

&#x20;  \* `SEO\_PHASE\_2\_PLAN.md`;

&#x20;  \* la auditoría de la fase 1.

3\. Pídele detectar únicamente:



&#x20;  \* requisitos omitidos;

&#x20;  \* errores de rutas;

&#x20;  \* problemas de indexación;

&#x20;  \* contenido duplicado;

&#x20;  \* datos inventados;

&#x20;  \* regresiones;

&#x20;  \* fallos de accesibilidad;

&#x20;  \* problemas de mantenimiento.

4\. No persigas observaciones meramente estéticas ni agregues complejidad sin beneficio.

5\. Corrige los problemas válidos y vuelve a ejecutar las pruebas afectadas.



\---



\# Documentación final



Actualiza:



\* `SEO\_AUDIT\_AND\_IMPLEMENTATION.md`;

\* `activity.md`.



Crea:



`SEO\_PHASE\_2\_IMPLEMENTATION.md`



Debe registrar:



1\. Análisis realizado.

2\. Decisión sobre la página objetivo para “Manos a la Obra Ecuador”.

3\. Páginas mejoradas.

4\. Páginas creadas.

5\. Páginas descartadas y razón.

6\. Servicios con página propia.

7\. Servicios mantenidos en la página general.

8\. Cambios de schema.

9\. Cambios de navegación.

10\. Cambios de imágenes.

11\. Archivos modificados.

12\. Pruebas ejecutadas.

13\. Resultados de build y lint.

14\. Problemas pendientes.

15\. Contenido que debe proporcionar el propietario.

16\. Cómo agregar un nuevo servicio.

17\. Cómo agregar un proyecto.

18\. Cómo agregar un artículo en el futuro.

19\. Riesgos conocidos.

20\. Recomendaciones para una fase 3.



\## Criterio de finalización



La fase termina únicamente cuando:



\* se verificó la implementación de la fase 1;

\* existe un mapa claro entre intenciones y páginas;

\* la home representa inequívocamente la marca;

\* no se crearon páginas duplicadas o delgadas;

\* los servicios con contenido suficiente pueden posicionarse individualmente;

\* la arquitectura sigue siendo prerenderizable;

\* las rutas nuevas tienen metadatos y HTML independiente;

\* el sitemap contiene solo URLs válidas;

\* los datos estructurados reflejan contenido real;

\* el proyecto compila;

\* las pruebas están documentadas;

\* un revisor independiente examinó el diff;

\* la información faltante quedó registrada;

\* no se hizo push ni commit sin autorización.



