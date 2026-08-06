import { Component, input } from '@angular/core';

import type { FigureModel } from './figures';

/**
 * Renderizador único de figuras. El modelo lo calcula figures.ts; aquí solo
 * se pinta, y por eso una figura nueva no trae markup nuevo.
 *
 * El SVG sale entero en el HTML prerenderizado: se dibuja de datos que se
 * calculan al construir el componente, no en un efecto de navegador. Sin JS
 * la figura está.
 */
@Component({
  selector: 'app-figure',
  template: `
    <svg
      [attr.viewBox]="'0 0 ' + model().width + ' ' + model().height"
      [style.max-width.px]="model().width"
      role="img"
      [attr.aria-label]="label()"
    >
      @for (path of model().paths; track $index) {
        <path [attr.d]="path.d" [attr.class]="path.kind" />
      }
      @for (text of model().texts; track $index) {
        <text
          [attr.x]="text.x"
          [attr.y]="text.y"
          [attr.class]="text.kind"
          [attr.text-anchor]="text.anchor ?? 'middle'"
          >{{ text.text }}</text
        >
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }

    svg {
      width: 100%;
      height: auto;
      overflow: visible;
    }

    /* Trazo de cuaderno: filete fino y papel de ficha, los mismos del resto
       de la hoja. El grosor va en unidades del viewBox, así que las figuras
       anchas y las apiladas se dibujan con el mismo peso aparente. */
    .box,
    .bar {
      fill: var(--figure-fill, var(--color-paper-deep));
      stroke: var(--color-rule-strong);
      stroke-width: 1.2;
      stroke-linejoin: round;
    }

    .bar {
      fill: var(--color-rule);
    }

    .link,
    .axis,
    .tip {
      fill: none;
      stroke: var(--color-ink-soft);
      stroke-width: 1.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* La capa de IA no es un paso de la cadena: es una llamada. Y el hueco
       de la línea temporal no es una etapa: es su ausencia, anotada. Los dos
       hablan en discontinua. */
    .aside-link,
    .gap {
      fill: none;
      stroke: var(--color-ink-soft);
      stroke-width: 1.2;
      stroke-linecap: round;
      stroke-dasharray: 4 4;
    }

    text {
      fill: var(--color-ink);
      font-family: var(--font-mono);
      font-size: 13px;
    }

    .label,
    .year {
      fill: var(--color-ink-soft);
      font-size: 12px;
    }
  `,
})
export class Figure {
  readonly model = input.required<FigureModel>();
  /** Descripción para lectores de pantalla; el pie visible es la larga. */
  readonly label = input.required<string>();
}
