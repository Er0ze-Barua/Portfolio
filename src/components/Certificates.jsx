import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'

const certs = [
  {
    id: 1,
    name: 'Oracle OCI Generative AI Professional',
    issuer: 'Oracle',
    date: '2025',
    initials: 'GA',
    points: [
      'OCI Generative AI services, fine-tuning, and deployment orchestration',
      'Integration of LLMs and embedding models on Oracle Cloud Infrastructure',
      'Building RAG applications and agentic workflows'
    ],
    link: '/certificates/OCI25GAIOCP.jpg',
    img: '/certificates/OCI25GAIOCP.jpg'
  },
  {
    id: 2,
    name: 'Oracle OCI Data Science Professional',
    issuer: 'Oracle',
    date: '2025',
    initials: 'DS',
    points: [
      'Designing and implementing ML pipelines on OCI Data Science',
      'Model training, evaluation, tracking, and deployment lifecycle',
      'Feature engineering, dataset preparation, and exploratory data analysis'
    ],
    link: '/certificates/OCI25DSOCP.jpg',
    img: '/certificates/OCI25DSOCP.jpg'
  },
  {
    id: 3,
    name: 'IBM SkillsBuild Certificate',
    issuer: 'IBM',
    date: '2025',
    initials: 'IB',
    points: [
      'Skills build pathway on enterprise technologies and IT fundamentals',
      'Hands-on projects and assessments verifying core technical capabilities',
      'Understanding of modern software development and platform tools'
    ],
    link: '#',
    img: null
  },
  {
    id: 4,
    name: 'Career Essentials in Generative AI',
    issuer: 'Microsoft × LinkedIn',
    date: '2026',
    initials: 'CE',
    points: [
      'Core concepts of generative AI, large language models, and search engines',
      'Ethics and responsible AI implementation in enterprise settings',
      'Practical applications of productivity tools and modern AI assistants'
    ],
    link: '/certificates/CertificateOfCompletion_Career Essentials in Generative AI by Microsoft and LinkedIn.pdf',
    img: null
  },
  {
    id: 5,
    name: 'LLM Course - Chapter 1',
    issuer: 'Hugging Face',
    date: '2025',
    initials: 'LLM',
    points: [
      'Introduction to large language models and the Hugging Face ecosystem',
      'Working with pipelines, tokenizers, and model architectures',
      'Fine-tuning models on custom datasets and sharing on the Hub'
    ],
    link: '#',
    img: null
  },
  {
    id: 6,
    name: 'AI Agents Course - Unit 1',
    issuer: 'Hugging Face',
    date: '2025',
    initials: 'AG',
    points: [
      'Foundations of AI Agents, decision-making loops, and environment interaction',
      'Implementing basic agent architectures using transformers and tools',
      'Evaluation of agent behaviors and performance on benchmark tasks'
    ],
    link: '#',
    img: null
  }
]
const belt = [...certs, ...certs, ...certs]

const apparitionVariants = {
  initial: { opacity: 0, scaleX: 0.05, scaleY: 1.6, filter: 'blur(18px) brightness(2.5)' },
  animate: { opacity: 1, scaleX: 1, scaleY: 1, filter: 'blur(0px) brightness(1)', transition: { duration: 0.55, ease: [0.22, 1.4, 0.36, 1], opacity: { duration: 0.18 }, filter: { duration: 0.4 } } },
  exit: { opacity: 0, scaleX: 0.05, scaleY: 1.4, filter: 'blur(14px) brightness(2)', transition: { duration: 0.3, ease: [0.6, 0, 0.8, 0] } },
}

