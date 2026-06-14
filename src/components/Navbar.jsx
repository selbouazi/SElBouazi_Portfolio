import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const sectionIds = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']

function Navbar() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = React.useState('hero')
  const [scrolled, setScrolled] = React.useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const scrollY = window.scrollY + 100
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollY) {
          setActive(sectionIds[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-900/80 backdrop-blur-lg border-b border-dark-500/50' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#hero" className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
          selbouazi
        </a>
        <div className="hidden sm:flex items-center gap-1">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                active === id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={active === id ? { backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' } : {}}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="text-xs font-medium px-3 py-2 rounded-lg border transition-all duration-200 hover:opacity-80"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
          >
            {t('nav.cta')}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
