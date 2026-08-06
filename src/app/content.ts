/**
 * Único módulo de contenido textual del sitio (invariante de CLAUDE.md).
 * Ningún componente declara strings de contenido: los importa de aquí.
 */
export const copy = {
  home: {
    marker: 'Fig. 00 — scaffold prerenderizado',
  },

  tokens: {
    eyebrow: 'Sistema de diseño',
    title: 'Tokens',
    lead: 'Cuaderno de ingeniería, voz editorial. Esta página existe para decidir sobre ella: papel, tinta, tipografía y marginalia puestos a tamaño real, con sus ratios medidos.',
    meta: [
      ['Paso', '1.2'],
      ['Fecha', '2026-08-06'],
      ['Autoridad', 'docs/DESIGN.md'],
    ],

    palette: {
      number: '01',
      title: 'Papel y tinta',
      note: 'Los ratios los calcula node scripts/contrast.mjs sobre src/tokens.css. Los filetes no llevan ratio: son retícula, no información.',
      swatches: [
        { token: '--color-paper', hex: '#FAF9F6', use: 'Papel', ratio: '' },
        { token: '--color-paper-deep', hex: '#F2EFE7', use: 'Ficha', ratio: '' },
        { token: '--color-ink', hex: '#1C1B1A', use: 'Tinta', ratio: '16.33:1 AAA' },
        { token: '--color-ink-soft', hex: '#55514B', use: 'Marginalia', ratio: '7.48:1 AAA' },
        { token: '--color-accent', hex: '#1D4ED8', use: 'Enlace', ratio: '6.37:1 AA' },
        { token: '--color-accent-strong', hex: '#16389B', use: 'Hover y foco', ratio: '9.62:1 AAA' },
        { token: '--color-pencil', hex: '#A32E22', use: 'Rojo lápiz', ratio: '6.71:1 AA' },
        { token: '--color-seal', hex: '#2F6B4F', use: 'Sello', ratio: '5.98:1 AA' },
        { token: '--color-rule', hex: '#D8D4CB', use: 'Filete', ratio: 'decorativo' },
        { token: '--color-rule-strong', hex: '#C3BDB1', use: 'Línea de margen', ratio: 'decorativo' },
      ],
    },

    type: {
      number: '02',
      title: 'Pareja tipográfica',
      note: 'Tres candidatos, el mismo texto y los mismos tamaños. Se elige uno; los otros dos se borran del repo en este mismo paso y el presupuesto vuelve a dos archivos.',
      display: 'Pau Miquel',
      subhead: 'Full stack con IA aplicada',
      running:
        'Desarrollo aplicaciones de principio a fin en TypeScript y añado la capa de IA cuando resuelve algo que el código convencional no resuelve mejor. En producción eso ha sido un clasificador de correo que ordena la bandeja de entrada de un equipo de soporte sin que nadie tenga que etiquetar nada a mano.',
      monoLine: 'Angular · Node · Postgres — Robles, 2024→',
      candidates: [
        { id: 'A', label: 'Fraunces + IBM Plex Mono', display: 'fraunces', mono: 'plex' },
        { id: 'B', label: 'Newsreader + Space Mono', display: 'newsreader', mono: 'space' },
        { id: 'C', label: 'Source Serif 4 + IBM Plex Mono', display: 'source', mono: 'plex' },
      ],
    },

    figure: {
      number: '03',
      title: 'Figura y marginalia',
      note: 'El pie de figura es el lenguaje de anotación de toda la web: número, raya, frase corta que trabaja.',
      caption: 'Fig. 01 — Escala tipográfica sobre la retícula de página.',
      sidenote: 'La marginalia va en mono a 12px, tinta suave. Nunca compite con el cuerpo: acompaña.',
      pencil: 'El rojo lápiz subraya esto, y como mucho dos cosas más en toda la web.',
    },

    seal: {
      number: '04',
      title: 'Disponibilidad',
      note: 'Dos formas del mismo estado. Elige una: la casilla es más cuaderno, el sello es más gesto.',
      checkbox: 'abierto a oportunidades',
      stamp: 'disponible',
      stampMeta: 'agosto 2026',
    },

    marginRule: {
      number: '05',
      title: 'Línea de margen',
      note: 'La línea vertical de la izquierda recorre esta página entera. Aquí abajo, el mismo bloque sin ella.',
      withRule: 'Con línea de margen: la página se lee como una hoja de cuaderno y el contenido queda indexado a un borde visible.',
      withoutRule: 'Sin línea de margen: más limpio, más neutro, y un rasgo menos de la dirección elegida.',
    },
  },
} as const;
