'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui, FAQ_ITEMS } from '@/lib/translations'
import { useLanguage } from '@/hooks/useLanguage'

function FAQItem({ item, index }: { item: typeof FAQ_ITEMS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const { lang } = useLanguage()
  const question = lang === 'es' ? item.questionEs : item.questionEn
  const answer = lang === 'es' ? item.answerEs : item.answerEn

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-gold/10"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-body text-sm md:text-base text-cream/80 group-hover:text-cream transition-colors duration-300 pr-8">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 border border-gold/30 flex items-center justify-center text-gold transition-all duration-300 ${
            open ? 'rotate-45 border-gold/60' : ''
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-mist/60 leading-relaxed pb-6 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="py-32 px-6 bg-jet">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">
              {T(ui.faq.sectionLabel)}
            </span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-6xl text-cream"
          >
            {T(ui.faq.title)}{' '}
            <span className="text-gold">{T(ui.faq.title2)}</span>
          </motion.h2>
        </div>

        {/* Items */}
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
