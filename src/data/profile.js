const profile = {
  name: "Soulaimane El Bouazi",
  title: "ASIX Student — Systems, Networking and Linux",
  tagline: "Systems · Networking · Linux",
  location: "Santa Oliva, El Vendrell (Tarragona)",
  email: "selbouazi@gmail.com",
  // TODO: decidir si el teléfono sigue siendo público
  phone: "644428283",
  social: {
    // TODO: confirmar la URL definitiva de LinkedIn
    linkedin: "https://www.linkedin.com/in/selbouazi",
    // TODO: confirmar la URL de GitHub
    github: "https://github.com/selbouazi",
  },

  about: [
    "I'm an ASIX student (Computer Systems and Networks Administration) and I've just finished a Web Application Development degree (DAW), so I have a real development background: Laravel, React, Vue, MySQL and REST APIs.",
    "At Synkiria I did automation, not web development: I replaced manual tasks with n8n and integrated Odoo with other systems through REST APIs.",
    "I'm now moving into systems and networking: Linux, Windows Server, networks, virtualization and security. I learn by building, so I document my labs and practice projects.",
    "I'm looking for an internship where I can learn in a real systems, support or infrastructure environment. My experience programming and automating (Odoo, n8n, APIs, scripts) helps me understand how applications connect with the systems that run them.",
  ],

  skills: {
    Systems: ["Linux", "Windows Server"],
    Networking: ["Networking fundamentals", "TCP/IP and addressing"],
    Security: ["Security fundamentals"],
    Scripting: ["Bash", "Python"],
    Development: ["Laravel", "PHP", "React", "Vite", "Tailwind", "MySQL", "REST APIs"],
    Tools: ["Git", "Odoo ERP", "VSCode"],
  },

  experience: [
    {
      company: "Freelance",
      role: "Full stack freelance developer",
      period: "May 2026 - present",
      location: "Tarragona",
      highlights: [
        "Websites for local businesses: clear, mobile-first and live without hassle.",
        "Projects built on my own initiative with Laravel, React and Vue, from the database to deployment.",
        "TODO: add concrete clients or links.",
      ],
    },
    {
      company: "Synkiria, SLU",
      role: "Automation & ERP Developer",
      period: "Jun 2025 - Feb 2026",
      location: "El Vendrell",
      highlights: [
        "Automated business workflows with n8n, replacing tasks that were previously done by manual work.",
        "Integrated Odoo ERP with other systems and external services via REST APIs.",
        "Technical documentation and improvements to the reliability of the automated flows.",
      ],
    },
    {
      company: "Bugaderia Neutral",
      role: "Warehouse Worker",
      period: "Jun 2024 - Sep 2025",
      location: "Tarragona",
      highlights: [
        "Inventory management and production classification.",
        "Order preparation and quality control.",
        "Teamwork in a high-volume, fast-paced environment.",
      ],
    },
  ],

  education: [
    {
      institution: "Ins Camí de Mar (Calafell)",
      degree: "CFGS Computer Systems and Networks Administration (ASIX)",
      period: "2026 - 2028 (in progress)",
      details: [
        "Networking, Linux, Windows Server, systems administration, virtualization, network services and security.",
      ],
    },
    {
      institution: "Professor Messer",
      degree: "CompTIA A+",
      period: "In preparation",
    },
    {
      institution: "Ins Camí de Mar (Calafell)",
      degree: "CFGS Web Application Development (DAW)",
      period: "2024 - 2026",
      details: [
        "Two-year vocational program focused on full-stack web development.",
        "Technologies: PHP, Laravel, JavaScript, React, MySQL, REST APIs, Git, deployment, responsive design.",
        "Hands-on projects building real applications with clean code principles.",
      ],
    },
    {
      institution: "Ins Baix Penedès",
      degree: "Scientific-Technological Bachillerato",
      period: "2022 - 2024",
    },
  ],

  projects: [
    {
      id: "mezquita-al-quds",
      name: "Mezquita Al-Quds",
      description: "Complete platform with authentication, dashboards and CMS. Built on my own initiative as a portfolio project.",
      stack: ["Laravel", "React", "MySQL"],
      highlights: [
        "Authentication system with role-based access control.",
        "Admin dashboard with analytics and content management.",
        "Responsive frontend built with React.",
        "Finished and ready to deploy; not yet online (no hosting paid for).",
      ],
      url: "",
      github: "",
    },
    {
      id: "synkiria-automation",
      name: "Synkiria, automation and ERP integrations",
      description: "Automated workflows and integrations with Odoo and REST APIs, replacing manual work.",
      stack: ["n8n", "Odoo", "REST APIs", "Python"],
      highlights: [
        "Automated business workflows between internal systems with n8n.",
        "Odoo integrations with other services through REST APIs.",
        "Documentation and improvements to the reliability of the flows.",
      ],
      url: "",
      github: "",
    },
    {
      id: "lifters",
      name: "Lifters",
      description: "Full-stack CRUD app with Laravel, React and MySQL. Built as a coursework project for the DAW program.",
      stack: ["Laravel", "React", "MySQL"],
      highlights: [],
      url: "",
      github: "",
    },
    {
      id: "tunely",
      name: "Tunely",
      description: "Web app built with Vue on the front end and Laravel on the back end, with its own database.",
      stack: ["Vue", "Laravel", "MySQL"],
      highlights: [],
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
