'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

export default function About() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="about" className="py-32 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/img/equipo.jpg"
                alt="Natural Veneers Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover filter brightness-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
            </div>
            {/* Gold accent frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 pointer-events-none" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">
                {T(ui.about.sectionLabel)}
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl text-cream mb-8 leading-tight">
              {T(ui.about.title)}{' '}
              <span className="text-gold">{T(ui.about.title2)}</span>
            </h2>

            <p className="font-body text-base text-mist/70 leading-relaxed mb-6">
              {T(ui.about.description)}
            </p>
            <p className="font-body text-base text-mist/70 leading-relaxed mb-10">
              {T(ui.about.description2)}
            </p>

            <div className="w-12 h-px bg-gold mb-6" />
            <p className="font-body text-xs tracking-widest text-mist/40 uppercase">
              {T(ui.about.teamLabel)}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
