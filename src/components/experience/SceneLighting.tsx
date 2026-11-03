'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { PALETTE } from '@/lib/sceneConfig'
import { xp } from './experienceState'

const WHITE = new THREE.Color('#ffffff')
const WARM = new THREE.Color('#FFE2B8')

/** Luz principal blanca suave, contraluz dorado y reflejos cerámicos (sin HDR externo). */
export default function SceneLighting() {
  const key = useRef<THREE.DirectionalLight>(null)
  const rim = useRef<THREE.DirectionalLight>(null)
  const amb = useRef<THREE.AmbientLight>(null)

  useFrame(() => {
    const a = xp.appear
    if (key.current) {
      key.current.intensity = 2.2 * a
      key.current.color.copy(WHITE).lerp(WARM, xp.warm)
    }
    if (rim.current) rim.current.intensity = (2.6 + 1.6 * xp.warm) * a
    if (amb.current) amb.current.intensity = 0.18 + 0.12 * a
  })

  return (
    <>
      <ambientLight ref={amb} intensity={0.2} />
      <directionalLight ref={key} position={[3, 5, 6]} intensity={2} />
      <directionalLight ref={rim} position={[-4, 2.5, -5]} intensity={2.6} color={PALETTE.gold} />
      <pointLight position={[0, -4, 3]} intensity={6} distance={10} color={PALETTE.goldLight} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 4]} scale={[6, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.4} position={[-5, 1, -2]} rotation-y={Math.PI / 2} scale={[4, 6, 1]} color={PALETTE.gold} />
        <Lightformer form="ring" intensity={1} position={[4, 0, 3]} scale={2} color="#ffffff" />
      </Environment>
    </>
  )
}
