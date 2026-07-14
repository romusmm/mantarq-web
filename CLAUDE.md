\#PLAN DE MEJORA DE SEO
Actúa como un ingeniero senior especializado en SEO técnico, arquitectura web, accesibilidad, rendimiento y optimización de sitios modernos basados en JavaScript.



Estás trabajando directamente dentro del proyecto real del sitio web de la empresa:



\*\*Manos a la Obra, MANTARQ S.A.S.\*\*



El objetivo principal es mejorar de manera integral la capacidad del sitio para:



\* ser rastreado e indexado correctamente por Google;

\* posicionarse para búsquedas relacionadas con “Manos a la Obra Ecuador”;

\* reforzar la asociación inequívoca entre “Manos a la Obra” y “MANTARQ S.A.S.”;

\* aparecer correctamente en búsquedas de marca;

\* posicionar servicios, proyectos, ubicaciones y contenidos individuales;

\* mejorar su comprensión por buscadores y sistemas de inteligencia artificial;

\* mantener o mejorar la experiencia visual y funcional actual.



No debes asumir previamente qué framework, librerías, arquitectura, sistema de rutas, hosting o estrategia de renderizado utiliza el proyecto. Tampoco debes aplicar una lista genérica de cambios sin verificar antes el estado real del código.



\## Fase 1: análisis obligatorio del proyecto



Antes de modificar cualquier archivo, inspecciona profundamente el repositorio.



Debes determinar, como mínimo:



1\. Framework, versión y herramientas utilizadas.

2\. Estructura general del proyecto.

3\. Sistema actual de navegación y enrutamiento.

4\. Si el sitio es una SPA, MPA, SSR, SSG, prerenderizado o una combinación.

5\. Si las distintas vistas del navbar tienen URLs independientes y accesibles directamente.

6\. Qué ocurre al recargar una ruta interna.

7\. Cómo se gestiona el historial del navegador.

8\. Cómo se generan actualmente:



&#x20;  \* `<title>`;

&#x20;  \* meta descriptions;

&#x20;  \* etiquetas canonical;

&#x20;  \* Open Graph;

&#x20;  \* Twitter Cards;

&#x20;  \* encabezados H1-H6;

&#x20;  \* datos estructurados;

&#x20;  \* sitemap;

&#x20;  \* robots.txt.

9\. Si el contenido principal existe en el HTML inicial o depende completamente de JavaScript.

10\. Si los enlaces del navbar son enlaces HTML rastreables o únicamente eventos JavaScript.

11\. Si existen páginas o rutas para:



\* inicio;

\* servicios;

\* proyectos;

\* detalle de proyectos;

\* nosotros;

\* contacto;

\* ubicaciones;

\* blog o contenidos;

\* políticas legales.



12\. Si las imágenes:



\* tienen texto alternativo;

\* están correctamente dimensionadas;

\* utilizan formatos adecuados;

\* tienen carga diferida;

\* provocan cambios de diseño;

\* poseen nombres y contexto descriptivos.



13\. Si existen problemas de:



\* contenido duplicado;

\* títulos repetidos;

\* descripciones repetidas;

\* múltiples H1;

\* páginas huérfanas;

\* enlaces rotos;

\* rutas no indexables;

\* uso incorrecto de canonical;

\* `noindex`;

\* errores 404;

\* redirecciones innecesarias;

\* recursos bloqueados.



14\. Si la identidad de marca aparece de forma coherente como:



\* “Manos a la Obra, MANTARQ S.A.S.”;

\* “Manos a la Obra”;

\* “MANTARQ S.A.S.”.



15\. Si Google podría entender claramente que “Manos a la Obra” es la marca comercial asociada a MANTARQ S.A.S.

16\. Estado de:



\* accesibilidad;

\* semántica HTML;

\* diseño responsive;

\* navegación por teclado;

\* contraste;

\* rendimiento;

\* Core Web Vitals;

\* estabilidad visual;

\* carga de JavaScript;

\* carga de fuentes;

\* caché;

\* compresión;

\* división de código.



