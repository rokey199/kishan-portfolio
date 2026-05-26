# Kishan Pravinbhai Dabhi | Ultra-Premium Futuristic Full-Stack Portfolio

An awe-inspiring, ultra-premium, cinematic, interactive, and recruiter-impressive developer portfolio website customized for **KISHAN PRAVINBHAI DABHI**. Seamlessly blending highly-glowing visuals, dynamic floating particles, complex state sliders, and a server-side Gemini AI Recruiter Chatbot.

## 🛠️ Tec hnology Core Stack
- **Framework & Core**: React JS, TypeScript, Tailwind CSS, Vite
- **Animations & Interactivity**: Framer Motion, HTML5 custom Canvas Particles Engine, customized slow-trail magnet cursors, glassmorphism filters, loading transitions
- **AI Integration**: Server-side Google GenAI SDK (`@google/genai`) proxy routing, enabling true custom prompt guidance for recruiters through Gemini AI models without leaking API keys
- **Backend Infrastructure**: Express multi-tier routing node

## 📁 System Architecture
- `/server.ts` — High-performance secure Express server, containing customized prompt specifications representing Kishan and proxying chat vectors through the modern Gemini model.
- `/src/App.tsx` — Assembled master view containing preloader controls, navigation structures, and interactive sections.
- `/src/components/Loader.tsx` — Dynamic cyberpunk preload screen displaying compile buffers and loading state percentages.
- `/src/components/ParticleCanvas.tsx` — Interactive particles node engine connecting nodes based on dynamic distances and cursor distances.
- `/src/components/CustomCursor.tsx` — Slow-trail outer magnet circle cursor with scale reactions for links and interactive targets.
- `/src/components/Navbar.tsx` — Responsive floating menu bar featuring scroll-progress borders and dynamic viewport highlights.
- `/src/components/HeroSection.tsx` — Rotating title tags, action cards, custom system analytics dashboards, interactive layout CTA buttons.
- `/src/components/AboutSection.tsx` — Core specification biography detailing location coords, skills, and values.
- `/src/components/SkillsSection.tsx` — Categorized progress grids highlighting interactive skill levels.
- `/src/components/ProjectsSection.tsx` — Simulated project layout displays with custom vector-illustrations and category-based grid filtration triggers.
- `/src/components/ExperienceSection.tsx` — Clean responsive work timelines.
- `/src/components/ServicesSection.tsx` — Custom pricing, redesign, responsive, and AI services card lists.
- `/src/components/RecruiterSection.tsx` — Highly-immersive AI chatbot panel allowing recruiters to communicate with Kishan's trained representative.
- `/src/components/ContactSection.tsx` — Highly interactive connection forms with instant submission success micro-animations.

## ⚙️ Environment Configuration

Set the values in your `.env`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="YOUR_HOSTED_APP_URL"
```

## 🚀 Execution & Command Deck

### Core Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

This compiles client elements, bundles the server entry point to `dist/server.cjs` via highly optimized `esbuild` routines, and runs standard Node configurations.
