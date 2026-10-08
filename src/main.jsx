import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/index.js'
import App from './App.jsx'

// Las entradas solo se ocultan si hay IntersectionObserver y no hay reduced-motion.
// Si algo falla, el contenido se ve desde el primer momento.
if (
  typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  !(typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
) {
  document.documentElement.classList.add('js-motion')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
