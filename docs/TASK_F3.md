# TASK F3 — Revisión de diseño: de correcto a cuaderno

## Contexto

La F2 ejecutó la letra de docs/DESIGN.md y se dejó el espíritu de su enmienda
("cálido y hojeable, no apunte de laboratorio"). Diagnóstico de la revisión
conjunta: correcto pero inerte. La tipografía, la paleta, la estructura
numerada, la marginalia y el sello DISPONIBLE se conservan; el sello es
además la prueba del concepto: el único elemento con encanto de la página,
y esta tarea existe para multiplicarlo.

Cuatro arreglos, cada uno un paso con su done. Trabajar sobre la preview de
Vercel; cada paso se verifica en desktop Y en 375px antes de su commit.

Antes de empezar: añadir a docs/DESIGN.md, sección de dirección, el bloque
"Artefactos de cuaderno (v2, tras revisión F3)" con las decisiones de los
pasos 2 y 3 de esta tarea, para que la dirección quede legislada donde manda.

## Paso 1 — Ritmo y densidad

El cuaderno salió aireado: el hero es ~60% vacío y las secciones flotan.
Un cuaderno está lleno; la página se aprovecha.

- Hero como composición única: kicker, nombre, subtítulo, statement con
  subrayado (ver paso 2), bio, bloque Enfoque/Fondo/Busco, enlaces y sello,
  todo visible en el primer viewport de desktop como UNA composición
  maquetada (no elementos apilados con huecos). En 375px: mismo contenido,
  orden lógico, sin vacíos de más de un espaciado de sección.
- Comprimir el ritmo vertical global un 40-50%: paddings de sección,
  espacios entre título de sección y contenido, y entre entradas.
- Carril izquierdo: estrechar el índice (máx ~220px) o justificar su ancho
  con el motivo de línea de margen vertical del cuaderno (DESIGN.md lo
  menciona y no se ejecutó). Elegir una de las dos y anotar por qué.
- Contacto: compactar; tres líneas no ocupan una pantalla.

Done: el primer viewport de desktop contiene el hero completo compuesto;
ninguna sección tiene más aire que contenido; verificado en 375px sin
elementos cortados (requisito del done de 2.1, sigue vigente).

## Paso 2 — Capa de calidez (tres artefactos, con disciplina)

Solo el sello tiene encanto. Se añaden exactamente tres artefactos; nada más.

- a) Subrayado de lápiz rojo (ya aprobado en DESIGN.md, sin usar): trazo
  ligeramente irregular (SVG o border-image, no border-bottom recto), en
  2-3 sitios en toda la web. El primero: el statement del hero. Los otros
  1-2: a criterio, donde el énfasis sea real.
- b) Grano de papel: textura sutilísima en el fondo (noise SVG/CSS,
  opacidad muy baja). La diferencia entre "blanco roto" y "papel" es
  textura, no hex. Debe notarse solo si se busca; medir que no ensucia el
  contraste del texto.
- c) Fichas del Apéndice A con tratamiento de ficha real: rotación
  alterna sutil (±0,5-0,8°), etiqueta A.x como pestaña (no como línea
  dentro de la caja), filete definido. Ahora parecen inputs deshabilitados;
  deben parecer fichas de índice sobre una mesa.

Done: los tres artefactos visibles y solo esos; los subrayados son 2-3 en
total en la web; el grano no baja ningún ratio de contraste por debajo de
AA (medir); las fichas giradas no rompen el layout en 375px.

## Paso 3 — Figuras: de una a tres, con trazo de cuaderno

- Restyle de Fig. 01: de cajas de diagrama de flujo a trazo de cuaderno —
  bordes finos ligeramente irregulares o estética de línea a mano alzada
  contenida, flechas coherentes. Mismo contenido, misma caption.
- Fig. 02 nueva en Experiencia: línea temporal horizontal 2021 → 2026 con
  los tres hitos (prácticas EFI, ingeniero EFI, Robles) y sus etiquetas en
  mono. Caption: "Fig. 02 — Trayectoria. El hueco de 2024-2025 es el máster."
  (ajustar redacción a los datos reales).
- Proyectos: un mini-diagrama o miniatura por tarjeta (esquema de
  arquitectura de 3-4 cajas para Sudoku Trainer y MealPlanner; para el
  playbook, un esquema del bucle plan→build→verify→log). Si el coste se
  dispara, hacer solo Sudoku Trainer y anotar los otros como pendiente.

Done: tres figuras (mínimo dos) con estilo coherente entre sí y con la
dirección; todas con caption "Fig. NN — ..."; legibles en 375px (o con
alternativa apilada).

## Paso 4 — Jerarquía: dos correcciones

- Bullets de Experiencia: bajar un punto de cuerpo (o pasar a un tamaño
  intermedio entre marginalia y prosa). Ahora leen como párrafos de novela;
  son listas.
- Metadatos de la derecha (empresa, fechas): acercarlos a su título o
  subirles ligeramente la presencia (cuerpo o peso). La asociación
  título-metadato debe leerse sin esfuerzo. Revisar junto con la decisión
  de carril del paso 1: si el contenido gana ancho, este problema cambia.

Done: en un vistazo de 3 segundos a Experiencia se distingue qué es título,
qué es lista y qué es metadato, y cada metadato se asocia a su entrada sin
buscar.

## Fuera de alcance

Contenido (los textos no se tocan), estructura de secciones, tipografías y
paleta base, nuevas dependencias. Si un arreglo parece pedir una librería,
proponerlo antes con argumento (invariante de CLAUDE.md).

## Cierre de la tarea

- pnpm build verde; grep de contenido en HTML de build para las rutas tocadas.
- Captura desktop + 375px de: hero, Experiencia, Apéndice A → revisión de Pau.
  El done final de F3 sigue siendo su aprobación explícita.
- Bitácora, además de lo que surja: "la página de tokens validó ingredientes,
  no el plato — densidad, ritmo y encanto son propiedades de la composición.
  Regla: primera sección compuesta como segundo checkpoint de diseño en
  futuros proyectos."