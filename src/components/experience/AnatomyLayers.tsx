'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { AnatomyKey, ToothGeometries } from '@/types/dental'
import { ANATOMY_LABELS, PALETTE } from '@/lib/sceneConfig'
import { hover, xp } from './experienceState'
import { focusWeight, lerp, smooth } from './math'
import { getPerikymataTexture } from './placeholderGeometry'
import { getTubulesBump, getTubulesColor } from './textures'

/** Desplazamiento de cada grupo en la vista explosionada (unidades del modelo). */
const EXPLODE = {
  enamel: new THREE.Vector3(-1.45, 0.5, 0),
  inner: new THREE.Vector3(1.35, 0.15, 0.3), // pulpa, conductos, nervios
  cementum: new THREE.Vector3(2.6, -0.25, 0),
}

/** Qué malla resalta cada etiqueta (la raíz es dentina radicular). */
const LABEL_TARGET: Record<AnatomyKey, 'enamel' | 'dentin' | 'pulp' | 'canals' | 'cementum'> = {
  enamel: 'enamel',
  dentin: 'dentin',
  pulp: 'pulp',
  canals: 'canals',
  cementum: 'cementum',
  root: 'dentin',
}
const LABEL_GROUP: Record<AnatomyKey, 'enamel' | 'core' | 'inner' | 'cementum'> = {
  enamel: 'enamel',
  dentin: 'core',
  pulp: 'inner',
  canals: 'inner',
  cementum: 'cementum',
  root: 'core',
}

type MeshKey = 'enamel' | 'dentin' | 'pulp' | 'canals' | 'cementum'

function makeMaterials(tier: 'high' | 'low') {
  // Esmalte: color y translucidez por vértice (cervical cálido → incisal gris azulado → halo incisal)
  const enamel = new THREE.MeshPhysicalMaterial({
    vertexColors: true, roughness: 0.14, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.06,
    sheen: 0.35, sheenColor: new THREE.Color('#ffffff'), ior: 1.63, specularIntensity: 0.9,
    transparent: true, depthWrite: false, bumpMap: getPerikymataTexture() ?? undefined, bumpScale: 1.1,
  })
  if (tier === 'high') {
    // Translucidez real: la luz atraviesa el esmalte y deja ver la dentina (mamelones) con tono cálido
    enamel.transmission = 0.5
    enamel.thickness = 0.45
    enamel.attenuationColor = new THREE.Color('#F0D6A6')
    enamel.attenuationDistance = 1.1
    enamel.transparent = false
  }
  const dentin = new THREE.MeshPhysicalMaterial({
    vertexColors: true, roughness: 0.62, sheen: 0.3, sheenColor: new THREE.Color('#f3e2c0'), transparent: true,
    map: getTubulesColor() ?? undefined, bumpMap: getTubulesBump() ?? undefined, bumpScale: 0.9,
  })
  const cementum = new THREE.MeshPhysicalMaterial({ color: '#D3C5A6', roughness: 0.78, sheen: 0.2, transparent: true })
  const pulp = new THREE.MeshPhysicalMaterial({ color: '#9A3A36', roughness: 0.6, sheen: 0.6, sheenColor: new THREE.Color('#d98a80'), transparent: true })
  const canals = new THREE.MeshPhysicalMaterial({ color: '#7C2C2A', roughness: 0.62, transparent: true })
  const nerve = new THREE.MeshStandardMaterial({ color: PALETTE.goldLight, roughness: 0.5, transparent: true })
  const artery = new THREE.MeshStandardMaterial({ color: '#8E2E2B', roughness: 0.5, transparent: true })
  const vein = new THREE.MeshStandardMaterial({ color: '#3E4E6E', roughness: 0.5, transparent: true })
  for (const m of [enamel, dentin, cementum, pulp, canals]) m.emissive = new THREE.Color(PALETTE.gold)
  return { enamel, dentin, cementum, pulp, canals, nerve, artery, vein }
}

