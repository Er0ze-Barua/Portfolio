import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollFadeSection({ id, children, className = '', as: Component = 'section' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -40])
  return (
    <Component id={id} ref={ref} className={className}>
      <motion.div style={{ opacity, y }}>{children}</motion.div>
    </Component>
  )
}