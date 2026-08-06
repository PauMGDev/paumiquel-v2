# ROADMAP — paumiquel.com v2

Guía de construcción por fases. Forma de trabajo en cada paso: plan primero
y esperar OK, ejecutar, resumen de cambios, verificar el done, entrada de
bitácora si el paso tomó una decisión o encontró una fricción, commit.
Pasos pequeños, commits por intención. No avanzar de fase con un done en rojo.

Las casillas marcadas son el registro del trabajo cerrado. No se reabren
editando este archivo: lo impide `.claude/hooks/protect-roadmap.mjs`.

## F0 — Arnés y decisiones

- [x] 0.1 Template del playbook instanciado; piezas no justificadas borradas
      con su porqué en bitácora. Done: arnés mínimo commiteado.
- [x] 0.2 docs/DESIGN.md cerrado: referencias visuales elegidas y lista del
      bloque persona escrita por Pau. Done: cero PENDIENTE en el documento.

## F1 — Fundamentos

- [x] 1.1 Scaffold Angular + SSG + pipeline de deploy con preview URL desde
      el día 1. Done: ruta dummy sirviendo HTML completo en el build,
      Lighthouse base medido y anotado.
- [x] 1.2 Sistema de diseño: tokens y tipografía de la dirección elegida,
      documentados con sus porqués y ratios de contraste. Página de muestra
      de tokens (papel, tinta, familias en tres tamaños, un filete, una
      "Fig. 01" de ejemplo, el sello de disponibilidad).
      Done: página revisada y aprobada por Pau ANTES de construir
      componentes encima.
- [x] 1.3 Fontanería SEO: title y description por ruta, OG completo con
      imagen, canonical, sitemap, robots, JSON-LD. Done: verificación sobre
      el HTML de build, no sobre el navegador.

## F2 — Home

- [ ] 2.1 Hero con la jerarquía actual + indicador de disponibilidad.
      Done añadido: primer viewport autocontenido — nada de texto o elementos
      cortados al entrar, en ningún breakpoint (ver enmienda en docs/DESIGN.md).
- [ ] 2.2 Stack, experiencia, formación y certificación (migración de
      contenido desde la v1).
- [ ] 2.3 Proyectos, con tarjeta nueva del playbook.
- [ ] 2.4 "Apéndice A — Fuera del código" + contacto.
      Done por paso: ruta completa en el HTML de build, verificada en 375px.

## F3 — Sesión de diseño con Pau

- [ ] 3.1 Revisión visual conjunta con capturas desktop y móvil; ajustes.
      Done: aprobación explícita de Pau. (Frontera de fase: sesión dedicada.)

## F4 — Case study

- [ ] 4.1 /proyectos/clasificador-email: estructura, redacción (Pau revisa
      datos sensibles) y diagrama. Done: ruta prerenderizada con sus metas
      y su OG propio.

## F5 — Corte

- [ ] 5.1 Analíticas sin cookies.
- [ ] 5.2 Auditoría final: Lighthouse 95+ en las cuatro categorías,
      navegación por teclado completa, contraste AA verificado, revisión en
      dispositivo físico.
- [ ] 5.3 Cutover: paumiquel.com sirve la v2, redirects si cambian rutas,
      la v1 queda taggeada en su repo.

## Bitácora

Diario de trabajo: qué se decidió, por qué, qué se midió antes de decidirlo
y qué salió mal. Se escribe en el momento, no a posteriori.

Formato de cada entrada: qué pasó, por qué se resolvió así, y la regla que
queda o la señal que hay que vigilar.

### F0 — Arnés

- 2026-08-06 (0.1): borrados los dos subagentes del template, `backend-dev` y
  `ui-dev`. El repo es de un solo módulo: la frontera que ambos existían para
  vigilar (UI no toca el núcleo) no tiene núcleo que vigilar, y el resto de sus
  reglas —DESIGN.md manda, strings solo en el módulo de copys, contraste
  medido— ya vive en CLAUDE.md. Un agente que solo repite CLAUDE.md gasta
  tokens sin comprar nada. Regla que queda: un subagente entra cuando la
  fricción lo pide, no de fábrica; su descripción tiene que ser suficiente para
  decidir la delegación sin abrir el archivo. Señal a vigilar: si el trabajo
  visual empieza a saltarse docs/DESIGN.md, `ui-dev` vuelve, esta vez con el
  módulo real escrito en lugar de un placeholder.

