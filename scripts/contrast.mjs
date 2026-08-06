/**
 * Mide el contraste WCAG de las parejas color-fondo del sistema.
 *
 * Lee los tokens de src/tokens.css, calcula el ratio real de cada pareja
 * declarada abajo y falla si alguna baja de su mínimo. El comentario de un
 * token caduca en cuanto alguien toca el hex; esto no.
 *
 *   node scripts/contrast.mjs
 */
import { readFileSync } from 'node:fs';

const AA_TEXT = 4.5;
const AA_LARGE = 3;

/** Parejas que el sistema promete. Toda combinación nueva se añade aquí. */
const PAIRS = [
  ['color-ink', 'color-paper', AA_TEXT, 'cuerpo y titulares'],
  ['color-ink', 'color-paper-deep', AA_TEXT, 'cuerpo sobre ficha'],
  ['color-ink-soft', 'color-paper', AA_TEXT, 'marginalia y metadatos'],
  ['color-ink-soft', 'color-paper-deep', AA_TEXT, 'metadatos sobre ficha'],
  ['color-accent', 'color-paper', AA_TEXT, 'enlaces'],
  ['color-accent-strong', 'color-paper', AA_TEXT, 'enlaces en hover y foco'],
  ['color-seal', 'color-paper', AA_TEXT, 'sello de disponibilidad'],

  /* El grano de F3 oscurece el papel un punto: el fondo real del texto ya no
     es el papel limpio sino su píxel más oscuro, y es el que hay que pasar.
     La ficha no entra: tiene fondo propio y opaco, y tapa el grano. */
  ['color-ink', 'color-paper-grained', AA_TEXT, 'cuerpo sobre papel con grano'],
  ['color-ink-soft', 'color-paper-grained', AA_TEXT, 'marginalia sobre grano'],
  ['color-accent', 'color-paper-grained', AA_TEXT, 'enlaces sobre grano'],
  ['color-accent-strong', 'color-paper-grained', AA_TEXT, 'hover y foco sobre grano'],
  ['color-seal', 'color-paper-grained', AA_TEXT, 'sello sobre grano'],
];

/* Los filetes (--color-rule, --color-rule-strong) no entran en la lista: son
   decoración, no transmiten información ni delimitan un control. WCAG 1.4.11
   pide 3:1 a los componentes que significan algo; una retícula de cuaderno
   que se subiera a 3:1 dejaría de ser retícula y pasaría a ser marco. Si un
   filete pasa alguna vez a marcar el borde de un control, entra aquí. */

const css = readFileSync(new URL('../src/tokens.css', import.meta.url), 'utf8');

const tokens = new Map(
  [...css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]),
);

const channel = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const grade = (r) => (r >= 7 ? 'AAA' : r >= AA_TEXT ? 'AA' : r >= AA_LARGE ? 'AA large' : 'FALLA');

let failed = 0;

for (const [fg, bg, min, use] of PAIRS) {
  const a = tokens.get(fg);
  const b = tokens.get(bg);
  if (!a || !b) {
    console.error(`✗ token ausente en src/tokens.css: ${a ? bg : fg}`);
    failed++;
    continue;
  }
  const r = ratio(a, b);
  const ok = r >= min;
  if (!ok) failed++;
  const line = `${ok ? '✓' : '✗'} ${r.toFixed(2).padStart(6)}:1  ${grade(r).padEnd(9)} ${fg} sobre ${bg}`;
  console.log(`${line.padEnd(64)} ${use}`);
}

if (failed) {
  console.error(`\n${failed} pareja(s) por debajo del mínimo. Menos de AA no entra.`);
  process.exit(1);
}
console.log(`\n${PAIRS.length} parejas medidas, todas en AA o mejor.`);
