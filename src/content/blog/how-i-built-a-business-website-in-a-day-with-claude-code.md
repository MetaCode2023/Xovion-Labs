---
title: "How I Built a Business Website in a Day with Claude Code"
description: "A step-by-step walkthrough of building a real business site from scratch using Astro and Claude Code — covering setup, components, deployment, and the actual workflow I use."
pubDate: 2026-03-01
tags: ["Web Development", "AI Tools", "Claude Code"]
author: Austin
readingTime: 8
---

When I tell people I built a production website in under 4 hours, they assume I used some drag-and-drop builder. I didn't. I used Astro, Tailwind, and Claude Code — and the result is faster, cleaner, and more maintainable than anything a website builder would have produced.

Here's exactly how I did it.

## The Stack

No creativity required here — this is what works:

- **Astro 5.x** — ships zero JS by default, built-in SEO, instant pages
- **Tailwind CSS 4.x** — utility-first styling, dark mode trivial
- **Claude Code** — AI in the terminal that writes and edits files
- **Vercel** — deployed in 2 minutes from a git push

## The Workflow

The key insight: work component by component, not page by page.

Bad prompt: *"Build me a homepage"*

Good prompt: *"Build a Hero section in `src/components/home/Hero.astro` with a dark background, a bold headline, a subheading, and two CTA buttons — one primary (blue) and one secondary (outlined)"*

Claude Code works best when you're specific about file paths and scope. It reads your existing files, understands the context, and writes code that fits.

## Step 1: Project Setup

```bash
npm create astro@latest my-site -- --template minimal
cd my-site
npm install tailwindcss @tailwindcss/vite @astrojs/react
```

Then add the Tailwind Vite plugin to `astro.config.mjs` and you're ready to build.

## Step 2: Design System First

Before writing any page code, I define:

- A `global.css` with my color tokens (`--color-bg-primary`, `--color-accent`, etc.)
- A `BaseLayout.astro` with the HTML shell, font loading, and meta tags
- Basic UI components: `Button.astro`, `Card.astro`, `Badge.astro`

This 30-minute investment pays back on every component you build after.

## Step 3: Build the Data Layer

For any content that repeats (services, nav links, tools), I create TypeScript data files first:

```typescript
// src/data/services.ts
export const services = [
  {
    id: "website-builds",
    title: "Website Builds",
    description: "...",
    // ...
  }
];
```

This means your components stay clean — just loop over data, don't hardcode content.

## Step 4: Components, Not Pages

I build components in isolation, test them in the dev server, then compose them into pages. The Hero section, the service cards, the footer — each one gets its own focused build session.

Claude Code is exceptional at this. Point it at a component file, describe what you want, and it generates clean, typed Astro code that follows the patterns already in your project.

## Step 5: Deploy Early

I deploy to Vercel after Phase 1 — even with placeholder content. Having a live URL keeps you honest and makes it easy to show people your progress.

```bash
npx vercel --prod
```

That's it. First deploy is free and instant.

## The Real Advantage

The speed isn't just about Claude Code writing code faster. It's about:

1. **No context switching** — I stay in the terminal the whole time
2. **No debugging framework config** — Astro just works
3. **No design decisions during build** — I define the design system once, then apply it

The result: a site that's genuinely fast (Lighthouse 95+), SEO-ready, and maintainable — not a WordPress site with 40 plugins and a 4-second load time.

If you're building a business website and you haven't tried this workflow, you're leaving time on the table.
