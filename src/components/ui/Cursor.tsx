'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      if (ringRef.current) ringRef.current.classList.add('ring-hover')
    }
    const onLeave = () => {
      if (ringRef.current) ringRef.current.classList.remove('ring-hover')
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)', willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-10 h-10 border border-gold/50 rounded-full pointer-events-none z-[9998] transition-[width,height,border-color] duration-200"
        style={{ transform: 'translate(-50%, -50%)', willChange: 'transform' }}
      />
      <style>{`
        .ring-hover {
          width: 3rem !important;
          height: 3rem !important;
          border-color: rgba(201, 162, 39, 0.9) !important;
        }
      `}</style>
    </>
  )
}
