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
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <footer className="py-8 text-center text-gray-600 text-xs border-t border-dark-500/30">
        <span className="font-mono font-bold" style={{ color: 'var(--accent)' }}>Soulaimane</span>
        <span className="mx-2">·</span>
        {t('footer.built')}
        <span className="mx-2">·</span>
        {new Date().getFullYear()}
      </footer>
      <AiChat />
    </>
  )
}

export default App
