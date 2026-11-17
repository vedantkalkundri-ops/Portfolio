<div align="center">

<img src="https://img.shields.io/badge/Vedant%20Kalkundri-3D%20Portfolio-6D28D9?style=for-the-badge&logoColor=white" alt="Portfolio" />

# Vedant Kalkundri — Interactive 3D Portfolio

**A high-performance, visually immersive personal portfolio built with React, Three.js, and WebGL.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

[Features](#features) • [Tech Stack](#tech-stack) • [Projects](#featured-projects) • [Getting Started](#getting-started) • [Structure](#repository-structure)

</div>

---

## Overview

A personal developer portfolio built with **React 19**, **Vite**, **Three.js**, **React Three Fiber / Rapier**, **GSAP**, and custom **WebGL shaders**. Designed to provide a fluid, interactive experience showcasing projects, skills, education, and achievements.

---

## Features

| Component | Description |
|---|---|
| **3D Physics Lanyard** | Real-time rigid-body physics rope and ID badge simulation via `@react-three/rapier` |
| **Custom WebGL Shaders** | Molten Metal animated background with mouse distortion; Side Rays & Beams lighting shaders |
| **macOS-Style Dock** | Smooth, responsive magnification dock for technology stacks and software tools |
| **3D Card Swap Deck** | GSAP-animated stacked cards highlighting core specialization areas |
| **Accordion Project Gallery** | Project showcase with video previews, expandable image modals, feature breakdowns, and GitHub/live links |
| **Education & Milestones** | Structured timeline covering KLS GIT, KLS VPP, and St. Paul's; competition achievements |
| **Contact Form** | Direct messaging via EmailJS with glassmorphic UI |

---

## Tech Stack

**Core Frontend**
- **[React 19](https://react.dev/) & [Vite](https://vitejs.dev/)** — Framework and build pipeline
- **[Tailwind CSS v4](https://tailwindcss.com/) & Custom CSS** — Glassmorphic design system with Geist font

**3D Graphics & Physics**
- **[Three.js](https://threejs.org/), [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber), [`@react-three/drei`](https://github.com/pmndrs/drei)** — 3D scene rendering
- **[`@react-three/rapier`](https://github.com/pmndrs/react-three-rapier)** — Rigid body physics for the 3D lanyard
- **OGL & MeshLine** — Custom shader rendering

**Animations & Interactivity**
- **[GSAP](https://gsap.com/)** — High-performance animation engine
- **[Framer Motion](https://www.framer.com/motion/)** — UI transitions
- **[Lucide React](https://lucide.dev/)** — Icon library

**Integrations**
- **[EmailJS](https://www.emailjs.com/)** — Client-side contact form delivery
- **ESLint & PostCSS** — Linting and CSS processing

---

## Featured Projects

| Project | Description | Stack | Links |
|---|---|---|---|
| **SYLVAH GROUP** | Real estate management and property showcasing platform with lead inquiry tracking | React, Node.js, JS, CSS3 | [Live](http://sylvahgroup.com) |
| **Smart Campus Navigation Bot** | AI-powered campus assistant with interactive map and query chatbot. *2nd Prize — Impactathon 2026* | Python, React, AI/ML | [GitHub](https://github.com/vedantkalkundri-ops/Smart_Campus_Navigation_Utility_Bot.git) |
| **Anusha Inamdar Portfolio** | 3D portfolio for an SEO Content Writer showcasing 610+ articles | React, Vite, CSS3, Figma | [Live](https://anushainamdarportfolio.vercel.app/) · [GitHub](https://github.com/vedantkalkundri-ops/portfolio-ui) |
| **AURA OS** | AI Linux desktop assistant bridging Google Gemini with system telemetry and bash execution | Linux, Python, Bash, LLM | [GitHub](https://github.com/sanchi0/AURAOS/tree/vedant-ops) |
| **ExcelSense** | Excel and CSV analysis platform with automated summary charts and plain-English querying | Python, Flask, Pandas, Chart.js | [GitHub](https://github.com/vedantkalkundri-ops/Smart-Excel-Sense.git) |

---

## Repository Structure

```
Portfolio/
├── public/                       # Static assets, 3D textures, logos, and project media
├── src/
│   ├── assets/                   # Internal images and SVG resources
│   ├── components/
│   │   ├── AccordionGallery.jsx  # Interactive accordion project gallery
│   │   ├── Beams.jsx             # WebGL beams shader background
│   │   ├── CardSwap.jsx          # 3D stacked card deck with GSAP
│   │   ├── contactform.jsx       # Glassmorphic contact form (EmailJS)
│   │   ├── Dock.jsx              # macOS-style magnification dock
│   │   ├── Lanyard.jsx           # 3D physics lanyard and badge
│   │   ├── MoltenMetal.jsx       # Interactive molten WebGL shader
│   │   ├── Navbar.jsx            # Dynamic floating navbar
│   │   ├── PortfolioIntro.jsx    # Cinematic entry splash screen
│   │   ├── ProjectModal.jsx      # Detailed project modal viewer
│   │   ├── SideRays.jsx          # Ambient light ray shader
│   │   └── StarBorder.jsx        # Animated border glow component
│   ├── App.jsx                   # Main application layout and data structures
│   ├── App.css                   # Main styling and glassmorphic utilities
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global typography and root styles
├── .env.example                  # Environment variable template
├── vite.config.js                # Vite configuration
└── package.json                  # Dependencies and scripts
```

---

## About the Author

**Vedant Kalkundri** — B.E. Information Science & Engineering, KLS Gogte Institute of Technology, Belagavi.

Full-stack developer with a focus on React, Python, AI/ML, and immersive UI/UX.

Gmail: (vedantkalkundri@gmail.com)
