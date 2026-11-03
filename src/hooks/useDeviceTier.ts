'use client'

import { useEffect, useState } from 'react'
import type { DeviceTier } from '@/types/dental'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Capacidad del dispositivo para la escena 3D.
 * null = aún no se sabe (primer render en el servidor).
 */
export function useDeviceTier() {
  const [state, setState] = useState<{ webgl: boolean; tier: DeviceTier } | null>(null)
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number }
    const touch = window.matchMedia('(pointer: coarse)').matches
    const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4
    setState({ webgl: hasWebGL(), tier: touch || weak || window.innerWidth < 768 ? 'low' : 'high' })
  }, [])
  return state
}
