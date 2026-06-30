'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface PreloaderContextValue {
  ready: boolean
  markReady: () => void
}

const PreloaderContext = createContext<PreloaderContextValue | null>(null)

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  const markReady = useCallback(() => {
    setReady(true)
  }, [])

  return (
    <PreloaderContext.Provider value={{ ready, markReady }}>
      {children}
    </PreloaderContext.Provider>
  )
}

export function usePreloader() {
  const ctx = useContext(PreloaderContext)
  if (!ctx) throw new Error('usePreloader must be used within PreloaderProvider')
  return ctx
}
