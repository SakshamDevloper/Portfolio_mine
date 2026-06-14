# Portfolio - SakshamDevloper

Personal portfolio website built with **React + TypeScript + Vite**.

## Features

- **Hero Section** — Animated intro with profile image, heading, and social links (GitHub, LinkedIn, LeetCode)
- **Projects Section** — Project cards with scroll-based scale animation and smooth mouse-tilt effects using framer-motion
- **Coding Profiles** — Live GitHub stats cards & LeetCode heatmap embed
- **Framer Motion** — Scroll/parallax animations, fade-in reveals, magnet hover effects
- **Tailwind CSS** — Dark theme with custom color palette
- **Lucide React** — Clean SVG icons

## What was done

1. Replaced hero image from `/saksham_office.jpg` to `/saksham_metro.jpg`
2. Added `liveUrl` to all 3 projects (RAG-Powered AI Assistant, Plant Disease Detection, Sales Forecasting) pointing to respective GitHub repos
3. Updated hero heading layout — image left of text, no clipping
4. Added GitHub, LinkedIn, and LeetCode social links to hero and footer
5. Replaced marquee banner section with a coding profiles section (GitHub stats + LeetCode heatmap)
6. Fixed project card performance — replaced DOM mouse handler with framer-motion `useMotionValue` + `useSpring`
7. Fixed marquee scroll lag — replaced `useState` with direct ref manipulation
8. Updated all social links to `SakshamDevloper` accounts

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```
