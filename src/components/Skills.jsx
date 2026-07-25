import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { skillCategories } from '../data/content'

const cardOffsets = [
  { top: '6%', left: '1%' }, { top: '6%', left: '26%' }, { top: '6%', right: '26%' }, { top: '6%', right: '1%' },
  { bottom: '6%', left: '1%' }, { bottom: '6%', left: '26%' }, { bottom: '6%', right: '26%' }, { bottom: '6%', right: '1%' },
]

const S = 'rgba(148,163,184,'
const O = 'rgba(185,82,33,'

function SkillCard({ cat, index, onClose, isMobile }) {
  const numCols = Math.ceil(cat.skills.length / 4)
  const cardWidth = isMobile ? '290px' : (numCols === 1 ? '240px' : (numCols === 2 ? '360px' : '480px'))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.65, x: isMobile ? '-50%' : 0, y: isMobile ? '-50%' : 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: isMobile ? '-50%' : 0, 
        y: isMobile ? '-50%' : 0, 
        transition: { type: 'spring', stiffness: 280, damping: 24, delay: index * 0.04 } 
      }}
      exit={{ opacity: 0, scale: 0.65, transition: { duration: 0.15 } }}
      style={{
        position: 'fixed',
        zIndex: 51,
        width: cardWidth,
        backgroundColor: 'rgba(17,16,16,0.98)',
        border: `1px solid ${S}0.18)`,
        boxShadow: `0 0 32px 4px ${O}0.1)`,
        borderRadius: '16px',
        padding: '1.25rem',
        maxHeight: isMobile ? '80vh' : 'auto',
        overflowY: isMobile ? 'auto' : 'visible',
        ...(isMobile
          ? { top: '50%', left: '50%' }
          : cardOffsets[index]
        )
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b95221', display: 'block' }}>{cat.title}</span>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.2rem', display: 'block' }}>{cat.desc}</span>
        </div>
        <motion.button onClick={() => onClose(index)} whileHover={{ backgroundColor: 'rgba(220,38,38,0.3)', borderColor: 'rgba(220,38,38,0.6)', color: '#fff' }}
          style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', flexShrink: 0, marginLeft: '0.5rem', border: `1px solid ${S}0.18)`, backgroundColor: `${S}0.05)`, color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', lineHeight: 1 }}>×</motion.button>
      </div>
      <div style={{ height: '1px', backgroundColor: `${S}0.12)`, margin: '0.6rem 0 0.8rem' }} />
      
      {/* Dynamic layout: row columns on desktop, single vertical stack on mobile */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem' }}>
        {Array.from({ length: numCols }).map((_, col) => (
          <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
            {cat.skills.slice(col * 4, col * 4 + 4).map((skill, i) => (
              <motion.div key={skill+i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + (col*4+i)*0.04 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, backgroundColor: `${O}0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.5rem', color: '#b95221' }}>◆</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#f2f7f2', lineHeight: 1.3 }}>{skill}</span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [allOpen, setAllOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const closeAll = () => { setAllOpen(false); setActiveIndex(null) }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="skills" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="Skills" title="What I work with" subtitle="Click any category to explore." />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Feeling lazy or in a rush?</span>
          <motion.button onClick={() => { setAllOpen(true); setActiveIndex(null) }}
            whileHover={{ boxShadow: `0 0 16px 3px ${O}0.25)`, borderColor: `${O}0.65)`, color: '#f2f7f2' }}
            transition={{ duration: 0.18 }}
            style={{ borderRadius: 99, border: `1px solid ${O}0.35)`, backgroundColor: `${O}0.07)`, padding: '0.3rem 0.85rem', fontSize: '0.72rem', color: '#b95221', cursor: 'pointer', letterSpacing: '0.04em' }}>
            View all →
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-10">
          {skillCategories.map((cat, i) => (
            <motion.button key={cat.id}
              onClick={() => { setAllOpen(false); setActiveIndex(activeIndex === i ? null : i) }}
              whileHover={{ scale: 1.08, y: -8, boxShadow: `0 12px 40px ${O}0.3), 0 0 0 1px ${O}0.45)`, backgroundColor: `${O}0.1)` }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ borderRadius: '16px', border: activeIndex === i ? `1px solid ${O}0.55)` : `1px solid ${S}0.12)`, backgroundColor: activeIndex === i ? `${O}0.08)` : 'rgba(17,16,16,0.6)', padding: '2rem 1rem', cursor: 'pointer', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b95221' }}>{cat.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {!allOpen && activeIndex !== null && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              onClick={() => setActiveIndex(null)}
              style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }} />
            <SkillCard cat={skillCategories[activeIndex]} index={activeIndex} onClose={() => setActiveIndex(null)} isMobile={isMobile} />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {allOpen && (
          <>
            {/* Fullscreen blur backdrop */}
            <motion.div key="bd-all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              onClick={closeAll}
              style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(8,8,8,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', cursor: 'pointer' }} />
            
            {/* Top Close-All Button overlay */}
            <motion.button key="close-all" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              onClick={closeAll} whileHover={{ boxShadow: '0 0 20px 4px rgba(220,38,38,0.3)', borderColor: 'rgba(220,38,38,0.65)', color: '#fff' }}
              style={{ position: 'fixed', top: '1.5rem', left: 0, right: 0, margin: '0 auto', zIndex: 53, width: 'fit-content', borderRadius: 99, border: `1px solid ${S}0.2)`, backgroundColor: 'rgba(17,16,16,0.95)', color: '#94a3b8', padding: '0.5rem 1.25rem', fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '0.06em', transition: 'box-shadow 0.2s, border-color 0.2s, color 0.2s' }}>
              ✕ Close all
            </motion.button>
            
            {/* Spacious, scrollable Centered modal grid */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 51, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4.5rem 2rem 2rem', pointerEvents: 'none' }}>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
                style={{
                  width: '100%',
                  maxWidth: '1200px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  pointerEvents: 'auto',
                  padding: '1rem',
                }}
              >
                {skillCategories.map((cat, i) => {
                  const numGridCols = Math.ceil(cat.skills.length / 4)
                  return (
                    <motion.div key={cat.id}
                      initial={{ opacity: 0, scale: 0.85 }} 
                      animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 24, delay: i * 0.03 } }} 
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                      style={{ 
                        backgroundColor: 'rgba(17,16,16,0.98)', 
                        border: `1px solid ${S}0.18)`, 
                        borderRadius: '16px', 
                        padding: '1.25rem', 
                        display: 'flex', 
                        flexDirection: 'column',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div style={{ marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b95221', display: 'block' }}>{cat.title}</span>
                        <span style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '0.15rem', display: 'block', minHeight: '1.5rem' }}>{cat.desc}</span>
                      </div>
                      <div style={{ height: '1px', backgroundColor: `${S}0.12)`, margin: '0.5rem 0 0.75rem' }} />
                      <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                        {Array.from({ length: numGridCols }).map((_, col) => (
                          <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                            {cat.skills.slice(col * 4, col * 4 + 4).map((skill, si) => (
                              <div key={skill+si} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <div style={{ width: 14, height: 14, borderRadius: 3, flexShrink: 0, backgroundColor: `${O}0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <span style={{ fontSize: '0.42rem', color: '#b95221' }}>◆</span>
                                </div>
                                <span style={{ fontSize: '0.68rem', color: '#f2f7f2', lineHeight: 1.3 }}>{skill}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}