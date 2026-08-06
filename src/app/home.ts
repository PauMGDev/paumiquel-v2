import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  LucideArrowUpRight,
  LucideCpu,
  LucideGuitar,
  LucideMail,
  LucideMountain,
  LucideSpade,
} from '@lucide/angular';

import { copy } from './content';
import { SITE_URL, applySeo } from './seo';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [LucideArrowUpRight, LucideCpu, LucideGuitar, LucideMail, LucideMountain, LucideSpade],
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

  /** Sección visible. Vacía mientras se está en el hero: marcar "stack" antes
   *  de llegar a stack es peor que no marcar nada. */
  protected readonly active = signal('');

  private readonly taglineIndex = signal(0);
  protected readonly tagline = computed(() => this.hero.taglines[this.taglineIndex()]);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

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

    // Solo en navegador: el prerender no tiene scroll que observar ni tiempo
    // que pasar, y el HTML ya sale completo y con los enlaces funcionando.
    afterNextRender(() => {
      this.trackSections();
      this.rotateTagline();
    });
  }

  private trackSections(): void {
    const sections = this.host.nativeElement.querySelectorAll<HTMLElement>('main > *[id], .hero');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.active.set(entry.target.classList.contains('hero') ? '' : entry.target.id);
        }
      },
      // Activa es la que cruza la banda alta de la pantalla. Marcar "la que
      // más se ve" hace parpadear el índice al pasar de una sección a otra.
      { rootMargin: '-10% 0px -70% 0px' },
    );
    sections.forEach((section: HTMLElement) => observer.observe(section));
  }

  private rotateTagline(): void {
    // Quien pide menos movimiento se queda con la primera frase y ya está.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => {
      this.taglineIndex.update((i) => (i + 1) % this.hero.taglines.length);
    }, 4500);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }
}
