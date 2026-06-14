import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 0.9', '0.3 0.9'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative pl-10 sm:pl-12"
    >
      <motion.div
        className="absolute left-[5px] sm:left-[10px] top-1 w-3 h-3 rounded-full border-2"
        style={{
          backgroundColor: '#0a0a0a',
          borderColor: 'var(--accent)',
          boxShadow: '0 0 12px var(--accent-glow)',
        }}
        whileHover={{ scale: 1.5 }}
      />
      <div className="gradient-border p-5 sm:p-6 hover:scale-[1.01] transition-transform duration-300">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
            {item.type === 'work' ? '💼' : '🎓'} {item.period}
          </span>
          {item.type === 'work' && (
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              viewport={{ once: true }}
              className="text-[10px] px-2 py-0.5 rounded-full overflow-hidden whitespace-nowrap"
              style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
            >
              {item.location || ''}
            </motion.span>
          )}
        </div>
        <h3 className="text-white font-bold text-base mt-1">
          {item.type === 'work' ? item.role : item.degree}
        </h3>
        <p className="text-gray-500 text-sm mb-3">{item.type === 'work' ? item.company : item.institution}</p>
        {item.highlights && (
          <ul className="space-y-1.5">
            {item.highlights.map((h, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: j * 0.05 }}
                className="text-gray-400 text-xs flex items-start gap-2"
              >
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>▸</span>
                {h}
              </motion.li>
            ))}
          </ul>
        )}
        {item.details && (
          <ul className="space-y-1.5">
            {item.details.map((d, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: j * 0.05 }}
                className="text-gray-400 text-xs flex items-start gap-2"
              >
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>▸</span>
                {d}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

function Experience() {
  const { t } = useTranslation()
  const workItems = t('experience.items', { returnObjects: true })
  const educationItems = t('experience.education_items', { returnObjects: true })

  const items = [
    ...workItems.map((e) => ({ ...e, type: 'work' })),
    ...educationItems.map((e) => ({ ...e, type: 'education' })),
  ]

  return (
    <section id="experience" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            {t('experience.heading')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-[11px] sm:left-4 top-0 bottom-0 w-px"
            style={{ backgroundColor: '#2a2a2a' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <div className="space-y-10">
            {items.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
