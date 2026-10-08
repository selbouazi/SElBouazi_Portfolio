import { useTranslation } from 'react-i18next'
import { filledOnly } from '../utils/content.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import SubHead from './SubHead.jsx'

function Hop({ item, index, kind, isLast }) {
  const title = kind === 'work' ? item.role : item.degree
  const org = kind === 'work' ? item.company : item.institution
  const details = filledOnly(item.highlights || item.details)

  return (
    <li className="relative pl-8 pb-9 last:pb-0">
      {!isLast && (
        <span
          className="absolute left-[5.5px] top-3 bottom-0 w-px bg-rule"
          aria-hidden="true"
        />
      )}
      {/* Puerto del salto */}
      <span
        className="absolute left-0 top-1.5 w-3 h-3 rounded-full border border-ink bg-paper flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-signal" />
      </span>

      <div className="flex items-center justify-between gap-3">
        <span className="mono text-[11px] tracking-[0.16em] text-signal-ink">
          {`hop ${String(index + 1).padStart(2, '0')}`}
        </span>
        <span className="mono text-[11px] text-slate text-right">{item.period}</span>
      </div>

      <h3 className="display text-xl md:text-2xl text-ink mt-2 leading-snug">{title}</h3>
      <p className="mono text-[12px] text-slate mt-1">{org}</p>

      {details.length > 0 && (
        <ul className="mt-3 space-y-2">
          {details.map((d) => (
            <li key={d} className="flex gap-3 text-slate text-[13px] leading-relaxed">
              <span className="mt-2.5 w-2.5 h-px bg-signal shrink-0" aria-hidden="true" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

function Trace({ label, items, kind }) {
  return (
    <div>
      <SubHead label={label} />
      <ol className="relative mt-6">
        {items.map((item, i) => (
          <Hop
            key={`${kind}-${i}`}
            item={item}
            index={i}
            kind={kind}
            isLast={i === items.length - 1}
          />
        ))}
      </ol>
    </div>
  )
}

function Experience() {
  const { t } = useTranslation()
  const workItems = t('experience.items', { returnObjects: true })
  const educationItems = t('experience.education_items', { returnObjects: true })

  return (
    <section id="experience" className="scroll-mt-16 border-b border-rule py-20 md:py-28">
      <div className="page">
        <SectionHead num="04" title={t('experience.title')} />

        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <Reveal>
            <Trace
              label={t('experience.education_heading')}
              items={educationItems}
              kind="education"
            />
          </Reveal>
          <Reveal delay={90}>
            <Trace label={t('experience.work_heading')} items={workItems} kind="work" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Experience
