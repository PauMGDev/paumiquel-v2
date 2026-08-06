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

- FONDO: papel, no pantalla. CERRADO en 1.2: papel #FAF9F6, papel de ficha
  #F2EFE7, tinta #1C1B1A (16.33:1 sobre papel), tinta secundaria #55514B
  (7.48:1). La v2 es CLARA: es la ruptura visible con la v1 y con el default
  oscuro de la época. AMPLIADO en F3: el papel lleva grano (ver Artefactos).
- ESTRUCTURA VISIBLE: retícula que se nota. Filetes finos (1px, tinta al
  15-20%) separando secciones, márgenes generosos y consistentes, y una
  línea de margen vertical a la izquierda, como en un cuaderno de
  laboratorio. CERRADO en 1.2: la línea de margen ENTRA (--color-rule-strong,
  #C3BDB1), recorre la hoja entera y no cada bloque.
- LENGUAJE DE ANOTACIÓN: secciones numeradas (01, 02...), imágenes con pie
  ("Fig. 03 — Arquitectura del clasificador"), metadatos (fechas, stack,
  estado) en mono pequeña como marginalia. El espíritu de la bitácora,
  hecho estética.
- ACENTO: UNA tinta de anotación, azul tinta, para enlaces y acción. CERRADO
  en 1.2: #1D4ED8 (6.37:1 sobre papel), con #16389B para hover y foco
  (9.62:1). El rojo lápiz NO ENTRA: se probó en la página de tokens y no
  compraba nada que el azul y la jerarquía no dieran ya, y cada color extra
  es una decisión más en cada componente. El sistema tiene un solo acento.
  NOTA F3: el subrayado a mano (ver Artefactos) usa las tintas existentes;
  el gesto aporta la calidez, no hace falta color nuevo. La decisión del
  rojo sigue cerrada.
- DISPONIBILIDAD: sello de tinta girado 2°, no badge de app. CERRADO en 1.2
  frente a la casilla "[x] abierto a oportunidades": el sello es gesto, y el
  hero es el único sitio donde se usa. Color --color-seal #2F6B4F (5.98:1).
- PERSONA: "Apéndice A — Fuera del código", con formato de apéndice real.
  El chiste estructural ES el tono.
- Iconos: si algún componente los necesita, la librería aprobada es
  lucide-angular (importación icono a icono, strokeWidth desde token,
  tamaños del sistema tipográfico). Proponer la instalación cuando el primer
  componente la pida, no antes.

### Tipografía (2 familias; CERRADA en 1.2)

Fraunces variable (optical sizing: display con carácter en títulos, legible
en cuerpo) + IBM Plex Mono 400 (marginalia, etiquetas, figuras: herencia
ingeniera literal). Se eligió sobre la página de tokens frente a Newsreader +
Space Mono y Source Serif 4 + IBM Plex Mono, con el mismo texto y los mismos
tamaños en los tres. Fraunces pesa 66kB frente a los 129kB de Newsreader y
los 119kB de Source Serif 4: gana en carácter y en presupuesto a la vez.
Self-hosted, subset latin, font-display swap: 2 archivos, 77kB en total.

### Composición y ritmo (CERRADO en F3)

Diagnóstico de la revisión F3: la primera ejecución fue correcta pero
inerte — la letra de la dirección sin el espíritu de la enmienda de
temperatura. Reglas que quedan:

- DENSIDAD: un cuaderno está lleno. El hero es UNA composición maquetada
  (kicker, nombre, subtítulo, statement subrayado, bio, metadatos, enlaces
  y sello, visibles juntos en el primer viewport de desktop), no elementos
  apilados con huecos. Ninguna sección tiene más aire que contenido; el
  ritmo vertical se comprime respecto a la primera ejecución (~40-50%).
- CARRIL IZQUIERDO: el índice no come más de ~220px, o justifica su ancho
  con la línea de margen como motivo. Una de las dos, documentada.
- JERARQUÍA DE LECTURA: los bullets de listas (Experiencia) van un escalón
  por debajo de la prosa en cuerpo; los metadatos de la derecha se asocian
  a su título sin esfuerzo (distancia y presencia suficientes). Test de los
  3 segundos: título, lista y metadato distinguibles de un vistazo.

### Artefactos de cuaderno (CERRADO en F3 — exactamente tres, nada más)

La calidez se construye con tres artefactos y disciplina de cupo. Añadir un
cuarto requiere reabrir esta sección con argumento.

1. SUBRAYADO A MANO: trazo ligeramente irregular (SVG, no border recto),
   en 2-3 sitios en toda la web. El primero: el statement del hero. Usa
   tinta o azul existentes (ver NOTA F3 en Acento: sin color nuevo).
2. GRANO DE PAPEL: textura sutilísima en el fondo (noise, opacidad muy
   baja). Debe notarse solo si se busca; no puede bajar ningún contraste
   por debajo de AA (se mide).
3. FICHAS CON CUERPO: las fichas del Apéndice A llevan rotación alterna
   sutil (±0,5-0,8°), etiqueta A.x como pestaña (no como línea dentro de
   la caja) y filete definido. Fichas de índice sobre una mesa, no inputs
   deshabilitados.

El sello DISPONIBLE es el patrón de referencia de esta capa: gesto único,
con oficio, en su sitio. Los artefactos lo acompañan; no compiten con él.

### Figuras (CERRADO en F3)

- Estilo: trazo de cuaderno — bordes finos ligeramente irregulares o línea
  a mano alzada contenida. Nada de cajas de diagrama de flujo corporativo.
- Toda figura lleva caption "Fig. NN — ..." y vive dentro del flujo de
  lectura (referencia: pudding.cool).
- Inventario mínimo de la home: Fig. 01 flujo de aplicación (restyle),
  Fig. 02 línea temporal de trayectoria en Experiencia. Deseable: mini
  diagrama por tarjeta de proyecto. El case study (F4) añadirá las suyas.
- Legibles en 375px o con alternativa apilada.

### Lo que esta dirección PROHÍBE

Fondos oscuros. Cyan y neones. Gradientes. Glassmorphism y blur decorativo.
Glow. Tarjetas con sombra flotante genérica. Bordes redondeados grandes
(máximo 2-4px: el papel no tiene border-radius). Emojis en la UI. Animaciones
de entrada aparatosas (permitido: transiciones discretas de 150ms o menos).
Cualquier elemento que parezca de dashboard SaaS. Y desde F3: vacíos de
página que dejen una sección flotando (el aire sin contenido es tan ajeno
al cuaderno como la sombra flotante).

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
ingeniero, pero bonito: estructura con encanto, no paper seco. (La primera
ejecución de F2 cayó exactamente en esto; las secciones de Composición y
Artefactos existen para impedir la recaída.)

### Enmienda de dirección (tras las referencias)

- El Apéndice A se maqueta como bento de fichas de cuaderno, no como lista
  plana: cada ítem es una ficha con su etiqueta (A.1, A.2...) en mono.
- Temperatura general: cuaderno cálido y hojeable, no apunte de laboratorio.
- Requisito derivado para el 2.1 (en su done del ROADMAP): primer viewport
  autocontenido, verificado en 375px y desktop.

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