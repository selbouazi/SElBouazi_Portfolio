/** Regla con etiqueta mono: separador de sub-bloques dentro de una lámina. */
export default function SubHead({ label, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="label text-ink">{label}</span>
      <span className="h-px flex-1 bg-rule" aria-hidden="true" />
    </div>
  )
}
