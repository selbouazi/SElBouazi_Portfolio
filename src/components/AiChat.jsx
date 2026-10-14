import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getAiResponse } from '../ai/api.js'
import { Bot, Close, ArrowRight } from './Icons.jsx'

function AiChat() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const msg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const { text, source } = await getAiResponse(msg)
      setMessages((prev) => [...prev, { role: 'ai', text, source }])
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: t('ai.error') }])
    } finally {
      setLoading(false)
    }
  }

  const quickTopics = ['sistemas', 'stack', 'proyectos', 'experiencia', 'educación', 'contacto']
  const firstLocalIndex = messages.findIndex((m) => m.source === 'local')

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 flex items-center justify-center bg-ink text-paper border border-ink rounded-[3px] hover:bg-signal hover:text-on-signal transition-colors"
        title={t('ai.button_title')}
        aria-label={t('ai.button_title')}
      >
        <Bot className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[75vh] bg-paper border border-ink rounded-[3px] flex flex-col overflow-hidden"
          style={{ boxShadow: '6px 6px 0 var(--panel-shadow)' }}
          role="dialog"
          aria-label={t('ai.title')}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-rule shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" />
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-ink">
                {t('ai.title')}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-slate hover:text-ink transition-colors"
              aria-label="Cerrar"
            >
              <Close className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div>
                <p className="text-slate text-sm leading-relaxed whitespace-pre-line">
                  {t('ai.welcome').split('\n')[0]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setInput(topic)}
                      className="chip hover:border-ink hover:text-ink transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[88%]">
                  <div
                    className={`rounded-[3px] px-3 py-2 text-sm leading-relaxed border ${
                      m.role === 'user'
                        ? 'bg-signal text-on-signal border-signal'
                        : 'bg-paper-2 text-ink border-rule'
                    }`}
                  >
                    <span className="whitespace-pre-wrap">{m.text}</span>
                  </div>
                  {m.source === 'local' && i === firstLocalIndex && (
                    <p className="mono text-[10px] tracking-[0.12em] uppercase text-slate mt-1.5 px-1">
                      {t('ai.local_notice')}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-paper-2 border border-rule rounded-[3px] px-3 py-2 mono text-[13px] text-slate">
                  …
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-rule flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('ai.placeholder')}
              aria-label={t('ai.placeholder')}
              className="field !border-b-0 flex-1 !py-2"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn btn-primary !py-2 !px-3 disabled:opacity-40"
              aria-label={t('ai.send')}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AiChat
