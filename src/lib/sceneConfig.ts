import type { AnatomyLabel, Chapter, VeneerLayerKey } from '@/types/dental'

/** Paleta de la Experiencia Anatómica (solo para /anatomia). */
export const PALETTE = {
  black: '#050505',
  navy: '#081020',
  gold: '#C9A45C',
  goldLight: '#E8D3A0',
  porcelain: '#F8F8F6',
  gray: '#A1A1AA',
} as const

/**
 * Modelos 3D profesionales.
 * Mientras `available` sea false se usa el modelo provisional generado por código
 * (src/components/experience/placeholderGeometry.ts). Cuando el archivo exista en
 * /public, cambiar `available` a true. Ver docs/ANATOMY_ASSETS.md.
 */
export const MODELS = {
  tooth: {
    available: false,
    url: '/models/tooth/tooth-anatomy.glb',
    /** Nombre exacto de cada malla dentro del GLB. */
    nodes: {
      enamel: 'Enamel',
      dentin: 'Dentin',
      pulp: 'Pulp',
      canals: 'RootCanals',
      cementum: 'Cementum',
      nerve: 'Nerve',
      artery: 'Artery',
      vein: 'Vein',
    },
  },
  veneer: {
    available: false,
    url: '/models/veneer/veneer-layers.glb',
    nodes: {
      design: 'Design',
      dentin: 'CeramicDentin',
      effects: 'IncisalEffects',
      enamel: 'CeramicEnamel',
      glaze: 'Glaze',
    } satisfies Record<VeneerLayerKey, string>,
  },
} as const

/** Capítulos y su tramo dentro del progreso total del scroll (0 → 1). */
export const CHAPTERS: Chapter[] = [
  { id: 'origin', index: '01', label: 'El origen', start: 0, end: 0.15 },
  { id: 'anatomy', index: '02', label: 'La anatomía', start: 0.15, end: 0.35 },
  { id: 'engineering', index: '03', label: 'Ingeniería digital', start: 0.35, end: 0.55 },
  { id: 'craftsmanship', index: '04', label: 'Artesanía', start: 0.55, end: 0.8 },
  { id: 'perfection', index: '05', label: 'La perfección', start: 0.8, end: 1 },
]

/** Altura total del recorrido de scroll, en % de la altura de pantalla. */
export const SCROLL_LENGTH_VH = 600

/** Orden de enfoque de la escena 02. */
export const ANATOMY_LABELS: AnatomyLabel[] = [
  {
    key: 'enamel',
    name: 'Esmalte',
    text: 'Capa externa de la corona. Es el tejido más mineralizado del cuerpo y define brillo y translucidez.',
    anchor: [-0.55, 1.05, 0.25],
    side: 'left',
  },
  {
    key: 'dentin',
    name: 'Dentina',
    text: 'Tejido bajo el esmalte. Aporta el color de base y el soporte de la corona y la raíz.',
    anchor: [0.5, 0.6, 0.2],
    side: 'right',
  },
  {
    key: 'pulp',
    name: 'Pulpa dental',
    text: 'Tejido blando en la cámara pulpar, con nervios y vasos sanguíneos (representación ilustrativa).',
    anchor: [0.2, 0.45, 0.1],
    side: 'right',
  },
  {
    key: 'canals',
    name: 'Conductos radiculares',
    text: 'Prolongación de la pulpa a lo largo de la raíz, hasta el ápice.',
    anchor: [0.08, -1.6, 0.05],
    side: 'left',
  },
  {
    key: 'cementum',
    name: 'Cemento radicular',
    text: 'Capa delgada que recubre la raíz y la une al ligamento periodontal.',
    anchor: [0.36, -1.2, 0.1],
    side: 'right',
  },
  {
    key: 'root',
    name: 'Raíz',
    text: 'Porción del diente anclada en el hueso alveolar.',
    anchor: [-0.24, -2.1, 0.05],
    side: 'left',
  },
]

/** Pasos de la estratificación de la carilla (escena 04), técnica de cut-back. */
export const VENEER_STEPS: { key: string; name: string }[] = [
  { key: 'design', name: 'Diseño de la carilla' },
  { key: 'dentin', name: 'Dentina cerámica' },
  { key: 'cutback', name: 'Recorte (cut-back) y mamelones' },
  { key: 'effects', name: 'Efectos incisales y halo' },
  { key: 'enamel', name: 'Esmalte cerámico' },
  { key: 'glaze', name: 'Glaseado y pulido' },
]
