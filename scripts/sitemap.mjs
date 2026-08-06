/**
 * Genera dist/<app>/browser/sitemap.xml a partir de las rutas que el build
 * prerenderizó, no de una lista escrita a mano: una lista se queda vieja el
 * día que se añade una ruta y nadie se entera hasta que falta en Google.
 *
 * Quedan fuera las rutas cuyo HTML declara noindex (la guía de /tokens).
 *
 * Se ejecuta solo, como postbuild.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = 'dist/paumiquel-v2/browser';

// La URL del sitio vive en src/app/seo.ts y solo ahí: leerla evita que este
// script y la app discrepen en silencio.
const seo = readFileSync('src/app/seo.ts', 'utf8');
const site = seo.match(/SITE_URL = '([^']+)'/)?.[1];
if (!site) {
  throw new Error('No encuentro SITE_URL en src/app/seo.ts');
}

const { routes } = JSON.parse(readFileSync('dist/paumiquel-v2/prerendered-routes.json', 'utf8'));

const indexable = Object.keys(routes).filter((route) => {
  const file = `${OUT}${route === '/' ? '' : route}/index.html`;
  return !/name="robots" content="noindex/.test(readFileSync(file, 'utf8'));
});

const urls = indexable
  .sort()
  .map((route) => `  <url><loc>${site}${route === '/' ? '/' : route}</loc></url>`)
  .join('\n');

writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

const skipped = Object.keys(routes).length - indexable.length;
console.log(`sitemap.xml: ${indexable.length} ruta(s), ${skipped} descartada(s) por noindex`);
