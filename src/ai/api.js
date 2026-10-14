import { generateFallbackResponse, SYSTEM_PROMPT } from './prompt.js'

async function callDirectGroq(message) {
  const key = import.meta.env.VITE_GROQ_API_KEY
  if (!key) return null

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  })

  if (!res.ok) return null
  const data = await res.json()
  return data.choices?.[0]?.message?.content || null
}

/**
 * Devuelve { text, source }:
 * - source 'ai'    → respuesta real del modelo (vía servidor o clave directa)
 * - source 'local' → respuesta local preescrita, sin modelo por detrás
 */
export async function getAiResponse(message) {
  // Si falla el servidor (por ejemplo, /api/chat no existe en local),
  // se intenta con la clave del navegador y, si tampoco, respuestas locales.
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.text) return { text: data.text, source: 'ai' }
    }
  } catch {
    /* sin servidor: se prueba el siguiente método */
  }

  try {
    const text = await callDirectGroq(message)
    if (text) return { text, source: 'ai' }
  } catch {
    /* sin clave directa o fallo de red: se usa la respuesta local */
  }

  return { text: generateFallbackResponse(message), source: 'local' }
}
