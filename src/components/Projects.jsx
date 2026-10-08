import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import systemsProjects from '../data/systemsProjects.js'

const icons = { 'Mezquita Al-Quds': '🕌', 'Synkiria, automatización e integraciones ERP': '⚙️', 'Synkiria, automation and ERP integrations': '⚙️', 'Lifters': '🏋️', 'Tunely': '🎵' }

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }} />
      <h3 className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{text}</h3>
      <span className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}

function ProjectCard({ project }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.2 1'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="gradient-border p-6 sm:p-8 group cursor-default hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{project.icon || icons[project.name] || '📁'}</div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-xs">🔗</a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-xs">💻</a>
          )}
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:glow transition-all duration-300" style={{ color: 'var(--accent)' }}>
        {project.name}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
      {project.stack?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.1 }}
              className="text-xs px-2 py-1 rounded cursor-default"
              style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      )}
      {project.highlights?.length > 0 && (
        <ul className="space-y-1.5">
          {project.highlights.map((h, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: j * 0.05 }}
              className="text-gray-500 text-xs flex items-start gap-2"
            >
              <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>▸</span>
              {h}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'

  // Bloque A: solo se publican las tarjetas con enabled: true
  const systems = systemsProjects
    .filter((p) => p.enabled)
    .map((p) => ({ id: p.id, icon: p.icon, url: p.url, github: p.github, ...(p[lang] || p.es) }))

  const devItems = t('projects.dev_items', { returnObjects: true })
  const others = t('projects.others', { returnObjects: true })

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['0 0.8', '0.2 0'],
  })
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="projects" ref={sectionRef} className="py-24 sm:py-32 relative">
      <div
        className="absolute top-0 left-0 h-0.5"
        style={{ width: progress, backgroundColor: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' }}
      />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            {t('projects.heading')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            {t('projects.title')}
          </h2>
        </motion.div>

        {/* Bloque A — Sistemas y redes */}
        <div className="mb-16">
          <SectionLabel text={t('projects.systems_title')} />
          {systems.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {systems.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="gradient-border p-6 sm:p-8 flex items-center gap-4">
              <span className="font-mono text-xl" style={{ color: 'var(--accent)' }}>$</span>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('projects.systems_empty')}
              </p>
            </div>
          )}
        </div>

        {/* Bloque B — Base de desarrollo */}
        <div>
          <SectionLabel text={t('projects.dev_heading')} />
          <p className="text-gray-500 text-sm mb-6 -mt-2">{t('projects.dev_intro')}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {devItems.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="gradient-border p-6 sm:p-8"
            >
              <div className="text-3xl mb-4">📁</div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent)' }}>
                {t('projects.others_title')}
              </h3>
              <ul className="space-y-3">
                {others.map((o) => (
                  <li key={o.name} className="text-sm">
                    <span className="text-white font-medium">{icons[o.name] || '▸'} {o.name}</span>
                    <span className="block text-gray-500 text-xs leading-relaxed mt-0.5">{o.description}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
