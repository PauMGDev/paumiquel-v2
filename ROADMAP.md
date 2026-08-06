# ROADMAP — paumiquel.com v2

Guía de construcción por fases. Forma de trabajo en cada paso: plan primero
y esperar OK, ejecutar, resumen de cambios, verificar el done, entrada de
bitácora si el paso tomó una decisión o encontró una fricción, commit.
Pasos pequeños, commits por intención. No avanzar de fase con un done en rojo.

## F0 — Arnés y decisiones

- [ ] 0.1 Template del playbook instanciado; piezas no justificadas borradas
      con su porqué en bitácora. Done: arnés mínimo commiteado.
- [ ] 0.2 docs/DESIGN.md cerrado: referencias visuales elegidas y lista del
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