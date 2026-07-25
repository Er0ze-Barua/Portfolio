import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { experience } from '../data/content'

const realEntries = experience

function ExperienceCard({ entry, index, isActive }) {
  const isLeft = index % 2 === 0
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full lg:w-[45%]"
      >
        <motion.article
          animate={isActive
            ? {
                scale: 1.03,
                borderColor: 'rgba(185,82,33,0.55)',
                backgroundColor: 'rgba(17,16,16,0.95)',
                boxShadow: '0 0 32px 4px rgba(185,82,33,0.12), inset 0 0 60px 0px rgba(148,163,184,0.03)',
              }
            : {
                scale: 1,
                borderColor: 'rgba(148,163,184,0.15)',
                backgroundColor: 'rgba(17,16,16,0.8)',
                boxShadow: '0 0 0px 0px rgba(185,82,33,0)',
              }
          }
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          style={{ borderRadius: '16px', border: '1px solid rgba(148,163,184,0.15)', backgroundColor: 'rgba(17,16,16,0.8)', padding: '1.75rem' }}
        >
          {/* Period — silver */}
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '0.5rem' }}>{entry.period}</p>

          {/* Role — mint white, bold */}
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f2f7f2', fontFamily: 'Syne, sans-serif', margin: '0 0 0.25rem' }}>{entry.role}</h3>

          {/* Company — orange */}
          <p style={{ fontSize: '0.82rem', color: '#b95221', marginBottom: '1rem' }}>{entry.company}</p>

          <div style={{ height: 1, backgroundColor: 'rgba(148,163,184,0.1)', marginBottom: '1rem' }} />

          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {entry.highlights.map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.82rem', color: 'rgba(242,247,242,0.65)', lineHeight: 1.55 }}>
                {/* Silver dot bullet */}
                <span style={{ marginTop: '0.45rem', width: 4, height: 4, borderRadius: '50%', backgroundColor: '#94a3b8', flexShrink: 0, opacity: 0.6 }} />
                {point}
              </li>
            ))}
          </ul>
        </motion.article>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [lineHeight, setLineHeight] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  const rawDotY = useTransform(scrollYProgress, [0, 1], [0, lineHeight])
  const smoothDotY = useSpring(rawDotY, { stiffness: 80, damping: 18, restDelta: 0.5 })

  useEffect(() => {
    const measure = () => { if (lineRef.current) setLineHeight(lineRef.current.offsetHeight) }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', () => {
      const mid = window.innerHeight * 0.5
      let found = -1
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (Math.abs((rect.top + rect.height / 2) - mid) < rect.height * 0.55) found = i
      })
      setActiveIndex(found)
    })
    return () => unsub()
  }, [scrollYProgress])

  return (
    <section id="experience" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl" ref={sectionRef}>
        <SectionHeader eyebrow="Experience" title="Where I've built" subtitle="A timeline of roles and the systems I've shipped." />

        <div className="relative mt-16">
          {/* Timeline line — silver tint */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 lg:block"
            style={{ width: 1, backgroundColor: 'rgba(148,163,184,0.12)' }}
            aria-hidden="true"
          />

          {/* Glowing dot — stays orange, it's the focal point */}
          <motion.div
            className="absolute left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{ top: smoothDotY }}
          >
            <div className="h-3 w-3 rounded-full bg-[#b95221] shadow-[0_0_14px_5px_rgba(185,82,33,0.65)]" />
          </motion.div>

          <div className="flex flex-col gap-16">
            {realEntries.map((entry, index) => (
              <div key={entry.id} ref={(el) => (cardRefs.current[index] = el)}>
                <ExperienceCard entry={entry} index={index} isActive={activeIndex === index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}