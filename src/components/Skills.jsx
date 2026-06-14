import { motion } from 'framer-motion'

const progressMap = {
  Frontend: ['React', 'Vite', 'Tailwind CSS', 'Responsive Design', 'JavaScript'],
  Backend: ['Laravel', 'PHP', 'MySQL', 'REST APIs'],
  AI: ['LLM APIs (OpenAI, Claude)', 'Prompt Engineering', 'AI Agents'],
  Tools: ['Git', 'Odoo ERP', 'VSCode', 'Linux'],
}

const skillLevels = {
  'React': 88, 'Vite': 85, 'Tailwind CSS': 82, 'Responsive Design': 80, 'JavaScript': 85,
  'Laravel': 85, 'PHP': 80, 'MySQL': 78, 'REST APIs': 82,
  'LLM APIs (OpenAI, Claude)': 75, 'Prompt Engineering': 78, 'AI Agents': 70,
  'Git': 85, 'Odoo ERP': 72, 'VSCode': 90, 'Linux': 75,
}

const icons = { Frontend: '⚛️', Backend: '⚙️', AI: '🤖', Tools: '🛠' }

function CircularProgress({ value, label, delay }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-1.5"
    >
      <svg width="68" height="68" className="transform -rotate-90">
        <circle cx="34" cy="34" r={radius} fill="none" stroke="#222" strokeWidth="4" />
        <motion.circle
          cx="34" cy="34" r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 4px var(--accent-glow))' }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
        className="text-[10px] font-mono"
        style={{ color: 'var(--accent)' }}
      >
        {value}%
      </motion.span>
      <span className="text-[11px] text-gray-400 text-center leading-tight max-w-[80px]">{label}</span>
    </motion.div>
  )
}

function Skills() {
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
            ./skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            Skills
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {Object.entries(progressMap).map(([category, skills], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="gradient-border p-6 sm:p-8 hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{icons[category] || '📦'}</span>
                <h3 className="text-white font-bold text-base">{category}</h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                {skills.map((skill, i) => (
                  <CircularProgress
                    key={skill}
                    label={skill}
                    value={skillLevels[skill] || 75}
                    delay={catIdx * 0.1 + i * 0.05}
                  />
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
