import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const icons = { Frontend: '⚛️', Backend: '⚙️', AI: '🤖', Tools: '🛠' }

function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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

        <div className="grid sm:grid-cols-2 gap-6">
          {Object.entries({
            Frontend: ["React", "Vite", "Tailwind CSS", "Responsive Design", "JavaScript"],
            Backend: ["Laravel", "PHP", "MySQL", "REST APIs"],
            AI: ["LLM APIs (OpenAI, Claude)", "Prompt Engineering", "AI Agents"],
            Tools: ["Git", "Odoo ERP", "VSCode", "Linux", "Automatización"],
          }).map(([category, items], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="gradient-border p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{icons[category] || '📦'}</span>
                <h3 className="text-white font-bold text-base">{category}</h3>
              </div>
              <div className="space-y-4">
                {items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: catIdx * 0.1 + i * 0.08 }}
                  >
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-300">{skill}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-dark-500 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${70 + Math.random() * 25}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: catIdx * 0.1 + i * 0.08, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 6px var(--accent-glow)' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
