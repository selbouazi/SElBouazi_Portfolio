// Llamada a la API de Groq.
// Compartida por la función serverless de Vercel (api/chat.js) y por el
// servidor de desarrollo de Vite (vite.config.js), para que el prompt, los
// modelos y los parámetros existan en un solo sitio y no se desincronicen.

// Groq ha retirado los modelos Llama; estos son los actuales para conversación.
// Se prueban en orden: si el primero falla o se retira, se pasa al siguiente.
export const MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b']

/** Devuelve el texto de la respuesta, o null si ese modelo no sirve. */
export async function askGroq(key, model, systemPrompt, message) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      // gpt-oss es un modelo de razonamiento: se gasta tokens "pensando"
      // antes de responder, así que 300 queda justo. 600 deja margen.
      max_tokens: 600,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    console.error(`Groq API error (${model}):`, response.status, errText)
    return null
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || null
}

/**
 * Prueba los modelos en orden y devuelve el primer texto útil,
 * o null si ninguno responde.
 */
export async function answerWithGroq(key, systemPrompt, message) {
  for (const model of MODELS) {
    const text = await askGroq(key, model, systemPrompt, message)
    if (text) return text
  }
  return null
}
