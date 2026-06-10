'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

type StatItem = { value: string; label: string }

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Stats() {
  const T = useT()
  const items = T(ui.stats.items as { es: readonly StatItem[]; en: readonly StatItem[] })

  // Parse value string into number + suffix
  const parsed = items.map((item) => {
    const match = item.value.match(/^([d,.]+)(.*)$/)
    const num = match ? parseInt(match[1].replace(/[,.]/g, ''), 10) : 0
    const suffix = match ? match[2] : ''
    return { ...item, num, suffix }
  })

  return (
    <section className="py-24 px-6 bg-jet border-y border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {parsed.map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-5xl md:text-6xl text-gold mb-3">
                <Counter target={item.num} suffix={item.suffix} />
              </div>
              <div className="w-8 h-px bg-gold/30 mx-auto mb-3" />
              <p className="font-body text-xs tracking-widest text-mist/50 uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
                }
