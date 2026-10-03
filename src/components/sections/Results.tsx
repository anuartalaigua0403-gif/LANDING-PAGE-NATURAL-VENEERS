'use client'

import Image from 'next/image'
import { useRef, useCallback, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

interface SliderProps {
  beforeSrc: string
  afterSrc: string
  alt: string
  index: number
}

function BeforeAfterSlider({ beforeSrc, afterSrc, alt, index }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const dividerX = useMotionValue(50)
  const clipPath = useTransform(dividerX, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(dividerX, (v) => `${v}%`)
  const inView = useInView(containerRef, { once: true, margin: '-15%' })

  // Intro sweep: shows "antes" → "después" once so the visitor understands it can be dragged
  useEffect(() => {
    if (!inView) return
    const seq = async () => {
      await animate(dividerX, 92, { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 })
      await animate(dividerX, 8, { duration: 1.6, ease: [0.65, 0, 0.35, 1] })
      await animate(dividerX, 50, { duration: 0.9, ease: [0.16, 1, 0.3, 1] })
    }
    seq()
  }, [inView, dividerX])

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    dividerX.stop()
    dividerX.set(pct)
  }, [dividerX])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Desktop: follows the mouse on hover. Touch: only while dragging.
    if (dragging.current || e.pointerType === 'mouse') setFromClientX(e.clientX)
  }
  const onPointerUp = () => { dragging.current = false }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden bg-jet cursor-ew-resize select-none group touch-pan-y"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-label={`${alt}: comparar antes y después`}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Después (fondo) */}
      <Image src={afterSrc} alt={`${alt} — después`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover pointer-events-none" draggable={false} />
      {/* Antes (recortada desde la derecha) */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ clipPath }}>
        <Image src={beforeSrc} alt={`${alt} — antes`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" draggable={false} />
      </motion.div>
      <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-void/70 backdrop-blur-sm border border-gold/20 pointer-events-none">
        <span className="font-body text-[9px] tracking-widest text-gold uppercase">Antes</span>
      </div>
      <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-void/70 backdrop-blur-sm border border-gold/20 pointer-events-none">
        <span className="font-body text-[9px] tracking-widest text-gold uppercase">Después</span>
      </div>
      {/* Línea + manija */}
      <motion.div className="absolute top-0 bottom-0 w-px bg-gold z-20 pointer-events-none" style={{ left: handleLeft }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gold border-2 border-void flex items-center justify-center shadow-[0_0_20px_rgba(201,162,39,0.6)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-void">
            <path d="M4 7H1M1 7L3 5M1 7L3 9M10 7H13M13 7L11 5M13 7L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  )
}

function StaticResult({ src, alt, index }: { src: string; alt: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/3] overflow-hidden bg-jet group"
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  )
}

const STATIC_RESULTS = [
  { src: '/img/resultado-1.jpg', alt: 'Resultado de carillas — caso 1' },
  { src: '/img/r4.jpg', alt: 'Resultado de carillas — caso 2' },
]

const COMPARISON = { beforeSrc: '/img/caso-antes.jpg', afterSrc: '/img/caso-despues.jpg', alt: 'Caso 3' }

export default function Results() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="results" className="py-32 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">{T(ui.results.sectionLabel)}</span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl text-cream"
          >
            {T(ui.results.title)}{' '}
            <span className="text-gold">{T(ui.results.title2)}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="font-body text-xs tracking-widest text-mist/40 uppercase mt-4">
            {T(ui.results.dragHint)}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
          {STATIC_RESULTS.map((item, i) => (
            <StaticResult key={item.src} src={item.src} alt={item.alt} index={i} />
          ))}
          <BeforeAfterSlider {...COMPARISON} index={2} />
        </div>
      </div>
    </section>
  )
    }
