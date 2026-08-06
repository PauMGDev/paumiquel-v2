import { DOCUMENT, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Dominio definitivo. La v2 vive en vercel.app hasta el cutover (5.3), pero
 *  canonical y og:url se escriben ya en su forma final: así el cutover no
 *  toca ninguna URL y la vercel.app no se indexa como duplicado. */
export const SITE_URL = 'https://paumiquel.com';

export interface RouteSeo {
  /** Ruta sin barra inicial. La home es ''. */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  /** Ruta de la imagen OG desde la raíz del sitio. */
  readonly image?: string;
  readonly imageAlt?: string;
  /** Guías de trabajo y similares: se prerenderizan, no se indexan. */
  readonly noindex?: boolean;
  readonly jsonLd?: Record<string, unknown>;
}

/**
 * Planta el SEO de una ruta. Se llama desde el constructor del componente,
 * que es contexto de inyección.
 *
 * Title y Meta de Angular no cubren ni el canonical ni el JSON-LD: los dos
 * son elementos, no metas, y van con DOCUMENT. Funciona igual en prerender.
 */
export function applySeo(seo: RouteSeo): void {
  const doc = inject(DOCUMENT);
  const meta = inject(Meta);
  const url = `${SITE_URL}/${seo.path}`;
  const image = seo.image ? `${SITE_URL}${seo.image}` : undefined;

  inject(Title).setTitle(seo.title);

  meta.updateTag({ name: 'description', content: seo.description });
  meta.updateTag({
    name: 'robots',
    content: seo.noindex ? 'noindex, nofollow' : 'index, follow',
  });

  meta.updateTag({ property: 'og:type', content: 'website' });
  meta.updateTag({ property: 'og:site_name', content: 'Pau Miquel' });
  meta.updateTag({ property: 'og:locale', content: 'es_ES' });
  meta.updateTag({ property: 'og:title', content: seo.title });
  meta.updateTag({ property: 'og:description', content: seo.description });
  meta.updateTag({ property: 'og:url', content: url });

  meta.updateTag({
    name: 'twitter:card',
    content: image ? 'summary_large_image' : 'summary',
  });

  if (image) {
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:width', content: '1200' });
    meta.updateTag({ property: 'og:image:height', content: '630' });
    meta.updateTag({ property: 'og:image:alt', content: seo.imageAlt ?? seo.title });
    meta.updateTag({ name: 'twitter:image', content: image });
  }

  setLink(doc, 'canonical', url);

  if (seo.jsonLd) {
    setJsonLd(doc, seo.jsonLd);
  }
}

function setLink(doc: Document, rel: string, href: string): void {
  const existing = doc.head.querySelector(`link[rel="${rel}"]`);
  const link = existing ?? doc.head.appendChild(doc.createElement('link'));
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
}

function setJsonLd(doc: Document, data: Record<string, unknown>): void {
  const id = 'ld-json';
  const existing = doc.head.querySelector(`script#${id}`);
  const script = existing ?? doc.head.appendChild(doc.createElement('script'));
  script.setAttribute('id', id);
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(data);
}
