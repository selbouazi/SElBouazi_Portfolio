import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const levelStyle = {
  solid: { className: '', style: { backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' } },
  intermediate: { className: 'bg-amber-500/10 text-amber-400', style: {} },
  learning: { className: 'bg-white/5 text-gray-400', style: {} },
}

function Skills() {
  const { t } = useTranslation()
  const categories = t('skills.categories', { returnObjects: true })
  const levels = t('skills.levels', { returnObjects: true })

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            {t('skills.heading')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: (catIdx % 3) * 0.08 }}
              className="gradient-border p-6 hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon || '📦'}</span>
                <h3 className="text-white font-bold text-base">{category.name}</h3>
              </div>

              <ul>
                {category.items.map((item) => {
                  const lv = levelStyle[item.level] || levelStyle.learning
                  return (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-gray-300 text-sm">{item.name}</span>
                      <span
                        className={`shrink-0 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${lv.className}`}
                        style={lv.style}
                      >
                        {levels[item.level] || levels.learning}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
