import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import AiChat from './components/AiChat.jsx'

function App() {
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
        <span className="font-mono" style={{ color: 'var(--accent)' }}>selbouazi</span>
        <span className="mx-2">·</span>
        Built with React + Tailwind
        <span className="mx-2">·</span>
        {new Date().getFullYear()}
      </footer>
      <AiChat />
    </>
  )
}

export default App
