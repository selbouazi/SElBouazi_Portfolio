import profile from '../data/profile.js'

const COMMANDS = {
  help: {
    desc: 'Show available commands',
    fn: () => {
      const groups = [
        { label: 'Navigation', cmds: ['help', 'about', 'skills', 'experience', 'education', 'projects', 'contact'] },
        { label: 'Projects', cmds: ['project <name>', 'ls'] },
        { label: 'System', cmds: ['clear', 'whoami', 'banner', 'date', 'theme', 'social'] },
        { label: 'AI', cmds: ['ai'] },
        { label: 'Fun', cmds: ['sudo', 'exit', 'matrix'] },
      ]
      const lines = ['Available commands:\n']
      for (const group of groups) {
        lines.push(`  ${group.label}:`)
        for (const cmd of group.cmds) {
          lines.push(`    ${cmd.padEnd(20)} ${COMMANDS[cmd.split(' ')[0]]?.desc || ''}`)
        }
        lines.push('')
      }
      lines.push('Tip: try Tab for autocomplete, Up/Down for command history')
      return lines.join('\n')
    },
  },

  about: {
    desc: 'About Soulaimane',
    fn: () => {
      return [
        '╔══════════════════════════════════════════════╗',
        '║              SOULAIMANE EL BOUAZI            ║',
        `║         ${'Full Stack Developer'.padEnd(35)}║`,
        `║    ${'Laravel · React · AI Agents & Automation'.padEnd(35)}║`,
        '╚══════════════════════════════════════════════╝',
        '',
        ...profile.about.map((p) => `  ${p}`),
        '',
        `  Location: ${profile.location}`,
        '',
      ].join('\n')
    },
  },

  whoami: {
    desc: 'Display current user',
    fn: () => `  ${profile.name} — ${profile.title}`,
  },

  date: {
    desc: 'Show current date',
    fn: () => `  ${new Date().toLocaleString('en-ES', { timeZone: 'Europe/Madrid' })}`,
  },

  banner: {
    desc: 'Show the banner',
    fn: () => {
      return [
        '╔══════════════════════════════════════════════════════╗',
        '║   ███████╗██████╗     ██████╗ ██████╗ ██╗   ██╗    ║',
        '║   ██╔════╝██╔══██╗   ██╔═══██╗██╔══██╗╚██╗ ██╔╝    ║',
        '║   ███████╗██████╔╝   ██║   ██║██████╔╝ ╚████╔╝     ║',
        '║   ╚════██║██╔══██╗   ██║   ██║██╔═══╝   ╚██╔╝      ║',
        '║   ███████║██║  ██║   ╚██████╔╝██║        ██║       ║',
        '║   ╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝        ╚═╝       ║',
        '╚══════════════════════════════════════════════════════╝',
        '',
        '  Welcome to Soulaimane\'s terminal portfolio v1.0',
        '  Type \'help\' to see available commands',
      ].join('\n')
    },
  },

  clear: {
    desc: 'Clear the terminal',
    fn: () => null,
    isClear: true,
  },

  ls: {
    desc: 'List available sections',
    fn: () => {
      return [
        'about/     skills/    experience/  education/',
        'projects/  contact/   social/      ai/',
      ].join('\n')
    },
  },

  social: {
    desc: 'Show social links',
    fn: () => {
      return [
        '  Social:',
        `    LinkedIn: ${profile.social.linkedin}`,
        `    GitHub:   ${profile.social.github}`,
      ].join('\n')
    },
  },

  skills: {
    desc: 'Show skills',
    fn: () => {
      const lines = ['Skills:\n']
      for (const [category, items] of Object.entries(profile.skills)) {
        lines.push(`  ${category}:`)
        for (const skill of items) {
          lines.push(`    • ${skill}`)
        }
        lines.push('')
      }
      return lines.join('\n')
    },
  },

  experience: {
    desc: 'Show work experience',
    fn: () => {
      const lines = ['Experience:\n']
      for (const exp of profile.experience) {
        lines.push(`  ${exp.role} @ ${exp.company}`)
        lines.push(`  ${exp.period} — ${exp.location}\n`)
        for (const h of exp.highlights) {
          lines.push(`    • ${h}`)
        }
        lines.push('')
      }
      return lines.join('\n')
    },
  },

  education: {
    desc: 'Show education',
    fn: () => {
      const lines = ['Education:\n']
      for (const edu of profile.education) {
        lines.push(`  ${edu.degree}`)
        lines.push(`  ${edu.institution} — ${edu.period}\n`)
        if (edu.details) {
          for (const d of edu.details) {
            lines.push(`    • ${d}`)
          }
          lines.push('')
        }
      }
      return lines.join('\n')
    },
  },

  projects: {
    desc: 'Show all projects',
    fn: () => {
      const lines = ['Projects:\n']
      for (const proj of profile.projects) {
        lines.push(`  ${proj.name}`)
        lines.push(`  ${proj.description}\n`)
        lines.push(`  Stack: ${proj.stack.join(', ')}`)
        lines.push(`  Try: 'project ${proj.id}' for details\n`)
        lines.push('')
      }
      return lines.join('\n')
    },
  },

  project: {
    desc: 'Show project details. Usage: project <id>',
    fn: (args) => {
      if (!args || args.length === 0) {
        return '  Usage: project <id>\n  Available: ' + profile.projects.map((p) => p.id).join(', ')
      }
      const id = args[0].toLowerCase()
      const proj = profile.projects.find((p) => p.id === id)
      if (!proj) {
        return `  Project '${id}' not found.\n  Available: ` + profile.projects.map((p) => p.id).join(', ')
      }
      const lines = [
        `  ${'═'.repeat(40)}`,
        `  ${proj.name}`,
        `  ${'═'.repeat(40)}`,
        '',
        `  ${proj.description}`,
        '',
        `  Stack: ${proj.stack.join(', ')}`,
        '',
        '  Highlights:',
      ]
      for (const h of proj.highlights) {
        lines.push(`    • ${h}`)
      }
      if (proj.url) lines.push(`\n  URL: ${proj.url}`)
      if (proj.github) lines.push(`  GitHub: ${proj.github}`)
      return lines.join('\n')
    },
  },

  theme: {
    desc: 'Cycle terminal theme: green, amber, blue',
    fn: () => '  Theme cycled. Current themes: green, amber, blue.',
  },

  contact: {
    desc: 'Show contact information',
    fn: () => {
      return [
        '  Contact:',
        `    Email:    ${profile.email || '(not provided — find me on LinkedIn)'}`,
        `    LinkedIn: ${profile.social.linkedin}`,
        `    GitHub:   ${profile.social.github}`,
        '',
        '  Open to junior roles — feel free to reach out!',
      ].join('\n')
    },
  },

  sudo: {
    desc: 'Try it',
    fn: () => `  ${profile.easterEggs.sudo}`,
  },

  exit: {
    desc: 'Try it',
    fn: () => `  ${profile.easterEggs.exit}`,
  },

  matrix: {
    desc: 'Try it',
    fn: () => `  ${profile.easterEggs.matrix}`,
  },
}

export function getCommand(input) {
  const trimmed = input.trim()
  if (!trimmed) return null
  const parts = trimmed.split(/\s+/)
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1)
  return COMMANDS[cmd] ? { cmd, args, handler: COMMANDS[cmd] } : null
}

export function isClearCommand(input) {
  const cmd = getCommand(input)
  return cmd?.handler?.isClear || false
}

export function getAllCommandNames() {
  return Object.keys(COMMANDS).sort()
}

export default COMMANDS
