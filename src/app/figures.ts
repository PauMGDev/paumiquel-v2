/**
 * Trazo de cuaderno para las figuras (docs/DESIGN.md → Figuras).
 *
 * Las figuras no se dibujan a mano en la plantilla: aquí se calcula el modelo
 * —cuatro listas de trazos y rótulos— y la plantilla tiene UN renderizador de
 * SVG que sirve para todas. Añadir una figura es añadir un constructor, no
 * otro bloque de markup.
 *
 * Nada de aleatoriedad: el descuadre sale de una tabla fija. Un dibujo que
 * cambia entre el HTML prerenderizado y la hidratación es un parpadeo, y el
 * SVG tiene que salir idéntico del servidor y del navegador.
 */

/** Desviaciones a mano, en unidades del viewBox. Ni una es cero: una recta
 *  perfecta entre dos trazos torcidos canta más que todo lo demás junto. */
const JITTER = [1.6, -1.1, 0.9, -1.9, 1.3, -0.7, 1.8, -1.4, 0.6, -1.6, 1.1, -0.9];

const jitter = (seed: number): number => JITTER[Math.abs(seed) % JITTER.length];

/** Un decimal basta: el SVG va inline en el HTML y cada dígito se sirve. */
const n = (value: number): number => Math.round(value * 10) / 10;

export interface FigurePath {
  d: string;
  kind: 'box' | 'link' | 'aside-link' | 'axis' | 'bar' | 'tip' | 'gap';
}

export interface FigureText {
  x: number;
  y: number;
  text: string;
  kind: 'node' | 'label' | 'year';
  anchor?: 'start' | 'middle' | 'end';
}

export interface FigureModel {
  /** Unidades del viewBox. La figura nunca se pinta más grande que esto: por
   *  encima de 1:1 el rótulo en mono crecería por encima del cuerpo de la
   *  página, y una figura no grita más que el texto que acompaña. */
  width: number;
  height: number;
  paths: readonly FigurePath[];
  texts: readonly FigureText[];
}

/** Caja de cuaderno: cuatro lados combados y cuatro esquinas descuadradas.
 *  Con `Q` en vez de `L`, que un rectángulo recto es la caja de diagrama
 *  corporativo que esta dirección viene a quitar.
 *
 *  El descuadre se escala al tamaño de la caja: el temblor que da carácter a
 *  una caja de 150 unidades deja sin forma a una barra de 8. Por debajo de 24
 *  unidades de lado menor, el trazo se calma en proporción. */
function box(x: number, y: number, w: number, h: number, seed: number): string {
  const scale = Math.min(1, Math.min(w, h) / 24);
  const corner = (i: number) => jitter(seed + i) * scale;
  const bow = (i: number) => jitter(seed + i) * 0.8 * scale;

  const ax = n(x + corner(0));
  const ay = n(y + corner(1));
  const bx = n(x + w + corner(2));
  const by = n(y + corner(3));
  const cx = n(x + w + corner(4));
  const cy = n(y + h + corner(5));
  const dx = n(x + corner(6));
  const dy = n(y + h + corner(7));

  return [
    `M${ax} ${ay}`,
    `Q${n((ax + bx) / 2)} ${n((ay + by) / 2 + bow(8))} ${bx} ${by}`,
    `Q${n((bx + cx) / 2 + bow(9))} ${n((by + cy) / 2)} ${cx} ${cy}`,
    `Q${n((cx + dx) / 2)} ${n((cy + dy) / 2 + bow(10))} ${dx} ${dy}`,
    `Q${n((dx + ax) / 2 + bow(11))} ${n((dy + ay) / 2)} ${ax} ${ay}`,
    'Z',
  ].join(' ');
}

/** Línea con una comba mínima: la mano no tira rectas. */
function line(x1: number, y1: number, x2: number, y2: number, seed: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const bow = jitter(seed) * 0.5;

  return `M${n(x1)} ${n(y1)} Q${n(mx - (dy / len) * bow)} ${n(my + (dx / len) * bow)} ${n(x2)} ${n(y2)}`;
}

type Dir = 'right' | 'down' | 'left' | 'up';

/** Punta de flecha dibujada, no marker: dos SVG en la misma página con el
 *  mismo id de marker son dos ids repetidos en el documento. */
