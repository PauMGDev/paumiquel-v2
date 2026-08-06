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
        // El rojo lápiz se descartó en 1.2: un solo acento, el azul tinta.
        { token: '--color-paper', hex: '#FAF9F6', use: 'Papel', ratio: '' },
        { token: '--color-paper-deep', hex: '#F2EFE7', use: 'Ficha', ratio: '' },
        { token: '--color-ink', hex: '#1C1B1A', use: 'Tinta', ratio: '16.33:1 AAA' },
        { token: '--color-ink-soft', hex: '#55514B', use: 'Marginalia', ratio: '7.48:1 AAA' },
        { token: '--color-accent', hex: '#1D4ED8', use: 'Enlace', ratio: '6.37:1 AA' },
        { token: '--color-accent-strong', hex: '#16389B', use: 'Hover y foco', ratio: '9.62:1 AAA' },
        { token: '--color-seal', hex: '#2F6B4F', use: 'Sello', ratio: '5.98:1 AA' },
        { token: '--color-rule', hex: '#D8D4CB', use: 'Filete', ratio: 'decorativo' },
        { token: '--color-rule-strong', hex: '#C3BDB1', use: 'Línea de margen', ratio: 'decorativo' },
      ],
    },

    type: {
      number: '02',
      title: 'Pareja tipográfica',
      note: 'Fraunces para display y cuerpo, IBM Plex Mono para marginalia. Dos archivos, 77kB. Se eligió sobre esta misma página frente a Newsreader + Space Mono y Source Serif 4.',
      label: 'Fraunces + IBM Plex Mono',
      display: 'Pau Miquel',
      subhead: 'Full stack con IA aplicada',
      running:
        'Desarrollo aplicaciones de principio a fin en TypeScript y añado la capa de IA cuando resuelve algo que el código convencional no resuelve mejor. En producción eso ha sido un clasificador de correo que ordena la bandeja de entrada de un equipo de soporte sin que nadie tenga que etiquetar nada a mano.',
      monoLine: 'Angular · Node · Postgres — Robles, 2024→',
    },

    figure: {
      number: '03',
      title: 'Figura y marginalia',
      note: 'El pie de figura es el lenguaje de anotación de toda la web: número, raya, frase corta que trabaja. La línea vertical de la izquierda recorre toda la hoja.',
      caption: 'Fig. 01 — Escala tipográfica sobre la retícula de página.',
      sidenote: 'La marginalia va en mono a 12px, tinta suave. Nunca compite con el cuerpo: acompaña.',
    },

    seal: {
      number: '04',
      title: 'Disponibilidad',
      note: 'Sello de tinta girado 2°, no badge de app. Un solo uso por página: vive en el hero.',
      stamp: 'disponible',
      stampMeta: 'agosto 2026',
    },
  },
} as const;
