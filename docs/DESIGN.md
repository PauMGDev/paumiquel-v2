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
  v1 y con el default oscuro de la época. Los valores exactos se cierran
  en 1.2, medidos sobre la página de tokens.
- ESTRUCTURA VISIBLE: retícula que se nota. Filetes finos (1px, tinta al
  15-20%) separando secciones, márgenes generosos y consistentes, y una
  línea de margen vertical a la izquierda, como en un cuaderno de
  laboratorio (opcional: se prueba y se decide en 1.2).
- LENGUAJE DE ANOTACIÓN: secciones numeradas (01, 02...), imágenes con pie
  ("Fig. 03 — Arquitectura del clasificador"), metadatos (fechas, stack,
  estado) en mono pequeña como marginalia. El espíritu de la bitácora,
  hecho estética.
- ACENTO: UNA tinta de anotación, azul tinta (candidato: #1D4ED8; el valor
  final se ajusta sobre el papel y se mide en 1.2) para enlaces y acción.
  Segundo acento ultraescaso, rojo lápiz: 2-3 subrayados en toda la web como
  máximo. Se prueba en 1.2; si no gana nada, no entra.
- DISPONIBILIDAD: como sello o casilla de formulario, no como badge de app
  ("[x] abierto a oportunidades" en mono, o un sello de tinta girado 2°).
- PERSONA: "Apéndice A — Fuera del código", con formato de apéndice real.
  El chiste estructural ES el tono.

### Tipografía (2 familias; la pareja se cierra en 1.2)

Recomendación: Fraunces (variable, optical sizing: display con carácter en
títulos, legible en cuerpo) + IBM Plex Mono (marginalia, etiquetas, figuras:
herencia ingeniera literal). Alternativas que se prueban en la página de
tokens de 1.2: Newsreader + Space Mono; Source Serif 4 + IBM Plex Mono.
Regla: subset + variable + font-display swap; presupuesto 2 archivos.

### Lo que esta dirección PROHÍBE

Fondos oscuros. Cyan y neones. Gradientes. Glassmorphism y blur decorativo.
Glow. Tarjetas con sombra flotante genérica. Bordes redondeados grandes
(máximo 2-4px: el papel no tiene border-radius). Emojis en la UI. Animaciones
de entrada aparatosas (permitido: transiciones discretas de 150ms o menos).
Cualquier elemento que parezca de dashboard SaaS.

### Referencias

Cada referencia aporta un rasgo nombrado; nada se copia entero. El agente
obedece los rasgos, no las webs.

- abhaysingh.in: bloques de metadatos por proyecto con notación →
  (antes→después); voz de resultados en frases cortas con un seco puntual.
- maggieappleton.com: SÍ el sistema (claro cálido, metadatos con alma,
  densidad estructurada con ilustración). NO su hero: el primer viewport
  de la v2 debe ser una composición completa y autocontenida — nada de
  texto o elementos cortados al entrar, en ningún breakpoint.
- s-minaya.github.io/sofia-minaya-portfolio: SÍ la estructura bento de su
  sección about — aquí se traduce a "fichas de cuaderno": fondo papel,
  filete de 1px, etiqueta en mono, sin sombras ni elevación. NO su piel
  (oscuro, espacial, pixel art).
- pudding.cool: figuras integradas en el flujo de lectura, con captions que
  trabajan; retícula editorial seria sin frialdad. Referencia principal
  para el tratamiento de figura del case study (F4).
- tufte-css (edwardtufte.github.io/tufte-css): referencia técnica de
  marginalia y sidenotes, no estética.

DESCARTADO ciechanow.ski: densidad académica sin calidez. El cuaderno es de
ingeniero, pero bonito: estructura con encanto, no paper seco.

### Enmienda de dirección (tras las referencias)

- El Apéndice A se maqueta como bento de fichas de cuaderno, no como lista
  plana: cada ítem es una ficha con su etiqueta (A.1, A.2...) en mono.
- Temperatura general: cuaderno cálido y hojeable, no apunte de laboratorio.
- Requisito derivado para el 2.1 (añadir a su done en el ROADMAP): primer
  viewport autocontenido, verificado en 375px y desktop.

## Contenido

SE CONSERVA (migración literal, retoques menores permitidos): hero con la
jerarquía actual, stack, experiencia (Robles + EFI), certificación,
proyectos (Sudoku Trainer, MealPlanner), formación
(con la fórmula "4 cursos, sin titular"), contacto.

SE AÑADE:

a) Tarjeta del playbook (agentic-harness-playbook) en proyectos.
b) Bloque persona: "Apéndice A — Fuera del código". Compacto: 3-5 ítems de
   una línea, cero relleno, tono seco con humor fino. Función: dar al
   entrevistador el arranque de conversación. Contenido:

   A.1  Sudoku — jugador de toda la vida; acabé construyendo el entrenador
        que me habría gustado tener (ver Sudoku Trainer).
   A.2  Electrónica de sobremesa — desmonto aparatos para entender cómo
        están hechos. Volver a montarlos es opcional.
   A.3  TCGs — juegos de cartas coleccionables: lectura de patrones y
        probabilidad disfrazadas de afición.
   A.4  Guitarra — la práctica deliberada, aplicada a algo que no compila.
   A.5  Moto y montaña — donde no llega la cobertura.
c) Indicador de disponibilidad visible en el hero (estado, no párrafo).
d) Case study: /proyectos/clasificador-email (F4): problema, arquitectura
   con diagrama, decisiones, resultados. Sin código propietario.

IDIOMA: ES, único. El inglés queda APLAZADO fuera de la v2: no hay ruta /en
ni hreflang. La garantía de que se pueda añadir después sin rediseño es el
invariante que ya existe en CLAUDE.md —todo el contenido textual vive en un
único módulo de copys— y no hace falta más andamiaje que ese. Se reabre si
aparece búsqueda de rol internacional; entonces el trabajo es una traducción
del módulo de copys y una ruta prerenderizada, no una refactorización.

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