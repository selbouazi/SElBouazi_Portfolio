import Reveal from './Reveal.jsx'

/** Cabecera de lámina: número + regla + título en serif. */
export default function SectionHead({ num, title, className = '' }) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3">
        <span className="mono text-[12px] tracking-[0.18em] text-signal-ink">{num}</span>
        <span className="h-px w-10 bg-rule" aria-hidden="true" />
      </div>
      <h2 className="display mt-4 text-[clamp(2.25rem,6vw,4rem)] text-ink">{title}</h2>
    </Reveal>
  )
}
