/**
 * MODELO PROVISIONAL generado por código (mientras llega el GLB profesional, ver docs/ANATOMY_ASSETS.md).
 *
 * Aproximación paramétrica de un incisivo central superior:
 * - corona con contorno vestibular convexo, cara palatina en pala (rebordes marginales y cíngulo),
 *   ángulo mesial recto y distal redondeado, línea amelocementaria festoneada;
 * - esmalte como cáscara (grosor nulo en el cuello, más grueso en incisal), translúcido en el tercio incisal;
 * - dentina con mamelones, pulpa con cuernos pulpares, conducto que se estrecha hacia el ápice;
 * - raíz cónica con ápice ligeramente distal y cemento como capa delgada.
 * No es un modelo anatómico exacto y no debe presentarse como tal.
 */
import * as THREE from 'three'
import type { ToothGeometries } from '@/types/dental'

const TAU = Math.PI * 2
const Y_APEX = -3.15

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const sstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const spow = (v: number, p: number) => Math.sign(v) * Math.pow(Math.abs(v), p)

// ───────────────────────── Forma de la corona ─────────────────────────
/** Posición horizontal normalizada (-1 distal … +1 mesial) para el ángulo θ. */
const xn = (th: number) => spow(Math.sin(th), 2 / 2.4)

/** Línea amelocementaria: sube en las caras proximales (festoneado). */
export const yCEJ = (th: number) => -0.3 + 0.3 * Math.sin(th) ** 2

/** Borde incisal: ángulo mesial más recto, distal más redondeado. */
export const yTop = (th: number) => {
  const x = xn(th)
  return 1.78 - 0.05 * x * x - 0.16 * Math.pow(Math.max(0, -x), 3)
}

/** Contorno de dentina en incisal: tres mamelones. */
const yDentinTop = (th: number) => {
  const x = xn(th)
  return 1.44 + 0.065 * Math.pow(Math.max(0, Math.cos(3 * Math.PI * x)), 0.9) - 0.14 * x * x
}

/** Cuernos pulpares bajo los mamelones. */
const yPulpTop = (th: number) => {
  const x = xn(th)
  return 0.92 + 0.12 * Math.pow(Math.max(0, Math.cos(3 * Math.PI * x)), 0.8) - 0.2 * x * x
}

/** Sección de la corona a una altura relativa v (0 cuello → 1 borde incisal). Devuelve [x, z]. */
function crownXZ(th: number, v: number, k = 1): [number, number] {
  const a = 0.46 + 0.27 * sstep(0, 0.7, v) - 0.02 * sstep(0.7, 1, v)
  const b = v < 0.2 ? lerp(0.43, 0.46, v / 0.2) : lerp(0.46, 0.035, Math.pow((v - 0.2) / 0.8, 1.25))
  const s = Math.sin(th)
  const c = Math.cos(th)
  const n = 2.4
  let x = a * spow(s, 2 / n)
  let z = b * spow(c, 2 / n)
  if (c < 0) {
    // Cara palatina: pala (concavidad central entre rebordes marginales) y cíngulo cervical
    const shovel = 0.5 * sstep(0.25, 0.6, v) * (1 - sstep(0.88, 1, v))
    z *= 1 - shovel * Math.pow(Math.abs(c), 3)
    z *= 1 + 0.1 * (1 - sstep(0, 0.35, v))
  } else {
    // Cara vestibular: lóbulos de desarrollo muy suaves
    z += c * 0.014 * Math.cos(3 * Math.PI * xn(th)) * sstep(0.4, 0.95, v)
  }
  x *= k
  z *= k
  z += -0.05 * v // leve inclinación del borde hacia palatino
  return [x, z]
}

/** v de la superficie externa que corresponde a la altura y en el ángulo θ. */
const vAt = (th: number, y: number) => clamp01((y - yCEJ(th)) / (yTop(th) - yCEJ(th)))

// ───────────────────────── Forma de la raíz ─────────────────────────
function rootXZ(th: number, u: number, k = 1): [number, number] {
  const n = lerp(2.0, 2.4, u)
  const a = 0.46 * Math.pow(u, 0.55)
  const b = 0.43 * Math.pow(u, 0.6)
  const x = a * spow(Math.sin(th), 2 / n) * k + 0.11 * (1 - u) ** 2 // ápice hacia distal
  const z = b * spow(Math.cos(th), 2 / n) * k
  return [x, z]
}

