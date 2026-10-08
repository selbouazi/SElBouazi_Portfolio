import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

/** Panel de parcheo: 3 segmentos por tecnología + texto del nivel (accesibilidad). */
function LevelMeter({ level, label }) {
  const filled = level === 'solid' ? 3 : level === 'intermediate' ? 2 : 1
  return (
    <span className="flex items-center gap-2 shrink-0">
      <span className="flex gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`block w-2.5 h-[7px] rounded-[1px] ${
              i < filled ? 'bg-signal' : 'bg-ink/15'
            }`}
          />
        ))}
      </span>
      <span className="mono text-[10px] uppercase tracking-[0.1em] text-slate w-[94px] text-right">
        {label}
      </span>
    </span>
  )
}

function Skills() {
  const { t } = useTranslation()
  const categories = t('skills.categories', { returnObjects: true })
  const levels = t('skills.levels', { returnObjects: true })

  return (
    <section id="skills" className="scroll-mt-16 border-b border-rule py-20 md:py-28">
      <div className="page">
        <SectionHead num="03" title={t('skills.title')} />

        <Reveal className="mt-12">
          <div className="grid gap-px bg-rule border border-rule sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, i) => (
              <div key={category.name} className="bg-paper p-5 md:p-6">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-rule">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="mono text-[11px] tracking-[0.14em] text-signal-ink">
                      {`P-0${i + 1}`}
                    </span>
                    <span className="label text-ink truncate">{category.name}</span>
                  </div>
                  <span className="mono text-[11px] text-slate">{category.items.length}</span>
                </div>

                <ul>
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 py-2.5 border-b border-rule-soft last:border-b-0"
                    >
                      <span className="text-[13px] text-ink flex-1 min-w-0 leading-snug">
                        {item.name}
                      </span>
                      <LevelMeter level={item.level} label={levels[item.level] || ''} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Skills
