# Project Overview

A React + TypeScript + Vite portfolio/landing page with Tailwind CSS v4, Framer Motion animations, and a collection of custom UI components.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM v7

## Project Structure

```
src/
  components/     # UI components (Hero, Navbar, Portfolio, Skills, etc.)
  hooks/          # Custom React hooks (useInView, useMousePosition, useScrollProgress)
  lib/            # Utilities (textScramble)
  App.tsx         # Root component
  main.tsx        # Entry point
  index.css       # Global styles
public/
  images/         # Portfolio images
```

## Development

- Run: `npm run dev` (starts on port 5000)
- Build: `npm run build`
- Lint: `npm run lint`

## Deployment

Configured as a static site deployment:
- Build command: `npm run build`
- Public dir: `dist`
