import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const icons = { 'Mezquita Al-Quds': '🕌', 'Synkiria Automation': '⚙️', 'Lifters': '🏋️', 'Tunely': '🎵' }

function ProjectCard({ project, index }) {
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
        <div className="text-3xl">{icons[project.name] || '📁'}</div>
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
    </motion.div>
  )
}

function Projects() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true })
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

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
