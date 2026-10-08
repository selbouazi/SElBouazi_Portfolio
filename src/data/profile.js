const profile = {
  name: "Soulaimane El Bouazi",
  title: "ASIX Student — Systems, Networking and Linux",
  tagline: "Systems · Networking · Linux",
  location: "Tarragona, España",
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
    "I'm an ASIX student (Computer Systems and Networks Administration) and I've just finished a Web Application Development degree (DAW), so I have a solid development background: Laravel, React, MySQL and REST APIs.",
    "I'm now moving into systems and networking: Linux, Windows Server, networks, virtualization and security. I learn by building, so I document my labs and practice projects.",
    "I'm looking for an internship where I can learn in a real systems, support or infrastructure environment. My experience programming and automating (Odoo, APIs, scripts) helps me understand how applications connect with the systems that run them.",
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
        "Web applications for small businesses and independent clients using Laravel, PHP, React and MySQL.",
        "APIs, deployment, maintenance and support.",
        "TODO: add concrete clients or links.",
      ],
    },
    {
      company: "Synkiria, SLU",
      role: "Automation & ERP Developer",
      period: "Jun 2025 - Feb 2026",
      location: "Tarragona",
      highlights: [
        "Automated workflows and integrations via REST APIs connecting internal tools with external services.",
        "Worked with Odoo ERP, adapting modules to real business logic and client requirements.",
        "Built integrations that reduced manual overhead across teams.",
        "Collaborated on technical documentation and system reliability improvements.",
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
      institution: "Ins Camí de Mar",
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
      institution: "Ins Camí de Mar",
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
      description: "Full platform with authentication, dashboards, CMS and responsive design. Built for a real client.",
      stack: ["Laravel", "React", "MySQL"],
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
      name: "Synkiria, automation and ERP integrations",
      description: "Automated workflows and integrations with Odoo and REST APIs to reduce manual work.",
      stack: ["Odoo", "REST APIs", "Python"],
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
      description: "Full-stack CRUD app with Laravel, React and MySQL.",
      stack: ["Laravel", "React", "MySQL"],
      highlights: [],
      url: "",
      github: "",
    },
    {
      id: "tunely",
      name: "Tunely",
      description: "React app consuming a third-party API.",
      stack: ["React", "API", "JavaScript"],
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
