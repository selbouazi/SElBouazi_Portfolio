import { SYSTEM_PROMPT, generateFallbackResponse } from './prompt.js'

const PROVIDERS = {
  groq: {
    envKey: 'VITE_GROQ_API_KEY',
    getUrl: () => 'https://api.groq.com/openai/v1/chat/completions',
    headers: (key) => ({ 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' }),
    transformBody: (message) => ({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content,
  },
  gemini: {
    envKey: 'VITE_GEMINI_API_KEY',
    getUrl: () => 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    headers: (key) => ({ 'x-goog-api-key': key, 'Content-Type': 'application/json' }),
    transformBody: (message) => ({
      contents: [{
        role: 'user',
        parts: [{ text: message }],
      }],
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
    }),
    parseResponse: (data) => data.candidates?.[0]?.content?.parts?.[0]?.text,
  },
  openai: {
    envKey: 'VITE_OPENAI_API_KEY',
    getUrl: () => 'https://api.openai.com/v1/chat/completions',
    headers: (key) => ({ 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' }),
    transformBody: (message) => ({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content,
  },
}

function detectProvider() {
  for (const [name, config] of Object.entries(PROVIDERS)) {
    if (import.meta.env[config.envKey]) return name
  }
  return null
}

export async function getAiResponse(message) {
  const providerName = detectProvider()

  if (providerName) {
    const provider = PROVIDERS[providerName]
    const key = import.meta.env[provider.envKey]

    try {
      const options = {
        method: 'POST',
        headers: provider.headers
          ? provider.headers(key)
          : { 'Content-Type': 'application/json' },
        body: JSON.stringify(provider.transformBody(message)),
      }

      const response = await fetch(provider.getUrl(key), options)

      if (!response.ok) {
        console.warn(`${providerName} API error (${response.status}), falling back to local`)
        return simulateDelay(generateFallbackResponse(message))
      }

      const data = await response.json()
      const text = provider.parseResponse(data)
      return text || generateFallbackResponse(message)
    } catch (err) {
      console.warn(`${providerName} API call failed, falling back to local:`, err)
      return simulateDelay(generateFallbackResponse(message))
    }
  }

  return simulateDelay(generateFallbackResponse(message))
}

function simulateDelay(result) {
  return new Promise((resolve) => {
    const delay = 400 + Math.random() * 600
    setTimeout(() => resolve(result), delay)
  })
}
