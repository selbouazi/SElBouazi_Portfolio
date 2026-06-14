import { motion } from 'framer-motion'

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block text-xs font-mono tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
            style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-dim)', border: '1px solid', borderColor: 'var(--accent-glow)' }}
          >
            Full Stack Developer — AI & Automation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Soulaimane
          <br />
          <span className="glow" style={{ color: 'var(--accent)' }}>El Bouazi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Laravel + React. Construyo aplicaciones web reales y sistemas con IA integrada.
          De Junior, pero con proyectos en producción.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 glow-box"
            style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            className="px-8 py-3 text-sm font-medium rounded-xl border transition-all duration-300 hover:scale-105"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Contactar
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20"
        >
          <div className="animate-bounce">
            <svg className="w-5 h-5 mx-auto opacity-40" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
