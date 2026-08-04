/**
 * Movimiento del design system JSB.
 *
 * Espejo en TypeScript de los tokens `--ease-*`, `--dur-*` y `--stagger`.
 * Framer Motion necesita arrays y números, no custom properties de CSS, así que
 * los valores viven aquí en vez de en globals.css — pero son los mismos y este
 * archivo es el único sitio donde se escriben.
 *
 * Regla del sistema: nada se mueve más de 16px ni dura más de 0.5s.
 */

/** Entradas de contenido: cards, secciones, transición de página. */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Aperturas envolventes: solo el overlay del menú móvil. */
export const EASE_INOUT_QUINT = [0.76, 0, 0.24, 1] as const;

/** 0.35s — entradas de contenido. */
export const DUR_FAST = 0.35;

/** 0.45s — el hero y el overlay del menú. */
export const DUR_BASE = 0.45;

/** Retardo por índice en grids y listas. */
export const STAGGER = 0.06;
