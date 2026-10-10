import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Close } from './Icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const sectionIds = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']

function Navbar() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const center = window.innerHeight * 0.35
      let current = 'hero'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= center) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const linkClass = (id) =>
    `relative py-2 text-[13px] tracking-wide transition-colors ${
      active === id ? 'text-ink' : 'text-slate hover:text-ink'
    }`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${
          scrolled || open ? 'bg-paper/95 backdrop-blur-sm border-rule' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="page flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('hero')
            }}
            className="mono text-[13px] font-medium tracking-[0.12em] uppercase text-ink hover:text-signal-ink transition-colors"
          >
            Soulaimane
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {sectionIds.map((id) => (
              <a key={id} href={`#${id}`} className={linkClass(id)} onClick={(e) => { e.preventDefault(); scrollTo(id) }}>
                {t(`nav.${id}`)}
                {active === id && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-signal" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleLang}
              className="mono text-[11px] tracking-[0.12em] px-2.5 py-1.5 border border-rule rounded-[2px] text-slate hover:text-ink hover:border-ink transition-colors"
              aria-label={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hidden lg:inline-flex btn btn-primary !py-2 !px-4 !text-[13px]"
            >
              {t('nav.cta')}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 -mr-2 text-ink"
              aria-expanded={open}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-paper border-b border-rule">
          <div className="page py-2">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full flex items-center justify-between py-3.5 border-b border-rule-soft text-left text-sm ${
                  active === id ? 'text-ink' : 'text-slate'
                }`}
              >
                <span>{t(`nav.${id}`)}</span>
                {active === id && <span className="w-1.5 h-1.5 rounded-full bg-signal" />}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="btn btn-primary w-full mt-4 mb-3"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
