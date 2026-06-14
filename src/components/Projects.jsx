import { motion } from 'framer-motion'
import profile from '../data/profile.js'

const projectIcons = {
  'Mezquita Al-Quds': '🕌',
  'Synkiria Automation': '⚙️',
  'Lifters': '🏋️',
  'Tunely': '🎵',
}

function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            ./projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            Proyectos
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {profile.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="gradient-border p-6 sm:p-8 group cursor-default hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="text-3xl mb-4">{projectIcons[project.name] || '📁'}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:glow transition-all duration-300" style={{ color: 'var(--accent)' }}>
                {project.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-1.5">
                {project.highlights.map((h, j) => (
                  <li key={j} className="text-gray-500 text-xs flex items-start gap-2">
                    <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
