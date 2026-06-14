import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const phrases = [
  'Laravel + React',
  'AI Agents & Automation',
  'LLMs en producción',
  'Sistemas con IA integrada',
  'Odoo + REST APIs',
]

function useTypewriter() {
  const [display, setDisplay] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 80 + Math.random() * 50)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, 30 + Math.random() * 20)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx((p) => (p + 1) % phrases.length)
      timeout = setTimeout(() => {}, 300)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  return display
}

function Hero() {
  const typeText = useTypewriter()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div
        className="absolute inset-0 opacity-[0.04] transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,255,65,0.3) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block text-xs font-mono tracking-widest uppercase mb-6 px-5 py-2 rounded-full backdrop-blur-sm"
            style={{
              color: 'var(--accent)',
              backgroundColor: 'var(--accent-dim)',
              border: '1px solid',
              borderColor: 'var(--accent-glow)',
              boxShadow: '0 0 20px var(--accent-dim)',
            }}
          >
            Full Stack Developer — AI & Automation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight mb-4"
        >
          Soulaimane
          <br />
          <span
            className="glow inline-block mt-1"
            style={{
              color: 'var(--accent)',
              textShadow: '0 0 40px var(--accent-glow), 0 0 80px var(--accent-dim)',
            }}
          >
            El Bouazi
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-8 sm:h-10 flex items-center justify-center mt-2 mb-8"
        >
          <span className="font-mono text-base sm:text-lg text-gray-400">
            <span style={{ color: 'var(--accent)' }}>$</span> cat skills.txt | grep —{' '}
            <span className="text-white font-semibold">{typeText}</span>
            <span className="inline-block w-0.5 h-5 ml-0.5 align-middle" style={{
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 8px var(--accent-glow)',
              animation: 'blink 0.8s step-end infinite',
            }} />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Laravel + React. Construyo aplicaciones web reales y sistemas con IA integrada.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
          >
            <span className="relative z-10">Ver proyectos</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 text-sm font-medium rounded-xl border transition-all duration-300 hover:scale-105 hover:glow-box"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Contactar
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-5 h-5 mx-auto opacity-40" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
