'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { ArrowDown, RotateCcw } from 'lucide-react'
import { useGSAP } from '@/lib/gsap'
import { CHAPTERS, VENEER_STEPS } from '@/lib/sceneConfig'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { CHAPTER_COPY } from './chapterCopy'
import { createMasterTimeline, resetExperience, scrollToProgress } from './ScrollController'
import ExperienceFallback from './ExperienceFallback'

// El canvas 3D se carga aparte (no bloquea la carga inicial ni el SEO).
const ToothCanvas = dynamic(() => import('./ToothCanvas'), { ssr: false })

const eyebrow = 'font-body text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.38em] text-[#C9A45C]'
const title = 'font-display font-light leading-[0.95] text-[#F8F8F6]'

export default function ToothExperience() {
  const device = useDeviceTier()
  const reduced = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const dots = useRef<(HTMLButtonElement | null)[]>([])
  const chapters = useRef<(HTMLDivElement | null)[]>([])
  const steps = useRef<(HTMLLIElement | null)[]>([])

  const enabled = !!device && device.webgl && !reduced

  useGSAP(
    () => {
      if (!enabled || !section.current) return
      const tl = createMasterTimeline({
        section: section.current,
        chapters: chapters.current.filter(Boolean) as HTMLElement[],
        steps: steps.current.filter(Boolean) as HTMLElement[],
        onProgress: (p) => {
          if (bar.current) bar.current.style.transform = `scaleY(${p})`
          dots.current.forEach((d, i) => {
            const c = CHAPTERS[i]
            d?.toggleAttribute('data-active', p >= c.start - 0.001 && (p < c.end || i === CHAPTERS.length - 1))
          })
        },
      })
      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
        resetExperience()
      }
    },
    { scope: section, dependencies: [enabled] },
  )

  if (device && (!device.webgl || reduced)) {
    return <ExperienceFallback reason={!device.webgl ? 'no-webgl' : 'reduced-motion'} />
  }

  return (
    <section ref={section} id="experiencia" className="relative h-[100svh] w-full overflow-hidden bg-[#050505]" aria-label="The Anatomy Experience">
      {/* Escena 3D */}
      <div className="absolute inset-0">{device && <ToothCanvas tier={device.tier} gateRef={section} />}</div>

      {/* Viñeta para legibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_35%,rgba(5,5,5,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent md:hidden" />

      {/* Capítulos (texto HTML real, indexable) */}
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-7xl px-6 sm:px-10">
        {/* 01 */}
        <div ref={(el) => { chapters.current[0] = el }} className="absolute inset-x-6 bottom-[12%] sm:inset-x-10 md:bottom-auto md:top-1/2 md:max-w-xl md:-translate-y-1/2">
          <p className={eyebrow}>Natural Veneers · The Anatomy Experience</p>
          <h1 className={`${title} mt-5 text-5xl sm:text-7xl lg:text-8xl`}>
            Beyond<br />the Smile.
          </h1>
          <p className="mt-6 max-w-sm font-body text-sm text-[#A1A1AA] sm:text-base">{CHAPTER_COPY[0].subtitle}</p>
          <p className="mt-10 hidden items-center gap-3 font-body text-[10px] uppercase tracking-[0.35em] text-[#A1A1AA]/70 md:flex">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#C9A45C]" strokeWidth={1.5} /> Desplázate para explorar
          </p>
        </div>

        {/* 02 */}
        <div ref={(el) => { chapters.current[1] = el }} className="invisible absolute inset-x-6 bottom-[10%] opacity-0 sm:inset-x-10 md:bottom-auto md:top-[16%] md:max-w-sm">
          <p className={eyebrow}>02 — The Anatomy</p>
          <h2 className={`${title} mt-4 text-4xl sm:text-5xl`}>Understanding<br />the Structure.</h2>
          <p className="mt-4 font-body text-sm text-[#A1A1AA]">{CHAPTER_COPY[1].subtitle}</p>
          <p className="mt-6 hidden font-body text-[11px] leading-relaxed text-[#A1A1AA]/70 md:block">
            Pasa el cursor sobre cada estructura para resaltarla.
          </p>
        </div>

        {/* 03 */}
        <div ref={(el) => { chapters.current[2] = el }} className="invisible absolute inset-x-6 bottom-[10%] opacity-0 sm:inset-x-10 md:bottom-auto md:top-1/2 md:max-w-md md:-translate-y-1/2">
          <p className={eyebrow}>03 — Digital Engineering</p>
          <h2 className={`${title} mt-4 text-4xl sm:text-6xl`}>Digital<br />Precision.</h2>
          <p className="mt-4 font-body text-sm text-[#A1A1AA]">{CHAPTER_COPY[2].subtitle}</p>
          <p className="mt-6 hidden max-w-xs font-body text-[11px] leading-relaxed text-[#A1A1AA]/60 md:block">
            Representación ilustrativa del diseño digital.
          </p>
        </div>

        {/* 04 */}
        <div ref={(el) => { chapters.current[3] = el }} className="invisible absolute inset-x-6 bottom-[8%] opacity-0 sm:inset-x-10 md:bottom-auto md:top-1/2 md:max-w-sm md:-translate-y-1/2">
          <p className={eyebrow}>04 — Craftsmanship</p>
          <h2 className={`${title} mt-4 text-4xl sm:text-5xl`}>Artistry in<br />Every Layer.</h2>
          <p className="mt-4 font-body text-sm text-[#A1A1AA]">{CHAPTER_COPY[3].subtitle}</p>
          <ol className="mt-6 hidden space-y-2.5 md:block">
            {VENEER_STEPS.map((s, i) => (
              <li
                key={s.key}
                ref={(el) => { steps.current[i] = el }}
                className="flex items-center gap-3 font-body text-xs text-[#A1A1AA]/40 transition-colors duration-300 data-[active]:text-[#E8D3A0]"
              >
                <span className="font-display text-sm text-[#C9A45C]/60">{String(i + 1).padStart(2, '0')}</span>
                {s.name}
              </li>
            ))}
          </ol>
        </div>

        {/* 05 */}
        <div ref={(el) => { chapters.current[4] = el }} className="invisible absolute inset-x-6 bottom-[8%] opacity-0 sm:inset-x-10 md:bottom-auto md:top-1/2 md:max-w-lg md:-translate-y-1/2">
          <p className={eyebrow}>05 — The Perfection</p>
          <h2 className={`${title} mt-4 text-5xl sm:text-7xl`}>Beyond<br />the Smile.</h2>
          <p className="mt-5 font-body text-[11px] font-medium uppercase tracking-[0.45em] text-[#E8D3A0]">Precision. Science. Art.</p>
          <p className="mt-2 font-display text-lg tracking-[0.3em] text-[#F8F8F6]/80">NATURAL VENEERS</p>
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#materiales"
              className="inline-flex items-center gap-2 border border-[#C9A45C] bg-[#C9A45C] px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.25em] text-[#050505] transition-colors hover:bg-transparent hover:text-[#E8D3A0]"
            >
              Discover our solutions
            </a>
            <button
              type="button"
              onClick={() => scrollToProgress(CHAPTERS[1].start + 0.08)}
              className="inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.25em] text-[#A1A1AA] transition-colors hover:text-[#E8D3A0]"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} /> Explorar la anatomía
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de progreso + navegación por capítulos */}
      <nav aria-label="Capítulos" className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-4 md:flex sm:right-8">
        <div className="relative h-56 w-px bg-white/10">
          <div ref={bar} className="absolute inset-0 origin-top bg-[#C9A45C]" style={{ transform: 'scaleY(0)' }} />
        </div>
        <ul className="flex h-56 flex-col justify-between">
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <button
                ref={(el) => { dots.current[i] = el }}
                type="button"
                onClick={() => scrollToProgress(c.start + (i === 0 ? 0 : 0.03))}
                className="group flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.25em] text-[#A1A1AA]/50 transition-colors hover:text-[#E8D3A0] data-[active]:text-[#E8D3A0]"
              >
                <span>{c.index}</span>
                <span className="hidden opacity-0 transition-opacity group-hover:opacity-100 group-data-[active]:opacity-100 lg:inline">{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </section>
  )
}
