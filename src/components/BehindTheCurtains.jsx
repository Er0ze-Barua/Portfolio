import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useHeroScroll } from '../context/HeroScrollContext'
import { behindTheCurtains } from '../data/content'

const cards = behindTheCurtains.cards

const ghostVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 0.28, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.28 } }),
}

const activeVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.92 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.92, transition: { duration: 0.28 } }),
}

function TiltCard({ children, className }) {
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawY, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(rawX, { stiffness: 200, damping: 20 })
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        const rect = cardRef.current.getBoundingClientRect()
        rawX.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 12)
        rawY.set(-((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 12)
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function GhostCard({ card, dir, side }) {
  return (
    <div className={`absolute top-0 h-full w-[18%] z-10 pointer-events-none ${side === 'left' ? 'right-[102%]' : 'left-[102%]'}`}>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={card.id}
          custom={dir}
          variants={ghostVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            height: '100%', borderRadius: '16px',
            border: '1px solid rgba(148,163,184,0.08)',
            backgroundColor: 'rgba(17,16,16,0.6)',
            padding: '1rem',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            filter: 'blur(1.5px)',
          }}
        >
          <p style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#b95221', marginBottom: '0.5rem' }}>{card.label}</p>
          <p style={{ fontSize: '10px', color: 'rgba(242,247,242,0.35)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' }}>{card.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function OffsetHeading() {
  return (
    <div className="flex flex-col items-start w-full lg:-ml-12">
      <div style={{ marginBottom: '0.2rem' }}>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: 500, color: 'rgba(242,247,242,0.6)', letterSpacing: '0.02em' }}>
          Hey, I'm
        </span>
      </div>
      <div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '4.2rem', fontWeight: 700, color: '#b95221', letterSpacing: '-0.02em', lineHeight: 1 }}>
          Eroze Barua
        </span>
      </div>
    </div>
  )
}

