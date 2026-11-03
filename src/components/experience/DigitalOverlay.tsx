'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ToothGeometries } from '@/types/dental'
import { PALETTE } from '@/lib/sceneConfig'
import { xp } from './experienceState'
import { clamp01, lerp } from './math'

/**
 * Escena 03: representación visual tipo CAD (malla, puntos de escaneo, planos,
 * ejes, rejilla y línea de barrido). Es una ilustración, no la salida de un software clínico.
 */
export default function DigitalOverlay({ geos, tier }: { geos: ToothGeometries; tier: 'high' | 'low' }) {
  const gold = PALETTE.gold

  const { wire, points, grid, axes, plane, scan, rings, rm } = useMemo(() => {
    const wire = new THREE.MeshBasicMaterial({ color: gold, wireframe: true, transparent: true, depthWrite: false })
    const step = tier === 'high' ? 5 : 11
    const src = geos.enamel.attributes.position as THREE.BufferAttribute
    const arr: number[] = []
    for (let i = 0; i < src.count; i += step) arr.push(src.getX(i) * 1.01, src.getY(i), src.getZ(i) * 1.01)
    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
    const points = new THREE.Points(
      pg,
      new THREE.PointsMaterial({ color: PALETTE.goldLight, size: 0.035, sizeAttenuation: true, transparent: true, depthWrite: false }),
    )

    const grid = new THREE.GridHelper(14, 28, gold, '#2a2a2a')
    grid.position.y = -3.7
    const gm = grid.material as THREE.Material
    gm.transparent = true
    gm.depthWrite = false

    const axesGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.2, -3.7, 0), new THREE.Vector3(2.2, -3.7, 0),
      new THREE.Vector3(0, -3.7, 0), new THREE.Vector3(0, 2.4, 0),
      new THREE.Vector3(0, -3.7, -2.2), new THREE.Vector3(0, -3.7, 2.2),
    ])
    const axes = new THREE.LineSegments(axesGeo, new THREE.LineBasicMaterial({ color: PALETTE.goldLight, transparent: true, depthWrite: false }))

    // Plano de diseño (sagital) con borde
    const planeGeo = new THREE.PlaneGeometry(2.4, 5.8)
    const plane = new THREE.Group()
    const pm = new THREE.MeshBasicMaterial({ color: gold, transparent: true, side: THREE.DoubleSide, depthWrite: false })
    const pe = new THREE.LineSegments(new THREE.EdgesGeometry(planeGeo), new THREE.LineBasicMaterial({ color: gold, transparent: true, depthWrite: false }))
    const pmesh = new THREE.Mesh(planeGeo, pm)
    plane.add(pmesh, pe)
    plane.rotation.y = Math.PI / 2
    plane.position.y = -0.7

    // Línea de barrido (anillo) que recorre el diente según el scroll
    const scan = new THREE.Mesh(
      new THREE.RingGeometry(0.95, 1.0, 96),
      new THREE.MeshBasicMaterial({ color: PALETTE.goldLight, transparent: true, side: THREE.DoubleSide, depthWrite: false }),
    )
    scan.rotation.x = -Math.PI / 2

    // Contornos de precisión a distintas alturas
    const rings = new THREE.Group()
    const rm = new THREE.LineBasicMaterial({ color: gold, transparent: true, depthWrite: false })
    for (const [y, r] of [[1.35, 0.66], [0.7, 0.74], [0.0, 0.64], [-1.2, 0.47], [-2.4, 0.27]] as const) {
      const pts: THREE.Vector3[] = []
      for (let a = 0; a <= 64; a++) {
        const t = (a / 64) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.sin(t) * r * 1.35, y, Math.cos(t) * r * 0.75))
      }
      rings.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), rm))
    }
    return { wire, points, grid, axes, plane, scan, rings, rm }
  }, [geos, tier, gold])

  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    const d = xp.digital
    if (group.current) group.current.visible = d > 0.01
    if (d <= 0.01) return
    wire.opacity = 0.22 * d
    ;(points.material as THREE.PointsMaterial).opacity = 0.9 * d
    ;(grid.material as THREE.Material).opacity = 0.35 * d
    ;(axes.material as THREE.Material).opacity = 0.5 * d
    plane.children.forEach((c, i) => (((c as THREE.Mesh).material as THREE.Material).opacity = (i === 0 ? 0.05 : 0.4) * d))
    rm.opacity = 0.55 * d
    // Barrido: recorre la altura del diente a lo largo de la escena 03 (35–55 %)
    const s = clamp01((xp.progress - 0.37) / 0.16)
    scan.position.y = lerp(-3.2, 1.8, s)
    ;(scan.material as THREE.Material).opacity = 0.7 * d * (s > 0 && s < 1 ? 1 : 0.3)
  })

  return (
    <group ref={group} visible={false}>
      <mesh geometry={geos.enamel} material={wire} scale={1.004} />
      <mesh geometry={geos.dentin} material={wire} />
      <primitive object={points} />
      <primitive object={grid} />
      <primitive object={axes} />
      <primitive object={plane} />
      <primitive object={scan} />
      <primitive object={rings} />
    </group>
  )
}
