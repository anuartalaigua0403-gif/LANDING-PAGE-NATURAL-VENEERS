'use client'

import { gsap, ScrollTrigger } from '@/lib/gsap'
import { CHAPTERS, SCROLL_LENGTH_VH } from '@/lib/sceneConfig'
import { xp } from './experienceState'

const TAU = Math.PI * 2

/** Valores iniciales (progreso 0). Se restauran al desmontar. */
const INITIAL = { ...xp }

let trigger: ScrollTrigger | null = null

/** Desplaza la página hasta un punto de la experiencia (0 → 1). */
export function scrollToProgress(p: number) {
  if (!trigger) return
  const y = trigger.start + (trigger.end - trigger.start) * p
  window.scrollTo({ top: y + 2, behavior: 'smooth' })
}

/**
 * Crea la ÚNICA timeline maestra + ScrollTrigger de la experiencia.
 * - pin: la escena queda fija mientras dura el recorrido
 * - scrub: el scroll controla directamente cada valor (reversible)
 * Debe llamarse dentro de useGSAP (que limpia todo al desmontar).
 */
export function createMasterTimeline(opts: {
  section: HTMLElement
  chapters: HTMLElement[]
  steps: HTMLElement[]
  onProgress: (p: number) => void
}) {
  Object.assign(xp, INITIAL)
  const { section, chapters, steps, onProgress } = opts

  const tl = gsap.timeline({
    defaults: { ease: 'power1.inOut' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${SCROLL_LENGTH_VH}%`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        xp.progress = self.progress
        onProgress(self.progress)
        const active = Math.min(5, Math.floor(xp.build))
        steps.forEach((el, i) => el.toggleAttribute('data-active', xp.build > 0.15 && i <= active))
      },
      onLeave: () => onProgress(1),
    },
  })
  trigger = tl.scrollTrigger ?? null

  // ── 01 THE ORIGIN (0 – 0.15)
  tl.to(xp, { appear: 1, duration: 0.08 }, 0)
  tl.to(xp, { camZ: 10.2, duration: 0.15 }, 0)
  tl.to(xp, { rotY: Math.PI * 1.15, duration: 0.15, ease: 'none' }, 0)

  // ── 02 THE ANATOMY (0.15 – 0.35)
  tl.to(xp, { rotY: TAU - 0.35, duration: 0.05, ease: 'power2.out' }, 0.15)
  tl.to(xp, { explode: 1, camZ: 12.5, shiftX: 1.75, duration: 0.07 }, 0.17)
  tl.to(xp, { labels: 1, duration: 0.02 }, 0.215)
  tl.fromTo(xp, { focus: 0 }, { focus: 5, duration: 0.11, ease: 'none', immediateRender: false }, 0.225)
  tl.to(xp, { labels: 0, duration: 0.015 }, 0.335)

  // ── 03 DIGITAL ENGINEERING (0.35 – 0.55)
  tl.to(xp, { explode: 0, camZ: 10.4, shiftX: 1.6, duration: 0.05 }, 0.35)
  tl.to(xp, { digital: 1, tooth: 0.22, duration: 0.06 }, 0.37)
  tl.to(xp, { rotY: TAU + 0.5, duration: 0.18, ease: 'none' }, 0.37)
  tl.to(xp, { digital: 0, duration: 0.04 }, 0.53)

  // ── 04 CRAFTSMANSHIP (0.55 – 0.80)
  tl.to(xp, { tooth: 0.45, shiftX: 0.5, rotY: TAU + 0.3, camZ: 10.8, duration: 0.05 }, 0.55)
  tl.to(xp, { veneer: 1, duration: 0.03 }, 0.56)
  tl.to(xp, { build: 6, duration: 0.14, ease: 'none' }, 0.575)
  tl.to(xp, { vExplode: 1, duration: 0.035 }, 0.718)
  tl.to(xp, { vExplode: 0, duration: 0.035 }, 0.762)

  // ── 05 THE PERFECTION (0.80 – 1)
  tl.to(xp, { attach: 1, duration: 0.08 }, 0.81)
  tl.to(xp, { tooth: 1, shiftX: 1.6, duration: 0.07 }, 0.82)
  tl.to(xp, { rotY: TAU * 2 - 0.3, camZ: 9.8, duration: 0.11 }, 0.89)
  tl.to(xp, { warm: 1, duration: 0.12 }, 0.86)
  tl.set({}, {}, 1) // la timeline dura exactamente 1

  // ── Textos de cada capítulo: entran y salen dentro de su tramo
  chapters.forEach((el, i) => {
    const c = CHAPTERS[i]
    if (i > 0) tl.fromTo(el, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.025, immediateRender: false }, c.start + 0.005)
    if (i < chapters.length - 1) tl.to(el, { autoAlpha: 0, y: -50, duration: 0.025 }, c.end - 0.028)
  })

  return tl
}

export function resetExperience() {
  trigger = null
  Object.assign(xp, INITIAL)
}
