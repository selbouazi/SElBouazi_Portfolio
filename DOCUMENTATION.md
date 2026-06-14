# Soulaimane El Bouazi Portfolio — Technical Documentation

## Overview

A single-page portfolio website for Soulaimane El Bouazi, a Full Stack Developer specializing in Laravel, React, and AI integration. The site features a dark visual theme with Matrix-green accents, bilingual support (Spanish/English), scroll-driven animations, and an AI-powered chat assistant.

**Tech:** React 19 · Vite 8 · Tailwind CSS v4 · Framer Motion 12 · Groq AI · Vercel

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Project Structure](#2-project-structure)
3. [Component Catalog](#3-component-catalog)
4. [Animation System](#4-animation-system)
5. [AI Chat System](#5-ai-chat-system)
6. [Internationalization (i18n)](#6-internationalization-i18n)
7. [Styling System](#7-styling-system)
8. [Data Flow](#8-data-flow)
9. [Deployment](#9-deployment)
10. [Environment Variables](#10-environment-variables)

---

## 1. Architecture Overview

```
Browser
  │
  ├── Static assets (HTML, JS, CSS) ── Vercel CDN
  │
  ├── /api/chat (POST) ────────────── Vercel Serverless Function ── Groq API
  │
  └── Formspree (POST) ────────────── Formspree API ── Email
```

The portfolio is a **static SPA** served by Vercel. The only server-side logic is a single serverless function at `/api/chat` that proxies requests to Groq, keeping the API key hidden from the browser. The contact form posts directly to Formspree.

---

## 2. Project Structure

```
/
├── index.html                 # Vite entry HTML (Google Fonts, favicon)
├── vite.config.js             # Vite config (React + Tailwind plugins)
├── package.json               # Dependencies & scripts
├── eslint.config.js           # ESLint flat config
│
├── api/
│   └── chat.js                # Vercel serverless function (Groq proxy)
│
├── public/
│   └── favicon.svg            # S-shaped gradient icon
│
├── src/
│   ├── main.jsx               # ReactDOM.createRoot + i18n import
│   ├── App.jsx                # Root: renders Navbar, sections, AiChat, Footer
│   ├── index.css              # Tailwind import + custom theme + utilities
│   │
│   ├── ai/
│   │   ├── api.js             # getAiResponse() — 3-tier fallback orchestrator
│   │   └── prompt.js          # SYSTEM_PROMPT + generateFallbackResponse()
│   │
│   ├── components/
│   │   ├── Navbar.jsx         # Fixed nav, scroll spy, hamburger, lang toggle
│   │   ├── Hero.jsx           # Typewriter, mouse glow, CTA buttons
│   │   ├── HeroCanvas.jsx     # HTML5 Canvas particle system (optional)
│   │   ├── About.jsx          # Bio + 3 gradient-border cards
│   │   ├── Projects.jsx       # Grid with scroll-linked animations
│   │   ├── Skills.jsx         # SVG circular progress gauges
│   │   ├── Experience.jsx     # Vertical timeline
│   │   ├── Contact.jsx        # Form + social links
│   │   └── AiChat.jsx         # Floating chat UI
│   │
│   ├── data/
│   │   └── profile.js         # Single source of truth for all profile data
│   │
│   └── i18n/
│       ├── index.js           # i18next initialization
│       └── locales/
│           ├── es.json        # Spanish translations
│           └── en.json        # English translations
│
└── dist/                      # Production build output
```

---

## 3. Component Catalog

### 3.1 Navbar (`src/components/Navbar.jsx`)

**Purpose:** Fixed top navigation with section highlighting and language toggle.

**Key implementation details:**

- **Scroll spy:** Uses a `scroll` event listener. On each scroll, iterates through all section IDs and checks `getBoundingClientRect().top <= viewportCenter` (where `center = window.innerHeight / 2 + 80`). The last section whose top is above the center point wins.
- **Mobile menu:** Hamburger icon made of 3 animated `<motion.span>` elements. Uses Framer Motion `animate` to rotate the top/bottom bars into an X and fade out the middle bar. Wrapped in `<AnimatePresence>` for enter/exit transitions.
- **Language toggle:** Calls `i18n.changeLanguage()` directly. Switches between `'es'` and `'en'`.
- **Scroll to section:** Prevents default anchor behavior and calls `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`.

**States:**
- `active` (string): Current active section ID
- `scrolled` (boolean): Applies backdrop blur + border when scrolled past 50px
- `mobileOpen` (boolean): Toggles mobile menu visibility

---

### 3.2 Hero (`src/components/Hero.jsx`)

**Purpose:** Landing section with typewriter effect, mouse-following glow, and entry animations.

**Key implementation details:**

- **Typewriter hook (`useTypewriter`):** Internal custom hook that cycles through 5 phrases. Types at 80ms + random jitter per character, pauses 2s at completion, deletes at 30ms + jitter, then advances to next phrase. Returns the current `display` string.
- **Mouse glow:** `onMouseMove` handler on the section captures cursor position normalized to 0-1 range. A `radial-gradient` overlay follows the cursor with accent color at 30% opacity falling to transparent at 60%.
- **Staggered entrance:** All children use `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}` with delays of 0, 0.15, 0.3, 0.4, 0.55, 0.9 seconds.
- **Blinking cursor:** An inline `<span>` with `animation: blink 0.8s step-end infinite`. The `@keyframes blink` is defined in `src/index.css`.

**Phrases cycled:**
1. "Laravel + React"
2. "AI Agents & Automation"
3. "LLMs en producción"
4. "Sistemas con IA integrada"
5. "Odoo + REST APIs"

---

### 3.3 HeroCanvas (`src/components/HeroCanvas.jsx`)

**Purpose:** Full-screen HTML5 Canvas particle system (independent component, not currently rendered in `App.jsx`).

**Implementation:**
- Particle count: `Math.min(120, Math.floor((width * height) / 8000))`
- `Particle` class: position, size (0.5-2.5px), velocity (±0.2), opacity (0.2-0.8)
- Mouse repulsion: particles within 120px of cursor are pushed away
- Connection lines: particles within 130px of each other draw semi-transparent lines
- All particles/lines colored `rgba(0, 255, 65, opacity)`
- Cleans up event listeners and animation frame on unmount

---

### 3.4 About (`src/components/About.jsx`)

**Purpose:** Bio section with introductory text and highlight cards.

**Layout:** Two-column responsive grid. Left column renders bio paragraphs from i18n. Right column contains three gradient-border cards:
1. **AI & Automation** — tags: LLM APIs, Prompt Engineering, AI Agents, Odoo, REST APIs
2. **Main Stack** — tags: Laravel, React, MySQL, Vite, Tailwind, Git
3. **Open to Work** — descriptive text about looking for junior roles

All cards use `whileInView` with staggered delays (`cardIdx * 0.1`).

---

### 3.5 Projects (`src/components/Projects.jsx`)

**Purpose:** Project showcase with scroll-linked animations.

**Two components:**

**`Projects` (section container):**
- Uses `useScroll()` with offset `['0 0.8', '0.2 0']` to track section visibility
- Maps scroll progress to a progress bar width via `useTransform(scrollYProgress, [0, 1], ['0%', '100%'])`
- Renders a grid of `ProjectCard` components

**`ProjectCard` (individual card):**
- Each card has its own `useScroll()` with offset `['0 1', '1.2 1']`
- Maps scroll progress → scale (0.9 → 1) and opacity (0.3 → 1)
- Tech stack tags with `whileHover={{ scale: 1.1 }}`
- Project links (URL + GitHub) appear on hover
- Highlights list with staggered `whileInView` slide-in (`delay: j * 0.05`)

---

### 3.6 Skills (`src/components/Skills.jsx`)

**Purpose:** Visual skill representation with animated SVG circular progress.

**Two components:**

**`Skills` (section container):**
- Hardcoded `progressMap`: 4 categories (Frontend, Backend, AI, Tools) with skill names
- Hardcoded `skillLevels`: percentage per skill (e.g. React: 88, Laravel: 85)
- 2-column grid of category cards with emoji icons
- Staggered entrance via `whileInView` with `catIdx * 0.1` delay

**`CircularProgress` (individual gauge):**
- SVG circle: radius 28, circumference = 2πr
- Animation: `strokeDasharray` set to circumference, `strokeDashoffset` animates from circumference to `circumference - (value/100) * circumference`
- Duration: 1.2s, ease: `easeOut`, delay: parameterized per item
- Glow effect: `filter: drop-shadow(0 0 4px var(--accent-glow))`
- Displays percentage text + skill label below

---

### 3.7 Experience (`src/components/Experience.jsx`)

**Purpose:** Timeline showing work experience and education.

**Two components:**

**`Experience` (section container):**
- Merges `experience.items` (work) and `experience.education_items` (education) from i18n, adding a `type` field
- Vertical timeline line: `<motion.div>` with `initial={{ scaleY: 0 }}` → `whileInView={{ scaleY: 1 }}`, duration 1.5s
- Dot grid background pattern

**`TimelineItem` (individual entry):**
- Uses `useScroll()` with offset `['0 0.9', '0.3 0.9']`
- Maps to scale (0.85 → 1) and opacity (0.2 → 1)
- Timeline dot with green glow box-shadow + `whileHover={{ scale: 1.5 }}`
- Location badge animated width from 0 to auto via `whileInView`
- Bullet points with staggered `whileInView` slide-in

---

### 3.8 Contact (`src/components/Contact.jsx`)

**Purpose:** Contact information and message form.

**Layout:** Two-column grid.
- **Left column:** Email (mailto), phone (tel), LinkedIn icon, GitHub icon — all with gradient-border styling
- **Right column:** Form with name, email, textarea, submit button

**Form submission:**
```javascript
const res = await fetch(`https://formspree.io/f/${formId}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify(formData),
})
```

**States:**
- Default: "Enviar mensaje"
- Success (3s): "✓ Enviado"
- Error (3s): "✗ Error"

---

### 3.9 AiChat (`src/components/AiChat.jsx`)

**Purpose:** Floating AI chat assistant widget.

**UI structure:**
1. **Floating button:** Fixed bottom-right, robot emoji, pulsing green box-shadow (3-keyframe cycle via Framer Motion `animate`)
2. **Chat window:** 320-384px wide, 520px max-height, dark background with accent border glow
3. **Header:** Robot emoji + green pulsing dot + title + close button
4. **Welcome screen:** Robot emoji, welcome text, 6 quick-topic buttons (stack, proyectos, experiencia, educación, contacto, ia), hint text
5. **Messages:** User right-aligned (accent dim background), AI left-aligned (dark background)
6. **Loading dots:** 3 dots with staggered opacity animation
7. **Input:** Text input + Send button, Enter key submits

**Data flow:**
```
User message → getAiResponse(message) → /api/chat OR direct Groq OR fallback
              ↓
         Response text → displayed in chat
```

---

## 4. Animation System

### 4.1 Scroll Animations (Framer Motion)

The project uses **two distinct scroll animation approaches**:

**A. `useScroll` + `useTransform` (performance-optimized):**
Used for **continuous** scroll-driven animations. These hook into the scroll progress without triggering React re-renders on every frame (Framer Motion updates them on the compositor thread).

| Component | Target | Input → Output |
|-----------|--------|----------------|
| Projects section | Section ref | scrollProgress → width `0% → 100%` |
| ProjectCard | Card ref | scrollProgress → scale `0.9 → 1`, opacity `0.3 → 1` |
| TimelineItem | Item ref | scrollProgress → scale `0.85 → 1`, opacity `0.2 → 1` |
| Skills circles | N/A | `whileInView` triggers stroke-dashoffset animation |

**B. `whileInView` (one-time entrance):**
Used for **one-shot** entrance animations. Common pattern:
```jsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
transition={{ duration: 0.6 }}
```

`margin: '-100px'` triggers the animation 100px before the element enters the viewport, making it feel seamless.

### 4.2 Hover Animations

- **Cards:** `hover:scale-105` or `motion.div` with `whileHover={{ scale: 1.05 }}`
- **Timeline dots:** `whileHover={{ scale: 1.5 }}`
- **AI button:** `whileHover={{ scale: 1.1 }}`, `whileTap={{ scale: 0.9 }}`
- **Project links:** Opacity 0 → 1 on card hover via CSS `group-hover:opacity-100`

### 4.3 Continuous Animations

- **AI button glow:** `animate={{ boxShadow: [keyframe1, keyframe2, keyframe1] }}` with `repeat: Infinity`
- **Scroll arrow bounce:** `animate={{ y: [0, 8, 0] }}` with `repeat: Infinity`
- **Pulsing online dot:** CSS `animate-pulse`

### 4.4 SVG Animations

- **Circular progress:** `strokeDasharray` + `strokeDashoffset` animation. The circle's circumference is calculated as `2πr` where r=28. The offset equals `circumference - (percent/100) * circumference`.

---

## 5. AI Chat System

### 5.1 Architecture — 3-Tier Fallback Chain

```
getAiResponse(message)
  │
  ├─ Tier 1: POST /api/chat (Vercel serverless)
  │    Uses GROQ_API_KEY (server-side env var)
  │    Model: llama-3.3-70b-versatile
  │    If fails → fall through
  │
  ├─ Tier 2: callDirectGroq() (browser-side)
  │    Uses VITE_GROQ_API_KEY (client-side env var)
  │    Same Groq endpoint and model
  │    If fails → fall through
  │
  └─ Tier 3: generateFallbackResponse()
       Pure JavaScript, no API call
       Keyword-based topic detection + canned responses
```

### 5.2 Tier 1 — Serverless Function (`api/chat.js`)

**Endpoint:** `POST /api/chat`
**Request body:** `{ message: string }`
**Response:** `{ text: string }` or `{ error: string }`

**Request flow:**
1. Validates method (POST only), body (message required), and API key exists
2. Sends POST to `https://api.groq.com/openai/v1/chat/completions`
3. Authorization: `Bearer ${process.env.GROQ_API_KEY}`
4. Model: `llama-3.3-70b-versatile`, max_tokens: 300, temperature: 0.7
5. Messages: system prompt (hardcoded profile) + user message
6. Parses response, returns `{ text: data.choices[0].message.content }`

**Error handling:**
- 405: Method not allowed
- 400: Message required
- 500: API key not configured / Internal error
- 502: Groq API error / Empty response

### 5.3 Tier 2 — Direct Browser Call (`src/ai/api.js`, `callDirectGroq()`)

- Reads `import.meta.env.VITE_GROQ_API_KEY`
- Same Groq API call as the serverless function
- Dynamically imports `SYSTEM_PROMPT` from `prompt.js`
- Falls through silently on failure

### 5.4 Tier 3 — Local Fallback (`src/ai/prompt.js`, `generateFallbackResponse()`)

**Language detection** (`lang()` function):
- Counts English indicator words in the message (what, how, the, is, are, etc.)
- If ≥ 2 English words found → respond in English, otherwise Spanish

**Greeting detection** (`isGreeting()`):
- Matches against Spanish (`hola|hey|buenas|qué tal..`) and English (`hi|hello|hey|good morning..`) patterns
- Returns greeting + available topics list

**Topic detection** (`detectTopic()`):
- Maps keywords to 6 topics:

| Topic | Keywords |
|-------|----------|
| `stack` | stack, skills, tecnolog, laravel, react, sabe... |
| `projects` | proyecto, project, mezquita, lifters, tunely... |
| `experience` | experiencia, experience, trabajo, trabajado, synkiria... |
| `education` | educación, education, estudio, daw, asix... |
| `contact` | contacto, contact, linkedin, email, teléfono... |
| `ai` | ia, ai, inteligencia, llm, openai, claude, agente... |

Each topic returns a curated 1-3 sentence response in the detected language.

**Fallback:** If no topic is detected → returns the available topics help text.

### 5.5 System Prompt

The `SYSTEM_PROMPT` is dynamically built from `profile.js` data:
```
You are a helpful AI assistant embedded in Soulaimane El Bouazi's portfolio website.

Your role is to answer questions about Soulaimane — his skills, experience, projects,
and background. Be concise, enthusiastic, and professional. Answer in the same language
the user asks in (Spanish or English).

[Full profile: name, title, about, skills, experience, projects, education, social, email, phone]

Tone: Friendly, professional, slightly casual. Keep responses under 3 sentences unless
asked for details. Don't make up information.
```

Note: The serverless function at `api/chat.js` contains a **hardcoded copy** of the system prompt (not the dynamically imported version). Both must be kept in sync when updating profile data.

---

## 6. Internationalization (i18n)

### 6.1 Setup (`src/i18n/index.js`)

```javascript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})
```

- **Default language:** Spanish (`es`)
- **Fallback:** English (`en`)
- Imported in `main.jsx` (side-effect import)

### 6.2 Translation Keys

Both locale files share identical key structures (flat JSON):

| Section | Keys |
|---------|------|
| `nav` | hero, about, projects, skills, experience, contact, cta |
| `hero` | badge, subtitle, cta_projects, cta_contact |
| `about` | heading, title, paragraphs[], card_ai_{title,text,tags[]}, card_stack_{title,tags[]}, card_work_{title,text} |
| `projects` | heading, title, items[] [{id, name, description, stack[], highlights[]}] |
| `skills` | heading, title |
| `experience` | heading, title, items[] [{company, role, period, location, highlights[]}], education_items[] [{institution, degree, period, details[]}] |
| `contact` | heading, title, linkedin, github |
| `ai` | title, placeholder, send, welcome, error, button_title |

### 6.3 Usage Pattern

```javascript
import { useTranslation } from 'react-i18next'

function Component() {
  const { t, i18n } = useTranslation()
  // Simple string:          t('nav.hero')
  // Array or object:        t('about.paragraphs', { returnObjects: true })
  // Language:               i18n.language
  // Change:                 i18n.changeLanguage('en')
}
```

### 6.4 Language Switcher

In `Navbar.jsx`:
```javascript
const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
```

---

## 7. Styling System

### 7.1 Tailwind CSS v4

Tailwind v4 uses **CSS-based configuration** via the `@theme` directive instead of a `tailwind.config.js` file.

**Plugin setup (`vite.config.js`):**
```javascript
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 7.2 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#00ff41` | Primary color (Matrix green) |
| `--accent-glow` | `rgba(0,255,65,0.25)` | Glow effects |
| `--accent-dim` | `rgba(0,255,65,0.1)` | Subtle backgrounds |
| `--color-dark-900` | `#0a0a0a` | Body background |
| `--color-dark-800` | `#111111` | Card backgrounds |
| `--color-dark-700` | `#1a1a1a` | Message bubbles |
| `--color-dark-600` | `#222222` | Input fields |
| `--color-dark-500` | `#2a2a2a` | Borders |
| `--color-dark-400` | `#333333` | Scrollbar |

### 7.3 Fonts

- **Sans:** Inter (300, 400, 500, 600, 700, 800) — loaded via Google Fonts in `index.html`
- **Mono:** JetBrains Mono (400, 500, 700) — loaded via Google Fonts in `index.html`

### 7.4 Custom CSS Classes

| Class | Purpose |
|-------|---------|
| `.glow` | Text shadow: `0 0 20px var(--accent-glow)` |
| `.glow-box` | Box shadow: multi-layered glow |
| `.gradient-border` | Card border via `::before` pseudo-element with diagonal gradient |

**Gradient border implementation:**
```css
.gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: linear-gradient(135deg, var(--accent), transparent 50%, var(--accent));
  opacity: 0.3;
  z-index: -1;
}
```

### 7.5 Keyframe Animations

| Name | Purpose |
|------|---------|
| `blink` | Cursor blink (50% opacity) |
| `fadeInUp` | Generic fade-in (not used by components, Framer Motion preferred) |
| `pulse-glow` | Pulsing box-shadow (not used by components, Framer Motion preferred) |

---

## 8. Data Flow

### 8.1 Profile Data (`src/data/profile.js`)

The single source of truth for all personal information:

```javascript
const profile = {
  name, title, tagline, location, email, phone,
  social: { linkedin, github },
  about: [string, ...],           // 5 bio paragraphs
  skills: { Frontend: [], Backend: [], AI: [], Tools: [] },
  experience: [{ company, role, period, location, highlights }],
  education: [{ institution, degree, period, details? }],
  projects: [{ id, name, description, stack, highlights, url, github }],
  easterEggs: { sudo, exit, matrix },
}
```

**Consumed by:**
- `src/ai/prompt.js` — builds the system prompt and fallback response content
- `src/components/Contact.jsx` — renders email, phone, social links

### 8.2 i18n Data Flow

```
profile.js (raw data)
  └─ i18n locale files (es.json, en.json) contain translated text
       └─ Components use useTranslation() to access t('key')
```

The `profile.js` data is NOT translated via i18n — it contains the raw factual data. The i18n system handles the UI text and translated descriptions.

### 8.3 AI Data Flow

```
User input
  └─ AiChat.jsx → getAiResponse(message)
       └─ api.js → /api/chat (Tier 1)
                 → callDirectGroq (Tier 2)
                 → generateFallbackResponse (Tier 3)
       └─ Returns response string
  └─ Display in chat UI
```

---

## 9. Deployment

### 9.1 Vercel Deployment

1. Push repository to GitHub
2. Import in Vercel (vercel.com/new)
3. Vercel auto-detects Vite and the serverless function at `api/chat.js`
4. Add environment variables in the Vercel dashboard:
   - `GROQ_API_KEY` — for the serverless function
   - `VITE_FORMSPREE_ID` — for the contact form
5. Deploy

### 9.2 Build Output

- `dist/` directory with static assets
- Serverless function at `/api/chat` is deployed separately by Vercel
- No `vercel.json` needed — Vercel auto-detects both Vite and the `api/` directory

### 9.3 Environment Variables

| Variable | Scope | Required | Purpose |
|----------|-------|----------|---------|
| `GROQ_API_KEY` | Server (Vercel) | Yes | AI chat serverless function |
| `VITE_GROQ_API_KEY` | Client (browser) | Optional | Local dev AI (not for production) |
| `VITE_FORMSPREE_ID` | Client (browser) | Yes | Contact form endpoint |

**Security note:** `VITE_` prefixed variables are bundled into the client-side JavaScript and visible in the browser. Formspree form IDs are designed to be public. For the AI API key, use the `GROQ_API_KEY` (server-side only).

---

## 10. Environment Variables

### File: `.env` (local development, gitignored)

```env
GROQ_API_KEY=gsk_your_key_here
VITE_GROQ_API_KEY=gsk_your_key_here
VITE_FORMSPREE_ID=your_form_id
```

### File: `.env.example` (template, committed)

```env
GROQ_API_KEY=                # Server-side (Vercel only)
VITE_FORMSPREE_ID=           # Formspree form ID
```

---

## Performance Notes

- **Bundle size:** ~425 KB JS + 26 KB CSS (gzipped ~140 KB + 5.5 KB)
- **Font loading:** Google Fonts loaded in `<head>` via `index.html` (render-blocking)
- **Favicon:** Custom AI-generated SVG portrait (`public/favicon.svg`), 500×500 canvas, cropped via viewBox, purple gradient styling
- **Animation performance:** Framer Motion `useScroll` + `useTransform` run on the compositor thread
- **Canvas performance:** Particle count scales with screen resolution (`width * height / 8000`)

---

## Known Issues / TODOs

- **Custom favicon:** AI-generated SVG portrait with purple gradient, rendered at 500×500 with cropped viewBox for optimal favicon display
- [ ] The `HeroCanvas.jsx` component exists but is not imported in `App.jsx` (optional addition)
- [ ] Profile data is duplicated in `api/chat.js` (hardcoded) — should be synced with `src/data/profile.js`
- [ ] No TypeScript — all files use plain JS
- [ ] The `@formspree/react` package is installed but unused (raw fetch is used instead)
