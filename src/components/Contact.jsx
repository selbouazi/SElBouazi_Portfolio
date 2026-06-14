import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import profile from '../data/profile.js'

function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formId = import.meta.env.VITE_FORMSPREE_ID
    if (formId) {
      try {
        await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } catch {}
    }
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: 'var(--accent)', filter: 'blur(80px)' }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            {t('contact.heading')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-10">
            {t('contact.title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <a
              href={`mailto:${profile.email}`}
              className="gradient-border flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] group"
            >
              <svg className="w-5 h-5 shrink-0" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-300 group-hover:text-white transition-colors">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="gradient-border flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] group"
            >
              <svg className="w-5 h-5 shrink-0" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-300 group-hover:text-white transition-colors">{profile.phone}</span>
            </a>
            <div className="flex gap-3 pt-2">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border p-3 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border p-3 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="gradient-border p-5 sm:p-6 space-y-4"
          >
            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full bg-dark-600 text-white text-sm rounded-lg px-4 py-3 outline-none border-none placeholder-gray-500 focus:ring-1 transition-all"
              style={{ focusRingColor: 'var(--accent)' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              required
              className="w-full bg-dark-600 text-white text-sm rounded-lg px-4 py-3 outline-none border-none placeholder-gray-500"
            />
            <textarea
              placeholder="Mensaje"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
              required
              className="w-full bg-dark-600 text-white text-sm rounded-lg px-4 py-3 outline-none border-none placeholder-gray-500 resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              style={{ backgroundColor: 'var(--accent)', color: '#0a0a0a' }}
            >
              {sent ? '✓ Enviado' : 'Enviar mensaje'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
