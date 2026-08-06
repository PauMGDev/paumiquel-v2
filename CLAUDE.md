# paumiquel.com v2

Portfolio profesional. El producto es doble: la primera impresión visual y
la supervivencia al escrutinio de un evaluador técnico. La legibilidad del
repo también cuenta: este proyecto es el primer uso del template de
agentic-harness-playbook y lo demuestra en público.

## Comandos

- `pnpm dev`: desarrollo local.
- `pnpm build`: build de producción con prerender. Siempre antes de cerrar paso.
- `pnpm test`: suite, si existe lógica que testear. No inventar tests de humo.

## Invariantes de arquitectura

- SSG total: `pnpm build` produce HTML completo por ruta. Cualquier cambio
  que degrade una ruta a CSR es bug bloqueante, no trade-off.
- Todo el contenido textual vive en un único módulo de copys/datos.
  Prohibidos strings de contenido en componentes.
- Los tokens de diseño viven en un solo archivo y se derivan de
  docs/DESIGN.md. Prohibido cualquier color, fuente o espaciado fuera del
  sistema de tokens. Prohibido introducir estética no descrita en la
  dirección elegida: ver "Lo que esta dirección PROHÍBE" en docs/DESIGN.md.
- Sin dependencias de UI (librerías de componentes, animación pesada) sin
  proponerlo antes con argumento. El peso es presupuesto, no accidente.
- docs/DESIGN.md manda sobre cualquier preferencia estética del agente.
  Consultar antes de preguntar; las decisiones de producto viven ahí.

## Convenciones

- TypeScript strict. Sin `any`: `unknown` y narrowing.
- Contraste: toda pareja color-fondo nueva se declara con su ratio medido
  en el comentario del token. Menos de AA no entra.
- Mobile-first: los componentes se escriben desde 375px hacia arriba.
- Commits: Conventional Commits (feat/fix/test/docs/chore/refactor + scope),
  por intención, en inglés, imperativo, título de 72 caracteres o menos.
  Cuerpo solo cuando el porqué no es obvio del diff.
- Imágenes: dimensionadas, lazy salvo above-the-fold, formatos modernos.
- Todo trabajo visual (tokens, componentes, layout) empieza aplicando la
  skill frontend-design, con docs/DESIGN.md como autoridad por encima de
  cualquier criterio de la skill.

## Cierre de tarea

- Nada está terminado sin `pnpm build` verde y la ruta afectada verificada
  en el HTML servido (grep del contenido sobre el output de build).
- Todo paso con impacto visual incluye verificación en viewport móvil.