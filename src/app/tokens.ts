import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { copy } from './content';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.html',
  styleUrl: './tokens.css',
})
export class Tokens {
  protected readonly copy = copy.tokens;

  constructor() {
    // Guía viva, no contenido del sitio: se prerenderiza pero no se indexa
    // ni entra en el sitemap (1.3).
    inject(Title).setTitle('Tokens — paumiquel.com');
    inject(Meta).addTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
