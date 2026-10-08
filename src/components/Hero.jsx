import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import es from '../i18n/locales/es.json'
import en from '../i18n/locales/en.json'

// Líneas del modo terminal: referencias estables (no cambian en cada render)
const TERM_LINES = { es: es.hero.term, en: en.hero.term }

function useTypewriter(lines) {
  const [display, setDisplay] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [phraseIdx, setPhraseIdx] = useState(0)

  useEffect(() => {
    const current = lines[phraseIdx]?.out || ''
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 60 + Math.random() * 50)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2600)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, 25 + Math.random() * 20)
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false)
        setPhraseIdx((p) => (p + 1) % lines.length)
      }, 300)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx, lines])

  return { display, cmd: lines[phraseIdx]?.cmd || 'whoami' }
}

// Se remonta con `key={language}` al cambiar de idioma: la máquina de escribir arranca de cero
function TermLine({ lines }) {
  const { display, cmd } = useTypewriter(lines)

  return (
    <span className="font-mono text-sm sm:text-lg text-gray-400 max-w-full px-2">
      <span style={{ color: 'var(--accent)' }}>$ {cmd}</span>{' '}
      <span className="text-gray-600">→</span>{' '}
      <span className="text-white font-semibold break-words">{display}</span>
      <span className="inline-block w-0.5 h-5 ml-0.5 align-middle" style={{
        backgroundColor: 'var(--accent)',
        boxShadow: '0 0 8px var(--accent-glow)',
        animation: 'blink 0.8s step-end infinite',
      }} />
    </span>
  )
}

function Hero() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'
  const lines = TERM_LINES[lang]
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
            {i18n.t('hero.badge')}
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
          className="min-h-8 sm:min-h-10 flex items-center justify-center mt-2 mb-8"
        >
          <TermLine lines={lines} key={lang} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {i18n.t('hero.subtitle')}
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
            <span className="relative z-10">{i18n.t('hero.cta_projects')}</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 text-sm font-medium rounded-xl border transition-all duration-300 hover:scale-105 hover:glow-box"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            {i18n.t('hero.cta_contact')}
          </a>
          {/* TODO: ruta del PDF del CV */}
          <a
            href="/cv.pdf"
            download
            className="group px-8 py-3 text-sm font-medium rounded-xl border border-dashed transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{ borderColor: '#3a3a3a', color: 'var(--accent)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {i18n.t('hero.cta_cv')}
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
