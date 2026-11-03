'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE, VENEER_STEPS } from '@/lib/sceneConfig'
import { createPlaceholderVeneer } from './placeholderGeometry'
import { xp } from './experienceState'
import { clamp01, lerp, smooth } from './math'

/** Pose de exhibición de la carilla (coordenadas locales del diente) antes de integrarse. */
const SHOW = { pos: new THREE.Vector3(2.3, -0.9, 0.6), rotY: -0.5, scale: 1.15 }

/**
 * Carilla en 5 capas (escena 04) que viaja e se integra en el diente (escena 05).
 * Usa geometría provisional hasta tener veneer-layers.glb.
 */
export default function VeneerModel({ tier }: { tier: 'high' | 'low' }) {
  const layers = useMemo(() => {
    const scales = [1.03, 1.035, 1.042, 1.048, 1.055]
    const mats: THREE.Material[] = [
      new THREE.MeshBasicMaterial({ color: PALETTE.gold, wireframe: true, transparent: true, depthWrite: false }),
      new THREE.MeshPhysicalMaterial({ color: '#EDE3CF', roughness: 0.42, clearcoat: 0.3, transparent: true, side: THREE.DoubleSide }),
      new THREE.MeshPhysicalMaterial({ color: '#E6ECF0', roughness: 0.25, clearcoat: 0.6, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
      new THREE.MeshPhysicalMaterial({ color: '#E0C48E', roughness: 0.4, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
      new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF', roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.03, ior: 1.55,
        transparent: true, side: THREE.DoubleSide, depthWrite: false,
      }),
    ]
    const maxOpacity = [0.55, 0.96, 0.45, 0.22, 0.2]
    return VENEER_STEPS.map((s, i) => ({ key: s.key, geo: createPlaceholderVeneer(scales[i], tier), mat: mats[i], max: maxOpacity[i] }))
  }, [tier])

  const group = useRef<THREE.Group>(null)
  const wide = useThree((s) => s.size.width >= 768)
  const meshes = useRef<(THREE.Mesh | null)[]>([])

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
    layers.forEach((l, i) => {
      const m = meshes.current[i]
      if (!m) return
      const built = clamp01(xp.build - i)
      // La estructura de diseño (wireframe) desaparece al integrarse.
      const keep = i === 0 ? 1 - a : 1
      const op = l.max * built * vis * keep
      ;(m.material as THREE.Material).opacity = op
      m.visible = op > 0.01
      m.position.z = i * 0.3 * smooth(xp.vExplode)
      m.position.x = i * 0.12 * smooth(xp.vExplode)
    })
  })

  return (
    <group ref={group} visible={false}>
      {layers.map((l, i) => (
        <mesh
          key={l.key}
          ref={(m) => {
            meshes.current[i] = m
          }}
          geometry={l.geo}
          material={l.mat}
          renderOrder={20 + i}
        />
      ))}
    </group>
  )
}