// ───────────────────────── Constructor de mallas ─────────────────────────
type Vec = [number, number, number]
type RGBA = [number, number, number, number]
type PointFn = (th: number, s: number) => Vec
type ColorFn = (th: number, s: number) => RGBA

class MeshBuilder {
  pos: number[] = []
  uv: number[] = []
  col: number[] = []
  morph: number[] = []
  idx: number[] = []

  /** Rejilla θ × s. wrap = cierra la vuelta completa en θ. flip = invierte caras (superficie interna). */
  grid(o: {
    fn: PointFn
    color?: ColorFn
    morph?: PointFn
    th0?: number
    th1?: number
    s0?: number
    s1?: number
    nTh: number
    nS: number
    wrap?: boolean
    flip?: boolean
  }) {
    const { fn, color, morph, nTh, nS, wrap = true, flip = false } = o
    const th0 = o.th0 ?? 0
    const th1 = o.th1 ?? TAU
    const s0 = o.s0 ?? 0
    const s1 = o.s1 ?? 1
    const cols = wrap ? nTh : nTh + 1
    const base = this.pos.length / 3
    for (let j = 0; j <= nS; j++) {
      const s = lerp(s0, s1, j / nS)
      for (let i = 0; i < cols; i++) {
        const th = lerp(th0, th1, i / nTh)
        const p = fn(th, s)
        this.pos.push(...p)
        this.uv.push(i / nTh, s)
        this.col.push(...(color ? color(th, s) : ([1, 1, 1, 1] as RGBA)))
        this.morph.push(...(morph ? morph(th, s) : p))
      }
    }
    for (let j = 0; j < nS; j++) {
      for (let i = 0; i < (wrap ? nTh : nTh); i++) {
        const i2 = wrap ? (i + 1) % nTh : i + 1
        const a = base + j * cols + i
        const b = base + j * cols + i2
        const c = base + (j + 1) * cols + i
        const d = base + (j + 1) * cols + i2
        if (flip) this.idx.push(a, c, b, b, c, d)
        else this.idx.push(a, b, c, b, d, c)
      }
    }
  }

  build(withColor: boolean, withMorph = false) {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3))
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2))
    if (withColor) g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 4))
    if (withMorph) g.morphAttributes.position = [new THREE.Float32BufferAttribute(this.morph, 3)]
    g.setIndex(this.idx)
    g.computeVertexNormals()
    return g
  }
}

const hex = (h: string, a = 1): RGBA => {
  const c = new THREE.Color(h)
  return [c.r, c.g, c.b, a]
}
const mix = (p: RGBA, q: RGBA, t: number): RGBA => [lerp(p[0], q[0], t), lerp(p[1], q[1], t), lerp(p[2], q[2], t), lerp(p[3], q[3], t)]

// ───────────────────────── Superficies ─────────────────────────
const enamelOuter: PointFn = (th, v) => {
  const y = lerp(yCEJ(th), yTop(th), v)
  const [x, z] = crownXZ(th, v)
  return [x, y, z]
}

/** Superficie de la dentina coronal (= cara interna del esmalte). d: 0 cuello → 1 mamelones. */
const dentinCrown = (th: number, d: number): Vec => {
  const y = lerp(yCEJ(th) + 0.005, yDentinTop(th), d)
  const v = vAt(th, y)
  const k = lerp(0.985, 0.83, sstep(0, 0.25, d)) // esmalte casi nulo en el cuello
  const [x, z] = crownXZ(th, v, k)
  const close = d > 0.78 ? Math.sqrt(Math.max(0, 1 - ((d - 0.78) / 0.22) ** 2)) : 1
  const zc = -0.05 * v
  return [x, y, zc + (z - zc) * close]
}

const ENAMEL_CERVICAL = hex('#E9D8B4', 0.97)
const ENAMEL_BODY = hex('#F4EEE2', 0.95)
const ENAMEL_INCISAL = hex('#D5DDE3', 0.74)
const ENAMEL_HALO = hex('#F7F5EF', 0.92)
const enamelColor: ColorFn = (_th, v) => {
  let c = mix(ENAMEL_CERVICAL, ENAMEL_BODY, sstep(0.05, 0.35, v))
  c = mix(c, ENAMEL_INCISAL, sstep(0.76, 0.94, v))
  return mix(c, ENAMEL_HALO, sstep(0.955, 0.995, v))
}