function tip(x: number, y: number, dir: Dir): FigurePath {
  const arms: Record<Dir, [number, number][]> = {
    right: [
      [-6, -3.2],
      [-6, 3.2],
    ],
    left: [
      [6, -3.2],
      [6, 3.2],
    ],
    down: [
      [-3.2, -6],
      [3.2, -6],
    ],
    up: [
      [-3.2, 6],
      [3.2, 6],
    ],
  };
  const [a, b] = arms[dir];
  return {
    d: `M${n(x + a[0])} ${n(y + a[1])} L${n(x)} ${n(y)} L${n(x + b[0])} ${n(y + b[1])}`,
    kind: 'tip',
  };
}

interface ChainOptions {
  /** En columna cuando la fila no cabe: es la alternativa apilada de 375px. */
  readonly stacked?: boolean;
  /** Caja colgada de un nodo por debajo, con trazo discontinuo. */
  readonly aside?: { readonly of: number; readonly label: string };
  /** Cierra el ciclo con una flecha de vuelta del último al primero. */
  readonly loop?: boolean;
  /** Cajas más estrechas para las figuras de ficha, que tienen menos hoja. */
  readonly boxWidth?: number;
  readonly seed?: number;
}

/** Cadena de cajas encadenadas por flechas: el flujo de una aplicación, la
 *  arquitectura de un proyecto o el bucle de un método. */
export function chain(nodes: readonly string[], options: ChainOptions = {}): FigureModel {
  const { stacked = false, aside, loop = false, boxWidth = 150, seed = 0 } = options;
  const paths: FigurePath[] = [];
  const texts: FigureText[] = [];

  const w = stacked ? 150 : boxWidth;
  const h = stacked ? 34 : 46;
  const gapMain = stacked ? 26 : 30;
  const step = (stacked ? h : w) + gapMain;

  nodes.forEach((node, i) => {
    const x = stacked ? 8 : 4 + i * step;
    const y = stacked ? 6 + i * step : 8;
    paths.push({ d: box(x, y, w, h, seed + i * 7), kind: 'box' });
    texts.push({ x: n(x + w / 2), y: n(y + h / 2 + 5), text: node, kind: 'node' });

    if (i === nodes.length - 1) return;
    if (stacked) {
      paths.push({ d: line(x + w / 2, y + h + 5, x + w / 2, y + step - 5, seed + i), kind: 'link' });
      paths.push(tip(x + w / 2, y + step - 5, 'down'));
    } else {
      paths.push({ d: line(x + w + 5, y + h / 2, x + step - 5, y + h / 2, seed + i), kind: 'link' });
      paths.push(tip(x + step - 5, y + h / 2, 'right'));
    }
  });

  const lastEnd = stacked ? 6 + (nodes.length - 1) * step + h : 8 + (nodes.length - 1) * step + w;
  let width = stacked ? w + 16 : lastEnd + 4;
  let height = stacked ? lastEnd + 6 : h + 16;

  if (aside) {
    // Cuelga por debajo del nodo que la usa, con línea discontinua: la capa
    // de IA no es un paso más de la cadena, es algo a lo que se llama.
    const hostX = stacked ? 8 : 4 + aside.of * step;
    const hostY = stacked ? 6 + aside.of * step : 8;
    const asideX = stacked ? hostX + w + 30 : hostX - 8;
    const asideY = stacked ? hostY : hostY + h + 42;

    paths.push({ d: box(asideX, asideY, w, h, seed + 41), kind: 'box' });
    texts.push({
      x: n(asideX + w / 2),
      y: n(asideY + h / 2 + 5),
      text: aside.label,
      kind: 'node',
    });
    if (stacked) {
      paths.push({
        d: `M${n(hostX + w + 4)} ${n(hostY + h / 2)} H${n(asideX - 6)}`,
        kind: 'aside-link',
      });
      paths.push(tip(asideX - 6, hostY + h / 2, 'right'));
    } else {
      paths.push({
        d: `M${n(hostX + w / 2)} ${n(hostY + h + 4)} V${n(asideY - 6)}`,
        kind: 'aside-link',
      });
      paths.push(tip(hostX + w / 2, asideY - 6, 'down'));
    }
    width = Math.max(width, asideX + w + 4);
    height = Math.max(height, asideY + h + 8);
  }

  if (loop) {
    // Vuelta al principio por debajo (o por el costado, apilado): un bucle
    // dibujado como cadena abierta no es un bucle.
    const first = stacked ? { x: 8, y: 6 } : { x: 4, y: 8 };
    const last = stacked
      ? { x: 8, y: 6 + (nodes.length - 1) * step }
      : { x: 4 + (nodes.length - 1) * step, y: 8 };

    if (stacked) {
      const railX = n(first.x + w + 12);
      paths.push({
        d: `M${n(last.x + w + 4)} ${n(last.y + h / 2)} H${railX} V${n(first.y + h / 2)} H${n(first.x + w + 6)}`,
        kind: 'link',
      });
      paths.push(tip(first.x + w + 6, first.y + h / 2, 'left'));
      width = Math.max(width, railX + 6);
    } else {
      const railY = n(first.y + h + 26);
      paths.push({
        d: `M${n(last.x + w / 2)} ${n(last.y + h + 4)} V${railY} H${n(first.x + w / 2)} V${n(first.y + h + 6)}`,
        kind: 'link',
      });
      paths.push(tip(first.x + w / 2, first.y + h + 6, 'up'));
      height = Math.max(height, railY + 12);
    }
  }

  return { width: n(width), height: n(height), paths, texts };
}

