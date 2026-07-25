import { useEffect, useState, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PRIMARY_LINKS = [
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
  { href: '#projects', label: 'Work' },
]

const MORE_LINKS = [
  { href: '#behind-the-curtains', label: 'Behind the Curtains' },
  { href: '#experience', label: 'Experience' },
  { href: '#contributions', label: 'Profiles' },
  { href: '#certificates', label: 'Certificates' },
]

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [isResumeHighlighted, setIsResumeHighlighted] = useState(false)
  const moreRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleHighlight = () => {
      setIsResumeHighlighted(true)
      const timer = setTimeout(() => setIsResumeHighlighted(false), 800)
      return () => clearTimeout(timer)
    }
    window.addEventListener('highlight-resume-btn', handleHighlight)
    return () => window.removeEventListener('highlight-resume-btn', handleHighlight)
  }, [])

  const scheduleClose = () => { closeTimer.current = setTimeout(() => setMoreOpen(false), 120) }

  const pillBase = {
    borderRadius: 99,
    padding: '0.28rem 0.65rem',
    fontSize: '0.78rem',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
  }

  const pillHover = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'
    e.currentTarget.style.color = '#f2f7f2'
  }
  const pillLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = '#94a3b8'
  }

  // Classy slide-nudge dropdown item hover style handlers
  const dropItemHover = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(185,82,33,0.08)'
    e.currentTarget.style.color = '#b95221'
    e.currentTarget.style.paddingLeft = '0.95rem'
  }
  const dropItemLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = '#94a3b8'
    e.currentTarget.style.paddingLeft = '0.7rem'
  }

  return (
    <>
      {/* Desktop */}
      <div className="fixed top-4 right-6 z-50 hidden lg:block">
        <nav style={{
          display: 'flex', alignItems: 'center', gap: '0.1rem',
          borderRadius: 99,
          border: '1px solid rgba(148,163,184,0.12)',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.22)' : 'rgba(17,16,16,0.08)',
          padding: '0.28rem 0.4rem',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          transition: 'background-color 0.3s',
        }}>

          {/* Pills 1–3 */}
          {PRIMARY_LINKS.map((link) => (
            <a key={link.href} href={link.href} style={pillBase}
              onMouseEnter={pillHover} onMouseLeave={pillLeave}>
              {link.label}
            </a>
          ))}

          <span style={{ width: 1, height: '0.9rem', backgroundColor: 'rgba(148,163,184,0.15)', margin: '0 0.2rem' }} />

          {/* Resume — inverts on hover and highlight */}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
            style={{
              ...pillBase,
              color: isResumeHighlighted ? '#0a0a0a' : '#e8e8e8',
              backgroundColor: isResumeHighlighted ? '#f2f7f2' : 'transparent',
              borderColor: isResumeHighlighted ? '#f2f7f2' : 'rgba(232,232,232,0.25)',
              border: '1px solid',
              padding: '0.28rem 0.75rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f2f7f2'
              e.currentTarget.style.color = '#0a0a0a'
              e.currentTarget.style.borderColor = '#f2f7f2'
            }}
            onMouseLeave={(e) => {
              if (isResumeHighlighted) return
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#e8e8e8'
              e.currentTarget.style.borderColor = 'rgba(232,232,232,0.25)'
            }}>
            Resume
          </a>

          <span style={{ width: 1, height: '0.9rem', backgroundColor: 'rgba(148,163,184,0.15)', margin: '0 0.2rem' }} />

          {/* More — click to expand, hover leave to close */}
          <div ref={moreRef} style={{ position: 'relative' }}
            onMouseLeave={scheduleClose}>
            <button 
              onClick={() => setMoreOpen(o => !o)}
              style={{ 
                ...pillBase, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.2rem',
                // Sleek orange accent outline + transparent background when active
                color: moreOpen ? '#f2f7f2' : '#e8e8e8',
                backgroundColor: moreOpen ? 'rgba(185,82,33,0.12)' : 'transparent',
                borderColor: moreOpen ? 'rgba(185,82,33,0.4)' : 'transparent',
                border: '1px solid',
                padding: '0.28rem 0.75rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (moreOpen) return
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.color = '#f2f7f2'
              }}
              onMouseLeave={(e) => {
                if (moreOpen) return
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#e8e8e8'
              }}
            >
              More
              <ChevronDown size={11} style={{ transition: 'transform 0.2s', transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0,
                    minWidth: '175px',
                    // Sleek dark-glass dropdown container
                    backgroundColor: 'rgba(10,10,10,0.92)',
                    border: '1px solid rgba(148,163,184,0.12)',
                    borderRadius: '10px',
                    padding: '0.35rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    display: 'flex', flexDirection: 'column', gap: '0.05rem',
                    originY: 0,
                  }}
                  onMouseEnter={() => clearTimeout(closeTimer.current)}
                >
                  {MORE_LINKS.map((link) => (
                    <a key={link.href} href={link.href}
                      onClick={() => setMoreOpen(false)}
                      style={{ 
                        ...pillBase, 
                        borderRadius: '7px', 
                        padding: '0.4rem 0.7rem', 
                        display: 'block', 
                        fontSize: '0.77rem',
                        // Muted grey text by default
                        color: '#94a3b8',
                        fontWeight: 500,
                      }}
                      onMouseEnter={dropItemHover} onMouseLeave={dropItemLeave}>
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>
      </div>

      {/* Mobile hamburger */}
      <div className="fixed top-4 right-4 z-50 hamburger-menu lg:hidden">
        <button type="button" onClick={() => setIsOpen(o => !o)} aria-label={isOpen ? 'Close menu' : 'Open menu'}
          style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid rgba(148,163,184,0.15)', backgroundColor: 'rgba(17,16,16,0.9)', color: '#f2f7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(12px)' }}>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ backgroundColor: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(16px)' }}>
          <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1.5rem', margin: 0, padding: 0, listStyle: 'none' }}>
            {[...PRIMARY_LINKS, ...MORE_LINKS].map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setIsOpen(false)}
                  style={{ fontSize: '1.75rem', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f2f7f2', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#b95221'}
                  onMouseLeave={e => e.currentTarget.style.color = '#f2f7f2'}
                >{link.label}</a>
              </li>
            ))}
            <li>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                style={{ fontSize: '1.75rem', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f2f7f2', textDecoration: 'none' }}>
                Resume ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}