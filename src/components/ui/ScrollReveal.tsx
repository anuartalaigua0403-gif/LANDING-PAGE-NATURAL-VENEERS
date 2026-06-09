'use client'

import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}

export default function ScrollReveal({ children, className = '', delay = 0, style }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('sr-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`sr-hidden ${className}`} style={style}>
      {children}
    </div>
  )
}
