'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useT, useLanguage } from '@/hooks/useLanguage'
import { ui, TESTIMONIALS } from '@/lib/translations'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xs ${i < rating ? 'text-gold' : 'text-mist/20'}`}>★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ item, index }: { item: (typeof TESTIMONIALS)[0]; index: number }) {
  const { lang } = useLanguage()
  const quote = lang === 'es' ? item.quoteEs : item.quoteEn
  const role = lang === 'es' ? item.roleEs : item.roleEn

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-jet border border-gold/10 p-8 hover:border-gold/25 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,162,39,0.06)]"
    >
      <div className="absolute top-6 right-6 font-display text-5xl text-gold/10 leading-none select-none">"</div>
      <StarRating rating={item.rating} />
      <p className="font-display text-lg text-cream/80 leading-relaxed mt-5 mb-6 italic">"{quote}"</p>
      <div className="w-8 h-px bg-gold/30 mb-5 group-hover:w-16 transition-all duration-500" />
      <div>
        <p className="font-body text-sm text-cream font-medium">{item.name}</p>
        <p className="font-body text-xs text-mist/50 mt-1 tracking-wide">{role}</p>
        <p className="font-body text-xs text-gold/60 mt-0.5 tracking-widest uppercase">{item.city}</p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="testimonials" className="py-32 px-6 bg-jet">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">{T(ui.testimonials.sectionLabel)}</span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl text-cream"
          >
            {T(ui.testimonials.title)}{' '}
            <span className="text-gold">{T(ui.testimonials.title2)}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-base text-mist/60 max-w-md mx-auto mt-6"
          >
            {T(ui.testimonials.subtitle)}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
