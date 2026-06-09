'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui, PROCESS_STEPS } from '@/lib/translations'
import { useLanguage } from '@/hooks/useLanguage'

export default function Process() {
  const T = useT()
  const { lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="process" className="py-32 px-6 bg-jet">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">
              {T(ui.process.sectionLabel)}
            </span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl text-cream"
          >
            {T(ui.process.title)}{' '}
            <span className="text-gold">{T(ui.process.title2)}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-base text-mist/60 max-w-md mx-auto mt-6"
          >
            {T(ui.process.subtitle)}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, i) => {
            const title = lang === 'es' ? step.titleEs : step.titleEn
            const desc = lang === 'es' ? step.descEs : step.descEn
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-24 left-full w-8 h-px bg-gold/20 z-10" />
                )}

                {/* Image */}
                <div className="relative h-52 mb-6 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet to-transparent" />
                  <div className="absolute bottom-4 left-4 font-display text-5xl text-gold/20 font-bold">
                    {step.number}
                  </div>
                </div>

                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="font-display text-2xl text-cream mb-3">{title}</h3>
                <p className="font-body text-sm text-mist/60 leading-relaxed">{desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