- 2026-08-06 (0.1): DESIGN.md movido de `.claude/docs/` a `docs/`. CLAUDE.md
  declara que docs/DESIGN.md manda sobre la estética del agente, y esa ruta no
  existía: la regla apuntaba al vacío. Se mueve el archivo, no la regla, porque
  el documento es de producto y lo leen personas, no solo el arnés. Regla que
  queda: toda ruta citada en CLAUDE.md se verifica con `test -f`; una
  instrucción que apunta a un archivo inexistente es peor que no tenerla.

- 2026-08-06 (0.1): el arnés se queda en tres piezas —el hook del roadmap con
  su settings.json y el comando `next-step`—. Se conservan porque las tres se
  ejecutan; lo demás eran plantillas con placeholders sin resolver, incluido el
  README del template, sustituido por el del proyecto. Fricción anotada: el
  arnés no tiene test propio, así que el hook se verifica a mano metiéndole por
  stdin un payload que desmarca un paso cerrado y comprobando que sale con
  código 2. Señal a vigilar: si esa comprobación se olvida dos veces, el hook
  necesita su propio check ejecutable.

### F0 — Decisiones de diseño

- 2026-08-06 (0.2): el done "cero PENDIENTE" ya se cumplía al pie de la letra
  y aun así el documento tenía seis decisiones abiertas: ninguna usaba esa
  palabra. Un criterio que se satisface buscando una cadena de texto mide la
  cadena, no el trabajo. Se reformula en la práctica a *nada abierto sin paso
  dueño*: los colores candidatos, la línea de margen y la pareja tipográfica
  siguen abiertos, pero ahora cada uno dice en el propio documento que lo
  cierra 1.2. Regla que queda: diferir es legítimo, no nombrar al que hereda
  la decisión no lo es. Señal a vigilar: un done que se pueda cerrar con un
  grep exacto y nada más está mal escrito.

- 2026-08-06 (0.2): idioma ES único; el inglés queda aplazado fuera de la v2,
  sin ruta /en ni hreflang. El bilingüe desde el día 1 dobla rutas, OG y
  revisión de copy en cada paso de F2 y F4, y no compra nada verificable hoy.
  Lo que hace barato añadirlo después ya está comprado: el invariante de
  CLAUDE.md de que todo el texto vive en un módulo único de copys. No se añade
  andamiaje de i18n por si acaso. Regla que queda: aplazado es una decisión
  escrita con su condición de reapertura, no un hueco. Señal a vigilar: si
  aparece búsqueda de rol internacional, se reabre, y el trabajo entonces es
  traducir el módulo de copys y prerenderizar una ruta, no refactorizar.

- 2026-08-06 (0.2): MCP GRF fuera de la lista de proyectos. Quedan Sudoku
  Trainer, MealPlanner y la tarjeta del playbook: tres piezas con narrativa
  propia sostienen mejor el escrutinio de un evaluador que cuatro donde una
  va de relleno. Regla que queda: en portfolio, la lista de proyectos se poda,
  no se acumula.

### F1 — Fundamentos

- 2026-08-06 (1.1): el schematic `--ssr` de Angular 22 no da SSG, da SSR:
  `outputMode: "server"`, un `src/server.ts` con Express y las dependencias
  que eso arrastra. El invariante de CLAUDE.md es SSG total, así que se pasa
  a `outputMode: "static"` y se borran el entry de servidor, el bloque `ssr`
  de angular.json y `express` con sus tipos. El build lo confirma: el output
  es solo `browser/`, sin bundle de servidor, y el HTML sale con
  `ng-server-context="ssg"`. Regla que queda: el defecto de un schematic no
  es una decisión de arquitectura; se compara contra los invariantes antes de
  commitear. Señal a vigilar: si `dist/` vuelve a tener carpeta `server/`,
  alguien reintrodujo SSR sin decirlo.

- 2026-08-06 (1.1): fricción de arnés con pnpm 11. Bloquea los scripts de
  instalación (`esbuild`, `lmdb`, `@parcel/watcher`, `msgpackr-extract`) y
  `pnpm build` falla antes de compilar. Ni el campo `pnpm.onlyBuiltDependencies`
  de package.json ni la clave del mismo nombre en `pnpm-workspace.yaml`
  desbloquean nada en esta versión: lo que funciona es el mapa `allowBuilds`
  en `pnpm-workspace.yaml`. Se deja anotado porque el mensaje de error apunta
  a `pnpm approve-builds`, que es interactivo y por tanto inútil en CI y para
  un agente. Regla que queda: toda dependencia nueva que compile binario se
  añade a `allowBuilds` en el mismo commit que la instala.