export interface Span {
  readonly label: string;
  readonly place: string;
  /** 'YYYY-MM'. */
  readonly from: string;
  readonly to: string;
  /** Sin cierre por la derecha: sigue abierta hoy. */
  readonly open?: boolean;
}

const months = (iso: string): number => {
  const [year, month] = iso.split('-').map(Number);
  return year * 12 + (month - 1);
};

/** Ancho de avance del mono de figura a 12px, para partir la línea del hueco
 *  alrededor de su rótulo sin medir texto en el servidor. */
const MONO_ADVANCE = 7.2;

/** Meses a partir de los cuales un hueco entre etapas se anota. Por debajo,
 *  el hueco es un cambio de trabajo, no un periodo con nombre. */
const GAP_MONTHS = 6;

/** Fila de la línea temporal: una etapa con barra, o un hueco anotado. */
type TimelineRow =
  | { readonly kind: 'span'; readonly span: Span }
  | { readonly kind: 'gap'; readonly from: string; readonly to: string };

/** Línea temporal: eje con años y una barra por etapa. Los huecos entre
 *  barras son parte del dato, no un fallo de maquetación: con `gapLabel`,
 *  el hueco ocupa su propia fila cronológica y se anota dentro de la figura
 *  —ticks en sus fechas y trazo discontinuo— para que también se lea así
 *  cuando el hueco domina la hoja. El pie complementa; no carga él solo. */
