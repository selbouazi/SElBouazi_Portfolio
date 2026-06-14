import React, { useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'contact', label: 'Contacto' },
]

function Navbar() {
  const [active, setActive] = React.useState('hero')
  const [scrolled, setScrolled] = React.useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const scrollY = window.scrollY + 100
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollY) {
          setActive(sections[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-900/80 backdrop-blur-lg border-b border-dark-500/50' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#hero" className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
          selbouazi
        </a>
        <div className="hidden sm:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                active === s.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={active === s.id ? { backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' } : {}}
            >
              {s.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
        >
          Contactar
        </button>
      </div>
    </nav>
  )
}

export default Navbar
