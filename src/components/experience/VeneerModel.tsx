'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/sceneConfig'
import { createPlaceholderVeneer, getPerikymataTexture } from './placeholderGeometry'
import { xp } from './experienceState'
import { clamp01, lerp, smooth } from './math'

/** Pose de exhibición de la carilla (coordenadas locales del diente) antes de integrarse. */
const SHOW = { pos: new THREE.Vector3(2.3, -0.9, 0.6), rotY: -0.4, scale: 1.1 }

/**
 * Carilla estratificada (escena 04) que viaja y se integra en el diente (escena 05).
 * Pasos (xp.build de 0 a 6):
 *  1 diseño · 2 dentina cerámica · 3 cut-back y mamelones · 4 efectos incisales y halo
 *  5 esmalte cerámico · 6 glaseado y pulido
 */
export default function VeneerModel({ tier }: { tier: 'high' | 'low' }) {
  const geos = useMemo(() => createPlaceholderVeneer(tier), [tier])
  const mats = useMemo(() => {
    const bump = getPerikymataTexture()
    return {
      design: new THREE.MeshBasicMaterial({ color: PALETTE.gold, wireframe: true, transparent: true, depthWrite: false }),
      dentin: new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.55, sheen: 0.3, transparent: true, side: THREE.DoubleSide }),
      effects: new THREE.MeshPhysicalMaterial({
        vertexColors: true, roughness: 0.3, transparent: true, depthWrite: false, side: THREE.DoubleSide,
      }),
      enamel: new THREE.MeshPhysicalMaterial({
        vertexColors: true, roughness: 0.22, clearcoat: 0.4, ior: 1.6, transparent: true, depthWrite: false, side: THREE.DoubleSide,
      }),
      glaze: new THREE.MeshPhysicalMaterial({
        color: '#ffffff', roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.04, ior: 1.55,
        transparent: true, depthWrite: false, bumpMap: bump ?? undefined, bumpScale: 1.2,
      }),
    }
  }, [])

  const group = useRef<THREE.Group>(null)
  const refs = useRef<Record<string, THREE.Mesh | null>>({})
  const wide = useThree((s) => s.size.width >= 768)

  useFrame(() => {
    const g = group.current
    if (!g) return
    const vis = xp.veneer
    g.visible = vis > 0.01
    if (!g.visible) return
    const a = smooth(xp.attach)
    g.position.set(lerp(wide ? SHOW.pos.x : 1.55, 0, a), lerp(SHOW.pos.y, 0, a), lerp(SHOW.pos.z, 0, a))
    g.rotation.y = lerp(SHOW.rotY, 0, a)
    g.scale.setScalar(lerp(wide ? SHOW.scale : 0.95, 1, a))

    const b = xp.build
    const step = (i: number) => clamp01(b - i) // 0 → 1 mientras se construye el paso i+1
    const ex = smooth(xp.vExplode)
    const set = (k: keyof typeof mats, opacity: number, z: number) => {
      const m = refs.current[k]
      if (!m) return
      mats[k].opacity = opacity
      m.visible = opacity > 0.01
      m.position.set(z * 0.35, 0, z)
    }
    // 1. Diseño: guía en malla dorada; se desvanece cuando la cerámica la cubre
    set('design', 0.5 * step(0) * (1 - 0.75 * step(1)) * (1 - a) * vis, 0)
    // 2. Dentina cerámica (3. el cut-back se hace con un morph sobre esta capa)
    set('dentin', step(1) * vis, 0)
    const dm = refs.current.dentin
    if (dm?.morphTargetInfluences) dm.morphTargetInfluences[0] = smooth(step(2))
    // 4. Efectos incisales y halo
    set('effects', step(3) * vis, 0.28 * ex)
    // 5. Esmalte cerámico
    set('enamel', step(4) * vis, 0.56 * ex)
    // 6. Glaseado y pulido
    set('glaze', 0.22 * step(5) * vis, 0.84 * ex)
  })

  const keys = ['design', 'dentin', 'effects', 'enamel', 'glaze'] as const

  return (
    <group ref={group} visible={false}>
      {keys.map((k, i) => (
        <mesh
          key={k}
          ref={(m) => {
            refs.current[k] = m
            m?.updateMorphTargets()
          }}
          geometry={geos[k]}
          material={mats[k]}
          renderOrder={20 + i}
        />
      ))}
    </group>
  )
}
