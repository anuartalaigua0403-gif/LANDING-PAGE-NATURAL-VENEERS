/**
 * Estado compartido entre la timeline de GSAP y la escena 3D.
 * GSAP escribe estos valores con scrub; useFrame los lee cada cuadro.
 * No es estado de React: no provoca renders.
 */
export const xp = {
  progress: 0,
  /** 0 → 1: el diente aparece desde la oscuridad. */
  appear: 0.3,
  /** Rotación del diente sobre su eje (radianes). */
  rotY: -0.6,
  /** Distancia de cámara. */
  camZ: 12.5,
  /** Desplazamiento lateral del diente en pantalla (se adapta a móvil). */
  shiftX: 1.6,
  shiftY: 0,
  /** 0 → 1: separación de capas (vista explosionada). */
  explode: 0,
  /** Índice (decimal) de la estructura enfocada en la escena 02. -1 = ninguna. */
  focus: -1,
  /** Visibilidad de las etiquetas anatómicas. */
  labels: 0,
  /** 0 → 1: modo ingeniería digital (wireframe, escaneo, rejilla). */
  digital: 0,
  /** Opacidad general del diente natural (se atenúa en las escenas 03 y 04). */
  tooth: 1,
  /** 0 → 1: aparición de la carilla. */
  veneer: 0,
  /** 0 → 5: capas de la carilla construidas. */
  build: 0,
  /** 0 → 1: separación de las capas de la carilla. */
  vExplode: 0,
  /** 0 → 1: la carilla viaja y se integra en el diente. */
  attach: 0,
  /** 0 → 1: luz más cálida al final. */
  warm: 0,
}

export type XPState = typeof xp

/** Estructura bajo el cursor / dedo (-1 = ninguna). Se actualiza sin React. */
export const hover = { index: -1 }
