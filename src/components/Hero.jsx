import { motion, useTransform } from 'framer-motion'
import { personal } from '../data/personal'
import { useHeroScroll } from '../context/HeroScrollContext'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Hero({ splashDone = false }) {
  const { containerRef, scrollYProgress } = useHeroScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.45], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.45], [1, 0.96])
  const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.4 ? 'none' : 'auto'))
  const cornersOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section id="hero" ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 z-30 h-svh w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full blur-[140px]" style={{ backgroundColor: 'rgba(185,82,33,0.1)' }} />
          <div className="absolute -right-40 bottom-1/3 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(185,82,33,0.06)' }} />
        </div>

        {/* --- TOP LEFT CORNER: Identity --- */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={splashDone ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-6 top-6 z-10">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em]" style={{ color: '#94a3b8' }}>
            <span className="font-display font-bold" style={{ color: '#f2f7f2' }}>EB</span>
            <span className="h-4 w-px" style={{ backgroundColor: 'rgba(148,163,184,0.2)' }} />
            <span>Software Engineer · Backend & AI</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)]" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-green-400">Open to work</span>
          </div>
        </motion.div>

        {/* --- CENTER STACK --- */}
        <motion.div style={{ opacity, y, scale, pointerEvents }} className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div className="mx-auto w-full max-w-4xl" variants={containerVariants} initial="hidden" animate={splashDone ? 'visible' : 'hidden'}>
            
            {/* Line 1: Orange Eyebrow */}
            <motion.p variants={itemVariants} className="mb-4 text-sm font-medium uppercase tracking-[0.25em]" style={{ color: '#b95221' }}>
              Software Engineer · Backend & AI
            </motion.p>
            
            {/* Line 2: Main Display Name */}
            <motion.h1 variants={itemVariants} className="font-display font-bold leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(5rem,12vw,10rem)', color: '#f2f7f2' }}>
              {personal.firstName}
            </motion.h1>
            
            {/* Line 3: Signature Slogan */}
            <motion.p variants={itemVariants} className="mx-auto mt-5 max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: '#f2f7f2' }}>
              Building <em style={{ fontStyle: 'italic', color: '#b95221' }}>backend systems</em> that think
            </motion.p>
            
            {/* Line 4: Sleek Dilation into exactly 2 lines & generic complex problems for CP inclusion */}
            <motion.p variants={itemVariants} className="mx-auto mt-4 max-w-3xl text-base sm:text-lg opacity-85" style={{ color: '#94a3b8', lineHeight: 1.6 }}>
              Crafting backend logic, serving custom AI models, and solving complex problems at odd hours—because if it runs perfectly on the first try, something is definitely wrong.
            </motion.p>
            
          </motion.div>
        </motion.div>

        {/* --- BOTTOM LEFT CORNER: Location with Aquatic Hover & Map Query --- */}
        <motion.a 
          href="https://www.google.com/maps/search/?api=1&query=Guwahati+Assam+India"
          target="_blank"
          rel="noopener noreferrer"
          style={{ opacity: cornersOpacity }} 
          className="absolute bottom-8 left-6 z-10 group block transition-colors duration-300"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#94a3b8]">Based in</p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em] text-[#f2f7f2] transition-colors duration-300 group-hover:text-[#38bdf8] group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
            Guwahati, India
          </p>
        </motion.a>

        {/* --- BOTTOM RIGHT CORNER: Core Focus --- */}
        <motion.div style={{ opacity: cornersOpacity }} className="absolute bottom-8 right-6 z-10 text-right">
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: '#94a3b8' }}>Core Focus</p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em]" style={{ color: '#b95221' }}>Models & Architecture</p>
        </motion.div>
      </div>
    </section>
  )
}