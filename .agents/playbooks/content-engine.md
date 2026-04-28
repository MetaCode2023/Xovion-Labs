# Content Engine Playbook — Xovion Labs

**Created:** 2026-04-27
**Owner:** Austin
**Goal:** Daily AI-generated social content that runs without manual creation, builds operator credibility, and warms cold prospects so close rates compound over time.

---

## TLDR — Decisions Made

| Decision | Choice | Why |
|---|---|---|
| Lead platform | **X first** | Operator/REI/builder audience lives there; lowest production cost |
| Secondary | LinkedIn cross-post (free) | Strong B2B fit; same content recyclable |
| TikTok | Defer to month 2 | Higher production cost; weaker conversion for ICP |
| Cadence | 1–2 posts/day on X, 1 thread/week | Sustainable with AI pipeline |
| Approval gate | Slack 👍/❌/✏️ for first 30 days, then full auto | Voice safety while pipeline learns |
| Content principle | **Teach AI to operators; use Austin's work as the worked example** | The brand pillar is "education + execution" — content leads with the concept, not the receipt |
| Anti-principle | No humble-bragging. Every receipt must teach. | "Look at my numbers" alone is noise; "look at what's possible, here's the proof" is signal |

---

## Reality Check (re-read before optimizing)

A net-new social account will **not** drive a paying client in 14 days through inbound — algorithms need 4–8 weeks. The reason to build this now: **every cold prospect googles you before responding.** An active receipt-driven feed is conversion oil for outbound, not a primary acquisition channel. Treat this as week-1 background investment that compounds.

Don't measure success by followers in month 1. Measure: (a) prospects who say "saw your stuff," (b) close rate lift on outbound after a feed exists, (c) compounding reach by month 3.

---

## The 5 Content Pillars

Rotate one per weekday. **All five teach a concept first; Austin's work is the worked example, not the headline.**

| # | Pillar | What it is | Source material |
|---|---|---|---|
| 1 | **The Build** | "Here's how a modern [thing] gets built — using what I shipped today as the walkthrough." | GitHub commits, deploys, dev logs |
| 2 | **The Receipt** | "Here's what's now possible in a small business — my numbers prove it works." (Lead with the capability, prove with the count.) | DD receptionist logs, Close CRM events, deal analyzer outputs |
| 3 | **The Hot Take** | Operator-perspective teaching on AI tools/news. ("Everyone's hyping X. Here's what it actually means for an operator.") Already in teaching mode. | Twitter/news scraping, your daily reading |
| 4 | **The Teardown** | "Here are the silent failures most [biz type] websites/setups have, illustrated by a real audit." Teach by negative example. | Local business audits, your own past mistakes |
| 5 | **The Story** | "Here's how a system like this works — using ours as the worked example." Concept-first walkthrough. | Your portfolio of 3 businesses |

**The litmus test for every post:** if you stripped out the references to your businesses, would the post still teach the reader something useful? If yes → ship. If no → it's a humble-brag and gets killed.

**Suggested weekly rotation:**
- Mon — The Build
- Tue — The Receipt
- Wed — The Hot Take
- Thu — The Teardown (often a thread)
- Fri — The Story
- Sat–Sun — Light receipts, replies, engagement

---

## The Automation Pipeline

```
┌─────────────────────────────────────────────────┐
│  INPUTS (daily, no manual creation work)        │
│  • DD receptionist call logs (auto-pulled)      │
│  • Close CRM events (deals, leads triaged)      │
│  • GitHub commits (what you shipped)            │
│  • You: 1–2 voice memos/day on phone (60 sec)   │
└──────────────────┬──────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────┐
│  PROCESSING (Claude API via n8n)                │
│  • Picks today's pillar (rotation)              │
│  • Pulls relevant raw input                     │
│  • Generates 3 post variants in your voice      │
│    (using brand voice from product-marketing-   │
│    context.md — referenced automatically)       │
│  • Adds screenshot/image if relevant            │
└──────────────────┬──────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────┐
│  YOUR APPROVAL (60 seconds/day, optional)       │
│  • Drafts go to a Slack channel                 │
│  • You react: 👍 = post, ❌ = skip, ✏️ = edit    │
│  • Or skip approval entirely → full auto        │
└──────────────────┬──────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────┐
│  POSTING (Typefully API)                        │
│  • 8am — main content                           │
│  • 2pm — engagement (reply to 5 ICP accounts)   │
│  • 6pm — light post (receipt or thread continue)│
└─────────────────────────────────────────────────┘
```

**Key insight:** Inputs come from systems you already run. You're not creating content — you're **packaging the byproducts of your real work.** AI translates and posts.