export default function AnatomyLayers({ geos, tier }: { geos: ToothGeometries; tier: 'high' | 'low' }) {
  const mats = useMemo(() => makeMaterials(tier), [tier])
  const enamelG = useRef<THREE.Group>(null)
  const innerG = useRef<THREE.Group>(null)
  const cementumG = useRef<THREE.Group>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const wide = useThree((s) => s.size.width >= 768)

  useFrame(() => {
    const e = smooth(xp.explode)
    enamelG.current?.position.copy(EXPLODE.enamel).multiplyScalar(e)
    innerG.current?.position.copy(EXPLODE.inner).multiplyScalar(e)
    cementumG.current?.position.copy(EXPLODE.cementum).multiplyScalar(e)

    const base = xp.appear * xp.tooth
    // Foco: la estructura bajo el cursor manda cuando la vista está abierta.
    const useHover = hover.index >= 0 && e > 0.6
    const focus = useHover ? hover.index : xp.focus
    const labelsOn = useHover ? 1 : xp.labels

    const weight: Record<MeshKey, number> = { enamel: 0, dentin: 0, pulp: 0, canals: 0, cementum: 0 }
    ANATOMY_LABELS.forEach((l, i) => {
      const w = focusWeight(focus, i)
      const t = LABEL_TARGET[l.key]
      weight[t] = Math.max(weight[t], w)
      const el = labelRefs.current[i]
      if (el) el.style.opacity = String(labelsOn * lerp(wide ? 0.35 : 0, 1, w) * e)
      const tx = textRefs.current[i]
      if (tx) tx.style.opacity = String(w)
    })

    // Esmalte cerrado: casi opaco. Abierto: más translúcido para leer las capas.
    const set = (k: MeshKey, opacity: number) => {
      const m = mats[k]
      const dim = lerp(1, 0.4, labelsOn * (1 - weight[k]))
      m.opacity = opacity * dim
      m.emissiveIntensity = 0.32 * labelsOn * weight[k]
      // Opaco cuando está completo (así se ve a través del esmalte translúcido)
      const solid = m.opacity > 0.995
      if (k === 'enamel') m.transparent = tier === 'low' || !solid
      else m.transparent = !solid
      m.depthWrite = k !== 'enamel' && solid
      m.visible = m.opacity > 0.01
    }
    set('enamel', base * lerp(1, 0.85, e))
    set('dentin', base)
    set('cementum', base)
    set('pulp', base)
    set('canals', base)
    for (const k of ['nerve', 'artery', 'vein'] as const) {
      mats[k].opacity = base * lerp(0.0, 1, e)
      mats[k].visible = mats[k].opacity > 0.01
    }
  })

  const over = (i: number) => (ev: ThreeEvent<PointerEvent>) => {
    ev.stopPropagation()
    hover.index = i
  }
  const out = () => {
    hover.index = -1
  }

  const groups = { enamel: enamelG, inner: innerG, cementum: cementumG }

  const labels = (group: 'enamel' | 'core' | 'inner' | 'cementum') =>
    ANATOMY_LABELS.map((l, i) =>
      LABEL_GROUP[l.key] !== group ? null : (
        <Html key={l.key} position={l.anchor} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div
            ref={(el) => {
              labelRefs.current[i] = el
            }}
            className="relative"
            style={{ opacity: 0 }}
          >
            <span className="absolute -left-[3px] -top-[3px] h-[7px] w-[7px] rounded-full bg-[#E8D3A0] shadow-[0_0_10px_#C9A45C]" />
            <span
              className={`absolute top-0 h-px w-14 bg-gradient-to-r ${
                l.side === 'right' ? 'left-1 from-[#C9A45C] to-[#C9A45C]/20' : 'right-1 from-[#C9A45C]/20 to-[#C9A45C]'
              }`}
            />
            <div className={`absolute -top-[9px] w-44 sm:w-56 ${l.side === 'right' ? 'left-[68px]' : 'right-[68px] text-right'}`}>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.26em] text-[#E8D3A0] whitespace-nowrap">{l.name}</p>
              <div
                ref={(el) => {
                  textRefs.current[i] = el
                }}
                className="mt-1.5 hidden font-body text-[12px] leading-snug text-[#A1A1AA] sm:block"
                style={{ opacity: 0 }}
              >
                {l.text}
              </div>
            </div>
          </div>
        </Html>
      ),
    )

  return (
    <group>
      {/* Núcleo: dentina (corona + raíz) */}
      <mesh geometry={geos.dentin} material={mats.dentin} renderOrder={1} onPointerOver={over(1)} onPointerOut={out} />
      {labels('core')}

      <group ref={groups.inner}>
        <mesh geometry={geos.pulp} material={mats.pulp} renderOrder={2} onPointerOver={over(2)} onPointerOut={out} />
        <mesh geometry={geos.canals} material={mats.canals} renderOrder={2} onPointerOver={over(3)} onPointerOut={out} />
        <mesh geometry={geos.nerve} material={mats.nerve} renderOrder={2} />
        <mesh geometry={geos.artery} material={mats.artery} renderOrder={2} />
        <mesh geometry={geos.vein} material={mats.vein} renderOrder={2} />
        {labels('inner')}
      </group>

      <group ref={groups.cementum}>
        <mesh geometry={geos.cementum} material={mats.cementum} renderOrder={3} onPointerOver={over(4)} onPointerOut={out} />
        {labels('cementum')}
      </group>

      <group ref={groups.enamel}>
        <mesh geometry={geos.enamel} material={mats.enamel} renderOrder={10} onPointerOver={over(0)} onPointerOut={out} />
        {labels('enamel')}
      </group>
    </group>
  )
}
