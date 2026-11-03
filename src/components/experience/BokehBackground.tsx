'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getBokehDisc } from './textures'
import { xp } from './experienceState'

/** Fondo con luces desenfocadas (bokeh), como en fotografía macro de estudio. */
export default function BokehBackground({ count }: { count: number }) {
  const items = useMemo(() => {
    const tex = getBokehDisc() ?? undefined
    const colors = ['#C9A45C', '#E8D3A0', '#8A93A6', '#5D6B85']
    return Array.from({ length: count }, (_, i) => {
      const mat = new THREE.SpriteMaterial({
        map: tex, color: colors[i % colors.length], transparent: true, depthWrite: false,
        opacity: 0.012 + Math.random() * 0.026, blending: THREE.AdditiveBlending, fog: false,
      })
      return {
        mat,
        base: mat.opacity,
        pos: new THREE.Vector3((i % 2 ? 1 : -1) * (5 + Math.random() * 9), (Math.random() - 0.5) * 12, -12 - Math.random() * 8),
        size: 1.4 + Math.random() * 2.6,
        speed: 0.4 + Math.random() * 1.2,
      }
    })
  }, [count])
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    const g = group.current
    if (!g) return
    g.children.forEach((c, i) => {
      const it = items[i]
      c.position.set(it.pos.x - xp.progress * it.speed * 3, it.pos.y + xp.progress * it.speed * 1.5, it.pos.z)
      it.mat.opacity = it.base * (0.4 + 0.6 * xp.appear) * (1 + xp.warm * 0.4)
    })
  })

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <sprite key={i} material={it.mat} scale={[it.size, it.size, 1]} position={it.pos} />
      ))}
    </group>
  )
}
