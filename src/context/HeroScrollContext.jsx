import { createContext, useContext, useRef } from 'react'
import { useScroll } from 'framer-motion'

const HeroScrollContext = createContext(null)

export function HeroScrollProvider({ children }) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  return (
    <HeroScrollContext.Provider value={{ containerRef, scrollYProgress }}>
      {children}
    </HeroScrollContext.Provider>
  )
}

export function useHeroScroll() {
  const context = useContext(HeroScrollContext)
  if (!context) {
    throw new Error('useHeroScroll must be used within HeroScrollProvider')
  }
  return context
}
