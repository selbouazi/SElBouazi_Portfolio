import { motion } from 'framer-motion'
import profile from '../data/profile.js'

function Experience() {
  const items = [
    ...profile.experience.map((e) => ({ ...e, type: 'work' })),
    ...profile.education.map((e) => ({ ...e, type: 'education' })),
  ]

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            ./experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            Experiencia & Educación
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[11px] sm:left-4 top-0 bottom-0 w-px bg-dark-500" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-10 sm:pl-12"
              >
                <div
                  className="absolute left-[5px] sm:left-[10px] top-1 w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: '#0a0a0a',
                    borderColor: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent-glow)',
                  }}
                />
                <div className="gradient-border p-5 sm:p-6">
                  <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                    {item.type === 'work' ? '💼' : '🎓'} {item.period}
                  </span>
                  <h3 className="text-white font-bold text-base mt-1">
                    {item.type === 'work' ? item.role : item.degree}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{item.type === 'work' ? item.company : item.institution}</p>
                  {item.type === 'work' && item.highlights && (
                    <ul className="space-y-1.5">
                      {item.highlights.map((h, j) => (
                        <li key={j} className="text-gray-400 text-xs flex items-start gap-2">
                          <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.type === 'education' && item.details && (
                    <ul className="space-y-1.5">
                      {item.details.map((d, j) => (
                        <li key={j} className="text-gray-400 text-xs flex items-start gap-2">
                          <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