function CertModal({ active, onClose }) {
  if (!active) return null
  return createPortal(
    <AnimatePresence>
      <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 9998, backgroundColor: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} />
      <motion.div key={active.id} variants={apparitionVariants} initial="initial" animate="animate" exit="exit"
        style={{ position: 'fixed', top: '50%', left: '50%', translate: '-50% -50%', zIndex: 9999, width: 'min(90vw, 640px)', backgroundColor: 'rgba(17,16,16,0.98)', border: '1px solid rgba(148,163,184,0.18)', boxShadow: '0 0 60px 8px rgba(185,82,33,0.12)', borderRadius: '20px', overflow: 'hidden', transformOrigin: 'center center' }}
      >
        {/* Image area */}
        <div style={{ width: '100%', height: '200px', backgroundColor: 'rgba(148,163,184,0.04)', borderBottom: '1px solid rgba(148,163,184,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {active.img ? (
            <img src={active.img} alt={active.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', opacity: 0.3 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: 'rgba(185,82,33,0.2)', border: '1px solid rgba(185,82,33,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b95221' }}>{active.initials}</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '0.12em' }}>CERTIFICATE IMAGE</span>
            </div>
          )}
        </div>
        <div style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f2f7f2', lineHeight: 1.3 }}>{active.name}</div>
              {/* issuer+date — silver */}
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 4 }}>{active.issuer} · {active.date}</div>
            </div>
            <motion.button onClick={onClose} whileHover={{ backgroundColor: 'rgba(220,38,38,0.3)', borderColor: 'rgba(220,38,38,0.6)', color: '#fff' }} transition={{ duration: 0.15 }}
              style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', border: '1px solid rgba(148,163,184,0.2)', backgroundColor: 'rgba(148,163,184,0.05)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', lineHeight: 1, flexShrink: 0, marginLeft: '0.75rem' }}>×</motion.button>
          </div>
          <div style={{ height: 1, backgroundColor: 'rgba(148,163,184,0.12)', marginBottom: '1.25rem' }} />
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {active.points.map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(242,247,242,0.7)', lineHeight: 1.5 }}>
                <span style={{ color: '#b95221', marginTop: 3, flexShrink: 0 }}>◆</span>{p}
              </li>
            ))}
          </ul>
          <a href={active.link} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: 99, border: '1px solid rgba(185,82,33,0.4)', backgroundColor: 'rgba(185,82,33,0.08)', padding: '0.5rem 1.1rem', fontSize: '0.75rem', color: '#b95221', textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(185,82,33,0.2)'; e.currentTarget.style.borderColor = 'rgba(185,82,33,0.65)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(185,82,33,0.08)'; e.currentTarget.style.borderColor = 'rgba(185,82,33,0.4)' }}
          >View Certificate →</a>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default function Certificates() {
  const [active, setActive] = useState(null)
  const [paused, setPaused] = useState(false)

  return (
    <section id="certificates" className="py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow="Certificates" title="What I've earned" subtitle="Credentials from across the industry." />
      </div>
      <div className="relative mt-14" style={{ overflowX: 'clip', overflowY: 'visible', paddingBlock: '1.5rem' }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32" style={{ background: 'linear-gradient(to right, #080808 20%, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32" style={{ background: 'linear-gradient(to left, #080808 20%, transparent)' }} />
        <div style={{ display: 'flex', gap: '1.25rem', width: 'max-content', animationName: 'marquee', animationDuration: '35s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', animationPlayState: paused ? 'paused' : 'running' }}>
          {belt.map((cert, i) => (
            <motion.button key={`${cert.id}-${i}`} onClick={() => setActive(cert)}
              whileHover={{ scale: 1.08, boxShadow: '0 0 24px 4px rgba(185,82,33,0.3)', borderColor: 'rgba(185,82,33,0.5)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ flexShrink: 0, width: '160px', borderRadius: '14px', border: '1px solid rgba(148,163,184,0.12)', backgroundColor: 'rgba(17,16,16,0.8)', padding: '1.5rem 1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 1 }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(185,82,33,0.15)', border: '1px solid rgba(185,82,33,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b95221', letterSpacing: '0.04em' }}>{cert.initials}</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#f2f7f2', textAlign: 'center', lineHeight: 1.5 }}>{cert.name}</div>
              {/* issuer — silver */}
              <div style={{ fontSize: '0.6rem', color: '#94a3b8', letterSpacing: '0.06em' }}>{cert.issuer}</div>
            </motion.button>
          ))}
        </div>
      </div>
      <CertModal active={active} onClose={() => setActive(null)} />
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </section>
  )
}