- 2026-08-06 (1.1): las preview URLs quedan detrás de la Vercel Authentication
  por defecto (302 sin sesión); se decide dejarla puesta. Una preview pública
  es trabajo a medias indexable, y el sitio es un portfolio: lo que se enseña
  es producción. Consecuencia medida: la baseline de Lighthouse no se puede
  tomar sobre la preview, se toma sobre `paumiquel-v2.vercel.app`, y el
  contenido de las previews se verifica con `vercel curl`, que autentica. La
  integración git quedó probada de punta a punta: push de rama, deployment de
  preview `Ready`, marcador prerenderizado presente en su HTML. Regla que
  queda: verificar una preview es `vercel curl`, no `curl`; un 302 ahí es la
  protección haciendo su trabajo, no un deploy roto.

- 2026-08-06 (1.1): baseline de Lighthouse sobre producción con la ruta dummy,
  para tener contra qué comparar cuando entren fuentes, imágenes y contenido.
  Móvil y desktop dan lo mismo en las cuatro categorías: rendimiento 100,
  buenas prácticas 100, accesibilidad 94, SEO 82. LCP 0,8s en móvil y 0,4s en
  desktop, TBT 0ms, CLS 0. Los tres fallos son exactamente el trabajo que ya
  tiene paso dueño: `meta-description` y `robots-txt` los cierra 1.3, y
  `landmark-one-main` lo cierra la semántica de F2. Lo que este número mide de
  verdad es el techo del arnés vacío: 100 de rendimiento con 229kB de bundle y
  cero contenido es el punto de partida, no un logro. Señal a vigilar: si el
  rendimiento cae por debajo de 95, el paso que lo tiró es el que lo arregla,
  no la auditoría final de 5.2.

- 2026-08-06 (1.2): las tres parejas tipográficas candidatas se cargaron a la
  vez en /tokens con el mismo texto y los mismos tamaños, en lugar de elegir
  de memoria. Gana Fraunces + IBM Plex Mono, y el argumento que decidió no fue
  estético: Fraunces pesa 66kB frente a los 129kB de Newsreader y los 119kB de
  Source Serif 4, así que gana carácter y presupuesto a la vez. Los dos
  perdedores se borraron en el mismo commit que cerró la decisión. Regla que
  queda: comparar cuesta un paso y se hace una vez; elegir de memoria cuesta
  un rediseño. Señal a vigilar: si vuelve a haber más de dos `@font-face` en
  src/styles.css, hay una comparación sin cerrar.

- 2026-08-06 (1.2): el rojo lápiz se descarta y el sistema se queda con un
  solo acento. Estaba puesto en la página, subrayando una frase, y al verlo
  no compraba nada que el azul tinta y la jerarquía no dieran ya; a cambio
  añadía una decisión de color a cada componente futuro. Regla que queda: un
  token candidato se prueba puesto y se borra si no gana; "por si acaso" no
  es un uso. Señal a vigilar: si en F2 aparece la tentación de un color para
  destacar algo, el problema es de jerarquía, no de paleta.

- 2026-08-06 (1.2): el criterio de contraste de CLAUDE.md pedía el ratio en
  el comentario del token, y eso caduca en cuanto alguien toca un hex. Se
  añade scripts/contrast.mjs, que lee src/tokens.css y falla por debajo de
  AA: 7 parejas medidas, todas en AA o mejor. Los filetes quedan fuera de la
  lista a propósito y con el porqué escrito al lado — WCAG 1.4.11 pide 3:1 a
  lo que significa algo, y una retícula de cuaderno a 3:1 deja de ser
  retícula y pasa a ser marco. Regla que queda: toda pareja color-fondo nueva
  entra en PAIRS en el mismo commit que la crea. Señal a vigilar: un
  comentario de ratio que no coincida con la salida del script.

