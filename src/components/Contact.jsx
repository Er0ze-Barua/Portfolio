import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'

const QUOTES = [
  "I still think Bugatti shouldn't have stopped the production of quad-turbo W16 engines.",
  "90k+ minutes on Spotify every year, don't ask me how, I just love music.",
  "Need for Speed Most Wanted 2005 - the best one till date, no debate.",
  "I believe in hardwork better than any luck or power - Frank Castle a.k.a the Punisher gets the job done with full determination and strategy.",
  "Hey, being lazy isn't a flaw - it's how I find the easiest way to get things done.",
]

const SOCIALS = [
  { label: 'eroze-barua', href: 'https://linkedin.com/in/eroze-barua', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'beroze182@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=beroze182@gmail.com&su=Landed%20right%20from%20your%20portfolio&body=Hey%20Eroze%2C%0A%0AJust%20came%20across%20your%20portfolio%20and%20', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
]

function QuotesCard() {
  const [idx, setIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (hovered) return
    const t = setInterval(() => setIdx(i => (i + 1) % QUOTES.length), 3000)
    return () => clearInterval(t)
  }, [hovered])

  const showControls = hovered || isMobile

  return (
    <motion.div 
      onHoverStart={() => setHovered(true)} 
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(185,82,33,0.1)' }} 
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{ backgroundColor: 'rgba(17,16,16,0.8)', border: '1px solid rgba(148,163,184,0.12)', borderRadius: '20px', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '260px' }}
    >
      <div style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: '#b95221', marginBottom: '1.25rem' }}>RANDOM THOUGHTS</div>
      <div style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.p key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45 }}
            style={{ position: 'absolute', fontStyle: 'italic', fontSize: '0.88rem', color: 'rgba(242,247,242,0.72)', lineHeight: 1.7, textAlign: 'center', margin: 0, padding: '0 0.5rem' }}>
            {QUOTES[idx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Dotted indicator shifts to a clean pill button when mouse is anywhere inside the card */}
      <div style={{ marginTop: '1.5rem' }}>
        <motion.div
          animate={{ 
            gap: showControls ? '2px' : '0px', 
            padding: showControls ? '4px 10px' : '2px 4px', 
            backgroundColor: showControls ? 'rgba(185,82,33,0.08)' : 'rgba(255,255,255,0.0)', 
            borderRadius: 99, 
            border: showControls ? '1px solid rgba(185,82,33,0.25)' : '1px solid rgba(255,255,255,0.0)' 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {QUOTES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{ border: 'none', background: 'transparent', padding: '6px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.span
                animate={{ 
                  width: showControls ? 7 : (i === idx ? 12 : 5), 
                  height: showControls ? 7 : 5, 
                  borderRadius: 99, 
                  backgroundColor: i === idx ? '#b95221' : (showControls ? 'rgba(148,163,184,0.6)' : 'rgba(148,163,184,0.25)'),
                  scale: showControls && i === idx ? 1.2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{ display: 'block', borderRadius: 99 }}
              />
            </button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

function ConnectCard() {
  const [open, setOpen] = useState(false)
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false)

  useEffect(() => {
    const handleConnectHighlight = () => {
      setOpen(true)
      setIsConnectHighlighted(true)
      const timer = setTimeout(() => setIsConnectHighlighted(false), 800)
      return () => clearTimeout(timer)
    }
    window.addEventListener('highlight-connect-card', handleConnectHighlight)
    return () => window.removeEventListener('highlight-connect-card', handleConnectHighlight)
  }, [])

  return (
    <motion.div layout transition={{ layout: { duration: 0.35, ease: 'easeInOut' } }}
      whileHover={!open ? { y: -4, boxShadow: '0 12px 48px rgba(185,82,33,0.18)', borderColor: 'rgba(185,82,33,0.45)' } : {}}
      animate={isConnectHighlighted ? { y: -4, boxShadow: '0 12px 48px rgba(185,82,33,0.18)', borderColor: 'rgba(185,82,33,0.45)' } : {}}
      style={{ backgroundColor: 'rgba(17,16,16,0.8)', border: '1px solid rgba(148,163,184,0.12)', borderRadius: '20px', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '260px', overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s' }}
    >
      <motion.div layout="position" style={{ textAlign: 'center', width: '100%' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#b95221', marginBottom: '0.5rem' }}>Let's connect</div>
        <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.5 }}>Have something to say, ask, or build together?</div>

        <motion.button layout onClick={() => setOpen(o => !o)}
          whileHover={!open ? { scale: 1.05, backgroundColor: '#b95221', color: '#f2f7f2', borderColor: '#b95221', boxShadow: '0 0 24px 6px rgba(185,82,33,0.35)' } : {}}
          animate={isConnectHighlighted && !open ? { scale: 1.05, backgroundColor: '#b95221', color: '#f2f7f2', borderColor: '#b95221', boxShadow: '0 0 24px 6px rgba(185,82,33,0.35)' } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            borderRadius: 99,
            border: open ? '1px solid #f2f7f2' : '1px solid rgba(185,82,33,0.5)',
            backgroundColor: open ? '#f2f7f2' : 'transparent',
            color: open ? '#080808' : '#b95221',
            padding: '0.6rem 1.6rem', fontSize: '0.82rem', cursor: 'pointer',
            letterSpacing: '0.04em', transition: 'all 0.18s',
            marginBottom: open ? '1.25rem' : 0, fontWeight: 500,
          }}
        >{open ? 'Close ×' : 'Reach out →'}</motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SOCIALS.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '100%' }}>
                  <motion.a href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.9rem', borderRadius: 12, border: '1px solid rgba(148,163,184,0.18)', backgroundColor: 'rgba(148,163,184,0.04)', color: '#94a3b8', textDecoration: 'none', fontSize: '0.78rem', transition: 'all 0.18s' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f2f7f2'; e.currentTarget.style.borderColor = '#f2f7f2'; e.currentTarget.style.color = '#080808' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(148,163,184,0.04)'; e.currentTarget.style.borderColor = 'rgba(148,163,184,0.18)'; e.currentTarget.style.color = '#94a3b8' }}
                  >
                    <span style={{ flexShrink: 0 }}>{s.icon}</span>{s.label}
                  </motion.a>
                  {s.label === 'beroze182@gmail.com' && (
                    <motion.a 
                      href="mailto:beroze182@gmail.com?subject=Landed%20right%20from%20your%20portfolio&body=Hey%20Eroze%2C%0A%0AJust%20came%20across%20your%20portfolio%20and%20"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                      style={{ 
                        display: 'block', 
                        fontSize: '0.66rem', 
                        color: '#b95221', 
                        textDecoration: 'none', 
                        textAlign: 'center', 
                        marginTop: '0.5rem', 
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                        letterSpacing: '0.01em',
                        fontFamily: 'inherit',
                        fontWeight: 500,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d26027' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#b95221' }}
                    >
                      Not using Gmail? Or not logged in? Click here
                    </motion.a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SpotifyCard() {
  return (
    <motion.div whileHover={{ y: -4, boxShadow: '0 12px 48px rgba(29,185,84,0.18)' }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '260px', border: '1px solid rgba(29,185,84,0.18)' }}>
      <img src="https://i.scdn.co/image/ab67616d0000b2738c68dbf45713819ab6d612fe" alt="Bekhauf" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.5) 55%, rgba(8,8,8,0.15) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          <span style={{ fontSize: '0.62rem', color: '#1DB954', letterSpacing: '0.12em', fontWeight: 600 }}>ON REPEAT</span>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f2f7f2', marginBottom: '0.2rem' }}>Bekhauf</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '1rem' }}>Bloodywood</div>
          <a href="https://open.spotify.com/track/0KLm7cjKriGkqI0ApLlzNb?si=141d42329c014187" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: 99, border: '1px solid rgba(29,185,84,0.45)', backgroundColor: 'rgba(29,185,84,0.12)', padding: '0.4rem 1rem', fontSize: '0.72rem', color: '#1DB954', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f2f7f2'; e.currentTarget.style.borderColor = '#f2f7f2'; e.currentTarget.style.color = '#080808' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(29,185,84,0.12)'; e.currentTarget.style.borderColor = 'rgba(29,185,84,0.45)'; e.currentTarget.style.color = '#1DB954' }}
          >▶ Play on Spotify</a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const [isResumeHighlighted, setIsResumeHighlighted] = useState(false)

  useEffect(() => {
    const handleHighlight = () => {
      setIsResumeHighlighted(true)
      const timer = setTimeout(() => setIsResumeHighlighted(false), 800)
      return () => clearTimeout(timer)
    }
    window.addEventListener('highlight-resume-btn', handleHighlight)
    return () => window.removeEventListener('highlight-resume-btn', handleHighlight)
  }, [])

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Contact" title="Say hello" subtitle="Let's build something worth talking about." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12 items-start">
          <QuotesCard />
          <ConnectCard />
          <SpotifyCard />
        </div>

        {/* Resume — bigger, white, inverse hover */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <motion.a href="/Eroze_Barua_Resume.pdf" download="Eroze_Barua_Resume.pdf"
            whileHover={{ scale: 1.04, boxShadow: '0 0 36px 8px rgba(255,255,255,0.14)', backgroundColor: '#f2f7f2', color: '#080808', borderColor: '#f2f7f2' }}
            animate={isResumeHighlighted ? { scale: 1.04, boxShadow: '0 0 36px 8px rgba(255,255,255,0.14)', backgroundColor: '#f2f7f2', color: '#080808', borderColor: '#f2f7f2' } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', borderRadius: 99, border: '1px solid rgba(242,242,242,0.45)', backgroundColor: 'transparent', padding: '0.9rem 2.75rem', fontSize: '0.95rem', color: '#f2f7f2', textDecoration: 'none', letterSpacing: '0.06em', cursor: 'pointer', fontWeight: 500, boxShadow: '0 0 16px 2px rgba(255,255,255,0.05)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Here's my resume
          </motion.a>
        </div>
      </div>
    </section>
  )
}