import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Moon } from './Icons.jsx'

const STORAGE_KEY = 'theme'

/** Lee el tema guardado. Si no hay elección, manda el claro (el actual). */
function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' || stored === 'light' ? stored : 'light'
  } catch {
    return 'light'
  }
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function ThemeToggle() {
  const { t } = useTranslation()
  // El script de index.html ya aplicó el tema antes del pintado; aquí solo lo reflejamos.
  const [theme, setTheme] = useState(readStoredTheme)

  useEffect(() => {
    applyTheme(readStoredTheme())
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento disponible: el tema se aplica solo en esta sesión.
    }
  }

  const label =
    theme === 'dark' ? t('nav.theme_light') : t('nav.theme_dark')

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-8 h-8 border border-rule rounded-[2px] text-slate hover:text-ink hover:border-ink transition-colors"
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

export default ThemeToggle