---

## Tool Stack & Costs

**Recommended stack (X-only) — total ~$25–40/mo:**

| Job | Tool | Cost | Why |
|---|---|---|---|
| Content generation (LLM) | Claude API | $5–15/mo | Best at voice matching; you already use it |
| Workflow automation | n8n self-hosted (Cloudflare/Railway) OR Make.com | $0 / $9/mo | Where the logic lives |
| Scheduling/posting (X) | Typefully | $14/mo | Best UX for X scheduling |
| Voice notes → text | OpenAI Whisper API | $1–3/mo | For voice memo inputs |
| Image gen (when needed) | Ideogram or DALL-E API | $0–8/mo | Mostly screenshots will do |

**Add later (TikTok / video):**
| Job | Tool | Cost |
|---|---|---|
| AI avatar talking-head | HeyGen ($24/mo) or Argil ($39/mo) | $24–39/mo |
| Long-form → short clips | Opus Clip | $19/mo |

---

## Sample Week of Posts (Voice Reference)

These are the calibration target for AI-generated content. Future drafts should match this voice — **concept-first, receipt as evidence.**

**Monday — The Build**
> Most "best practice" lead forms have 12–14 fields. They feel thorough and convert poorly.
>
> Cut to the 4 that actually matter and submission rates jump 2–3x — because every required field gates out a chunk of the people who would have become customers.
>
> Rebuilt one this morning for my wholesaling business. 14 fields → 4. Submission rate up 3x in 24 hours.

**Tuesday — The Receipt**
> An AI receptionist isn't a chatbot reading from a script.
>
> It listens, qualifies, checks your real calendar, books a real slot, creates the contact in your CRM, and texts the customer their confirmation — before the call ends.
>
> Mine handled 7 calls at my dumpster business yesterday for $11 in usage. The point isn't that it works for me. The point is this is now a thing any service business can have.

**Wednesday — The Hot Take**
> Every "AI agency" is selling you ChatGPT wrappers.
>
> If their AI can't take an action — book a call, update your CRM, send a text — they're selling you a smarter Google search.
>
> Demand to see the system, not the demo deck.

**Thursday — The Teardown (thread)**
> 🧵 Three silent failures most service business websites have. In order of how much money they're costing you.
>
> Audited a local plumbing co this week — these were the three I found.
>
> 1. Phone number isn't a clickable tel: link on mobile.
> 2. Lead form has 8+ required fields.
> 3. Form submissions email a Gmail nobody monitors after 5pm.
>
> [each becomes its own tweet with the fix and the cost of leaving it broken]

**Friday — The Story**
> What does a modern small business website actually need in 2026?
>
> Rebuilt one this month for my real estate business. The list:
>
> Astro + Tailwind. Cloudflare Pages. Lead form piping directly into the CRM. SMS auto-response within 90 seconds. Loads in under 1 second.
>
> What it didn't need: a "real estate website" template at $200/mo. Stock photos. A blog nobody reads. 14 hero variations.

**Voice rules (from product-marketing-context.md):**
- Plainspoken, technical but accessible. No "leverage," "synergy," "transformative."
- Real numbers always. No vague claims.
- Lead with the action or result. Never with marketing language.
- Operator credibility — every post should pass the "could a real operator have written this?" test.

---

## Build Sequence (When We Actually Ship This)

| Day | Task | Output |
|---|---|---|
| 1 | Set up basics — Typefully, n8n instance, Claude API key wired in | Skeleton accounts ready |
| 2 | Write n8n workflow — 5 pillar templates, daily cron, voice note ingestion | Pipeline functional |
| 3 | Backfill 14 days of "starter" posts mining DD receipts and recent builds | First 2 weeks of content scheduled |
| 4 | Test full auto-posting for 2 days, then turn on | Live |
| 5+ | Pipeline runs; you do 1 voice memo/day from your phone | Ongoing |

**Total setup time:** ~6–10 hours of build work.

---

## Open Decisions

- [ ] Pull the trigger on X-only or X + LinkedIn from day 1?
- [ ] Approval gate or full auto from start?
- [ ] Self-host n8n or pay Make.com for managed?
- [ ] Build the n8n workflow + prompts ourselves, or DIY?
- [ ] Account name/handle on X? @xovionlabs or personal-brand @austin handle?
- [ ] How aggressive on engagement (replies to ICP accounts) — 5/day, 20/day?

---

## Updates & Ideas (Append Below)

> Add new thoughts, experiments, results, and refinements over time. Most recent at top.

<!-- 2026-MM-DD: idea / result / refinement -->
