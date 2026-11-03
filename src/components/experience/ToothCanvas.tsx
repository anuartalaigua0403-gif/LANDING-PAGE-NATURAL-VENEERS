'use client'

import { Suspense, useEffect, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PALETTE } from '@/lib/sceneConfig'
import type { DeviceTier } from '@/types/dental'
import ToothModel from './ToothModel'
import SceneLighting from './SceneLighting'
import GoldParticles from './GoldParticles'
import { xp } from './experienceState'

/** Cámara: distancia controlada por el scroll; más lejos en pantallas verticales. */
function ToothCamera() {
  useFrame(({ camera, size }) => {
    const portrait = size.width < size.height
    camera.position.z = xp.camZ * (portrait ? 1.45 : 1)
    camera.lookAt(0, 0, 0)
  })
  return null
}

/** Suspende el render cuando la escena sale de pantalla. */
function RenderGate({ target }: { target: RefObject<HTMLElement | null> }) {
  const setFrameloop = useThree((s) => s.setFrameloop)
  useEffect(() => {
    const el = target.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'))
    io.observe(el)
    return () => io.disconnect()
  }, [target, setFrameloop])
  return null
}

export default function ToothCanvas({ tier, gateRef }: { tier: DeviceTier; gateRef: RefObject<HTMLElement | null> }) {
  return (
    <Canvas
      dpr={tier === 'high' ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: tier === 'high', powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 35, near: 0.1, far: 60, position: [0, 0, 11] }}
      aria-hidden
    >
      <color attach="background" args={[PALETTE.black]} />
      <fog attach="fog" args={[PALETTE.black, 13, 32]} />
      <RenderGate target={gateRef} />
      <ToothCamera />
      <SceneLighting />
      <GoldParticles count={tier === 'high' ? 700 : 220} />
      <Suspense fallback={null}>
        <ToothModel tier={tier} />
      </Suspense>
    </Canvas>
  )
}
