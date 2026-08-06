# Diseño — paumiquel.com v2

## Por qué un rediseño

La v1 cumplió (SSG, SEO, contenido correcto) pero su estética es el default
de la época: oscuro + mono + acento cyan. Un portfolio que exhibe criterio
no puede vestir el uniforme. La v2 conserva el contenido y el posicionamiento
y rehace la identidad visual desde una dirección nombrada.

## Posicionamiento (sin cambios)

Full stack TypeScript con capa de IA aplicada en producción. Jerarquía:
fullstack es la identidad, la IA es la capacidad diferencial. El visitante
objetivo es un evaluador técnico; la web debe sobrevivir a su escrutinio
y, novedad de la v2, darle también un gancho humano de conversación.

## Decisiones cerradas

- Framework: Angular (SSG con @angular/ssr, output estático). Coherencia de
  identidad: el desarrollador Angular cuya web es Angular; la evidencia React
  ya la cubre Sudoku Trainer.
- Dirección visual: cuaderno de ingeniería, voz editorial (ver abajo).

## Dirección visual: cuaderno de ingeniería, voz editorial

### La idea en una frase

La web se lee como el cuaderno de trabajo de un ingeniero cuidadoso: papel,
tinta, retícula visible, anotaciones, con la tipografía de una publicación
técnica bien editada, no de una app.

### Traducción concreta

- FONDO: papel, no pantalla. Blanco cálido roto (candidato: #FAF9F6), tinta
  casi-negra cálida (#1C1B1A). La v2 es CLARA: es la ruptura visible con la
  v1 y con el default oscuro de la época.
- ESTRUCTURA VISIBLE: retícula que se nota. Filetes finos (1px, tinta al
  15-20%) separando secciones, márgenes generosos y consistentes, y una
  posible línea de margen vertical a la izquierda, como en un cuaderno de
  laboratorio.
- LENGUAJE DE ANOTACIÓN: secciones numeradas (01, 02...), imágenes con pie
  ("Fig. 03 — Arquitectura del clasificador"), metadatos (fechas, stack,
  estado) en mono pequeña como marginalia. El espíritu de la bitácora,
  hecho estética.
- ACENTO: UNA tinta de anotación, azul tinta (candidato: #1D4ED8, ajustar
  sobre papel y medir contraste) para enlaces y acción. Opcional segundo
  acento ultraescaso: rojo lápiz para 2-3 subrayados en toda la web, máximo.
- DISPONIBILIDAD: como sello o casilla de formulario, no como badge de app
  ("[x] abierto a oportunidades" en mono, o un sello de tinta girado 2°).
- PERSONA: "Apéndice A — Fuera del código", con formato de apéndice real.
  El chiste estructural ES el tono.

### Tipografía (2 familias, decisión firme tras la página de tokens)

Recomendación: Fraunces (variable, optical sizing: display con carácter en
títulos, legible en cuerpo) + IBM Plex Mono (marginalia, etiquetas, figuras:
herencia ingeniera literal). Alternativas a probar en la página de tokens:
Newsreader + Space Mono; Source Serif 4 + IBM Plex Mono.
Regla: subset + variable + font-display swap; presupuesto 2 archivos.

### Lo que esta dirección PROHÍBE

Fondos oscuros. Cyan y neones. Gradientes. Glassmorphism y blur decorativo.
Glow. Tarjetas con sombra flotante genérica. Bordes redondeados grandes
(máximo 2-4px: el papel no tiene border-radius). Emojis en la UI. Animaciones
de entrada aparatosas (permitido: transiciones discretas de 150ms o menos).
Cualquier elemento que parezca de dashboard SaaS.

### Referencias reales — PENDIENTE DE PAU

<3-4 URLs de webs que anclen la dirección, aunque cada una aporte un solo
rasgo. Buscar en minimal.gallery y godly.website: "editorial", "brutalist".>

## Contenido

SE CONSERVA (migración literal, retoques menores permitidos): hero con la
jerarquía actual, stack, experiencia (Robles + EFI), certificación,
proyectos (Sudoku Trainer, MealPlanner, MCP GRF si sigue), formación
(con la fórmula "4 cursos, sin titular"), contacto.

SE AÑADE:

a) Tarjeta del playbook (agentic-harness-playbook) en proyectos.
b) Bloque persona: "Apéndice A — Fuera del código". Compacto: 3-5 ítems de
   una línea, cero relleno, tono seco con humor fino. Contenido PENDIENTE
   DE PAU; candidatos: sudoku (ahora con producto propio), gaming y el
   proyecto de juego en pareja, cachimba, interiorismo. Función: dar al
   entrevistador el arranque de conversación.
c) Indicador de disponibilidad visible en el hero (estado, no párrafo).
d) Case study: /proyectos/clasificador-email (F4): problema, arquitectura
   con diagrama, decisiones, resultados. Sin código propietario.

IDIOMA: ES primario. EN: decisión pendiente (ruta /en prerenderizada con
hreflang, o aplazado). Si se aplaza, que la estructura de copys no lo impida.

## Requisitos no funcionales (dones de fase, no deseos)

- SSG total: cada ruta sirve HTML completo. Regresión a CSR = bug bloqueante.
- SEO: title/description únicos por ruta, OG completo con imagen por ruta,
  canonical, sitemap, robots, JSON-LD Person en home y CreativeWork en
  proyectos.
- Responsive real: diseñado desde 375px hacia arriba, verificado en
  dispositivo físico en cada fase (los bugs viven donde no miras).
- Accesibilidad: navegación completa por teclado, contraste AA verificado
  con números (la paleta se mide, no se aprueba de vista), semántica HTML
  correcta.
- Rendimiento: presupuesto Lighthouse 95 o más en las cuatro categorías,
  LCP menor de 1,5s. Fuentes: máximo 2 archivos, subset, font-display swap.
- Analíticas sin cookies (Plausible/Umami/Cloudflare) desde el primer deploy.