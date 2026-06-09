'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

const RESULT_IMAGES = [
  { src: '/img/resultado-1.jpg', alt: 'Result 1' },
  { src: '/img/r4.jpg', alt: 'Result 2' },
  { src: '/img/r6.jpg', alt: 'Result 3' },
]

export default function Results() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="results" className="py-32 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">
              {T(ui.results.sectionLabel)}
            </span>
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
        </div>

        {/* 3-image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
          {RESULT_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden aspect-[4/3] bg-jet cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover filter brightness-[0.78] saturate-[0.85] scale-[1.04] group-hover:scale-[1.12] group-hover:brightness-100 group-hover:saturate-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              {/* Gold bottom line reveal on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
