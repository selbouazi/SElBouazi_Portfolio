import { answerWithGroq } from '../lib/groq.js'
import { SYSTEM_PROMPT } from '../src/ai/profilePrompt.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  // Clave de Groq. En Vercel se define en el dashboard del proyecto
  // (Settings → Environment Variables → GROQ_API_KEY).
  const key = process.env.GROQ_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured on server' })
  }

  try {
    const text = await answerWithGroq(key, SYSTEM_PROMPT, message)
    if (text) {
      return res.status(200).json({ text })
    }

    return res.status(502).json({ error: 'Groq returned no usable response' })
  } catch (err) {
    console.error('Serverless function error:', err)
    return res.status(500).json({ error: err.message })
  }
}
