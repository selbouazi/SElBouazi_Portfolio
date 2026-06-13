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

export const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in Soulaimane El Bouazi's terminal portfolio website.

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

Tone: Friendly, professional, slightly casual. Keep responses under 3 sentences unless asked for details. Don't make up information — if you don't know something, say so.`

export function generateFallbackResponse(message) {
  const msg = message.toLowerCase()

  if (msg.includes('hola') || msg.includes('hey') || msg.includes('hi') || msg.includes('hello')) {
    return '¡Hola! I\'m Soulaimane\'s AI assistant. Ask me about his skills, projects, experience, or anything else about his profile!'
  }

  if (msg.includes('stack') || msg.includes('tecnología') || msg.includes('technolog') || msg.includes('skills') || msg.includes('sabe') || msg.includes('conoce')) {
    return `Soulaimane's stack: ${Object.values(profile.skills).flat().join(', ')}. His core strengths are Laravel for backend, React for frontend, and AI/LLM integration.`
  }

  if (msg.includes('proyecto') || msg.includes('project') || msg.includes('mezquita') || msg.includes('trabajo') || msg.includes('built') || msg.includes('ha hecho')) {
    return `His main project is Mezquita Al-Quds, a full platform with auth, dashboards, and CMS built with Laravel + React. He also built Lifters and Tunely, and worked on automation systems at Synkiria.`
  }

  if (msg.includes('experiencia') || msg.includes('experience') || msg.includes('trabajado') || msg.includes('work') || msg.includes('synkiria') || msg.includes('odoo')) {
    return `He worked as an Automation & ERP Developer at Synkiria (jun 2025 - feb 2026), building Odoo integrations, REST API workflows, and automated business processes. Before that, he worked at Bugaderia Neutral.`
  }

  if (msg.includes('educación') || msg.includes('education') || msg.includes('estudio') || msg.includes('study') || msg.includes('daw') || msg.includes('carrera')) {
    return `He completed a CFGS in Web Application Development (DAW) at Ins Camí de Mar (2024-2026) and is currently studying IT Systems & Network Administration. He also has a Bachillerato Científico-Tecnológico.`
  }

  if (msg.includes('contacto') || msg.includes('contact') || msg.includes('linkedin') || msg.includes('github') || msg.includes('email') || msg.includes('contratar') || msg.includes('hire')) {
    return `You can find Soulaimane on LinkedIn (${profile.social.linkedin}) and GitHub (${profile.social.github}). He's open to junior roles!`
  }

  if (msg.includes('ia') || msg.includes('ai') || msg.includes('inteligencia') || msg.includes('agente') || msg.includes('llm') || msg.includes('openai') || msg.includes('claude') || msg.includes('automation') || msg.includes('automatización')) {
    return `AI and automation are his main focus right now. He works with LLM APIs (OpenAI, Claude), explores AI agent frameworks, and does prompt engineering. At Synkiria he automated business workflows with Odoo and REST APIs.`
  }

  if (msg.includes('cuánto') || msg.includes('años') || msg.includes('edad') || msg.includes('old') || msg.includes('age')) {
    return 'I don\'t have specific information about his age, but I know he\'s a motivated junior developer looking to grow in the industry!'
  }

  return `Soulaimane is a Full Stack Developer specializing in Laravel, React, and AI Agents. He recently completed his CFGS in Web Development (DAW) and is looking for junior roles. Try asking about his projects, skills, or experience!`
}
