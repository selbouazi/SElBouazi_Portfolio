import { SYSTEM_PROMPT, generateFallbackResponse } from './prompt.js'

export async function getAiResponse(message) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (apiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        console.warn('OpenAI API error, falling back to local:', response.status)
        return simulateDelay(generateFallbackResponse(message))
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || generateFallbackResponse(message)
    } catch (err) {
      console.warn('OpenAI API call failed, falling back to local:', err)
      return simulateDelay(generateFallbackResponse(message))
    }
  }

  return simulateDelay(generateFallbackResponse(message))
}

function simulateDelay(result) {
  return new Promise((resolve) => {
    const delay = 600 + Math.random() * 800
    setTimeout(() => resolve(result), delay)
  })
}
