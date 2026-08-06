import { Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';

import { copy } from './content';
import { SITE_URL, applySeo } from './seo';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly index = copy.home.index;
  protected readonly hero = copy.home.hero;
  protected readonly stack = copy.home.stack;
  protected readonly experience = copy.home.experience;
  protected readonly education = copy.home.education;
  protected readonly projects = copy.home.projects;
  protected readonly appendix = copy.home.appendix;
  protected readonly contact = copy.home.contact;

  /** Sección visible, para marcarla en el índice. */
  protected readonly active = signal('');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    applySeo({
      path: '',
      title: copy.home.seo.title,
      description: copy.home.seo.description,
      image: '/og/home.png',
      imageAlt: copy.home.seo.imageAlt,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Pau Miquel',
        jobTitle: 'Desarrollador full stack',
        url: SITE_URL,
        knowsAbout: ['TypeScript', 'Angular', 'Node.js', 'PostgreSQL', 'IA aplicada'],
      },
    });

    // Solo en navegador: el prerender no tiene scroll que observar, y el
    // índice sale del HTML con sus enlaces ya funcionando sin JavaScript.
    afterNextRender(() => this.trackSections());
  }

  private trackSections(): void {
    const sections = this.host.nativeElement.querySelectorAll<HTMLElement>('main section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.active.set(entry.target.id);
        }
      },
      // Activa es la que cruza la banda alta de la pantalla. Marcar "la que
      // más se ve" hace parpadear el índice al pasar de una sección a otra.
      { rootMargin: '-10% 0px -70% 0px' },
    );
    sections.forEach((section: HTMLElement) => observer.observe(section));
  }
}
