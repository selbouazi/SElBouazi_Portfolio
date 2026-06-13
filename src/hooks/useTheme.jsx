import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const themes = {
  green: { accent: '#00ff41', glow: 'rgba(0, 255, 65, 0.3)', name: 'green' },
  amber: { accent: '#ffb000', glow: 'rgba(255, 176, 0, 0.3)', name: 'amber' },
  blue: { accent: '#00d4ff', glow: 'rgba(0, 212, 255, 0.3)', name: 'blue' },
}

const themeNames = Object.keys(themes)

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return themes[saved] || themes.green
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme.name)
    document.documentElement.style.setProperty('--accent', theme.accent)
    document.documentElement.style.setProperty('--accent-glow', theme.glow)
  }, [theme])

  const cycleTheme = useCallback(() => {
    const currentIndex = themeNames.indexOf(theme.name)
    const nextIndex = (currentIndex + 1) % themeNames.length
    setTheme(themes[themeNames[nextIndex]])
    return themes[themeNames[nextIndex]].name
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
