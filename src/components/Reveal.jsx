import { useEffect, useRef } from 'react'

/**
 * Entrada por escalón (opacidad + 12px) con IntersectionObserver.
 * El estado base es visible: si el JS o el observer fallan, el contenido se ve.
 * `html.js-motion` solo se activa cuando hay observer y no hay reduced-motion.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const show = () => el.classList.add('is-visible')
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      show()
      return undefined
    }

    let observer
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              show()
              observer.disconnect()
            }
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
      )
      observer.observe(el)
    } catch {
      show()
      return undefined
    }

    // Failsafe: si a los 2,5s sigue oculto pero está a la vista, se muestra.
    const failsafe = setTimeout(() => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 1.3) show()
    }, 2500)

    return () => {
      clearTimeout(failsafe)
      observer?.disconnect()
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
