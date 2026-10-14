import profile from '../data/profile.js'

export { SYSTEM_PROMPT } from './profilePrompt.js'

const TOPICS = {
  stack: ['stack', 'tecnología', 'technology', 'technolog', 'skills', 'sabe', 'conoce', 'lenguaje', 'language', 'framework', 'laravel', 'react', 'tools'],
  projects: ['proyecto', 'project', 'mezquita', 'al-quds', 'lifters', 'tunely', 'synkiria', 'trabajo', 'ha hecho', 'built', 'desarrollado', 'portfolio'],
  experience: ['experiencia', 'experience', 'trabajado', 'work', 'job', 'empresa', 'company', 'odoo', 'synkiria', 'bugaderia'],
  education: ['educación', 'education', 'estudio', 'study', 'carrera', 'degree', 'daw', 'asix', 'cami de mar', 'formación'],
  contact: ['contacto', 'contact', 'linkedin', 'github', 'email', 'correo', 'teléfono', 'phone', 'contratar', 'hire'],
  systems: ['sistemas', 'system', 'linux', 'redes', 'networking', 'network', 'windows server', 'servidor', 'server', 'ssh', 'dns', 'dhcp', 'vlan', 'firewall', 'homelab', 'prácticas de sistemas'],
}

function detectTopic(message) {
  const msg = message.toLowerCase()
  for (const [topic, keywords] of Object.entries(TOPICS)) {
    if (keywords.some((k) => msg.includes(k))) {
      return topic
    }
  }
  return null
}

const greetings = {
  es: 'hola|hey|buenas|que tal|qué tal|saludos|buenos días|buenas tardes',
  en: 'hi|hello|hey|greetings|good morning|good afternoon',
}

function isGreeting(message) {
  const msg = message.toLowerCase()
  for (const patterns of Object.values(greetings)) {
    if (patterns.split('|').some((g) => msg.includes(g))) {
      return true
    }
  }
  return false
}

function isEnglish(msg) {
  const enIndicators = ['hello', 'hi', 'hey', 'what', 'how', 'where', 'when', 'who', 'why', 'which', 'the', 'is', 'are', 'do', 'does', 'did', 'can', 'could', 'would', 'should', 'may', 'might', 'shall', 'will', 'have', 'has', 'had', 'been', 'being', 'this', 'that', 'these', 'those', 'please', 'thank']
  const words = msg.toLowerCase().split(/\s+/)
  const enCount = words.filter((w) => enIndicators.includes(w)).length
  return enCount >= 2
}

function lang(message) {
  return isEnglish(message) ? 'en' : 'es'
}

const availableTopicsText = {
  es: `Puedes preguntarme sobre estos temas:
• sistemas — Linux, redes, Windows Server
• stack — tecnologías y skills
• proyectos — Mezquita Al-Quds, Lifters, Tunely
• experiencia — freelance, Synkiria y Bugaderia
• educación — ASIX, DAW, CompTIA A+, bachillerato
• contacto — email, teléfono, LinkedIn, GitHub

Ej: "qué stack usa?", "está aprendiendo linux?", "dónde ha trabajado?"`,
  en: `You can ask me about:
• systems — Linux, networking, Windows Server
• stack — technologies and skills
• projects — Mezquita Al-Quds, Lifters, Tunely
• experience — freelance, Synkiria and Bugaderia
• education — ASIX, DAW, CompTIA A+, high school
• contact — email, phone, LinkedIn, GitHub

Eg: "what's his stack?", "is he learning linux?", "where did he work?"`,
}

