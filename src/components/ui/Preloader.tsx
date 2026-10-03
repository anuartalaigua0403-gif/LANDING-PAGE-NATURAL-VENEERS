'use client'

import { useEffect, useState } from 'react'
import { usePreloader } from '@/context/PreloaderContext'

// Silueta de diente (molar estilizado) — viewBox 0 0 100 120
const TOOTH_PATH =
  'M30 10C18 10 12 20 12 34c0 14 4 22 8 32 4 12 4 30 10 42 4 8 10 4 11-6 1-10 3-22 9-22s8 12 9 22c1 10 7 14 11 6 6-12 6-30 10-42 4-10 8-18 8-32 0-14-6-24-18-24-8 0-12 5-20 5s-12-5-20-5Z'

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
      <div className="nv-lockup">
        <svg className="nv-tooth" viewBox="0 0 100 120">
          <defs>
            <linearGradient id="nvToothFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C9A227" stopOpacity="0.22" />
              <stop offset="1" stopColor="#C9A227" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="nv-fill" fill="url(#nvToothFill)" d={TOOTH_PATH} />
          <path className="nv-outline" d={TOOTH_PATH} />
          <path className="nv-shine" d="M27 22c-5 4-7 10-6 18" />
        </svg>
        <div className="nv-words font-display">
          <span className="nv-w1">Natural</span>
          <span className="nv-w2">Veneers</span>
          <div className="nv-rule" />
        </div>
      </div>

      <style>{`
        .nv-pre{position:fixed;inset:0;z-index:9999;background:#000;display:grid;place-items:center}
        .nv-lockup{display:flex;flex-direction:column;align-items:center;gap:26px}
        .nv-tooth{width:clamp(54px,9vw,74px);height:auto;overflow:visible}
        .nv-outline{fill:none;stroke:#C9A227;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;
          stroke-dasharray:420;stroke-dashoffset:420;animation:nvDraw 1.25s cubic-bezier(.16,1,.3,1) .1s forwards}
        .nv-fill{opacity:0;animation:nvFade .9s ease 1.05s forwards}
        .nv-shine{fill:none;stroke:#F0CC6A;stroke-width:1.4;stroke-linecap:round;opacity:0;
          stroke-dasharray:40;stroke-dashoffset:40;animation:nvShine .7s cubic-bezier(.16,1,.3,1) 1.35s forwards}
        .nv-words{text-align:center;font-weight:400;line-height:1.05;font-size:clamp(30px,5.4vw,52px);text-transform:uppercase}
        .nv-words span{display:block;opacity:0;letter-spacing:.62em;margin-right:-.62em;transform:translateY(14px)}
        .nv-w1{color:#F5F0E8;animation:nvWord 1.1s cubic-bezier(.16,1,.3,1) .35s forwards}
        .nv-w2{color:#C9A227;animation:nvWord 1.1s cubic-bezier(.16,1,.3,1) .55s forwards}
        .nv-rule{width:0;height:1px;margin:14px auto 0;background:linear-gradient(90deg,transparent,#C9A227,transparent);
          animation:nvRule 1s cubic-bezier(.16,1,.3,1) .95s forwards}
        .nv-out{animation:nvOut .7s ease .15s forwards}
        .nv-out .nv-lockup{animation:nvLift .6s cubic-bezier(.16,1,.3,1) forwards}
        @keyframes nvDraw{to{stroke-dashoffset:0}}
        @keyframes nvFade{to{opacity:1}}
        @keyframes nvShine{0%{opacity:0}30%{opacity:1}100%{opacity:.85;stroke-dashoffset:0}}
        @keyframes nvWord{to{opacity:1;letter-spacing:.32em;margin-right:-.32em;transform:none}}
        @keyframes nvRule{to{width:120px}}
        @keyframes nvLift{to{transform:translateY(-10px) scale(.985);opacity:0}}
        @keyframes nvOut{to{opacity:0;visibility:hidden}}
      `}</style>
    </div>
  )
}
