'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const glow = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const lastSparkle = useRef<number>(0)

  useEffect(() => {
    document.documentElement.style.cursor = 'none'

    const spawnSparkle = (x: number, y: number) => {
      const now = Date.now()
      if (now - lastSparkle.current < 45) return
      lastSparkle.current = now

      const el = document.createElement('div')
      const size = Math.random() * 5 + 3
      const offsetX = (Math.random() - 0.5) * 18
      const offsetY = (Math.random() - 0.5) * 18
      const opacity = Math.random() * 0.55 + 0.25
      const duration = Math.random() * 300 + 400

      el.style.cssText = `
        position: fixed;
        left: ${x + offsetX}px;
        top: ${y + offsetY}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,220,100,${opacity}) 0%, rgba(201,162,39,${opacity * 0.6}) 50%, transparent 100%);
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        animation: sparkle-fade ${duration}ms ease-out forwards;
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), duration)
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      spawnSparkle(e.clientX, e.clientY)
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      glow.current.x += (mouse.current.x - glow.current.x) * 0.07
      glow.current.y += (mouse.current.y - glow.current.y) * 0.07

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x}px, ${glow.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => { if (ringRef.current) ringRef.current.classList.add('ring-hover') }
    const onLeave = () => { if (ringRef.current) ringRef.current.classList.remove('ring-hover') }

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
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          width: '120px',
          height: '120px',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          background: 'radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0.07) 45%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          background: 'radial-gradient(circle, rgba(255,220,100,0.95) 0%, rgba(201,162,39,0.85) 100%)',
          boxShadow: '0 0 6px 2px rgba(201,162,39,0.5)',
        }}
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
          border-color: rgba(201,162,39,0.9) !important;
        }
        @keyframes sparkle-fade {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          60%  { opacity: 0.5; transform: translate(-50%, calc(-50% - 6px)) scale(0.8); }
          100% { opacity: 0; transform: translate(-50%, calc(-50% - 12px)) scale(0.3); }
        }
      `}</style>
    </>
  )
                          }