export function timeline(
  spans: readonly Span[],
  from: string,
  to: string,
  options: { readonly stacked?: boolean; readonly gapLabel?: string } = {},
): FigureModel {
  const stacked = options.stacked ?? false;
  const gapLabel = options.gapLabel;
  const paths: FigurePath[] = [];
  const texts: FigureText[] = [];

  const start = months(from);
  const total = months(to) - start || 1;
  const firstYear = Number(from.slice(0, 4));
  const lastYear = Number(to.slice(0, 4));

  // Las filas van en orden cronológico, y el hueco es una fila más: la etapa
  // sin barra. Insertarlo como fila le da el mismo derecho a hoja que a las
  // demás, que es exactamente lo que el dato pide.
  const rows: TimelineRow[] = [];
  spans.forEach((span, i) => {
    const prev = spans[i - 1];
    if (gapLabel && prev && months(span.from) - months(prev.to) >= GAP_MONTHS) {
      rows.push({ kind: 'gap', from: prev.to, to: span.from });
    }
    rows.push({ kind: 'span', span });
  });

  if (!stacked) {
    const x0 = 6;
    // El eje no llega al borde: la etapa abierta necesita sitio para su punta.
    const x1 = 700;
    const axisY = 30 + rows.length * 18 + 12;
    const at = (iso: string) => n(x0 + ((months(iso) - start) / total) * (x1 - x0));

    paths.push({ d: line(x0, axisY, x1, axisY, 3), kind: 'axis' });

    for (let year = firstYear; year <= lastYear; year++) {
      const x = at(`${year}-01`);
      paths.push({ d: line(x, axisY - 4, x, axisY + 4, year), kind: 'axis' });
      texts.push({ x, y: axisY + 20, text: String(year), kind: 'year' });
    }

    rows.forEach((row, i) => {
      const y = 30 + i * 18;

      if (row.kind === 'gap') {
        const left = at(row.from);
        const right = at(row.to);
        const mid = (left + right) / 2;
        // El rótulo interrumpe el trazo, como una cota: tick en cada fecha,
        // discontinua hasta el texto y de vuelta.
        const textHalf = (gapLabel!.length * MONO_ADVANCE) / 2 + 8;
        paths.push({ d: line(left, y + 1, left, y + 11, 17 + i), kind: 'axis' });
        paths.push({ d: line(right, y + 1, right, y + 11, 19 + i), kind: 'axis' });
        if (mid - textHalf - left > 6) {
          paths.push({ d: `M${n(left + 3)} ${n(y + 6)} H${n(mid - textHalf)}`, kind: 'gap' });
          paths.push({ d: `M${n(mid + textHalf)} ${n(y + 6)} H${n(right - 3)}`, kind: 'gap' });
        }
        texts.push({ x: n(mid), y: n(y + 10), text: gapLabel!, kind: 'label' });
        return;
      }

      const span = row.span;
      const left = at(span.from);
      const right = at(span.to);
      paths.push({ d: box(left, y, Math.max(right - left, 10), 12, 11 + i * 5), kind: 'bar' });
      // La etapa que sigue abierta no se cierra con un borde: sigue.
      if (span.open) paths.push(tip(right + 9, y + 6, 'right'));
      // El rótulo a la derecha de su barra, y de la última hacia dentro para
      // que no se salga de la figura.
      const outside = right + 8 > 600;
      texts.push({
        x: outside ? n(left - 8) : n(right + 8),
        y: n(y + 10),
        text: `${span.label} · ${span.place}`,
        kind: 'label',
        anchor: outside ? 'end' : 'start',
      });
    });

    return { width: 720, height: n(axisY + 28), paths, texts };
  }

  // Apilada: el eje se pone de pie y las etapas caen a su derecha.
  const y0 = 10;
  const y1 = 244;
  const axisX = 44;
  const at = (iso: string) => n(y0 + ((months(iso) - start) / total) * (y1 - y0));

  paths.push({ d: line(axisX, y0, axisX, y1, 3), kind: 'axis' });

  for (let year = firstYear; year <= lastYear; year++) {
    const y = at(`${year}-01`);
    paths.push({ d: line(axisX - 4, y, axisX + 4, y, year), kind: 'axis' });
    texts.push({ x: axisX - 10, y: n(y + 4), text: String(year), kind: 'year', anchor: 'end' });
  }

  const laneWidth = 11;
  const lanes = axisX + 10 + rows.length * laneWidth;

  rows.forEach((row, i) => {
    const x = axisX + 10 + i * laneWidth;

    if (row.kind === 'gap') {
      const top = at(row.from);
      const bottom = at(row.to);
      // El mismo carril que tendría su barra: ticks en las fechas, trazo
      // discontinuo entre ellas y el rótulo donde lo llevan las etapas.
      paths.push({ d: line(x, top, x + 8, top, 17 + i), kind: 'axis' });
      paths.push({ d: line(x, bottom, x + 8, bottom, 19 + i), kind: 'axis' });
      paths.push({ d: `M${n(x + 4)} ${n(top + 3)} V${n(bottom - 3)}`, kind: 'gap' });
      texts.push({
        x: lanes + 8,
        y: n((top + bottom) / 2 + 4),
        text: gapLabel!,
        kind: 'label',
        anchor: 'start',
      });
      return;
    }

    const span = row.span;
    const top = at(span.from);
    const bottom = at(span.to);
    const height = Math.max(bottom - top, 10);
    paths.push({ d: box(x, top, 8, height, 11 + i * 5), kind: 'bar' });
    if (span.open) paths.push(tip(x + 4, bottom + 9, 'down'));
    // A la altura media de su barra: con el rótulo pegado al inicio, dos
    // etapas seguidas escriben una encima de otra.
    texts.push({
      x: lanes + 8,
      y: n(top + height / 2 + 4),
      text: `${span.label} · ${span.place}`,
      kind: 'label',
      anchor: 'start',
    });
  });

  return { width: 340, height: 262, paths, texts };
}
