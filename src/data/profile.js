const profile = {
  name: "Soulaimane El Bouazi",
  title: "Full Stack Developer",
  tagline: "Laravel · React · AI Agents & Automation",
  location: "España",
  email: "",
  social: {
    linkedin: "https://www.linkedin.com/in/soulaimane-el-bouazi-a20a66346",
    github: "https://github.com/selbouazi",
  },

  about: [
    "Junior Full Stack Developer with hands-on experience building real web applications and integrating AI-powered tools into practical workflows.",
    "My stack covers Laravel, React, Vite and MySQL for the backend and frontend side, but what I'm most interested in right now is the intersection of development and AI — building agent-based systems, working with LLM APIs (OpenAI, Claude) and designing workflows where AI actually does useful things, not just demos.",
    "I've shipped real projects: a full platform for Mezquita Al-Quds (auth, dashboards, CMS, responsive design) and smaller apps like Lifters and Tunely. I care about clean code, good architecture and understanding how things actually work under the hood.",
    "I'm actively exploring AI agent frameworks, prompt engineering and how to build systems that are reliable enough to use in production. Still learning — but intentionally.",
    "Open to junior roles where I can contribute from day one and grow around people who take their craft seriously.",
  ],

  skills: {
    Frontend: ["React", "Vite", "Tailwind CSS", "Responsive Design", "JavaScript"],
    Backend: ["Laravel", "PHP", "MySQL", "REST APIs"],
    AI: ["LLM APIs (OpenAI, Claude)", "Prompt Engineering", "AI Agents"],
    Tools: ["Git", "Odoo ERP", "VSCode", "Linux", "Automatización"],
  },

  experience: [
    {
      company: "Synkiria, SLU",
      role: "Automation & ERP Developer",
      period: "jun 2025 - feb 2026",
      location: "Таррагона",
      highlights: [
        "Designed and maintained automated workflows connecting internal tools and external services via REST APIs.",
        "Worked with Odoo ERP, adapting modules to real business logic and client requirements.",
        "Built integrations that reduced manual overhead across teams.",
        "Collaborated on technical documentation and system reliability improvements.",
      ],
    },
    {
      company: "Bugaderia Neutral",
      role: "Mozo de almacén",
      period: "jun 2024 - feb 2026",
      location: "Таррагона",
      highlights: [
        "Inventory management and production classification.",
        "Order preparation and quality control.",
        "Teamwork in a high-volume, fast-paced environment.",
      ],
    },
  ],

  education: [
    {
      institution: "Ins Camí de Mar",
      degree: "CFGS IT Systems and Network Administration",
      period: "2026 - actualidad",
    },
    {
      institution: "Ins Camí de Mar",
      degree: "CFGS Web Application Development",
      period: "2024 - 2026",
      details: [
        "Two-year vocational program focused on full-stack web development.",
        "Technologies: PHP, Laravel, JavaScript, React, MySQL, REST APIs, Git, deployment, responsive design.",
        "Hands-on projects building real applications with clean code principles.",
      ],
    },
    {
      institution: "Ins Baix Penedès",
      degree: "Bachelor's degree Technological Scientific",
      period: "2022 - 2024",
    },
  ],

  projects: [
    {
      id: "mezquita-al-quds",
      name: "Mezquita Al-Quds",
      description: "Full platform with authentication, dashboards, CMS and responsive design. Built for a real client.",
      stack: ["Laravel", "React", "MySQL", "Auth", "CMS"],
      highlights: [
        "Authentication system with role-based access control.",
        "Admin dashboard with analytics and content management.",
        "Responsive frontend built with React.",
        "Deployed and used in production.",
      ],
      url: "",
      github: "",
    },
    {
      id: "synkiria-automation",
      name: "Synkiria Automation",
      description: "Automated workflows and ERP integrations connecting internal tools with external REST APIs.",
      stack: ["Odoo ERP", "REST APIs", "Python", "Automatización"],
      highlights: [
        "Automated business workflows between internal systems.",
        "Odoo module customization for client-specific logic.",
        "API integrations reducing manual overhead.",
      ],
      url: "",
      github: "",
    },
    {
      id: "lifters",
      name: "Lifters",
      description: "Web application built during my studies, applying full-stack development principles.",
      stack: ["Laravel", "React", "MySQL"],
      highlights: [
        "Full-stack CRUD application.",
        "Database modeling and relationships.",
        "RESTful API design.",
      ],
      url: "",
      github: "",
    },
    {
      id: "tunely",
      name: "Tunely",
      description: "Music-related web application exploring API integration and frontend interactivity.",
      stack: ["React", "API", "JavaScript"],
      highlights: [
        "Third-party API integration.",
        "Dynamic UI with state management.",
        "Responsive design.",
      ],
      url: "",
      github: "",
    },
  ],

  easterEggs: {
    sudo: "Nice try, but you don't have root access here.",
    exit: "You can't escape that easily. Try 'help' instead.",
    matrix: "Wake up, Neo...",
  },
}

export default profile
