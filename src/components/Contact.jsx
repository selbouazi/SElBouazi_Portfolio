import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import profile from '../data/profile.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { Mail, Phone, Linkedin, Github, ArrowRight } from './Icons.jsx'

function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    const formId = import.meta.env.VITE_FORMSPREE_ID
    if (formId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error()
      } catch {
        setError(true)
        setTimeout(() => setError(false), 4000)
        return
      }
    }
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 6000)
  }

  const links = [
    { key: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { key: 'phone', label: t('contact.phone'), value: profile.phone, href: `tel:${profile.phone}`, Icon: Phone },
    { key: 'linkedin', label: t('contact.linkedin'), value: 'linkedin.com/in/selbouazi', href: profile.social.linkedin, Icon: Linkedin },
    { key: 'github', label: t('contact.github'), value: 'github.com/selbouazi', href: profile.social.github, Icon: Github },
  ]

  return (
    <section id="contact" className="scroll-mt-16 py-20 md:py-28">
      <div className="page">
        <SectionHead num="05" title={t('contact.ping')} />

        <div className="mt-12 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-16">
          {/* Formulario */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-7 max-w-[46rem]">
              <div>
                <label htmlFor="contact-name" className="label block mb-1.5">
                  {t('contact.name')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="field"
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="label block mb-1.5">
                  {t('contact.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="field"
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="label block mb-1.5">
                  {t('contact.message')}
                </label>
                <textarea
                  id="contact-message"
                  className="field resize-none"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-primary">
                  {t('contact.submit')}
                  <ArrowRight />
                </button>

                {sent && (
                  <p role="status" className="mono text-[13px] text-signal-ink">
                    {t('contact.sent')}
                  </p>
                )}
                {error && (
                  <p role="alert" className="mono text-[13px] text-ink">
                    {t('contact.error')}
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          {/* Enlaces */}
          <Reveal delay={90}>
            <div className="label mb-3">{t('contact.links')}</div>
            <ul className="border-t border-rule">
              {links.map(({ key, label, value, href, Icon }) => (
                <li key={key} className="border-b border-rule">
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 py-4"
                  >
                    <span className="text-slate group-hover:text-signal-ink transition-colors shrink-0">
                      <Icon />
                    </span>
                    <span className="label shrink-0">{label}</span>
                    <span className="ml-auto mono text-[12.5px] text-ink truncate max-w-[55%]">
                      {value}
                    </span>
                    <span className="text-steel shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-signal-ink">
                      <ArrowRight />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
