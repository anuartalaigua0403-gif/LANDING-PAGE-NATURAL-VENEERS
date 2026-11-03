'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Brillo de borde (efecto Fresnel): luz dorada que "se escapa" por los contornos,
 * como en una fotografía de producto con contraluz.
 */
export default function FresnelRim({
  geometry,
  color,
  power = 2.6,
  getIntensity,
  scale = 1.004,
}: {
  geometry: THREE.BufferGeometry
  color: string
  power?: number
  getIntensity: () => number
  scale?: number
}) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(color) }, uPower: { value: power }, uIntensity: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec3 vN; varying vec3 vV;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform float uPower; uniform float uIntensity;
          varying vec3 vN; varying vec3 vV;
          void main() {
            float f = pow(1.0 - clamp(abs(dot(normalize(vN), normalize(vV))), 0.0, 1.0), uPower);
            gl_FragColor = vec4(uColor * f * uIntensity, f * uIntensity);
          }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, power],
  )
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(() => {
    const i = getIntensity()
    mat.uniforms.uIntensity.value = i
    if (mesh.current) mesh.current.visible = i > 0.005
  })
  return <mesh ref={mesh} geometry={geometry} material={mat} scale={scale} renderOrder={40} />
}
