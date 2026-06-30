'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'
import { formatWhatsAppUrl } from '@/lib/utils'
import { usePreloader } from '@/context/PreloaderContext'

export default function Hero() {
  const T = useT()
  const { ready } = usePreloader()
  const btnRef = useRef<HTMLAnchorElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
    }
    const onLeave = () => { btn.style.transform = '' }
    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-[-12%] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/img/hero.jpg')",
          backgroundPosition: 'center 52%',
          y: bgY,
          scale: bgScale,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/60 to-void/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">
            {T(ui.hero.badge)}
          </span>
        </motion.div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-none mb-8">
          <motion.span
            className="block text-cream"
            initial={{ opacity: 0, y: 60 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            {T(ui.hero.title1)}
          </motion.span>
          <motion.span
            className="block text-gold"
            initial={{ opacity: 0, y: 60 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.8, ease }}
          >
            {T(ui.hero.title2)}
          </motion.span>
        </h1>

        <motion.p
          className="font-body text-base md:text-lg text-mist/80 max-w-lg leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease }}
        >
          {T(ui.hero.subtitle)}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.8, ease }}
        >
          <a
            href="#products"
            className="px-8 py-4 bg-gold text-void font-body text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-colors duration-300"
          >
            {T(ui.hero.cta1)}
          </a>
          <a
            ref={btnRef}
            href={formatWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP || '573043838031')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-gold/40 text-gold font-body text-xs tracking-widest uppercase hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            {T(ui.hero.cta2)}
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 1 }}
        >
          <span className="font-body text-[10px] tracking-widest text-mist/40 uppercase">
            {T(ui.hero.scroll)}
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
            }
