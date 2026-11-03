import type { BufferGeometry } from 'three'

/** Estructuras anatómicas que la experiencia sabe mostrar y etiquetar. */
export type AnatomyKey = 'enamel' | 'dentin' | 'pulp' | 'canals' | 'cementum' | 'root'

/** Capas de la carilla, en el orden en que se construyen. */
export type VeneerLayerKey = 'design' | 'dentin' | 'effects' | 'enamel' | 'glaze'

/** Geometrías que necesita la escena. Vienen del GLB profesional o del modelo provisional. */
export interface ToothGeometries {
  enamel: BufferGeometry
  dentin: BufferGeometry
  pulp: BufferGeometry
  canals: BufferGeometry
  cementum: BufferGeometry
  /** Nervios y vasos: elementos ilustrativos, no anatomía exacta. */
  nerve: BufferGeometry
  artery: BufferGeometry
  vein: BufferGeometry
}

export interface AnatomyLabel {
  key: AnatomyKey
  name: string
  text: string
  /** Punto de anclaje en coordenadas locales de la capa (unidades del modelo). */
  anchor: [number, number, number]
  /** Lado hacia donde se dibuja la etiqueta. */
  side: 'left' | 'right'
}

export interface Chapter {
  id: string
  index: string
  label: string
  start: number
  end: number
}

export type DeviceTier = 'high' | 'low'
