[README.md](https://github.com/user-attachments/files/26077002/README.md)
# Xovion Labs

**Real Skills. Unreal Speed.**

AI education and services for builders and operators. Built with Astro, Tailwind CSS, and React.

## Tech Stack

- **Framework:** [Astro](https://astro.build) (content-first, ships zero JS by default)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Interactive components:** React (islands architecture)
- **Content:** Astro Content Collections (type-safe Markdown)
- **Hosting:** Vercel / Cloudflare Pages

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/      # UI components organized by page/feature
│   ├── global/      # Header, Footer, SEO, Navigation
│   ├── home/        # Hero, ServiceCards, CredibilityBar, etc.
│   ├── services/    # Service detail components
│   ├── about/       # Story, ToolStack components
│   ├── blog/        # PostCard, PostLayout, TagFilter
│   └── ui/          # Reusable primitives (Button, Card, Badge)
├── content/         # Markdown blog posts
├── data/            # Data files (services, tools, navigation)
├── layouts/         # Page layouts (Base, Blog)
├── pages/           # Route pages
└── styles/          # Global CSS + Tailwind config
```

## Pages

- `/` — Home (hero, services overview, credibility, CTA)
- `/services` — Detailed service pages (4 pillars)
- `/about` — Story, tool stack, philosophy
- `/blog` — Content hub / learn section
- `/contact` — Booking + contact form

## Built by

Austin — [@MetaCode2023](https://github.com/MetaCode2023)
