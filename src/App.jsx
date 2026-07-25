import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeroScrollProvider } from './context/HeroScrollContext'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import Hero from './components/Hero'
import BehindTheCurtains from './components/BehindTheCurtains'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contributions from './components/Contributions'
import Certificates from './components/Certificates'
import Contact from './components/Contact'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <HeroScrollProvider>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={splashDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#080808', color: '#f2f7f2' }}
      >
        {/* Portrait watermark — fixed behind Hero, covered by curtain on scroll */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            height: '100vh', zIndex: 0,
            pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyNavigation: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}portrait.png`}
            style={{
              width: 'min(320px, 80vw)', height: 'auto',
              aspectRatio: '320 / 400',
              objectFit: 'cover',
              filter: 'grayscale(1)',
              /* --- THE VISIBILITY BALANCING FIXES --- */
              opacity: 0.22,             /* Bumped up from 0.07 so it's beautifully visible */
              mixBlendMode: 'screen',    /* Erases the hard boundary box borders instantly */
              borderRadius: '12px',
            }}
          />
        </div>

        {/* Curtain — rises on scroll to cover watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '100vh',
            left: 0, right: 0, bottom: 0,
            zIndex: 1,
            backgroundColor: '#080808',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <Navbar />
          <main>
            {/* Make sure you revert Hero component back to its original state without the extra img tag */}
            <Hero splashDone={splashDone} />
            <BehindTheCurtains />
            <Experience />
            <Projects />
            <Skills />
            <Contributions />
            <Certificates />
            <Contact />
          </main>
        </div>
      </motion.div>
    </HeroScrollProvider>
  )
}