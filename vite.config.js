import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { answerWithGroq } from './lib/groq.js'
import { SYSTEM_PROMPT } from './src/ai/profilePrompt.js'

/**
 * Replica la ruta /api/chat en local.
 *
 * Vite no ejecuta las funciones serverless de Vercel, así que con
 * `npm run dev` esa ruta devolvía 404 y el asistente caía siempre a las
 * respuestas locales preescritas. Este plugin usa la MISMA lógica y el MISMO
 * prompt que api/chat.js, con la clave de GROQ_API_KEY del .env.
 *
 * La clave se queda en el proceso de Node: no se inyecta en el bundle del
 * navegador (que es lo que ocurriría con VITE_GROQ_API_KEY).
 */
function localChatApi() {
  return {
    name: 'local-chat-api',
    configureServer(server) {
      // loadEnv con prefijo vacío devuelve también las variables sin prefijo VITE_.
      const env = loadEnv(server.config.mode, server.config.envDir, '')
      const key = env.GROQ_API_KEY

      server.middlewares.use('/api/chat', (req, res) => {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          const send = (status, payload) => {
            res.statusCode = status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
          }

          if (req.method !== 'POST') {
            return send(405, { error: 'Method not allowed' })
          }

          let message
          try {
            message = JSON.parse(body).message
          } catch {
            return send(400, { error: 'Invalid JSON' })
          }

          if (!message) {
            return send(400, { error: 'Message is required' })
          }

          if (!key) {
            return send(500, { error: 'GROQ_API_KEY not configured on server' })
          }

          try {
            const text = await answerWithGroq(key, SYSTEM_PROMPT, message)
            if (text) {
              return send(200, { text })
            }
            return send(502, { error: 'Groq returned no usable response' })
          } catch (err) {
            return send(500, { error: err.message })
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localChatApi()],
})
