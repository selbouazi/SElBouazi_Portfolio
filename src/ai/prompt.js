import profile from '../data/profile.js'

const skillsText = Object.entries(profile.skills)
  .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
  .join('\n')

const experienceText = profile.experience
  .map((e) => `${e.role} at ${e.company} (${e.period}):\n  ${e.highlights.join('\n  ')}`)
  .join('\n\n')

const projectsText = profile.projects
  .map((p) => `${p.name}: ${p.description}\n  Stack: ${p.stack.join(', ')}`)
  .join('\n\n')

export const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in Soulaimane El Bouazi's portfolio website.

Your role is to answer questions about Soulaimane — his skills, experience, projects, and background. Be concise, enthusiastic, and professional. Answer in the same language the user asks in (Spanish or English).

Here is Soulaimane's full profile:

Name: ${profile.name}
Title: ${profile.title}
Tagline: ${profile.tagline}

About:
${profile.about.join('\n')}

Skills:
${skillsText}

Experience:
${experienceText}

Projects:
${projectsText}

Education:
${profile.education.map((e) => `${e.degree} @ ${e.institution} (${e.period})`).join('\n')}

Social:
LinkedIn: ${profile.social.linkedin}
GitHub: ${profile.social.github}
Email: ${profile.email}
Phone: ${profile.phone}

Tone: Friendly, professional, slightly casual. Keep responses under 3 sentences unless asked for details. Don't make up information — if you don't know something, say so.`

const TOPICS = {
  stack: ['stack', 'tecnología', 'technology', 'technolog', 'skills', 'sabe', 'conoce', 'lenguaje', 'language', 'framework', 'laravel', 'react', 'tools'],
  projects: ['proyecto', 'project', 'mezquita', 'al-quds', 'lifters', 'tunely', 'synkiria', 'trabajo', 'ha hecho', 'built', 'desarrollado', 'portfolio'],
  experience: ['experiencia', 'experience', 'trabajado', 'work', 'job', 'empresa', 'company', 'odoo', 'synkiria', 'bugaderia'],
  education: ['educación', 'education', 'estudio', 'study', 'carrera', 'degree', 'daw', 'asix', 'cami de mar', 'formación'],
  contact: ['contacto', 'contact', 'linkedin', 'github', 'email', 'correo', 'teléfono', 'phone', 'contratar', 'hire'],
  ai: ['ia', 'ai', 'inteligencia', 'agente', 'agent', 'llm', 'openai', 'claude', 'automation', 'automatización', 'prompt'],
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
• stack — tecnologías y skills
• proyectos — Mezquita Al-Quds, Lifters, Tunely
• experiencia — trabajo en Synkiria y Bugaderia
• educación — DAW, ASIX, bachillerato
• contacto — email, teléfono, LinkedIn, GitHub
• ia — su enfoque en AI y automatización

Ej: "qué stack usa?", "háblame de la mezquita", "dónde ha trabajado?"`,
  en: `You can ask me about:
• stack — technologies and skills
• projects — Mezquita Al-Quds, Lifters, Tunely
• experience — work at Synkiria and Bugaderia
• education — DAW, ASIX, high school
• contact — email, phone, LinkedIn, GitHub
• ai — his AI and automation focus

Eg: "what's his stack?", "tell me about mezquita", "where did he work?"`,
}

export function generateFallbackResponse(message) {
  const msg = message.toLowerCase()
  const l = lang(msg)

  if (isGreeting(msg)) {
    const greeting = l === 'es'
      ? '¡Hola! 👋 Soy el asistente de Soulaimane.'
      : 'Hi! 👋 I\'m Soulaimane\'s assistant.'
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
        ? `Stack de Soulaimane: ${Object.values(profile.skills).flat().join(', ')}. Sus puntos fuertes: Laravel en backend, React en frontend, e integración con IA/LLMs.`
        : `Soulaimane's stack: ${Object.values(profile.skills).flat().join(', ')}. His core strengths: Laravel for backend, React for frontend, and AI/LLM integration.`

    case 'projects':
      return l === 'es'
        ? `Su proyecto principal es Mezquita Al-Quds, una plataforma completa con auth, dashboards y CMS hecha con Laravel + React. También hizo Lifters, Tunely, y trabajó en sistemas de automatización en Synkiria.`
        : `His main project is Mezquita Al-Quds, a full platform with auth, dashboards, and CMS built with Laravel + React. He also built Lifters and Tunely, and worked on automation systems at Synkiria.`

    case 'experience':
      return l === 'es'
        ? `Trabajó como Automation & ERP Developer en Synkiria (jun 2025 - feb 2026), creando integraciones Odoo, flujos REST API y procesos automatizados. Antes estuvo en Bugaderia Neutral.`
        : `He worked as an Automation & ERP Developer at Synkiria (Jun 2025 - Feb 2026), building Odoo integrations, REST API workflows, and automated business processes. Before that, at Bugaderia Neutral.`

    case 'education':
      return l === 'es'
        ? `Completó el CFGS en Desarrollo de Aplicaciones Web (DAW) en Ins Camí de Mar (2024-2026) y ahora cursa Administración de Sistemas Informáticos en Red. También tiene Bachillerato Científico-Tecnológico.`
        : `He completed a CFGS in Web Application Development (DAW) at Ins Camí de Mar (2024-2026) and is currently studying IT Systems & Network Administration. He also has a scientific-technological high school diploma.`

    case 'contact':
      return l === 'es'
        ? `Email: ${profile.email}\nTeléfono: ${profile.phone}\nLinkedIn: ${profile.social.linkedin}\nGitHub: ${profile.social.github}`
        : `Email: ${profile.email}\nPhone: ${profile.phone}\nLinkedIn: ${profile.social.linkedin}\nGitHub: ${profile.social.github}`

    case 'ai':
      return l === 'es'
        ? `La IA y automatización son su enfoque principal. Trabaja con APIs de LLM (OpenAI, Claude), frameworks de agentes y prompt engineering. En Synkiria automatizaba workflows con Odoo y REST APIs.`
        : `AI and automation are his main focus. He works with LLM APIs (OpenAI, Claude), agent frameworks, and prompt engineering. At Synkiria he automated workflows with Odoo and REST APIs.`

    default:
      return `${availableTopicsText[l]}`
  }
}