17\. Si existen herramientas de analítica, medición o Search Console preparadas correctamente.

18\. Cómo se despliega el proyecto y qué limitaciones impone el hosting.

19\. Si el servidor está preparado para soportar rutas internas sin devolver errores.

20\. Qué cambios pueden implementarse sin alterar negativamente el diseño ni la lógica existente.



No te limites a revisar nombres de archivos. Lee el código relevante y comprende cómo funciona realmente el sitio.



\## Fase 2: documento de diagnóstico



Después del análisis y antes de implementar cambios, crea o actualiza en la raíz del proyecto un archivo llamado:



`SEO\_AUDIT\_AND\_IMPLEMENTATION.md`



El documento debe incluir:



\### 1. Resumen ejecutivo



Explica de forma clara:



\* cómo funciona actualmente el sitio;

\* cuál es su arquitectura;

\* cuáles son los principales obstáculos para SEO;

\* qué tan fácil o difícil es para Google rastrearlo;

\* si cada vista puede posicionarse individualmente;

\* cuáles son los problemas más graves.



\### 2. Hallazgos confirmados



Distingue claramente entre:



\* problemas confirmados en el código;

\* riesgos probables;

\* mejoras opcionales;

\* elementos que ya están correctamente implementados.



No inventes problemas que no existan.



\### 3. Prioridades



Clasifica los cambios en:



\* crítica;

\* alta;

\* media;

\* baja.



Para cada cambio explica:



\* problema detectado;

\* impacto;

\* solución propuesta;

\* archivos o componentes afectados;

\* posibles riesgos;

\* razón técnica;

\* beneficio SEO o de experiencia de usuario.



\### 4. Estrategia de arquitectura



Determina qué conviene hacer según el proyecto real:



\* conservar la arquitectura actual;

\* incorporar rutas reales;

\* migrar el sistema de navegación;

\* utilizar SSR;

\* utilizar SSG;

\* utilizar prerenderizado;

\* utilizar renderizado híbrido;

\* generar páginas estáticas;

\* mantener una SPA mejorada;

\* adoptar otra solución compatible con el stack actual.



No elijas una estrategia por moda. Escoge la solución con mejor equilibrio entre:



\* SEO;

\* estabilidad;

\* mantenimiento;

\* complejidad;

\* compatibilidad;

\* coste de migración;

\* hosting existente.



\### 5. Estructura de información recomendada



Propón una arquitectura de contenidos basada en los servicios y proyectos que ya existan en el sitio.



Considera, cuando sea pertinente, rutas independientes para:



\* inicio;

\* servicios;

\* cada servicio principal;

\* proyectos;

\* cada proyecto;

\* nosotros;

\* contacto;

\* preguntas frecuentes;

\* ubicaciones reales;

\* “Manos a la Obra Ecuador”;

\* blog;

\* cada artículo;

\* políticas legales.



No crees rutas vacías, duplicadas o artificiales únicamente para aumentar el número de páginas.



\### 6. Estrategia de marca



Evalúa cómo debe mostrarse de forma coherente el nombre:



\*\*Manos a la Obra, MANTARQ S.A.S.\*\*



La implementación debe ayudar a Google y a los usuarios a comprender que:



\* “Manos a la Obra” es el nombre comercial;

\* MANTARQ S.A.S. es la entidad empresarial asociada;

\* ambas denominaciones corresponden al mismo negocio.



No hagas keyword stuffing ni repitas el nombre de manera antinatural.



\### 7. Plan de implementación



Define el orden exacto en que deben ejecutarse los cambios.



Debes priorizar primero los cambios estructurales y de indexación, antes de cambios cosméticos o secundarios.



\## Fase 3: implementación



Después de completar el diagnóstico, implementa directamente las mejoras de prioridad crítica y alta que sean seguras y compatibles con el proyecto.



No te limites a dar recomendaciones. Debes modificar el proyecto.



Las áreas que debes evaluar e implementar cuando correspondan incluyen:



\### Enrutamiento e indexación



\* rutas únicas, permanentes y descriptivas;

\* acceso directo a cada ruta;

