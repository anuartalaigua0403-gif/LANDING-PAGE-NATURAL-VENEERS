'use client'

import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { xp } from './experienceState'

/**
 * Transición de anatomía natural a digital (escena 03): el esmalte se desintegra
 * en partículas finas (arena cálida y azul) que se dispersan; reversible con el scroll.
 */
export default function DissolveParticles({ geometry, count }: { geometry: THREE.BufferGeometry; count: number }) {
  const { geo, mat } = useMemo(() => {
    const src = geometry.attributes.position as THREE.BufferAttribute
    const nrm = geometry.attributes.normal as THREE.BufferAttribute
    const pos = new Float32Array(count * 3)
    const dir = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const k = Math.floor(Math.random() * src.count)
      pos[i * 3] = src.getX(k) + (Math.random() - 0.5) * 0.02
      pos[i * 3 + 1] = src.getY(k) + (Math.random() - 0.5) * 0.02
      pos[i * 3 + 2] = src.getZ(k) + (Math.random() - 0.5) * 0.02
      // Deriva: hacia afuera + hacia un lado y arriba (efecto viento)
      dir[i * 3] = nrm.getX(k) * 0.6 - 1.4 - Math.random() * 1.6
      dir[i * 3 + 1] = nrm.getY(k) * 0.6 + 0.5 + Math.random() * 1.2
      dir[i * 3 + 2] = nrm.getZ(k) * 0.6 + (Math.random() - 0.5) * 0.8
      // Empieza por el borde incisal y avanza hacia el cuello
      seed[i] = 1 - (src.getY(k) + 0.3) / 2.1 + Math.random() * 0.25
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aDir', new THREE.BufferAttribute(dir, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    const m = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uSize: { value: 2.2 } },
      vertexShader: /* glsl */ `
        attribute vec3 aDir; attribute float aSeed;
        uniform float uT; uniform float uSize;
        varying float vA; varying float vS;
        void main() {
          float start = clamp(aSeed, 0.0, 1.0) * 0.55;
          float t = clamp((uT - start) / 0.45, 0.0, 1.0);
          float e = t * t;
          vec3 p = position + aDir * e * 2.2 + vec3(sin(aSeed * 40.0 + e * 6.0), cos(aSeed * 31.0 + e * 5.0), 0.0) * 0.12 * e;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (1.0 + aSeed) * (6.0 / -mv.z);
          vA = step(0.001, t) * (1.0 - t) * smoothstep(0.0, 0.08, t) ;
          vS = aSeed;
        }`,
      fragmentShader: /* glsl */ `
        varying float vA; varying float vS;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          vec3 sand = vec3(0.86, 0.76, 0.58);
          vec3 blue = vec3(0.42, 0.64, 0.88);
          vec3 col = mix(sand, blue, smoothstep(0.35, 0.95, fract(vS * 7.13)));
          gl_FragColor = vec4(col, vA * (1.0 - d * 2.0) * 0.9);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return { geo: g, mat: m }
  }, [geometry, count])

  useFrame(() => {
    mat.uniforms.uT.value = xp.dissolve
  })

  return <points geometry={geo} material={mat} frustumCulled={false} renderOrder={45} />
}
