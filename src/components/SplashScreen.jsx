import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PATHS = [
  "M 105.4 49.1 Q 114.2 46.9 117.7 43.8 Q 121.2 40.7 121.2 39.8 Q 121.2 38.9 119.6 38.1 Q 118.0 37.4 111.7 39.0 Q 105.4 40.7 96.8 45.1 Q 88.1 49.5 80.2 55.9 Q 72.3 62.3 72.3 64.0 Q 72.3 65.6 74.6 66.7 Q 76.9 67.8 87.0 66.7 Q 97.0 65.6 96.3 66.9 Q 95.6 68.2 87.7 74.1 Q 79.7 79.9 76.5 83.4 Q 73.2 86.9 70.4 91.8 Q 67.6 96.8 68.1 100.7 Q 68.5 104.5 69.9 105.8 Q 71.3 107.1 74.1 108.0 Q 76.9 108.9 83.0 108.7 Q 89.1 108.5 92.6 107.6 Q 96.1 106.7 108.0 101.2 Q 119.8 95.7 124.0 93.0 Q 128.2 90.2 132.7 86.2 Q 137.1 82.1 136.4 80.7 Q 135.7 79.2 136.2 73.5 Q 136.6 67.8 138.7 61.4 Q 140.8 55.0 142.7 51.7 Q 144.6 48.4 146.4 47.1 Q 148.3 45.8 148.1 40.5 L 147.8 35.2",
  "M 80.0 68.0 Q 89.0 66.5 97.5 65.3 Q 110.5 60.1 111.5 60.3 L 112.4 60.5",
  "M 138.0 81.0 Q 141.8 77.0 143.4 72.8 Q 145.0 68.6 146.7 57.9 L 148.3 47.3",
  "M 143.2 91.3 Q 145.0 95.0 149.5 95.3 Q 153.9 95.7 161.1 93.3 Q 168.3 90.9 172.5 88.6 Q 176.7 86.2 180.5 83.4 Q 184.2 80.7 187.2 77.4 Q 190.3 74.1 192.1 70.2 Q 194.0 66.4 193.8 63.4 L 193.5 60.5",
  "M 145.0 88.7 Q 148.3 84.3 154.4 79.8 Q 160.4 75.2 169.5 70.4 Q 178.6 65.6 185.6 62.9 L 192.6 60.1",
  "M 149.2 39.6 Q 160.9 31.2 163.9 29.7 Q 166.9 28.2 170.2 27.9 Q 173.5 27.5 175.1 29.1 Q 176.7 30.8 176.5 33.4 Q 176.3 35.9 174.2 39.2 Q 172.1 42.5 168.3 46.0 Q 164.6 49.5 163.9 51.0 Q 163.2 52.4 159.5 54.3 L 155.8 56.1",
  "M 163.7 52.8 Q 175.8 51.3 179.1 51.7 Q 182.3 52.1 185.4 53.2 Q 188.4 54.3 190.3 55.9 Q 192.1 57.6 192.6 58.9 Q 193.1 60.1 199.4 58.1 Q 205.6 56.1 207.7 56.1 Q 209.8 56.1 213.3 54.3 Q 216.8 52.4 219.4 52.8 L 222.0 53.2",
  "M 182.3 101.2 Q 196.3 93.1 211.7 86.7 Q 227.1 80.3 240.4 75.5 Q 253.7 70.8 269.8 66.2 L 285.9 61.6",
  "M 191.7 96.8 L 196.3 97.2",
  "M 208.9 56.5 Q 205.6 63.1 206.1 65.1 Q 206.6 67.1 208.4 67.1 Q 210.3 67.1 213.3 64.0 Q 216.4 60.9 218.0 60.1 Q 219.6 59.4 220.3 60.7 Q 221.0 62.0 222.9 62.7 Q 224.8 63.4 228.7 60.0 Q 232.7 56.5 234.1 53.7 Q 235.5 51.0 235.3 49.5 L 235.0 48.0",
  "M 220.1 58.3 L 221.0 53.9",
  "M 236.0 51.0 Q 241.1 51.7 241.3 54.8 Q 241.6 57.9 243.2 58.5 Q 244.8 59.0 249.9 55.2 Q 255.1 51.3 255.8 49.0 L 256.5 46.6",
  "M 254.6 52.1 Q 256.9 55.0 259.3 54.6 Q 261.6 54.3 264.9 51.9 Q 268.1 49.5 268.6 46.8 L 269.1 44.0",
  "M 268.6 49.9 Q 270.5 52.1 272.3 51.9 Q 274.2 51.7 277.5 49.7 Q 280.7 47.7 281.9 48.8 Q 283.1 49.9 284.2 49.9 Q 285.4 49.9 289.1 47.1 Q 292.8 44.4 295.2 46.2 Q 297.5 48.0 302.2 48.4 Q 306.8 48.8 313.4 46.6 Q 319.9 44.4 322.2 42.7 Q 324.6 41.1 325.3 41.8 L 326.0 42.5",
  "M 282.6 45.5 Q 285.9 41.1 287.7 40.2 Q 289.6 39.2 291.5 40.2 Q 293.3 41.1 293.3 42.5 L 293.3 44.0",
  "M 285.9 60.9 Q 303.1 57.6 305.0 56.7 Q 306.8 55.7 313.4 55.0 Q 319.9 54.3 320.4 53.7 Q 320.8 53.2 335.5 51.7 L 350.2 50.2",
  "M 304.5 57.6 L 308.7 56.5",
  "M 330.2 34.1 Q 333.9 34.8 333.7 36.3 Q 333.4 37.8 332.5 38.5 L 331.6 39.2",
]

const DELAYS =    [0.0,   0.491, 0.521, 0.597, 0.722, 0.812, 0.925, 1.033, 1.224, 1.254, 1.353, 1.383, 1.443, 1.484, 1.592, 1.622, 1.735, 1.765]
const DURATIONS = [0.578, 0.035, 0.089, 0.147, 0.105, 0.133, 0.126, 0.225, 0.035, 0.117, 0.035, 0.070, 0.049, 0.126, 0.035, 0.133, 0.035, 0.035]

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('portrait')
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (skipped) return
    const t1 = setTimeout(() => setPhase('signature'), 800)
    const t2 = setTimeout(() => setPhase('dissolve'), 3100)
    const t3 = setTimeout(() => { setPhase('done'); onComplete() }, 3900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [skipped])

  const skip = () => { setSkipped(true); setPhase('done'); onComplete() }

  if (phase === 'done') return null

  const sigVisible = phase === 'signature' || phase === 'dissolve'

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={skip}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          backgroundColor: '#0a0a0a',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', userSelect: 'none',
        }}
      >
        {/* Portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={phase === 'dissolve'
            ? { opacity: 0.06, scale: 1.08, filter: 'blur(2px)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: phase === 'dissolve' ? 0.7 : 0.6, ease: 'easeInOut' }}
          style={{
            width: '180px', height: '220px', borderRadius: '12px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}portrait.png`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }}
          />
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sigVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginTop: '1.5rem', width: '320px', height: '98px' }}
        >
          <svg viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            {PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={sigVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: DURATIONS[i], ease: 'easeInOut', delay: DELAYS[i] }}
              />
            ))}
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          style={{ position: 'absolute', bottom: '2rem', fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '0.1em' }}
        >
          click to skip
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}