\* compatibilidad con recarga del navegador;

\* historial correcto;

\* enlaces rastreables;

\* tratamiento correcto de rutas inexistentes;

\* redirecciones necesarias;

\* páginas no huérfanas;

\* navegación interna coherente.



\### Metadatos



\* títulos únicos;

\* meta descriptions únicas;

\* canonical correcto;

\* Open Graph;

\* Twitter Cards;

\* nombre del sitio;

\* URL absoluta;

\* imagen social;

\* idioma;

\* metadatos por ruta.



\### Semántica



\* HTML semántico;

\* un H1 principal por página;

\* jerarquía lógica de encabezados;

\* secciones correctamente estructuradas;

\* landmarks;

\* enlaces descriptivos;

\* botones usados únicamente para acciones.



\### Datos estructurados



Implementa solo los tipos que correspondan al contenido real, como:



\* `Organization`;

\* `LocalBusiness`;

\* `WebSite`;

\* `WebPage`;

\* `BreadcrumbList`;

\* `Article`;

\* `Person`;

\* `Service`;

\* otros tipos válidos y justificables.



Los datos estructurados deben:



\* reflejar información visible;

\* usar URLs absolutas;

\* tener identificadores estables mediante `@id`;

\* conectar correctamente las entidades;

\* evitar datos inventados;

\* evitar reseñas o puntuaciones falsas;

\* incluir la relación entre “Manos a la Obra” y “MANTARQ S.A.S.”.



\### Marca y entidad



Asegura que el sitio comunique claramente:



\* nombre comercial;

\* nombre legal;

\* servicios;

\* ubicación o área de servicio real;

\* contacto;

\* perfiles oficiales;

\* identidad visual;

\* relación entre ambas denominaciones.



\### Sitemap y robots



\* sitemap XML;

\* inclusión únicamente de URLs indexables;

\* actualización automática cuando sea posible;

\* robots.txt correcto;

\* referencia al sitemap;

\* ausencia de bloqueos accidentales.



\### Contenidos y páginas



Aprovecha el contenido ya existente para crear páginas independientes únicamente cuando tenga sentido.



No inventes textos comerciales extensos ni información empresarial.



Cuando falte información necesaria, crea una estructura claramente preparada para completarla, pero no rellenes con afirmaciones falsas.



\### Proyectos



Si existen proyectos o portafolio:



\* cada proyecto relevante debe poder tener una URL propia;

\* debe incluir contenido indexable;

\* debe poder enlazarse desde servicios y otras páginas;

\* debe tener metadatos propios;

\* debe mantener las imágenes y el diseño existentes;

\* debe evitar depender exclusivamente de modales o carruseles cerrados.



\### Blog



Evalúa si el proyecto está preparado para un blog.



Solo impleméntalo si puede contar con:



\* URL propia para el índice;

\* URL individual por artículo;

\* título;

\* descripción;

\* autor;

\* fecha;

\* contenido semántico;

\* enlaces internos;

\* metadatos;

\* datos estructurados;

\* sitemap;

\* capacidad de mantenimiento razonable.



No crees un blog ficticio ni artículos vacíos.



Deja la infraestructura preparada y, cuando resulte útil, crea una plantilla o modelo de contenido, pero no generes decenas de artículos genéricos.



\### Imágenes



\* textos alternativos adecuados;

\* dimensiones explícitas;

\* optimización;

\* formatos adecuados;

\* carga diferida cuando corresponda;

\* imagen principal prioritaria;

\* reducción de cambios de diseño;

\* conservación de calidad visual;

\* contexto textual alrededor de cada imagen.



\### Rendimiento



\* reducir JavaScript innecesario;

\* división de código;

\* carga diferida;

\* optimización de fuentes;

\* compresión;

\* caché;

\* eliminación de dependencias innecesarias;

\* prevención de bloqueos de renderizado;

\* mejora de LCP, CLS e INP.



No sacrifiques funcionalidad por una puntuación artificial.



\### Accesibilidad



\* navegación por teclado;

\* etiquetas accesibles;

\* contraste;

\* foco visible;