export function generateFallbackResponse(message) {
  const msg = message.toLowerCase()
  const l = lang(msg)

  if (isGreeting(msg)) {
    const greeting = l === 'es'
      ? '¡Hola! Soy el asistente de Soulaimane.'
      : 'Hi! I\'m Soulaimane\'s assistant.'
    return `${greeting}\n\n${availableTopicsText[l]}`
  }

  const topic = detectTopic(msg)

  if (!topic) {
    const error = l === 'es'
      ? `No tengo información sobre "${message.trim().split(/\s+/).slice(0, 3).join(' ')}".`
      : `I don't have information about "${message.trim().split(/\s+/).slice(0, 3).join(' ')}".`
    return `${error}\n\n${availableTopicsText[l]}`
  }

  switch (topic) {
    case 'stack':
      return l === 'es'
        ? `Base de Soulaimane: ${Object.values(profile.skills).flat().join(', ')}. Tiene experiencia sólida en desarrollo web (Laravel en backend, React en frontend, MySQL) y ahora está aprendiendo sistemas y redes.`
        : `Soulaimane's background: ${Object.values(profile.skills).flat().join(', ')}. He has solid web development experience (Laravel on the backend, React on the frontend, MySQL) and is now learning systems and networking.`

    case 'projects':
      return l === 'es'
        ? `Su proyecto principal es Mezquita Al-Quds, una plataforma completa con auth, dashboards y CMS hecha con Laravel + React. También hizo Lifters y Tunely, y trabajó en automatización e integraciones ERP en Synkiria. Los proyectos de sistemas y redes (laboratorios de ASIX) los está documentando.`
        : `His main project is Mezquita Al-Quds, a full platform with auth, dashboards and CMS built with Laravel + React. He also built Lifters and Tunely, and worked on automation and ERP integrations at Synkiria. His systems and networking projects (ASIX labs) are being documented.`

    case 'experience':
      return l === 'es'
        ? `Ahora trabaja como programador full stack freelance (desde mayo 2026), haciendo aplicaciones web con Laravel, PHP, React y MySQL. Antes fue Automation & ERP Developer en Synkiria (jun 2025 - feb 2026), con integraciones Odoo y REST APIs, y mozo de almacén en Bugaderia Neutral (jun 2024 - sept 2025).`
        : `He's now working as a full stack freelance developer (since May 2026), building web applications with Laravel, PHP, React and MySQL. Before that he was an Automation & ERP Developer at Synkiria (Jun 2025 - Feb 2026), with Odoo and REST API integrations, and a warehouse worker at Bugaderia Neutral (Jun 2024 - Sep 2025).`

    case 'education':
      return l === 'es'
        ? `Cursa el CFGS en Administración de Sistemas Informáticos en Red (ASIX) en Ins Camí de Mar (2026-2028), con foco en redes, Linux y Windows Server. Está preparando el CompTIA A+ (Professor Messer). Antes completó el CFGS en Desarrollo de Aplicaciones Web (DAW) en Ins Camí de Mar (2024-2026) y el Bachillerato Científico-Tecnológico (2022-2024).`
        : `He's studying a CFGS in Computer Systems and Networks Administration (ASIX) at Ins Camí de Mar (2026-2028), focused on networking, Linux and Windows Server. He's preparing for CompTIA A+ (Professor Messer). Before that he completed a CFGS in Web Application Development (DAW) at Ins Camí de Mar (2024-2026) and a Scientific-Technological Bachillerato (2022-2024).`

    case 'contact':
      return l === 'es'
        ? `Email: ${profile.email}\nLinkedIn: ${profile.social.linkedin}\nGitHub: ${profile.social.github}`
        : `Email: ${profile.email}\nLinkedIn: ${profile.social.linkedin}\nGitHub: ${profile.social.github}`

    case 'systems':
      return l === 'es'
        ? `Está empezando en sistemas y redes: cursa ASIX (2026-2028) y está aprendiendo Linux, Windows Server, redes, virtualización y seguridad. Va documentando sus laboratorios. Su experiencia previa programando y automatizando (Odoo, APIs, scripts) le ayuda a entender cómo se conectan las aplicaciones con los sistemas que las sostienen.`
        : `He's just getting started in systems and networking: he's studying ASIX (2026-2028) and learning Linux, Windows Server, networking, virtualization and security, documenting his labs as he goes. His previous experience programming and automating (Odoo, APIs, scripts) helps him understand how applications connect with the systems that run them.`

    default:
      return `${availableTopicsText[l]}`
  }
}
