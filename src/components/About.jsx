import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function CardShell({ children, delay = 0.1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

function About() {
  const { t } = useTranslation()

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
            {t('about.heading')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            {t('about.title')}
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
            {t('about.paragraphs', { returnObjects: true }).map((p, i) => (
              <p key={i} className="text-gray-400 leading-relaxed text-sm sm:text-base">{p}</p>
            ))}
          </motion.div>

          <div className="space-y-6">
            <CardShell>
              <div className="gradient-border p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  <span className="text-white font-semibold text-sm">{t('about.facts_title')}</span>
                </div>
                <dl className="space-y-2">
                  {t('about.facts', { returnObjects: true }).map((f) => (
                    <div key={f.label} className="flex items-center justify-between gap-4 text-sm">
                      <dt className="text-gray-500">{f.label}</dt>
                      <dd className="font-mono text-right" style={{ color: 'var(--accent)' }}>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </CardShell>

            <CardShell delay={0.18}>
              <div className="gradient-border p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  <span className="text-white font-semibold text-sm">{t('about.card_sys_title')}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {t('about.card_sys_text')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t('about.card_sys_tags', { returnObjects: true }).map((tag) => (
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
            </CardShell>

            <CardShell delay={0.26}>
              <div className="gradient-border p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  <span className="text-white font-semibold text-sm">{t('about.card_stack_title')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t('about.card_stack_tags', { returnObjects: true }).map((tag) => (
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
            </CardShell>

            <CardShell delay={0.34}>
              <div className="gradient-border p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  <span className="text-white font-semibold text-sm">{t('about.card_work_title')}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('about.card_work_text')}
                </p>
              </div>
            </CardShell>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