\* formularios correctamente etiquetados;

\* imágenes con `alt`;

\* botones y enlaces semánticos;

\* soporte razonable para lectores de pantalla;

\* respeto por preferencias de reducción de movimiento.



\### Conversión



Sin rediseñar innecesariamente, revisa si las páginas permiten:



\* contactar fácilmente;

\* identificar servicios;

\* encontrar teléfono o WhatsApp;

\* ver proyectos;

\* entender el proceso de trabajo;

\* reconocer la marca;

\* confiar en la empresa.



\## Restricciones



1\. No reescribas todo el proyecto sin necesidad.

2\. No cambies el framework únicamente porque exista una alternativa más popular.

3\. No destruyas el diseño actual.

4\. No elimines funcionalidades sin demostrar que están obsoletas o rotas.

5\. No inventes servicios, ciudades, proyectos, certificaciones, testimonios, direcciones ni datos de contacto.

6\. No agregues textos genéricos de relleno.

7\. No uses keyword stuffing.

8\. No crees páginas duplicadas por ciudad.

9\. No generes contenido masivo con IA.

10\. No agregues dependencias innecesarias.

11\. No introduzcas cambios incompatibles con el sistema de despliegue.

12\. No expongas claves, tokens ni datos sensibles.

13\. No cambies URLs existentes sin crear redirecciones adecuadas.

14\. No rompas enlaces compartidos previamente.

15\. No des por terminado el trabajo sin probar el resultado.



\## Pruebas obligatorias



Después de implementar:



1\. Ejecuta las pruebas existentes.

2\. Ejecuta el linter.

3\. Ejecuta comprobación de tipos si existe.

4\. Genera una build de producción.

5\. Corrige errores y advertencias relevantes.

6\. Verifica manualmente las rutas.

7\. Prueba acceso directo a cada ruta.

8\. Prueba recargar cada ruta.

9\. Comprueba navegación atrás y adelante.

10\. Comprueba funcionamiento móvil.

11\. Revisa metadatos por ruta.

12\. Revisa canonical por ruta.

13\. Comprueba sitemap.

14\. Comprueba robots.txt.

15\. Verifica datos estructurados.

16\. Comprueba que no existan enlaces internos rotos.

17\. Comprueba que no aparezcan errores en consola.

18\. Comprueba que la página principal siga funcionando visualmente.

19\. Comprueba que formularios, WhatsApp y llamadas sigan funcionando.

20\. Comprueba que los cambios no hayan creado contenido duplicado.



\## Registro del trabajo



Actualiza `SEO\_AUDIT\_AND\_IMPLEMENTATION.md` al finalizar con:



\* cambios implementados;

\* archivos modificados;

\* decisiones tomadas;

\* problemas corregidos;

\* mejoras pendientes;

\* información empresarial que falta proporcionar;

\* riesgos conocidos;

\* instrucciones para mantener el SEO al agregar nuevas páginas, proyectos o artículos.



Además, crea o actualiza un archivo:



`activity.md`



Registra periódicamente:



\* qué analizaste;

\* qué descubriste;

\* qué modificaste;

\* qué falta;

\* qué errores encontraste;

\* qué decisiones tomaste;

\* cómo continuar si la sesión se interrumpe.



Actualízalo durante el trabajo, no únicamente al final.



\## Criterio de finalización



El trabajo se considera terminado solo cuando:



\* el proyecto ha sido auditado realmente;

\* el diagnóstico está documentado;

\* las mejoras críticas y altas compatibles están implementadas;

\* las rutas importantes son indexables;

\* los metadatos son correctos por página;

\* la identidad “Manos a la Obra, MANTARQ S.A.S.” es coherente;

\* el proyecto compila;

\* no se ha roto el diseño ni la funcionalidad;

\* las pruebas relevantes han sido ejecutadas;

\* las mejoras pendientes están documentadas;

\* existe una guía clara para mantener la estructura en el futuro.



Comienza inspeccionando el repositorio. No modifiques archivos hasta comprender la arquitectura actual y documentar un diagnóstico inicial.



