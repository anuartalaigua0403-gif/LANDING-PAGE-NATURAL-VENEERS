'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

// Fotos del equipo técnico. `position` controla el encuadre del rostro en el marco vertical.
// Nombres y cargos [POR CONFIRMAR]: cuando se confirmen, añadir `name` y mostrarlos.
const TEAM = [
  { src: '/img/equipo-1.jpg', position: '38% 30%' },
  { src: '/img/equipo-2.jpg', position: '58% 30%' },
  { src: '/img/equipo-3.jpg', position: '56% 35%' },
  { src: '/img/equipo-4.jpg', position: '70% 30%' },
  { src: '/img/equipo-5.jpg', position: '66% 30%' },
] as const

const INTERVAL = 5000

export default function TeamCarousel() {
  const T = useT()
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const visible = useInView(rootRef, { margin: '0px' })
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false) // pausa del usuario (botón)
  const [hovered, setHovered] = useState(false) // pausa temporal (ratón / foco)
  const [tabHidden, setTabHidden] = useState(false)

  const running = !paused && !hovered && visible && !tabHidden

  const go = useCallback((i: number) => setIndex((i + TEAM.length) % TEAM.length), [])

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(id)
  }, [running, index, go])

  return (
    <div
      ref={rootRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={T(ui.about.teamLabel)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-void">
        {/* Todas las fotos quedan montadas para que no haya parpadeo al cambiar */}
        {TEAM.map((m, i) => {
          const active = i === index
          return (
            <motion.div
              key={m.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active || reduce ? 1 : 1.04 }}
              transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${TEAM.length}`}
              aria-hidden={!active}
            >
              <Image
                src={m.src}
                alt={T(ui.about.teamAlt)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover brightness-90"
                style={{ objectPosition: m.position }}
              />
            </motion.div>
          )
        })}

        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent pointer-events-none" />

        {/* Pie de foto + controles */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between gap-4">
          <p className="font-display text-xl sm:text-2xl text-cream leading-none whitespace-nowrap">
            {T(ui.about.teamCaption)}
            <span className="block mt-2 font-body text-xs text-mist tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(TEAM.length).padStart(2, '0')}
            </span>
          </p>

          <div className="flex items-center gap-2 sm:gap-3">
            {TEAM.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${T(ui.about.teamGoTo)} ${i + 1}`}
                aria-current={i === index}
                className="relative h-[2px] w-5 sm:w-8 bg-cream/25 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {i === index && (
                  <motion.span
                    key={`${index}-${running}`}
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: running && !reduce ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: running && !reduce ? INTERVAL / 1000 : 0, ease: 'linear' }}
                  />
                )}
                <span className="absolute -inset-3" aria-hidden />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? T(ui.about.teamPlay) : T(ui.about.teamPause)}
              className="sm:ml-1 w-8 h-8 shrink-0 grid place-items-center text-cream/80 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Marco dorado (igual que antes) */}
      <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 pointer-events-none" />
    </div>
  )
}
