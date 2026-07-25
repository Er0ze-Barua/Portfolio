import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GitHubIcon } from './SocialIcons'
import SectionHeader from './SectionHeader'
import { projects } from '../data/content'

const textVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3 } },
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -50 : 50, transition: { duration: 0.25 } }),
}

const S = 'rgba(148,163,184,'
const O = 'rgba(185,82,33,'

// Liquid bubble dot navigator
function LiquidDots({ images, cur, setCur, paused, setPaused }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ position: 'absolute', bottom: '0.8rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
      onMouseEnter={() => { setHovered(true); setPaused(true) }}
      onMouseLeave={() => { setHovered(false); setPaused(false) }}
    >
      <motion.div
        animate={{
          gap: hovered ? '10px' : '5px',
          padding: hovered ? '8px 14px' : '4px 6px',
          backgroundColor: hovered ? 'rgba(17,16,16,0.92)' : 'rgba(17,16,16,0.5)',
          borderRadius: 99,
          border: hovered ? '1px solid rgba(148,163,184,0.2)' : '1px solid transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {images.map((_, i) => (
          <motion.button key={i} onClick={() => setCur(i)}
            animate={{
              width: hovered ? 28 : (i === cur ? 14 : 5),
              height: hovered ? 28 : 5,
              borderRadius: 99,
              backgroundColor: i === cur
                ? (hovered ? '#b95221' : '#b95221')
                : (hovered ? 'rgba(148,163,184,0.25)' : 'rgba(148,163,184,0.3)'),
              scale: hovered && i === cur ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{ border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {hovered && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                style={{ fontSize: '0.55rem', color: i === cur ? '#fff' : '#94a3b8', fontWeight: 600, pointerEvents: 'none' }}>
                {i + 1}
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

function ImageCarousel({ images, index: projectIndex }) {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (paused || isMobile) return
    const t = setInterval(() => setCur(i => (i + 1) % images.length), 2500)
    return () => clearInterval(t)
  }, [images.length, paused, isMobile])

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) {
      setCur(i => (i + 1) % images.length)
    } else if (diff < -50) {
      setCur(i => (i - 1 + images.length) % images.length)
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  return (
    <div 
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ width: '100%', position: 'relative', aspectRatio: '16/9' }}
    >
      {/* Inner wrapper to handle clipping for rounding */}
      <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative', backgroundColor: 'rgba(17,16,16,0.9)', border: `1px solid ${S}0.12)` }}>
        <AnimatePresence mode="wait">
          <motion.div key={cur} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
            {images[cur] ? (
              <img src={images[cur]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#94a3b8', opacity: 0.4 }}>[ SCREENSHOT {cur + 1} ]</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: `${O}0.1)`, fontFamily: 'Syne, sans-serif' }}>{projectIndex}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <LiquidDots images={images} cur={cur} setCur={setCur} paused={paused} setPaused={setPaused} />
      </div>
      
      {/* Photo navigation Chevrons (outside border on desktop) */}
      <button 
        onClick={(e) => { e.stopPropagation(); setCur(i => (i - 1 + images.length) % images.length) }}
        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer transition-all duration-200 left-2 lg:-left-9"
        style={{ 
          width: '1.85rem', height: '1.85rem', borderRadius: '50%', 
          border: '1px solid rgba(148,163,184,0.15)', 
          backgroundColor: 'rgba(17,16,16,0.9)', 
          color: '#94a3b8' 
        }}
        onMouseEnter={e => { 
          e.currentTarget.style.borderColor = 'rgba(185,82,33,0.5)'; 
          e.currentTarget.style.color = '#f2f7f2'; 
          e.currentTarget.style.boxShadow = '0 0 10px rgba(185,82,33,0.2)';
        }}
        onMouseLeave={e => { 
          e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; 
          e.currentTarget.style.color = '#94a3b8'; 
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ChevronLeft size={14} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); setCur(i => (i + 1) % images.length) }}
        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer transition-all duration-200 right-2 lg:-right-9"
        style={{ 
          width: '1.85rem', height: '1.85rem', borderRadius: '50%', 
          border: '1px solid rgba(148,163,184,0.15)', 
          backgroundColor: 'rgba(17,16,16,0.9)', 
          color: '#94a3b8' 
        }}
        onMouseEnter={e => { 
          e.currentTarget.style.borderColor = 'rgba(185,82,33,0.5)'; 
          e.currentTarget.style.color = '#f2f7f2'; 
          e.currentTarget.style.boxShadow = '0 0 10px rgba(185,82,33,0.2)';
        }}
        onMouseLeave={e => { 
          e.currentTarget.style.borderColor = 'rgba(148,163,184,0.15)'; 
          e.currentTarget.style.color = '#94a3b8'; 
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

function ProjectCard({ project }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const nextSlide = () => {
    setDir(1)
    setSlideIndex(i => (i + 1) % project.slides.length)
  }
  const prevSlide = () => {
    setDir(-1)
    setSlideIndex(i => (i - 1 + project.slides.length) % project.slides.length)
  }

  return (
    <motion.div className="w-full rounded-2xl p-5"
      style={{ border: `1px solid ${S}0.12)`, backgroundColor: 'rgba(17,16,16,0.8)' }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}
    >
      <ImageCarousel images={project.images} index={project.index} />
      <div style={{ marginTop: '1rem' }}>
        <h3 className="font-display text-xl font-bold" style={{ color: '#f2f7f2' }}>{project.name}</h3>
        
        {/* Animated slides for mobile */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100px' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={slideIndex} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
              <p className="mt-1 text-sm italic" style={{ color: '#b95221' }}>{project.slides[slideIndex].tagline}</p>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{project.slides[slideIndex].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map(tag => (
            <span key={tag} style={{ borderRadius: 99, border: `1px solid ${S}0.18)`, padding: '0.15rem 0.6rem', fontSize: '0.7rem', color: '#94a3b8' }}>{tag}</span>
          ))}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.25rem', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: 99, border: `1px solid ${S}0.15)`, padding: '0.4rem 0.8rem', fontSize: '0.72rem', color: '#94a3b8', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${O}0.4)`; e.currentTarget.style.color = '#f2f7f2' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${S}0.15)`; e.currentTarget.style.color = '#94a3b8' }}
            ><GitHubIcon size={12} /> GitHub</a>

            {/* Mobile slide controls */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#b95221', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                {project.slides[slideIndex].label}
              </span>
              <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                <button 
                  onClick={prevSlide}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.2rem' }}
                >
                  <ChevronLeft size={14} />
                </button>
                
                {project.slides.map((_, i) => (
                  <button key={i}
                    onClick={() => { setDir(i > slideIndex ? 1 : -1); setSlideIndex(i) }}
                    style={{ height: '4px', borderRadius: '99px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', width: i === slideIndex ? '12px' : '4px', backgroundColor: i === slideIndex ? '#b95221' : 'rgba(148,163,184,0.2)' }}
                  />
                ))}
                
                <button 
                  onClick={nextSlide}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.2rem' }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const panelsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const observers = panelsRef.current.map((el, i) => {
      if (!el) return null
      // Trigger index shift faster when 25% enters/leaves viewport to avoid getting out of range
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveIndex(i) }, { threshold: 0.25, rootMargin: '-15% 0px -15% 0px' })
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o && o.disconnect())
  }, [])

  useEffect(() => {
    setActiveSlideIndex(0) // Reset to Overview when project changes
  }, [activeIndex])

  const active = projects[activeIndex]

  const nextSlide = () => {
    setDir(1)
    setActiveSlideIndex(i => (i + 1) % active.slides.length)
  }
  
  const prevSlide = () => {
    setDir(-1)
    setActiveSlideIndex(i => (i - 1 + active.slides.length) % active.slides.length)
  }

  return (
    <section id="projects" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Projects" title="Things I've shipped" subtitle={
          <>
            Four systems built end-to-end.{' '}
            <a 
              href="https://github.com/Er0ze-Barua" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#b95221', textDecoration: 'underline', transition: 'color 0.2s', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = '#d26027'}
              onMouseLeave={e => e.currentTarget.style.color = '#b95221'}
            >
              More on Github here
            </a>
          </>
        } />

        {/* Mobile */}
        <div className="mt-12 flex flex-col gap-8 lg:hidden">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

        {/* Desktop */}
        <div className="mt-16 hidden lg:flex gap-16">
          <div className="lg:w-1/2">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 custom-scrollbar">
              {/* Entire text block fades in/out and slides up when active project changes (Wheel Effect) */}
              <AnimatePresence mode="wait">
                <motion.div key={active.id} variants={textVariants} initial="enter" animate="center" exit="exit">
                  
                  {/* Stable Project Index and Title */}
                  <span className="block font-display text-8xl font-bold leading-none" style={{ color: `${O}0.15)` }}>{active.index}</span>
                  <h3 className="font-display text-3xl font-bold" style={{ color: '#f2f7f2' }}>{active.name}</h3>
                  
                  {/* Animated slides (tagline & body description only - slides horizontally) */}
                  <div style={{ position: 'relative', overflow: 'hidden', minHeight: '140px' }}>
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div key={activeSlideIndex} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
                        <p className="mt-3 text-base italic" style={{ color: '#b95221' }}>{active.slides[activeSlideIndex].tagline}</p>
                        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{active.slides[activeSlideIndex].body}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Stable Tech Stack */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.stack.map(tag => (
                      <span key={tag} style={{ borderRadius: 99, border: `1px solid ${S}0.2)`, padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#94a3b8' }}>{tag}</span>
                    ))}
                  </div>
                  
                  {/* Stable GitHub link */}
                  <a href={active.github} target="_blank" rel="noopener noreferrer"
                    style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: 99, border: `1px solid ${S}0.15)`, backgroundColor: `${S}0.04)`, padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${O}0.4)`; e.currentTarget.style.color = '#f2f7f2' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${S}0.15)`; e.currentTarget.style.color = '#94a3b8' }}
                  ><GitHubIcon size={13} /> View on GitHub</a>

                  {/* Slide controls centered below GitHub button - Repositioned sub-title above dots */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                    <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#b95221', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      {active.slides[activeSlideIndex].label}
                    </span>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <button 
                        onClick={prevSlide}
                        style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.3rem' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#b95221'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      
                      {active.slides.map((_, i) => (
                        <button key={i}
                          onClick={() => { setDir(i > activeSlideIndex ? 1 : -1); setActiveSlideIndex(i) }}
                          style={{ height: '6px', borderRadius: '99px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', width: i === activeSlideIndex ? '20px' : '6px', backgroundColor: i === activeSlideIndex ? '#b95221' : 'rgba(148,163,184,0.25)' }}
                        />
                      ))}
                      
                      <button 
                        onClick={nextSlide}
                        style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.3rem' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#b95221'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col lg:w-1/2">
            {projects.map((project, i) => (
              <div key={project.id} ref={el => { panelsRef.current[i] = el }} className="flex min-h-screen items-center">
                <motion.div className="w-full rounded-2xl border"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(185,82,33,0.3)', borderColor: 'rgba(185,82,33,0.45)' }}
                  style={{ 
                    borderColor: activeIndex === i ? `${O}0.25)` : `${S}0.08)`, 
                    backgroundColor: 'rgba(17,16,16,0.8)', 
                    transition: 'border-color 0.3s, background-color 0.3s',
                    position: 'relative'
                  }}>
                  <ImageCarousel images={project.images} index={project.index} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}