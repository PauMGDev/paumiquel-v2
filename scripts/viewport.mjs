/**
 * Comprueba que la página servida cabe donde tiene que caber:
 *
 *   - el primer viewport es autocontenido: la sección de entrada acaba dentro
 *     del alto de pantalla, sin nada cortado (enmienda de docs/DESIGN.md);
 *   - nada desborda a lo ancho en ningún tamaño.
 *
 * Se mide, no se mira: a ojo, un corte de 12px en un móvil de 375 no se ve
 * hasta que lo abre otra persona.
 *
 *   pnpm check:viewport            # sirve dist/ y comprueba /
 *   pnpm check:viewport /tokens    # otra ruta
 *
 * Guarda además una captura por tamaño en .viewport-shots/ (ignorada por git).
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const ROOT = 'dist/paumiquel-v2/browser';
const SHOTS = '.viewport-shots';
const ROUTE = process.argv[2] ?? '/';

/** Tamaños reales, no redondos: el SE sigue siendo el suelo del mercado. */
const VIEWPORTS = [
  [375, 667, 'iPhone SE'],
  [390, 844, 'iPhone 14'],
  [768, 1024, 'iPad'],
  [1440, 900, 'desktop'],
];

const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = createServer(async (req, res) => {
  const path = req.url.split('?')[0];
  const file = join(ROOT, path.endsWith('/') ? `${path}index.html` : path);
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((resolve) => server.listen(0, resolve));
const base = `http://localhost:${server.address().port}`;

mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch();
let failed = 0;

for (const [width, height, name] of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto(`${base}${ROUTE.endsWith('/') ? ROUTE : `${ROUTE}/`}`, {
    waitUntil: 'networkidle',
  });
  await page.evaluate(() => document.fonts.ready);

  const result = await page.evaluate(() => {
    const first = document.querySelector('main > *');
    const overflowing = [...document.querySelectorAll('main *')]
      .filter((el) => {
        const box = el.getBoundingClientRect();
        return box.right > innerWidth + 0.5 || box.left < -0.5;
      })
      .map((el) => el.className || el.tagName);
    return {
      // Sin sección de entrada no hay nada que medir: eso es un fallo, no un
      // aprobado. Un check que pasa con la página vacía no comprueba nada.
      firstBottom: first ? first.getBoundingClientRect().bottom : Infinity,
      scrollWidth: document.documentElement.scrollWidth,
      overflowing: [...new Set(overflowing)],
    };
  });

  const cut = result.firstBottom > height + 0.5;
  const wide = result.scrollWidth > width + 0.5 || result.overflowing.length > 0;
  if (cut || wide) failed++;

  const detail = [
    Number.isFinite(result.firstBottom)
      ? `entrada acaba en ${Math.round(result.firstBottom)}px de ${height}`
      : 'NO HAY <main> CON CONTENIDO: ¿build fallido?',
    wide ? `DESBORDA: ${result.overflowing.join(', ') || `${result.scrollWidth}px de ancho`}` : '',
  ]
    .filter(Boolean)
    .join('  ');
  console.log(`${cut || wide ? '✗' : '✓'} ${name.padEnd(10)} ${width}x${height}  ${detail}`);

  await page.screenshot({ path: `${SHOTS}/${ROUTE.replace(/\W/g, '') || 'home'}-${width}.png` });
  await page.close();
}

await browser.close();
server.close();

if (failed) {
  console.error(`\n${failed} tamaño(s) con el primer viewport cortado o con desborde.`);
  process.exit(1);
}
console.log(`\n${ROUTE}: primer viewport autocontenido y sin desbordes en ${VIEWPORTS.length} tamaños.`);
