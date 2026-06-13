'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = 'NATURAL VENEERS'.split('')

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'letters' | 'shimmer' | 'wipe'>('letters')

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('shimmer'), 1300)
    const t1 = setTimeout(() => setPhase('wipe'), 1900)
    const t2 = setTimeout(() => setVisible(false), 2700)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-void flex items-center justify-center"
          animate={phase === 'wipe' ? { clipPath: 'inset(0 0 100% 0)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          exit={{ opacity: 0 }}
        >
          <div className="relative flex gap-1 overflow-visible">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl font-display text-gold tracking-widest"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.045,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}

            {/* Destello dorado suave — aparece después de que las letras están visibles */}
            <AnimatePresence>
              {phase === 'shimmer' && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 20%, rgba(240,204,106,0.0) 35%, rgba(255,240,180,0.22) 48%, rgba(201,162,39,0.18) 52%, rgba(240,204,106,0.0) 65%, transparent 80%)',
                    backgroundSize: '250% 100%',
                  }}
                  initial={{ backgroundPosition: '-100% 0%' }}
                  animate={{ backgroundPosition: '200% 0%' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
