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

- [ ] 1.1 Scaffold Angular + SSG + pipeline de deploy con preview URL desde
      el día 1. Done: ruta dummy sirviendo HTML completo en el build,
      Lighthouse base medido y anotado.
- [ ] 1.2 Sistema de diseño: tokens y tipografía de la dirección elegida,
      documentados con sus porqués y ratios de contraste. Página de muestra
      de tokens (papel, tinta, familias en tres tamaños, un filete, una
      "Fig. 01" de ejemplo, el sello de disponibilidad).
      Done: página revisada y aprobada por Pau ANTES de construir
      componentes encima.
- [ ] 1.3 Fontanería SEO: title y description por ruta, OG completo con
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