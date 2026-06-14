import { generateFallbackResponse } from './prompt.js'

async function callDirectGroq(message) {
  const key = import.meta.env.VITE_GROQ_API_KEY
  if (!key) return null

  const { SYSTEM_PROMPT } = await import('./prompt.js')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
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

export async function getAiResponse(message) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.text) return data.text
    }
  } catch {}

  try {
    const text = await callDirectGroq(message)
    if (text) return text
  } catch {}

  return generateFallbackResponse(message)
}