- 2026-08-06 (1.2): fricción con la especificidad al montar la columna de
  marginalia. `.section > *` (clase + hijo) pesa más que `.note`, así que las
  notas se quedaron en la columna de contenido pese a tener `grid-column: 2`.
  Las excepciones hubo que escribirlas también como selector de hijo. Regla
  que queda: si una regla base usa `> *`, sus excepciones se escriben al
  mismo nivel de selector o no ganan. Segundo tropiezo del mismo tipo: el
  sello, al pasar a ser ítem de grid, se estiró a toda la columna hasta
  ponerle `justify-self: start`. Señal a vigilar: un estilo que "no se
  aplica" casi nunca es un typo; es una regla más específica ganando.

- 2026-08-06 (1.2): el presupuesto de 4kB por CSS de componente saltó
  mientras la página cargaba los tres candidatos. Se dejó el aviso en rojo
  durante la comparación en lugar de subir el presupuesto, y al borrar los
  perdedores volvió a verde sola. De paso cayó una regla que no hacía nada
  (`.spec-running` repetía el tamaño de cuerpo que ya venía del body). Regla
  que queda: un presupuesto que molesta durante un trabajo temporal se
  aguanta, no se sube; subirlo es perder el aviso para siempre a cambio de
  un rato de comodidad.

### F1 — SEO

- 2026-08-06 (1.3): canonical y og:url apuntan a https://paumiquel.com desde
  ya, aunque la v2 viva en vercel.app hasta 5.3 y ese dominio sirva todavía
  la v1. Escribir las URLs en su forma definitiva hace que el cutover no
  mueva ninguna, y de paso evita que la vercel.app se indexe como duplicado.
  Se midió el riesgo que preocupaba: Lighthouse no penaliza el canonical
  cruzado, el SEO sube igualmente de 82 a 100. Regla que queda: las URLs
  públicas se escriben una vez, en el dominio final; el hosting provisional
  no se cuela en el contenido. Señal a vigilar: en 5.3, lo único que debería
  hacer falta tocar es el dominio de Vercel, no el código.

- 2026-08-06 (1.3): el sitemap se genera desde
  dist/.../prerendered-routes.json, que el build ya escribe, y descarta las
  rutas cuyo HTML lleva noindex. La alternativa era una lista escrita a mano:
  con dos rutas parece lo mismo, pero se queda vieja el día que entre el case
  study de 4.1 y nadie se entera hasta que falta en Google. El script lee
  además SITE_URL de src/app/seo.ts en vez de repetir el dominio, para que
  app y sitemap no puedan discrepar en silencio. Regla que queda: una lista
  que el build ya conoce no se reescribe a mano. Señal a vigilar: si el
  postbuild dice "0 descartadas" cuando /tokens sigue existiendo, el filtro
  de noindex se rompió.

- 2026-08-06 (1.3): robots.txt NO bloquea /tokens, aunque la página no deba
  indexarse. Un Disallow impide rastrearla, y sin rastreo nadie lee su
  noindex: el resultado es justo el contrario del que se busca. Se deja el
  rastreo abierto y la exclusión la hace la etiqueta. Regla que queda:
  noindex y Disallow no se combinan sobre la misma URL; se elige uno, y para
  sacar algo del índice el que funciona es noindex.

- 2026-08-06 (1.3): la imagen OG se renderiza a mano desde
  scripts/og/home.html con Chromium headless y el PNG se commitea; no hay
  generación en build. Una imagen que cambia una vez al año no justifica un
  paso de pipeline ni una dependencia. El precio es que la plantilla repite
  los valores de src/tokens.css y puede quedarse vieja, así que lo dice en su
  propia cabecera. Señal a vigilar: si en algún paso hay que regenerarla dos
  veces seguidas, deja de ser barata a mano.

- 2026-08-06 (1.3): fricción de arnés, y esta es mía. Un `cd` a dist/ en un
  comando anterior dejó el shell dentro del build, y desde allí salió un
  commit con las dos intenciones juntas, un proyecto de Vercel llamado
  "browser" creado por desplegar la carpeta equivocada, y un force-push para
  volver a separar los commits. El proyecto sobrante está borrado y la
  historia rehecha, pero el fallo de base es haber confiado en el directorio
  de trabajo entre comandos. Regla que queda: los comandos que despliegan o
  commitean llevan ruta absoluta o `cd` explícito al raíz; el cwd no es
  estado fiable entre pasos. Señal a vigilar: cualquier `vercel deploy` cuya
  URL no empiece por el nombre del proyecto es un despliegue desde el sitio
  equivocado.