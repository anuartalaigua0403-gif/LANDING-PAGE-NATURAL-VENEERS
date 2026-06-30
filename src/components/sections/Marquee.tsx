'use client'

import { useRef, useEffect } from 'react'
import { useT } from '@/hooks/useLanguage'
import { ui } from '@/lib/translations'

export default function Marquee() {
  const T = useT()
  const items = T(ui.marquee.items)
  const trackRef = useRef<HTMLDivElement>(null)
  const all = [...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const pause = () => (track.style.animationPlayState = 'paused')
    const resume = () => (track.style.animationPlayState = 'running')
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)
    return () => {
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <section className="py-6 bg-gold/5 border-y border-gold/15 overflow-hidden">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap cursor-default"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="font-display text-sm md:text-base tracking-[0.3em] text-gold uppercase">
              {item}
            </span>
            <span className="text-gold/30 text-xs">◆</span>
          </span>
        ))}
      </div>
    </section>
  )
}