const DENTIN_ROOT = hex('#D6BC92')
const DENTIN_CERVICAL = hex('#D8B583')
const DENTIN_BODY = hex('#E7CFA3')
const DENTIN_MAMELON = hex('#EADBC0')

export function createPlaceholderTooth(detail: 'high' | 'low'): ToothGeometries {
  const nTh = detail === 'high' ? 112 : 56
  const nS = detail === 'high' ? 64 : 32

  // Esmalte: cáscara cerrada (cara externa + interna + borde cervical)
  const en = new MeshBuilder()
  en.grid({ fn: enamelOuter, color: enamelColor, nTh, nS })
  en.grid({ fn: dentinCrown, color: enamelColor, nTh, nS: Math.round(nS * 0.6), flip: true })
  en.grid({
    fn: (th, t) => {
      const a = enamelOuter(th, 0)
      const b = dentinCrown(th, 0)
      return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
    },
    color: enamelColor,
    nTh,
    nS: 1,
    flip: true,
  })

  // Dentina: sólido continuo desde el ápice hasta los mamelones
  const de = new MeshBuilder()
  const SPLIT = 0.58
  de.grid({
    fn: (th, s) => {
      if (s < SPLIT) {
        const u = s / SPLIT
        const [x, z] = rootXZ(th, u, 0.94)
        return [x, lerp(Y_APEX + 0.06, yCEJ(th) + 0.005, u), z]
      }
      return dentinCrown(th, (s - SPLIT) / (1 - SPLIT))
    },
    color: (_th, s) => {
      if (s < SPLIT) return mix(DENTIN_ROOT, DENTIN_CERVICAL, sstep(0.7, 1, s / SPLIT))
      const d = (s - SPLIT) / (1 - SPLIT)
      return mix(mix(DENTIN_CERVICAL, DENTIN_BODY, sstep(0, 0.4, d)), DENTIN_MAMELON, sstep(0.7, 1, d))
    },
    nTh,
    nS: Math.round(nS * 1.6),
  })

  // Cemento: capa delgada sobre la raíz
  const ce = new MeshBuilder()
  const cemOuter: PointFn = (th, u) => {
    const [x, z] = rootXZ(th, u, 1)
    return [x, lerp(Y_APEX, yCEJ(th), u), z]
  }
  const cemInner: PointFn = (th, u) => {
    const [x, z] = rootXZ(th, u, 0.94)
    return [x, lerp(Y_APEX + 0.06, yCEJ(th) + 0.005, u), z]
  }
  ce.grid({ fn: cemOuter, nTh, nS })
  ce.grid({ fn: cemInner, nTh, nS, flip: true })
  ce.grid({
    fn: (th, t) => {
      const a = cemOuter(th, 1)
      const b = cemInner(th, 1)
      return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
    },
    nTh,
    nS: 1,
  })

  // Pulpa coronal con cuernos pulpares
  const pu = new MeshBuilder()
  pu.grid({
    fn: (th, d) => {
      const y = lerp(-0.25, yPulpTop(th), d)
      const v = vAt(th, y)
      const [x, z] = crownXZ(th, v, 0.36 + 0.06 * Math.sin(Math.PI * d))
      const close = d > 0.75 ? Math.sqrt(Math.max(0, 1 - ((d - 0.75) / 0.25) ** 2)) : 1
      const zc = -0.05 * v
      return [x, y, zc + (z - zc) * close]
    },
    nTh: Math.round(nTh / 2),
    nS: Math.round(nS / 2),
  })

  // Conducto radicular: se estrecha hasta el foramen apical
  const ca = new MeshBuilder()
  ca.grid({
    fn: (th, u) => {
      const [x, z] = rootXZ(th, u, 0.18 + 0.14 * u)
      return [x, lerp(Y_APEX + 0.12, -0.18, u), z]
    },
    nTh: Math.round(nTh / 3),
    nS: Math.round(nS / 1.5),
  })

  return {
    enamel: en.build(true),
    dentin: de.build(true),
    cementum: ce.build(false),
    pulp: pu.build(false),
    canals: ca.build(false),
    // Nervio y vasos: ilustrativos (centro del conducto → salida por el ápice).
    nerve: vessel([[0, 0.8, -0.02], [0, -0.3, 0], [0.04, -2.0, 0], [0.1, -3.0, 0], [0.2, -3.6, 0.05], [0.35, -4.1, 0.1]], 0.016),
    artery: vessel([[0.05, 0.7, 0.02], [0.04, -0.4, 0.02], [0.07, -2.0, 0.02], [0.12, -3.0, 0.03], [0.02, -3.6, 0.15], [-0.15, -4.1, 0.2]], 0.013),
    vein: vessel([[-0.05, 0.65, -0.03], [-0.04, -0.4, -0.02], [0.03, -2.0, -0.02], [0.08, -3.0, -0.03], [0.3, -3.5, -0.15], [0.5, -3.9, -0.25]], 0.013),
  }
}

