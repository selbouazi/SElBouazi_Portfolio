/** Utilidades para que ningún dato pendiente se publique en la web. */

// Marcador de trabajo pendiente en el contenido ("TODO: ...").
const TODO_MARK = /^\s*TODO\s*:/i

/** true si el valor está relleno y no es un pendiente. */
export function isFilled(value) {
  if (value === null || value === undefined) return false
  const text = String(value).trim()
  if (!text) return false
  return !TODO_MARK.test(text)
}

/** Filtra de una lista los elementos pendientes o vacíos. */
export function filledOnly(list) {
  if (!Array.isArray(list)) return []
  return list.filter(isFilled)
}
