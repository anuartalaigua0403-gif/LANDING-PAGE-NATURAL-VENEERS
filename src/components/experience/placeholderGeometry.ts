/**
 * MODELO PROVISIONAL generado por código.
 * Sirve para construir y probar la experiencia mientras llega el GLB profesional
 * (ver docs/ANATOMY_ASSETS.md). Es una aproximación simplificada de un incisivo
 * central superior: no debe presentarse como modelo anatómico exacto.
 */
import * as THREE from 'three'
import type { ToothGeometries } from '@/types/dental'

const P = (pts: [number, number][]) => pts.map(([r, y]) => new THREE.Vector2(r, y))

function smooth(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/** Deforma una geometría de revolución hacia la forma de un incisivo. */
export function shapeIncisor(geo: THREE.BufferGeometry) {
  const pos = geo.attributes.position as THREE.BufferAttribute
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const s = smooth(-0.3, 1.2, v.y) // 0 en la raíz, 1 en el borde incisal
    v.x *= 1 + 0.32 * s // más ancha mesio-distalmente
    v.z *= 1 - 0.5 * s // más delgada en sentido labio-lingual
    v.z += 0.07 * s * (1 - Math.abs(v.x) / 0.9) // leve convexidad labial
    if (v.y < -0.2) {
      const t = (-v.y - 0.2) / 3
      v.x += 0.1 * t * t // ápice ligeramente desviado a distal
    }
    pos.setXYZ(i, v.x, v.y, v.z)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

function lathe(points: THREE.Vector2[], segments: number, phiStart = 0, phiLength = Math.PI * 2) {
  return shapeIncisor(new THREE.LatheGeometry(points, segments, phiStart, phiLength))
}

const ENAMEL = P([
  [0.001, -0.26], [0.5, -0.26], [0.56, -0.24], [0.62, 0.0], [0.7, 0.35], [0.72, 0.7],
  [0.7, 1.05], [0.66, 1.35], [0.61, 1.56], [0.48, 1.69], [0.24, 1.76], [0.001, 1.78],
])

const DENTIN = P([
  [0.001, -3.05], [0.06, -3.0], [0.18, -2.6], [0.3, -1.9], [0.4, -1.2], [0.48, -0.5],
  [0.52, -0.2], [0.58, 0.2], [0.62, 0.7], [0.6, 1.1], [0.54, 1.38], [0.36, 1.54], [0.001, 1.6],
])

const CEMENTUM = P([
  [0.001, -3.15], [0.09, -3.09], [0.22, -2.65], [0.345, -1.9], [0.445, -1.2],
  [0.525, -0.5], [0.555, -0.22], [0.001, -0.2],
])

const PULP = P([
  [0.001, -0.45], [0.11, -0.42], [0.16, -0.2], [0.22, 0.12], [0.25, 0.5],
  [0.2, 0.84], [0.09, 1.0], [0.001, 1.02],
])

const CANALS = P([
  [0.001, -2.98], [0.03, -2.92], [0.05, -2.4], [0.07, -1.6], [0.09, -0.9], [0.115, -0.38], [0.001, -0.36],
])

function vessel(points: [number, number, number][], radius: number) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
  return new THREE.TubeGeometry(curve, 64, radius, 6, false)
}

/** Crea todas las geometrías del diente provisional. `detail` reduce polígonos en móvil. */
export function createPlaceholderTooth(detail: 'high' | 'low'): ToothGeometries {
  const seg = detail === 'high' ? 96 : 48
  return {
    enamel: lathe(ENAMEL, seg),
    dentin: lathe(DENTIN, seg),
    cementum: lathe(CEMENTUM, seg),
    pulp: lathe(PULP, seg / 2),
    canals: lathe(CANALS, seg / 3),
    // Nervio y vasos: ilustrativos (centro del conducto → salida por el ápice).
    nerve: vessel([[0, 0.7, 0], [0, -0.4, 0], [0.04, -2.0, 0], [0.1, -2.95, 0], [0.18, -3.6, 0.05], [0.35, -4.1, 0.1]], 0.018),
    artery: vessel([[0.04, 0.6, 0.03], [0.03, -0.5, 0.02], [0.07, -2.0, 0.02], [0.12, -2.95, 0.03], [0.02, -3.6, 0.15], [-0.15, -4.1, 0.2]], 0.014),
    vein: vessel([[-0.04, 0.55, -0.03], [-0.03, -0.5, -0.02], [0.03, -2.0, -0.02], [0.08, -2.95, -0.03], [0.3, -3.5, -0.15], [0.5, -3.9, -0.25]], 0.014),
  }
}

/** Carilla provisional: cara vestibular de la corona, ligeramente más grande que el esmalte. */
export function createPlaceholderVeneer(scale: number, detail: 'high' | 'low') {
  const pts = ENAMEL.filter((p) => p.y > -0.05).map((p) => new THREE.Vector2(p.x * scale, p.y * (1 + (scale - 1) * 0.4)))
  pts.unshift(new THREE.Vector2(0.6 * scale, -0.05))
  // phi = 0 apunta a +z (cara vestibular, hacia la cámara).
  return lathe(pts, detail === 'high' ? 72 : 36, -1.15, 2.3)
}