function vessel(points: Vec[], radius: number) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
  return new THREE.TubeGeometry(curve, 64, radius, 6, false)
}

// ───────────────────────── Carilla estratificada ─────────────────────────
/** Punto sobre la cara vestibular desplazado d unidades hacia afuera (dirección radial). */
function veneerPoint(th: number, v: number, d: number): Vec {
  const [x, y, z] = enamelOuter(th, v)
  const zc = -0.05 * v
  const len = Math.hypot(x, z - zc) || 1
  const wrapUp = d * 0.9 * sstep(0.9, 1, v) // cubre el borde incisal
  return [x + (x / len) * d, y + wrapUp, z + ((z - zc) / len) * d]
}

/** Línea del cut-back: mamelones en el tercio incisal de la capa de dentina cerámica. */
const cutLine = (th: number) => {
  const x = xn(th)
  return 0.6 + 0.13 * Math.pow(Math.max(0, Math.cos(3 * Math.PI * x)), 0.7) - 0.05 * x * x
}

const VENEER_TH = 1.05 // ángulo cubierto a cada lado de la cara vestibular

function veneerShell(o: {
  dIn: (th: number, v: number) => number
  dOut: (th: number, v: number) => number
  v0: number
  color?: ColorFn
  morphOut?: (th: number, v: number) => number
  detail: 'high' | 'low'
}) {
  const nTh = o.detail === 'high' ? 72 : 36
  const nS = o.detail === 'high' ? 48 : 24
  const b = new MeshBuilder()
  const range = { th0: -VENEER_TH, th1: VENEER_TH, s0: o.v0, s1: 1, nTh, nS, wrap: false }
  const outer: PointFn = (th, v) => veneerPoint(th, v, o.dOut(th, v))
  const inner: PointFn = (th, v) => veneerPoint(th, v, o.dIn(th, v))
  const outerM: PointFn = o.morphOut ? (th, v) => veneerPoint(th, v, o.morphOut!(th, v)) : outer
  b.grid({ ...range, fn: outer, color: o.color, morph: outerM })
  b.grid({ ...range, fn: inner, color: o.color, flip: true })
  // Bordes (cervical y laterales) para que cada capa tenga grosor visible
  const edge = (pa: PointFn, pb: PointFn, pm: PointFn, flip: boolean, along: 'th' | 'v', fixed: number) =>
    b.grid({
      fn: (p, t) => {
        const [th, v] = along === 'th' ? [p, fixed] : [fixed, p]
        const A = pa(th, v)
        const B = pb(th, v)
        return [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)]
      },
      morph: (p, t) => {
        const [th, v] = along === 'th' ? [p, fixed] : [fixed, p]
        const A = pm(th, v)
        const B = pb(th, v)
        return [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)]
      },
      color: o.color ? (p) => (along === 'th' ? o.color!(p, fixed) : o.color!(fixed, p)) : undefined,
      th0: along === 'th' ? -VENEER_TH : o.v0,
      th1: along === 'th' ? VENEER_TH : 1,
      nTh: along === 'th' ? nTh : nS,
      nS: 1,
      wrap: false,
      flip,
    })
  edge(outer, inner, outerM, true, 'th', o.v0)
  edge(outer, inner, outerM, false, 'v', -VENEER_TH)
  edge(outer, inner, outerM, true, 'v', VENEER_TH)
  return b.build(!!o.color, !!o.morphOut)
}

