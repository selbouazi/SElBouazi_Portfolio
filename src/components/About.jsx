import { motion } from 'framer-motion'
import profile from '../data/profile.js'

function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            ./about
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            Sobre mí
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {profile.about.map((p, i) => (
              <p key={i} className="text-gray-400 leading-relaxed text-sm sm:text-base">{p}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="gradient-border p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-white font-semibold text-sm">AI & Automation</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Mi enfoque principal ahora mismo. Construyo sistemas con LLMs (OpenAI, Claude),
                diseño agentes de IA y automatizo workflows con Odoo y REST APIs.
              </p>
              <div className="flex flex-wrap gap-2">
                {['LLM APIs', 'Prompt Engineering', 'AI Agents', 'Odoo', 'REST APIs', 'Automation'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 gradient-border p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-white font-semibold text-sm">Stack principal</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Laravel', 'React', 'MySQL', 'Vite', 'Tailwind', 'Git'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 gradient-border p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-white font-semibold text-sm">Open to work</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Busco rol Junior donde pueda aportar desde el día 1 y crecer rodeado de
                gente que se toma en serio su oficio.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
