# Soulaimane El Bouazi — Portfolio

A bilingual (ES/EN) one-page visual portfolio built with **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. Features a real AI-powered chat assistant powered by **Groq** (Llama 3), a working contact form via **Formspree**, and smooth scroll-driven animations throughout.

**[soulaimaneelbouazi.com](https://soulaimaneelbouazi.com)**

---

## Features

- **Hero** — Typewriter effect cycling tech phrases, mouse-tracking radial glow, particle canvas background
- **About** — Bio with three gradient-border highlight cards (AI, Stack, Open to Work)
- **Projects** — Scroll-linked zoom/opacity animations with a section progress bar
- **Skills** — SVG animated circular progress gauges with per-skill levels
- **Experience** — Vertical timeline with scroll-reveal scale + opacity effects
- **Contact** — Email/phone buttons, LinkedIn/GitHub icons, functional form (Formspree)
- **AI Chat** — Floating widget with quick topics, typing indicator, powered by Groq (Llama 3.3 70B)
- **i18n** — Spanish (default) and English, toggled from the navbar
- **Dark theme** — Matrix-green accent on deep black, custom scrollbar
- **Custom favicon** — AI-generated SVG portrait with purple gradient styling
- **Vercel-ready** — Includes serverless function at `api/chat.js` to keep API keys server-side

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| i18n | react-i18next + i18next |
| AI API | Groq (Llama 3.3 70B) |
| Contact form | Formspree |
| Hosting | Vercel (static + serverless) |
| Fonts | Inter + JetBrains Mono |

---

## Quick Start

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
GROQ_API_KEY=gsk_...         # Server-side (Vercel only)
VITE_GROQ_API_KEY=gsk_...    # Local dev only (optional)
VITE_FORMSPREE_ID=xxxxx      # Formspree form ID
```

On **Vercel**, add these under **Environment Variables**:
- `GROQ_API_KEY` — used by the serverless function at `/api/chat`
- `VITE_FORMSPREE_ID` — used client-side by the contact form

---

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Root layout
├── index.css             # Global styles + Tailwind
├── ai/
│   ├── api.js            # AI orchestrator (3-tier fallback)
│   └── prompt.js         # System prompt + local fallback engine
├── components/
│   ├── Navbar.jsx        # Fixed nav, scroll spy, lang toggle
│   ├── Hero.jsx          # Hero with typewriter + glow
│   ├── HeroCanvas.jsx    # Particle canvas background
│   ├── About.jsx         # Bio + highlight cards
│   ├── Projects.jsx      # Project grid with scroll animations
│   ├── Skills.jsx        # Circular skill gauges
│   ├── Experience.jsx    # Timeline layout
│   ├── Contact.jsx       # Contact form + social links
│   └── AiChat.jsx        # Floating AI chat widget
├── data/
│   └── profile.js        # Single source of truth for profile data
├── i18n/
│   ├── index.js          # i18next init
│   └── locales/
│       ├── es.json       # Spanish translations
│       └── en.json       # English translations
api/
└── chat.js               # Vercel serverless function (Groq proxy)
```

---

## AI Chat Architecture

The AI chat uses a **3-tier fallback chain**:

1. **Vercel serverless** (`/api/chat`) — calls Groq with server-side key (production)
2. **Direct browser** (`callDirectGroq`) — uses `VITE_GROQ_API_KEY` (local dev)
3. **Local fallback** (`generateFallbackResponse`) — keyword-based responses, no API needed

See `DOCUMENTATION.md` for the full architecture breakdown.

---

## Deployment

1. Push to GitHub
2. Import repo in **Vercel**
3. Add environment variables:
   - `GROQ_API_KEY`
   - `VITE_FORMSPREE_ID`
4. Deploy — the serverless function at `api/chat.js` is automatically detected

---

## License

MIT
