import { useTranslation } from 'react-i18next'
import systemsProjects from '../data/systemsProjects.js'
import { filledOnly, isFilled } from '../utils/content.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import SubHead from './SubHead.jsx'
import { ArrowUpRight } from './Icons.jsx'

/** Estado vacío del bloque A: esquema de líneas discontinuas, sin fingir contenido. */
function EmptyTopology() {
  const boxes = [
    { x: 6, y: 6 },
    { x: 168, y: 6 },
    { x: 87, y: 110 },
  ]
  return (
    <svg viewBox="0 0 220 144" className="w-full max-w-[240px] h-auto" aria-hidden="true">
      {/* Conexiones: quedan por debajo de las formas rellenas */}
      {boxes.map((b, i) => (
        <line
          key={`l-${i}`}
          x1="110"
          y1="62"
          x2={b.x + 23}
          y2={b.y + 14}
          stroke="var(--color-steel)"
          strokeWidth="1"
          strokeDasharray="4 5"
          opacity="0.6"
        />
      ))}

      <circle
        cx="110"
        cy="62"
        r="30"
        fill="var(--color-paper)"
        stroke="var(--color-steel)"
        strokeWidth="1"
        strokeDasharray="4 5"
        opacity="0.85"
      />

      {boxes.map((b, i) => (
        <rect
          key={`b-${i}`}
          x={b.x}
          y={b.y}
          width="46"
          height="28"
          rx="2"
          fill="var(--color-paper)"
          stroke="var(--color-steel)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.85"
        />
      ))}
    </svg>
  )
}

function HostCard({ project, index }) {
  return (
    <article className="bg-paper p-6 md:p-7">
      <div className="flex items-center justify-between">
        <span className="mono text-[11px] tracking-[0.16em] text-signal-ink">
          {`lab-0${index + 1}`}
        </span>
        {project.github || project.url ? (
          <a
            href={project.github || project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-signal-ink transition-colors"
            aria-label={project.name}
          >
            <ArrowUpRight />
          </a>
        ) : null}
      </div>
      <h4 className="display text-2xl md:text-[1.75rem] mt-3 text-ink">{project.name}</h4>
      {isFilled(project.description) && (
        <p className="mt-2 text-slate text-sm leading-relaxed">{project.description}</p>
      )}
      {project.stack?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'

  // Solo se publican las fichas marcadas como habilitadas en el origen de datos.
  const systems = systemsProjects
    .filter((p) => p.enabled)
    .map((p) => ({ ...p, ...(p[lang] || p.es) }))

  const devItems = t('projects.dev_items', { returnObjects: true })
  const others = t('projects.others', { returnObjects: true })

  return (
    <section id="projects" className="scroll-mt-16 border-b border-rule py-20 md:py-28">
      <div className="page">
        <SectionHead num="02" title={t('projects.title')} />

        {/* Bloque A — Sistemas y redes */}
        <div className="mt-14 md:mt-20">
          <SubHead label={t('projects.systems_title')} />

          {systems.length > 0 ? (
            <div className="mt-6 grid sm:grid-cols-2 gap-px bg-rule border border-rule">
              {systems.map((project, i) => (
                <HostCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <Reveal className="mt-6 border border-dashed border-rule rounded-[3px] p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                <p className="display text-2xl md:text-[2.25rem] leading-snug text-ink max-w-[22ch]">
                  {t('projects.systems_empty')}
                </p>
                <div className="md:ml-auto">
                  <EmptyTopology />
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Bloque B — Base de desarrollo */}
        <div className="mt-16 md:mt-24">
          <SubHead label={t('projects.dev_heading')} />
          <p className="mt-4 text-slate text-sm max-w-[60ch]">{t('projects.dev_intro')}</p>

          <div className="mt-8">
            {devItems.map((project, i) => (
              <Reveal key={project.id} delay={i * 70}>
                <article className="row border-t border-rule py-7 md:py-9">
                  <div className="row-inner grid md:grid-cols-[4rem_minmax(0,1fr)_2rem] gap-4 md:gap-8">
                    <div className="display text-3xl md:text-4xl text-steel leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div>
                      <h3 className="display text-2xl md:text-[2rem] text-ink row-title inline-block">
                        {project.name}
                      </h3>
                      <p className="mt-2.5 text-slate text-sm md:text-base leading-relaxed max-w-[70ch]">
                        {project.description}
                      </p>

                      {filledOnly(project.highlights).length > 0 && (
                        <ul className="mt-4 space-y-2 max-w-[70ch]">
                          {filledOnly(project.highlights).map((h) => (
                            <li key={h} className="flex gap-3 text-slate text-[13px] leading-relaxed">
                              <span className="mt-2.5 w-2.5 h-px bg-signal shrink-0" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:flex justify-end text-steel pt-1">
                      {(project.url || project.github) && (
                        <a
                          href={project.github || project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-signal-ink transition-colors"
                          aria-label={project.name}
                        >
                          <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Otros proyectos: una fila más */}
            <Reveal delay={devItems.length * 70}>
              <article className="row border-t border-b border-rule py-7 md:py-9">
                <div className="row-inner grid md:grid-cols-[4rem_minmax(0,1fr)_2rem] gap-4 md:gap-8">
                  <div className="display text-3xl md:text-4xl text-steel leading-none">
                    {String(devItems.length + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="display text-2xl md:text-[2rem] text-ink row-title inline-block">
                      {t('projects.others_title')}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {others.map((o) => (
                        <li key={o.name} className="text-sm leading-relaxed">
                          <span className="text-ink font-medium">{o.name}</span>
                          <span className="text-slate"> — {o.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div />
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
