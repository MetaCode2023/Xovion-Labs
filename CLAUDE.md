# Xovion Labs — Claude Project Instructions

## Brand & Marketing Context (Read First)

For any work in this repo — copy, ads, blog, SEO, CRO, customer messaging, conversational AI prompts — **always read `.agents/product-marketing-context.md` before starting**. It contains:
- Brand voice, tone, do's and don'ts (operator-credibility, no consultant-speak)
- 3 customer personas (Mark / Lauren / Alex)
- Pain points in operator language
- Service pillars, proof points, common objections
- Routing rules for matching visitors to services
- Goals and metrics

## Canonical Sources of Truth

When writing copy or making decisions about services, **always pull current details from these files** rather than inventing:

| What | File |
|---|---|
| Service definitions, pricing, proof points, ideal-fit customers | `src/data/services.ts` |
| AI agent system prompt, conversation rules, routing | `src/data/agentContext.ts` |
| Tool stack | `src/data/tools.ts` |
| Navigation structure | `src/data/navigation.ts` |
| Brand strategy + design system | `xovion-labs-blueprint.pdf` |

If you find yourself making up service names, prices, or proof points, stop — read the data file instead.

## Stack

- **Framework**: Astro 5.x (static output)
- **UI**: Tailwind CSS 4.x + React islands (interactive components only)
- **Deploy**: Cloudflare Pages (`@astrojs/cloudflare` adapter, `functions/` for serverless endpoints)
- **Domain**: xovionlabs.com
- **Build**: `npm run build` → static output via Astro
- **Live AI demo**: +1 (605) 201-1655 (AI Phone Receptionist)

## What ships vs. what doesn't

| Path | Ships to live site? |
|---|---|
| `src/`, `public/` | ✅ Yes — built into the deploy |
| `functions/` | ✅ Yes — Cloudflare Pages Functions (serverless) |
| `astro.config.mjs`, `package.json`, `tsconfig.json` | ✅ Affects build output |
| `.agents/`, `.claude/`, root-level docs (`README.md`, `CLAUDE.md`, `xovion-labs-blueprint.*`) | ❌ Never deployed |
| `marketing/` | ❌ Never deployed (internal playbooks) |

## Live-Site Safety Rules

- **Production deploys from `main` only.** Other branches get private Cloudflare preview URLs, not the live domain.
- **For changes that affect the live site** (anything in `src/`, `public/`, `functions/`, `astro.config.mjs`, `package.json`): work on a feature branch, never commit direct to `main`. Austin merges via GitHub PR.
- **For changes that don't affect the live site** (`.agents/`, `.claude/`, root docs, `marketing/`): direct commit to `main` is fine.
- Never push, force-push, merge, or rebase to `main` without explicit approval.
- Treat `xovion-labs-blueprint.pdf` and `.docx` as historical reference — current truth lives in `.agents/product-marketing-context.md` and the `src/data/*.ts` files.

## Marketing Slash Commands

The 33 marketing expert commands (`/copywriting`, `/ad-creative`, `/cold-email`, `/paid-ads`, `/social-content`, `/seo-audit`, `/page-cro`, `/marketing-ideas`, etc.) are global at `~/.claude/commands/`. They auto-detect `.agents/product-marketing-context.md` when run inside this repo and inherit Xovion brand voice automatically.

## Useful Project Docs

- `xovion-labs-blueprint.pdf` — original brand/architecture blueprint (March 2026)
- `marketing/` — outreach scripts, social content, email sequences (internal playbooks, not deployed)
- `marketing/email-sequences/` — 5 nurture/cold/intake sequences
- `marketing/outreach/` — DM, email, and SMS scripts
- `marketing/social/` — platform-specific post templates
- `README.md` — tech stack, dev commands, project structure
