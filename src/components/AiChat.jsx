import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getAiResponse } from '../ai/api.js'

function AiChat() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showTopics, setShowTopics] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const msg = input.trim()
    setInput('')
    setShowTopics(false)
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const response = await getAiResponse(msg)
      setMessages((prev) => [...prev, { role: 'ai', text: response }])
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: t('ai.error') }])
    } finally {
      setLoading(false)
    }
  }

  const quickTopics = ['stack', 'proyectos', 'experiencia', 'educación', 'contacto', 'ia']

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg cursor-pointer"
        style={{ backgroundColor: 'var(--accent)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ boxShadow: ['0 0 10px var(--accent-glow)', '0 0 25px var(--accent-glow)', '0 0 10px var(--accent-glow)'] }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        title={t('ai.button_title')}
      >
        🤖
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[520px] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border flex flex-col"
            style={{ backgroundColor: '#111', borderColor: 'var(--accent-glow)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b shrink-0" style={{ borderColor: '#222' }}>
              <div className="flex items-center gap-2">
                <span className="relative">
                  🤖
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </span>
                <span className="text-white text-sm font-medium">{t('ai.title')}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white transition-colors text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.length === 0 && !showTopics && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <span className="text-4xl block mb-3">🤖</span>
                  <p className="text-gray-400 text-sm mb-4">{t('ai.welcome').split('\n')[0]}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {quickTopics.map((topic) => (
                      <motion.button
                        key={topic}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setInput(topic)
                          setShowTopics(true)
                        }}
                        className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                        style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
                      >
                        {topic}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-gray-600 text-[11px] mt-4">Toca un tema o escribe tu pregunta</p>
                </motion.div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user' ? 'text-white' : 'text-gray-300'
                    }`}
                    style={m.role === 'user' ? { backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' } : { backgroundColor: '#1a1a1a' }}
                  >
                    <span className="whitespace-pre-wrap">{m.text}</span>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-dark-600 rounded-xl px-4 py-2.5 text-sm text-gray-400">
                    <span className="flex gap-1">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>.</motion.span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t shrink-0 flex gap-2" style={{ borderColor: '#222' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('ai.placeholder')}
                className="flex-1 bg-dark-600 text-white text-sm rounded-xl px-4 py-2.5 outline-none border-none placeholder-gray-500"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 cursor-pointer shrink-0"
                style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
              >
                {t('ai.send')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AiChat
