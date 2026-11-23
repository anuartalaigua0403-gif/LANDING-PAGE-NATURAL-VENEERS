'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

// Marcas patrocinadoras (uso de marca autorizado por sus titulares).
export default function Sponsors() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <section aria-label={T(ui.sponsors.label)} className="bg-void py-14 px-6 border-y border-gold/10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14"
      >
        <p className="font-body text-xs tracking-[0.25em] text-gold uppercase text-center md:text-left shrink-0">{T(ui.sponsors.label)}</p>
        <div className="hidden md:block w-px h-12 bg-gold/25" />
        <div className="flex items-center gap-10 md:gap-14">
          <Image
            src="/img/marcas/hass-claro.webp"
            alt="HASS — Human-Aid System Supplier"
            width={400}
            height={155}
            className="h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/img/marcas/hass-ambassador-leaders.webp"
            alt="HASS Ambassador Leaders"
            width={220}
            height={220}
            className="h-20 md:h-24 w-auto"
          />
        </div>
      </motion.div>
    </section>
  )
}
