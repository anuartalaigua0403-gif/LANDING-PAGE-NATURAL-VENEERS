'use client'

import { useEffect, useState } from 'react'
import { usePreloader } from '@/context/PreloaderContext'

// Logo original de Natural Veneers (emblema + nombre), sin alterar
const EMBLEM = '/img/brand/nv-emblema.webp' // 678x984 proporción
const NAME = '/img/brand/nv-nombre.webp' // 1939x244 proporción

const EXIT_AT = 2050 // ms: empieza a desvanecerse
const DONE_AT = 2750 // ms: se desmonta

export default function Preloader() {
  const { markReady } = usePreloader()
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPhase('done')
      markReady()
      return
    }
    const t1 = setTimeout(() => {
      setPhase('out')
      markReady()
    }, EXIT_AT)
    const t2 = setTimeout(() => setPhase('done'), DONE_AT)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [markReady])

  if (phase === 'done') return null

  return (
    <div className={`nv-pre ${phase === 'out' ? 'nv-out' : ''}`} aria-hidden="true">
      <div className="nv-glow" />
      <div className="nv-lockup">
        <div className="nv-em">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={EMBLEM} alt="" decoding="async" fetchPriority="high" />
          <span className="nv-shine" />
        </div>
        <div className="nv-tx">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={NAME} alt="" decoding="async" fetchPriority="high" />
          <span className="nv-shine" />
        </div>
        <div className="nv-rule" />
      </div>

      <style>{`
        .nv-pre{position:fixed;inset:0;z-index:9999;background:#000;display:grid;place-items:center}
        .nv-glow{position:absolute;width:60vmin;height:60vmin;border-radius:50%;opacity:0;filter:blur(10px);
          background:radial-gradient(circle,rgba(201,162,39,.22) 0%,transparent 65%);animation:nvGlow 2s ease .1s forwards}
        .nv-lockup{--H:min(200px,38vw);position:relative;display:flex;flex-direction:column;align-items:center;gap:calc(var(--H)*.16)}
        .nv-em{position:relative;height:var(--H);aspect-ratio:678/984;filter:drop-shadow(0 0 18px rgba(201,162,39,.35))}
        .nv-tx{position:relative;width:min(calc(var(--H)*1.6),84vw);aspect-ratio:1939/244}
        .nv-em img,.nv-tx img{display:block;width:100%;height:100%}
        .nv-em img{opacity:0;clip-path:inset(100% 0 0 0);transform:translateY(8px);animation:nvRise 1.1s cubic-bezier(.16,1,.3,1) .1s forwards}
        .nv-tx img{opacity:0;clip-path:inset(0 100% 0 0);animation:nvWrite 1s cubic-bezier(.16,1,.3,1) .65s forwards}
        .nv-shine{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;
          background:linear-gradient(105deg,transparent 35%,rgba(255,246,214,0) 40%,rgba(255,240,190,.95) 50%,rgba(240,204,106,0) 60%,transparent 65%) no-repeat;
          background-size:250% 100%;background-position:130% 0;
          -webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
        .nv-em .nv-shine{-webkit-mask-image:url(${EMBLEM});mask-image:url(${EMBLEM});animation:nvSweep 1s ease-in-out .85s forwards}
        .nv-tx .nv-shine{-webkit-mask-image:url(${NAME});mask-image:url(${NAME});animation:nvSweep 1s ease-in-out 1.1s forwards}
        .nv-rule{position:absolute;left:50%;bottom:calc(var(--H)*-.22);width:0;height:1px;transform:translateX(-50%);
          background:linear-gradient(90deg,transparent,#C9A227,transparent);animation:nvRule 1s cubic-bezier(.16,1,.3,1) 1.05s forwards}
        .nv-out{animation:nvOut .7s ease .15s forwards}
        .nv-out .nv-lockup{animation:nvLift .6s cubic-bezier(.16,1,.3,1) forwards}
        @keyframes nvRise{to{opacity:1;clip-path:inset(0 0 0 0);transform:none}}
        @keyframes nvWrite{to{opacity:1;clip-path:inset(0 0 0 0)}}
        @keyframes nvSweep{to{background-position:-30% 0}}
        @keyframes nvGlow{40%{opacity:1}100%{opacity:.7}}
        @keyframes nvRule{to{width:min(260px,50vw)}}
        @keyframes nvLift{to{transform:translateY(-10px) scale(.985);opacity:0}}
        @keyframes nvOut{to{opacity:0;visibility:hidden}}
      `}</style>
    </div>
  )
}