export default function BehindTheCurtains() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null) 
  const { scrollYProgress: heroProgress } = useHeroScroll()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [hovered, setHovered] = useState(false)

  // Global section progress (for entering/exiting the whole screen)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Micro-interaction progress
  const { scrollYProgress: innerScroll } = useScroll({
    target: innerRef,
    offset: ['start 40%', 'start 0%']
  })

  // Global Opacity/Y mapped from App.jsx hero transition
  const entranceOpacity = useTransform(heroProgress, [0.3, 0.55, 1], [0, 1, 1])
  const entranceY = useTransform(heroProgress, [0.3, 0.55], [80, 0])
  const exitOpacity = useTransform(sectionProgress, [0.65, 0.95], [1, 0])
  const exitY = useTransform(sectionProgress, [0.65, 0.95], [0, -40])
  const opacity = useTransform([entranceOpacity, exitOpacity], ([a, b]) => a * b)
  const y = useTransform([entranceY, exitY, sectionProgress], ([a, b, s]) => s < 0.65 ? a : b)

  // Title dissolves and moves up as you scroll down
  const titleOpacity = useTransform(innerScroll, [0, 1], [1, 0])
  const titleY = useTransform(innerScroll, [0, 1], [0, -30])
  
  // Cards slide up into the void left by the title
  const contentSlideUp = useTransform(innerScroll, [0, 1], [0, -90]) 

  const go = (d) => { setDir(d); setIndex((i) => (i + d + cards.length) % cards.length) }
  const prev = (index - 1 + cards.length) % cards.length
  const next = (index + 1) % cards.length

  useEffect(() => {
    if (hovered) return
    const timer = setInterval(() => go(1), 4000)
    return () => clearInterval(timer)
  }, [hovered, index])

  const scrollToBottomAndTrigger = (eventName) => {
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 20
    if (isAtBottom) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(eventName))
      }, 150)
      return
    }

    let fired = false
    const trigger = () => {
      if (fired) return
      fired = true
      // Trigger highlight animation 250ms after scroll has settled
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(eventName))
      }, 250)
    }

    const handleScrollEnd = () => {
      trigger()
      window.removeEventListener('scrollend', handleScrollEnd)
    }

    window.addEventListener('scrollend', handleScrollEnd, { once: true })
    
    // Fallback timer in case scrollend does not trigger
    setTimeout(() => {
      trigger()
      window.removeEventListener('scrollend', handleScrollEnd)
    }, 900)

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  const handleResumeScroll = () => {
    scrollToBottomAndTrigger('highlight-resume-btn')
  }

  const handleConnectScroll = () => {
    scrollToBottomAndTrigger('highlight-connect-card')
  }

  const handleProfilesScroll = () => {
    const el = document.getElementById('contributions')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="relative z-10 -mt-[100vh] min-h-screen px-6 flex flex-col justify-center pt-[100vh]">
      <div id="behind-the-curtains" style={{ position: 'absolute', top: '100vh', left: 0 }} />
      <motion.div style={{ opacity, y }} className="mx-auto max-w-6xl w-full pb-20" ref={innerRef}>
        
        {/* --- SCENE 1: The Title Block --- */}
        <motion.div style={{ opacity: titleOpacity, y: titleY, marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#b95221', marginBottom: '1.5rem' }}>
            {behindTheCurtains.eyebrow}
          </p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 700, color: '#f2f7f2', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Behind the curtains
          </h2>
        </motion.div>

        {/* --- SCENE 2: The Main Content --- */}
        <motion.div style={{ y: contentSlideUp }} className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Left Column: Photo card */}
          <TiltCard className="w-full lg:w-96 rounded-2xl cursor-pointer flex-shrink-0 lg:ml-0">
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3 / 4', border: '1px solid rgba(148,163,184,0.12)', backgroundColor: 'rgba(17,16,16,0.8)' }}>
              <img 
                src="/about-me.jpg" 
                alt="Eroze Barua" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </TiltCard>

          {/* Right Column: Heading + Carousel Box */}
          <div className="flex flex-col w-full lg:w-[480px] lg:mr-16">
            
            <div style={{ marginBottom: '1.5rem' }}>
              <OffsetHeading />
            </div>

            {/* Carousel Interactive Area */}
            <div
              className="relative flex-shrink-0 w-full"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <GhostCard card={cards[prev]} dir={dir} side="left" />
              <GhostCard card={cards[next]} dir={dir} side="right" />

              <div style={{ position: 'relative', borderRadius: '16px', border: '1px solid rgba(148,163,184,0.12)', backgroundColor: 'rgba(17,16,16,0.8)', overflow: 'hidden', aspectRatio: '4 / 3' }}>
                
                {/* Dots indicator at the bottom */}
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
                  {cards.map((_, i) => (
                    <button key={i}
                      onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
                      style={{ height: '6px', borderRadius: '99px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', width: i === index ? '24px' : '6px', backgroundColor: i === index ? '#b95221' : 'rgba(148,163,184,0.25)' }}
                    />
                  ))}
                </div>

                <div style={{ position: 'relative', height: '100%', padding: '3.5rem 3rem 3rem' }}>
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div key={index} custom={dir} variants={activeVariants} initial="enter" animate="center" exit="exit" style={{ width: '100%' }}>
                      <p style={{ marginBottom: '0.75rem', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#b95221' }}>
                        {cards[index].label}
                      </p>
                      
                      {cards[index].id === 'get-in-touch' ? (
                        <div>
                          <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(242,247,242,0.88)' }}>
                            Let's connect - explore my{' '}
                            <a href="#contributions" onClick={(e) => { e.preventDefault(); handleProfilesScroll(); }} style={{ color: '#b95221', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>repos and coding profiles</a>{' '}
                            below, or grab my{' '}
                            <a href="#contact" onClick={(e) => { e.preventDefault(); handleResumeScroll(); }} style={{ color: '#b95221', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>resume</a>
                            . Rather just talk?{' '}
                            <a href="#contact" onClick={(e) => { e.preventDefault(); handleConnectScroll(); }} style={{ color: '#b95221', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>Get in touch</a>.
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
                            <a href="https://github.com/Er0ze-Barua" target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', border: '1px solid rgba(148,163,184,0.15)', padding: '0.3rem 0.8rem', borderRadius: 99, transition: 'all 0.2s', backgroundColor: 'rgba(148,163,184,0.04)' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,82,33,0.4)'; e.currentTarget.style.color = '#f2f7f2'; e.currentTarget.style.backgroundColor = 'rgba(185,82,33,0.08)' }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'rgba(148,163,184,0.04)' }}
                            >GitHub</a>
                            <a href="https://www.linkedin.com/in/eroze-barua/" target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', border: '1px solid rgba(148,163,184,0.15)', padding: '0.3rem 0.8rem', borderRadius: 99, transition: 'all 0.2s', backgroundColor: 'rgba(148,163,184,0.04)' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,82,33,0.4)'; e.currentTarget.style.color = '#f2f7f2'; e.currentTarget.style.backgroundColor = 'rgba(185,82,33,0.08)' }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'rgba(148,163,184,0.04)' }}
                            >LinkedIn</a>
                            <a href="https://leetcode.com/u/BEr0ze/" target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', border: '1px solid rgba(148,163,184,0.15)', padding: '0.3rem 0.8rem', borderRadius: 99, transition: 'all 0.2s', backgroundColor: 'rgba(148,163,184,0.04)' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,82,33,0.4)'; e.currentTarget.style.color = '#f2f7f2'; e.currentTarget.style.backgroundColor = 'rgba(185,82,33,0.08)' }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'rgba(148,163,184,0.04)' }}
                            >LeetCode</a>
                            <a href="https://codeforces.com/Er0ze" target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', border: '1px solid rgba(148,163,184,0.15)', padding: '0.3rem 0.8rem', borderRadius: 99, transition: 'all 0.2s', backgroundColor: 'rgba(148,163,184,0.04)' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,82,33,0.4)'; e.currentTarget.style.color = '#f2f7f2'; e.currentTarget.style.backgroundColor = 'rgba(185,82,33,0.08)' }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'rgba(148,163,184,0.04)' }}
                            >Codeforces</a>
                          </div>
                        </div>
                      ) : (
                        <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(242,247,242,0.88)' }}>
                          {cards[index].body}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button onClick={() => go(-1)} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', zIndex: 20, width: '2.25rem', height: '2.25rem', borderRadius: '50%', border: '1px solid rgba(148,163,184,0.15)', backgroundColor: 'rgba(17,16,16,0.8)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,82,33,0.4)'; e.currentTarget.style.color = '#b95221' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#94a3b8' }}
                ><ChevronLeft size={16} /></button>
                <button onClick={() => go(1)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', zIndex: 20, width: '2.25rem', height: '2.25rem', borderRadius: '50%', border: '1px solid rgba(148,163,184,0.15)', backgroundColor: 'rgba(17,16,16,0.8)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(185,82,33,0.4)'; e.currentTarget.style.color = '#b95221' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; e.currentTarget.style.color = '#94a3b8' }}
                ><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}