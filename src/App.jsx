import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import AiChat from './components/AiChat.jsx'

function App() {
  const { t, i18n } = useTranslation()

  // El atributo lang del documento sigue al selector de idioma (accesibilidad).
  useEffect(() => {
    const lang = (i18n.resolvedLanguage || i18n.language || 'es').slice(0, 2)
    document.documentElement.lang = lang
  }, [i18n.language, i18n.resolvedLanguage])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <footer className="border-t border-rule py-8">
        <div className="page flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="label text-ink">Soulaimane El Bouazi</span>
          <span className="label">{t('footer.built')}</span>
          <span className="label">{new Date().getFullYear()}</span>
        </div>
      </footer>

      <AiChat />
    </>
  )
}

export default App
