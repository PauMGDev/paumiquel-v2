import { Component } from '@angular/core';

import { copy } from './content';
import { applySeo } from './seo';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.html',
  styleUrl: './tokens.css',
})
export class Tokens {
  protected readonly copy = copy.tokens;

  constructor() {
    // Guía viva, no contenido del sitio: se prerenderiza pero no se indexa
    // ni entra en el sitemap.
    applySeo({
      path: 'tokens',
      title: copy.tokens.seo.title,
      description: copy.tokens.seo.description,
      noindex: true,
    });
  }
}
