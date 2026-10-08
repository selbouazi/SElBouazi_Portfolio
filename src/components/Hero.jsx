import { useTranslation } from 'react-i18next'
import NetworkDiagram from './NetworkDiagram.jsx'
import Reveal from './Reveal.jsx'
import { Download } from './Icons.jsx'

function Hero() {
  const { t } = useTranslation()
  const nodes = t('hero.diagram_nodes', { returnObjects: true })

  return (
    <section id="hero" className="relative border-b border-rule">
      <div className="page pt-28 md:pt-36 pb-16 lg:min-h-[92vh] flex flex-col justify-center">
        <Reveal>
          <h1 className="display text-[clamp(2.5rem,10.4vw,9.25rem)] text-ink">
            <span className="whitespace-nowrap">Soulaimane</span>
            <br className="sm:hidden" />
            <span className="whitespace-nowrap"> El Bouazi<span className="text-signal">.</span></span>
          </h1>
        </Reveal>

        <Reveal delay={90}>
          <p className="label mt-6 md:mt-8">{t('hero.badge')}</p>
        </Reveal>

        <div className="mt-10 md:mt-14 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start lg:items-center border-t border-rule pt-8 md:pt-10">
          <div>
            <Reveal delay={140}>
              <p className="text-slate text-base md:text-lg leading-relaxed max-w-[46ch]">
                {t('hero.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-7 inline-flex items-center gap-2.5 border border-rule rounded-[3px] px-3 py-2">
                <span className="led w-2 h-2 rounded-full bg-signal" aria-hidden="true" />
                <span className="mono text-[11px] tracking-[0.14em] uppercase text-ink">
                  {t('hero.status')}
                </span>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="btn btn-primary">
                  {t('hero.cta_projects')}
                </a>
                <a href="#contact" className="btn btn-ghost">
                  {t('hero.cta_contact')}
                </a>
                {/* El PDF se sirve desde /cv.pdf en la raíz del sitio */}
                <a href="/cv.pdf" download className="btn btn-ghost">
                  <Download />
                  {t('hero.cta_cv')}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="relative max-w-[470px] lg:ml-auto">
              <span className="label absolute -top-6 left-0 hidden lg:block">
                {t('hero.diagram_label')}
              </span>
              <NetworkDiagram
                labels={nodes}
                centerLabel={t('hero.diagram_center')}
                alt={t('hero.diagram_alt')}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Hero
