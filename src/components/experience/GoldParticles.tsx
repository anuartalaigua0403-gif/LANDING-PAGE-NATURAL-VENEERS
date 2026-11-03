'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/sceneConfig'
import { xp } from './experienceState'

/** Partículas microscópicas doradas. Su deriva está ligada al scroll (más una respiración muy lenta). */
export default function GoldParticles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16
      p[i * 3 + 1] = (Math.random() - 0.5) * 11
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(p, 3))
    return g
  }, [count])
  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: PALETTE.goldLight, size: 0.022, sizeAttenuation: true, transparent: true,
        opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useFrame((s) => {
    const p = points.current
    if (!p) return
    p.rotation.y = xp.progress * 0.9 + s.clock.elapsedTime * 0.008
    p.position.y = xp.progress * 1.6
    mat.opacity = 0.25 + 0.35 * Math.max(xp.appear, 0.4)
  })

  return <points ref={points} geometry={geo} material={mat} />
}
