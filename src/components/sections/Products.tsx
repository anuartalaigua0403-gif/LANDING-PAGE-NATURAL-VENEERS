'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useT, useLanguage } from '@/hooks/useLanguage'
import { ui, PRODUCTS } from '@/lib/translations'

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[0]; index: number }) {
  const { lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const title = lang === 'es' ? product.titleEs : product.titleEn
  const desc = lang === 'es' ? product.descEs : product.descEn

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30 })
  const glowOpacity = useTransform(
    [rotateX, rotateY],
    ([x, y]: number[]) => Math.min(Math.abs(x) + Math.abs(y), 8) / 8
  )

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rawRotateY.set(x * 10)
    rawRotateX.set(-y * 10)
  }

  const onLeave = () => { rawRotateX.set(0); rawRotateY.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative bg-jet border border-gold/10 overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(201,162,39,0.08)]"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.12) 0%, transparent 70%)',
          opacity: glowOpacity,
        }}
      />
      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gold/10 border border-gold/20 backdrop-blur-sm">
        <span className="font-body text-[10px] tracking-widest text-gold uppercase">{product.tag}</span>
      </div>
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover filter brightness-75 saturate-75 group-hover:scale-110 group-hover:brightness-90 group-hover:saturate-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jet via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="w-8 h-px bg-gold mb-4 group-hover:w-16 transition-all duration-500" />
        <h3 className="font-display text-xl text-cream mb-3 tracking-wide">{title}</h3>
        <p className="font-body text-sm text-mist/60 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const T = useT()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="products" className="py-32 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">{T(ui.products.sectionLabel)}</span>
            <div className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl text-cream mb-6"
          >
            {T(ui.products.title)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-body text-base text-mist/60 max-w-md mx-auto"
          >
            {T(ui.products.subtitle)}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
    }
