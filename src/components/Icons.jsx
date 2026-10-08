/* Iconos de línea propios (SVG). Sin emojis. Todos usan currentColor. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function ArrowRight({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRight({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function Download({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 19h16" />
    </svg>
  )
}

export function Mail({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}

export function Phone({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </svg>
  )
}

export function Menu({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function Close({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function ChevronDown({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function Linkedin({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
    </svg>
  )
}

export function Github({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.7a10.3 10.3 0 0 0-3.26 20.07c.52.1.7-.22.7-.5v-1.9c-2.87.62-3.48-1.22-3.48-1.22-.47-1.2-1.15-1.52-1.15-1.52-.94-.64.07-.63.07-.63 1.04.08 1.58 1.07 1.58 1.07.92 1.58 2.42 1.13 3.01.86.1-.67.36-1.13.66-1.39-2.29-.26-4.7-1.15-4.7-5.1 0-1.12.4-2.04 1.06-2.76-.11-.26-.46-1.3.1-2.7 0 0 .86-.28 2.82 1.05a9.7 9.7 0 0 1 5.14 0c1.96-1.33 2.82-1.05 2.82-1.05.56 1.4.21 2.44.1 2.7.66.72 1.06 1.64 1.06 2.76 0 3.96-2.41 4.83-4.71 5.09.37.32.7.95.7 1.92v2.85c0 .28.19.6.71.5A10.3 10.3 0 0 0 12 1.7Z" />
    </svg>
  )
}

export function Bot({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...base}>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M12 8V4m0 0h3M9 13h.01M15 13h.01M9.5 16.5h5" />
    </svg>
  )
}
