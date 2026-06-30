'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from '@/context/PreloaderContext'

const LETTERS = 'NATURAL VENEERS'.split('')

export default function Preloader() {
  const { markReady } = usePreloader()
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'letters' | 'wipe'>('letters')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('wipe'), 1800)
    const t2 = setTimeout(() => {
      setVisible(false)
      markReady()
    }, 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [markReady])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-void flex items-center justify-center"
          animate={phase === 'wipe' ? { clipPath: 'inset(0 0 100% 0)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          exit={{ opacity: 0 }}
        >
          <div className="flex gap-1 overflow-hidden">
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
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
