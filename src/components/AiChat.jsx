import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAiResponse } from '../ai/api.js'

function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      if (messages.length === 0) {
        setMessages([
          { role: 'ai', text: '¡Hola! Soy el asistente AI de Soulaimane. Pregúntame lo que quieras sobre él.' },
        ])
      }
    }
  }, [open])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const msg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const response = await getAiResponse(msg)
      setMessages((prev) => [...prev, { role: 'ai', text: response }])
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Lo siento, hubo un error. Inténtalo de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-glow"
        style={{ backgroundColor: 'var(--accent)', animation: 'pulse-glow 2s infinite' }}
        title="Pregúntale a la IA sobre mí"
      >
        🤖
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border"
            style={{ backgroundColor: '#111', borderColor: 'var(--accent-glow)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#222' }}>
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span className="text-white text-sm font-medium">AI Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3" style={{ height: 'calc(100% - 110px)' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'text-white'
                        : 'text-gray-300'
                    }`}
                    style={m.role === 'user' ? { backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' } : { backgroundColor: '#1a1a1a' }}
                  >
                    {m.role === 'ai' ? m.text.replace('🤖 ', '') : m.text}
                  </div>
                </div>
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

            <div className="p-3 border-t flex gap-2" style={{ borderColor: '#222' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregunta sobre Soulaimane..."
                className="flex-1 bg-dark-600 text-white text-sm rounded-xl px-4 py-2.5 outline-none border-none placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
                style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
              >
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AiChat
