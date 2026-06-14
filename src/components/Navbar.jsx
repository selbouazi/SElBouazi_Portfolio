import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const sectionIds = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']

function Navbar() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = React.useState('hero')
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const center = window.innerHeight / 2 + 80
      let current = 'hero'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= center) current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
  }

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/80 backdrop-blur-lg border-b border-dark-500/50' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a
            href="#hero"
            className="font-mono text-sm font-bold relative group"
            style={{ color: 'var(--accent)' }}
            onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          >
            Soulaimane
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: 'var(--accent)' }} />
          </a>

          <div className="hidden sm:flex items-center gap-1">
            {sectionIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                  active === id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
                style={active === id ? { backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' } : {}}
                onClick={(e) => { e.preventDefault(); scrollTo(id) }}
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="text-xs font-medium px-3 py-2 rounded-lg border transition-all duration-200 hover:opacity-80 cursor-pointer"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:block text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
            >
              {t('nav.cta')}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden flex flex-col gap-1 p-2 cursor-pointer"
              style={{ color: 'var(--accent)' }}
            >
              <motion.span animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-current" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-0.5 bg-current" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-current" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 sm:hidden border-b"
            style={{ backgroundColor: '#0d0d0d', borderColor: '#222' }}
          >
            <div className="p-4 space-y-1">
              {sectionIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active === id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  style={active === id ? { backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' } : {}}
                >
                  {t(`nav.${id}`)}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="w-full text-center px-4 py-3 rounded-lg text-sm font-medium mt-2"
                style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
              >
                {t('nav.cta')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
