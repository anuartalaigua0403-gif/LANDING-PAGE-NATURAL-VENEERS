'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getSoftDisc } from './textures'

/** Disco de luz cálida detrás del objeto (contraluz), siempre orientado a la cámara. */
export default function BacklightGlow({
  position,
  size,
  color = '#FFD9A0',
  getIntensity,
}: {
  position: [number, number, number]
  size: number
  color?: string
  getIntensity: () => number
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: getSoftDisc() ?? undefined,
        color,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
        fog: false,
      }),
    [color],
  )
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ camera }) => {
    const m = mesh.current
    if (!m) return
    const i = getIntensity()
    mat.opacity = i
    m.visible = i > 0.005
    m.lookAt(camera.position)
  })
  return (
    <mesh ref={mesh} position={position} material={mat} renderOrder={-5}>
      <planeGeometry args={[size, size]} />
    </mesh>
  )
}
