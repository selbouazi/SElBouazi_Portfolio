import { useTranslation } from 'react-i18next'
import { isFilled } from '../utils/content.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true })
  const facts = t('about.facts', { returnObjects: true }).filter((f) => isFilled(f.value))
  const sysTags = t('about.card_sys_tags', { returnObjects: true })
  const stackTags = t('about.card_stack_tags', { returnObjects: true })

  const blocks = [
    {
      title: t('about.card_sys_title'),
      text: t('about.card_sys_text'),
      tags: sysTags,
    },
    {
      title: t('about.card_stack_title'),
      text: null,
      tags: stackTags,
    },
    {
      title: t('about.card_work_title'),
      text: t('about.card_work_text'),
      tags: null,
    },
  ]

  return (
    <section id="about" className="scroll-mt-16 border-b border-rule py-20 md:py-28">
      <div className="page">
        <div className="grid md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] gap-8 md:gap-14">
          {/* Columna izquierda: número + ficha técnica */}
          <div>
            <SectionHead num="01" title={t('about.title')} />

            {facts.length > 0 && (
              <Reveal delay={80} className="mt-10">
                <div className="label mb-3">{t('about.facts_title')}</div>
                <table className="w-full border-t border-rule">
                  <tbody>
                    {facts.map((f) => (
                      <tr key={f.label} className="border-b border-rule">
                        <th scope="row" className="label py-2.5 pr-3 font-normal align-top text-left">
                          {f.label}
                        </th>
                        <td className="mono text-[13px] text-ink py-2.5 text-right align-top">
                          {f.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            )}
          </div>

          {/* Columna derecha: lectura */}
          <Reveal delay={60} className="max-w-[64ch] md:pt-2">
            <p className="text-ink text-lg md:text-xl leading-relaxed">{paragraphs[0]}</p>
            <div className="mt-6 space-y-5">
              {paragraphs.slice(1).map((p, i) => (
                <p key={i} className="text-slate text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Bloques de apoyo: separados por reglas, no por tarjetas */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-3 border-t border-rule">
          {blocks.map((block, i) => (
            <Reveal
              key={block.title}
              delay={i * 90}
              className={`border-b md:border-b-0 border-rule-soft md:border-r ${
                i === blocks.length - 1 ? 'md:border-r-0' : ''
              }`}
            >
              <div className="p-6 md:p-7 h-full">
                <div className="flex items-center gap-3">
                  <span className="mono text-[11px] tracking-[0.16em] text-signal-ink">
                    {`B-0${i + 1}`}
                  </span>
                  <span className="label">{block.title}</span>
                </div>
                {block.text && (
                  <p className="mt-4 text-slate text-sm leading-relaxed">{block.text}</p>
                )}
                {block.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {block.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
