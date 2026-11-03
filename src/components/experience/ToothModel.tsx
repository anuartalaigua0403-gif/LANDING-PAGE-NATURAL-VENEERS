'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { ToothGeometries } from '@/types/dental'
import { MODELS } from '@/lib/sceneConfig'
import { createPlaceholderTooth } from './placeholderGeometry'
import AnatomyLayers from './AnatomyLayers'
import DigitalOverlay from './DigitalOverlay'
import VeneerModel from './VeneerModel'
import { xp } from './experienceState'
import { lerp, smooth } from './math'

/** Lee las mallas nombradas del GLB profesional (solo si MODELS.tooth.available = true). */
function useGLBTooth(): ToothGeometries {
  const { scene } = useGLTF(MODELS.tooth.url, true)
  return useMemo(() => {
    const pick = (name: string) => {
      const o = scene.getObjectByName(name) as THREE.Mesh | undefined
      if (!o?.geometry) throw new Error(`[anatomy] Falta la malla "${name}" en ${MODELS.tooth.url}`)
      return o.geometry
    }
    const n = MODELS.tooth.nodes
    return {
      enamel: pick(n.enamel), dentin: pick(n.dentin), pulp: pick(n.pulp), canals: pick(n.canals),
      cementum: pick(n.cementum), nerve: pick(n.nerve), artery: pick(n.artery), vein: pick(n.vein),
    }
  }, [scene])
}

function GLBTooth({ tier }: { tier: 'high' | 'low' }) {
  const geos = useGLBTooth()
  return <ToothRig geos={geos} tier={tier} />
}

function PlaceholderTooth({ tier }: { tier: 'high' | 'low' }) {
  const geos = useMemo(() => createPlaceholderTooth(tier), [tier])
  return <ToothRig geos={geos} tier={tier} />
}

/**
 * Contenedor del diente: posición en pantalla (se adapta a móvil), rotación por scroll
 * y una leve rotación con el cursor / dedo que no altera la secuencia.
 */
function ToothRig({ geos, tier }: { geos: ToothGeometries; tier: 'high' | 'low' }) {
  const root = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  useFrame((state, dt) => {
    const wide = size.width >= 768
    const r = root.current
    const s = spin.current
    if (!r || !s) return
    const e = smooth(xp.explode)
    // En escritorio el diente va a la derecha del texto; en móvil, arriba.
    r.position.x = wide ? xp.shiftX - 0.55 * e : -0.75 * e
    r.position.y = wide ? xp.shiftY : 1.3 + xp.shiftY * 0.5
    const baseScale = wide ? 1 : 0.7
    r.scale.setScalar(baseScale * lerp(0.92, 1, xp.appear) * lerp(1, 0.78, e))
    // Parallax del puntero, amortiguado.
    const k = 1 - Math.pow(0.002, dt)
    pointer.current.x += (state.pointer.x - pointer.current.x) * k
    pointer.current.y += (state.pointer.y - pointer.current.y) * k
    s.rotation.y = xp.rotY + pointer.current.x * 0.22
    s.rotation.x = -pointer.current.y * 0.08
  })

  return (
    <group ref={root}>
      <group ref={spin} position={[0, 0.68, 0]}>
        <AnatomyLayers geos={geos} />
        <DigitalOverlay geos={geos} tier={tier} />
        <VeneerModel tier={tier} />
      </group>
    </group>
  )
}

export default function ToothModel({ tier }: { tier: 'high' | 'low' }) {
  return MODELS.tooth.available ? <GLBTooth tier={tier} /> : <PlaceholderTooth tier={tier} />
}
