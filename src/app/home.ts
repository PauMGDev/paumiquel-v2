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

/** Franja activa del índice: el 40% superior de la pantalla. Un solo número
 *  para el cálculo y para el rootMargin del observador, que si se separan se
 *  desincronizan y nadie se entera hasta que el resaltado va un paso tarde. */
const ACTIVE_BAND = 0.4;

/** Cuánto hero tiene que quedar a la vista para que siga mandando él. Por
 *  debajo de esto el índice ya entra, sin esperar a que el hero se vaya del
 *  todo: para entonces Stack lleva media pantalla dentro. */
const HERO_RULES = 0.35;

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

  /** Con el hero en pantalla el índice sobra: la portada no necesita índice.
   *  Arranca en false a propósito — el HTML prerenderizado sale con el índice
   *  visible y es el JS el que lo esconde mientras el hero está delante. Sin
   *  JS se ve siempre, que es el fallo correcto. */
  protected readonly heroInView = signal(false);

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
      this.watchHero();
      this.rotateTagline();
    });
  }

  /** Marca la sección activa. Nada de acumular eventos: cada llamada vuelve
   *  a mirar dónde está la página AHORA y de ahí sale el estado. Un estado
   *  que se construye de eventos tiene agujeros justo donde el evento no
   *  llega a ocurrir, y esta función es la que los cierra. */
  private syncActive(sections: readonly HTMLElement[]): void {
    if (!sections.length) return;

    // Fondo de página: la última sección es corta y su borde superior nunca
    // llega a entrar en la franja activa, así que sin esta regla Contacto no
    // se marcaba jamás. Si no queda nada por debajo, la activa es la última.
    const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      this.active.set(sections[sections.length - 1].id);
      return;
    }

    // Activa es la última cuyo borde superior ya ha cruzado la franja alta de
    // la pantalla. Marcar "la que más se ve" hace parpadear el índice al
    // pasar de una sección a otra. En el hero no ha cruzado ninguna y no se
    // marca nada: señalar "stack" antes de llegar a stack desorienta.
    const band = innerHeight * ACTIVE_BAND;
    let current = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= band) current = section.id;
    }
    this.active.set(current);
  }

  private trackSections(): void {
    const sections = [...this.host.nativeElement.querySelectorAll<HTMLElement>('main > *[id]')];
    const sync = () => this.syncActive(sections);

    // El observador y el scroll solo disparan el recálculo; el estado sale
    // siempre de la geometría del momento, nunca del evento que lo trajo.
    const observer = new IntersectionObserver(sync, {
      rootMargin: `0px 0px -${Math.round((1 - ACTIVE_BAND) * 100)}% 0px`,
    });
    sections.forEach((section) => observer.observe(section));

    // El fondo de página no cruza ninguna frontera de sección, así que ahí no
    // hay callback del observador que valga: hace falta escuchar el scroll.
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        sync();
      });
    };
    addEventListener('scroll', onScroll, { passive: true });

    sync();
    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      removeEventListener('scroll', onScroll);
    });
  }

  /** El índice estorba mientras el hero manda la pantalla, no mientras quede
   *  un pixel de hero: con los umbrales graduales el estado sale de cuánto
   *  hero se ve, y aparece cuando ya queda menos de un tercio.
   *
   *  El primer callback llega al observar, no al scrollear: una recarga a
   *  media página o una entrada por /#contacto nacen con el índice puesto,
   *  sin esperar a que nadie mueva la rueda. */
  private watchHero(): void {
    const hero = this.host.nativeElement.querySelector<HTMLElement>('.hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => this.heroInView.set(entries[entries.length - 1].intersectionRatio > HERO_RULES),
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(hero);
    this.destroyRef.onDestroy(() => observer.disconnect());
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