export interface VeneerGeometries {
  design: THREE.BufferGeometry
  dentin: THREE.BufferGeometry
  effects: THREE.BufferGeometry
  enamel: THREE.BufferGeometry
  glaze: THREE.BufferGeometry
}

/**
 * Capas de una carilla estratificada (técnica de cut-back):
 * diseño → dentina cerámica → cut-back con mamelones (morph) → efectos incisales y halo
 * → esmalte cerámico → glaseado y pulido.
 */
export function createPlaceholderVeneer(detail: 'high' | 'low'): VeneerGeometries {
  const V0 = 0.05
  const D_IN = 0.004
  const D_DENTIN = 0.042
  const D_ENAMEL = 0.07
  const D_GLAZE = 0.074

  const dentinColor: ColorFn = (_th, v) =>
    mix(mix(hex('#D9B98C', 0.98), hex('#E6CEA6', 0.98), sstep(0.05, 0.4, v)), hex('#EEDCBC', 0.98), sstep(0.5, 0.75, v))
  const effectsColor: ColorFn = (_th, v) => {
    const fadeIn = sstep(0.45, 0.62, v)
    const opal = hex('#9FB3C6', 0.5 * fadeIn)
    return mix(opal, hex('#FAF8F2', 0.9), sstep(0.955, 0.995, v))
  }
  const enamelColor2: ColorFn = (_th, v) =>
    mix(mix(hex('#EDE3D0', 0.32), hex('#F4F1EA', 0.36), sstep(0.1, 0.5, v)), hex('#DCE4EA', 0.24), sstep(0.7, 0.95, v))

  return {
    design: veneerShell({ dIn: () => D_IN, dOut: () => D_GLAZE, v0: V0, detail: 'low' }),
    dentin: veneerShell({
      dIn: () => D_IN,
      dOut: (_th, v) => D_DENTIN * (0.55 + 0.45 * sstep(0.05, 0.3, v)),
      // Cut-back: por encima de la línea de mamelones la dentina se recorta casi hasta la base
      morphOut: (th, v) => {
        const base = D_DENTIN * (0.55 + 0.45 * sstep(0.05, 0.3, v))
        const cut = sstep(cutLine(th) - 0.05, cutLine(th) + 0.015, v)
        return lerp(base, D_IN + 0.0015, cut)
      },
      v0: V0,
      color: dentinColor,
      detail,
    }),
    effects: veneerShell({
      dIn: () => D_IN + 0.002,
      dOut: (_th, v) => D_IN + 0.002 + 0.03 * sstep(0.45, 0.7, v),
      v0: 0.45,
      color: effectsColor,
      detail,
    }),
    enamel: veneerShell({ dIn: () => D_IN + 0.001, dOut: () => D_ENAMEL, v0: V0, color: enamelColor2, detail }),
    glaze: veneerShell({ dIn: () => D_ENAMEL + 0.0005, dOut: () => D_GLAZE, v0: V0, detail }),
  }
}

// ───────────────────────── Textura de periquimatías ─────────────────────────
let perikymata: THREE.CanvasTexture | null = null
/** Mapa de relieve con periquimatías (líneas horizontales finas del esmalte) y microtextura. */
export function getPerikymataTexture() {
  if (perikymata || typeof document === 'undefined') return perikymata
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 1024
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, c.width, c.height)
  // Periquimatías: más marcadas en el tercio cervical, casi lisas en incisal (v = 1 arriba)
  for (let y = 0; y < c.height; y += 5 + Math.random() * 4) {
    const v = 1 - y / c.height
    const strength = 0.35 * (1 - v) + 0.06
    ctx.strokeStyle = `rgba(0,0,0,${strength})`
    ctx.lineWidth = 1 + Math.random()
    ctx.beginPath()
    for (let x = 0; x <= c.width; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.05 + y) * 1.2)
    ctx.stroke()
  }
  // Microtextura
  const img = ctx.getImageData(0, 0, c.width, c.height)
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 10
    img.data[i] += n
    img.data[i + 1] += n
    img.data[i + 2] += n
  }
  ctx.putImageData(img, 0, 0)
  perikymata = new THREE.CanvasTexture(c)
  perikymata.wrapS = THREE.RepeatWrapping
  perikymata.colorSpace = THREE.NoColorSpace
  return perikymata
}
