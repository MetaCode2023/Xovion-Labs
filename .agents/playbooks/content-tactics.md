# Content Tactics — Xovion Labs

**Created:** 2026-04-27
**Owner:** Austin
**Companion to:** [content-engine.md](./content-engine.md) (read that first for strategy)

This doc is the tactical layer. Hooks, templates, engagement routine, thread frameworks, visual conventions, profile copy, first-30-days calendar, and anti-patterns. Everything Claude API needs as scaffolding to generate posts that pass the "could a real operator have written this?" test.

---

## TLDR — Tactical Decisions

| Decision | Choice | Why |
|---|---|---|
| **Voice frame** | **Teach AI to operators; Austin's work is the worked example, not the headline** | Brand pillar is education + execution. Concept-first beats receipt-first. |
| **Litmus test** | If the post still teaches when you strip out the references to your businesses → ship. If not → it's a humble-brag → kill it. | Every receipt must teach. |
| Hook count per pillar | 10 (mix of concept-led and receipt-led, ~60/40) | Enough variety; weighted toward teaching |
| Thread frequency | 1/week | Sustainable; threads are reach amplifiers, not the daily diet |
| Engagement window | 30 min/day, 8–8:30am | Before deep work; hits morning scroll on East Coast |
| ICP account watchlist | 25–40 accounts across 4 categories | Curated, not algorithmic |
| Image attachment rate | 60–70% of posts | Receipts and walkthroughs need visual proof |
| Bio strategy | Personal brand (@austinkost) primary, @xovionlabs secondary | Operators trust people, not brands |
| Pinned post | AI Receptionist demo number with 1-line pitch | Single conversion asset above the fold |

---

## 1. Hook Library

50 hooks mapped to the 5 pillars. Operator-voice. Real numbers always. Replace bracketed placeholders with actual data from your systems.

### The Build (10 hooks)

Mix of concept-first (teaches a build pattern) and receipt-first (uses your build as the worked example). Lean concept-first.

**Concept-first (lead with the lesson):**
1. `Most "best practice" [thing] does [common bad pattern]. Here's why it's wrong and what works instead — using one I shipped today as the example.`
2. `Here's how a [thing] should actually get built in 2026. Walked through one this morning for [biz type]:`
3. `If you're paying $[X]/mo for [tool], you can build the same thing in a weekend. Here's what's in it:`
4. `The build everyone overcomplicates: [thing]. Here's the minimum viable version that does 90% of the job.`
5. `Three things to get right when you build [thing] for [biz type]. Did one today, here's what mattered:`

**Receipt-first (use sparingly — only when the receipt itself teaches):**
6. `Six months ago this would have been a 2-week project. Today: [N hours]. AI is doing the work, not me.`
7. `Code → live in [time]. The thing nobody tells you about [topic]:`
8. `Push to prod hit at [time]. New [feature] live for [biz/client] — and here's why it matters more than it sounds:`
9. `Spent the morning building [thing]. Here's the lesson buried in it:`
10. `[Biz] just got [feature]. Took [time]. The interesting part isn't the time — it's [insight].`

### The Receipt (10 hooks)

**Critical:** receipts must teach. Lead with what's now possible, then prove it with your numbers. "Look at my numbers" alone is a humble-brag and gets killed by the litmus test.

**Concept-first (lead with the capability):**
1. `An AI receptionist isn't a chatbot reading a script. It [list of real actions]. Mine handled [N] calls yesterday — proof this is now a thing any [biz type] can have.`
2. `What "AI for your business" actually means in 2026: [specific capability]. Mine did this [N] times this week.`
3. `The thing most people miss about AI in a service business: it can [specific action], not just generate text. Here's what that looked like at DD this week.`
4. `Most operators don't know AI can [specific capability]. Here's what that looked like for me yesterday:`
5. `If you've never seen what a real AI implementation does in 24 hours, here's the unedited log from one of mine:`

**Receipt-first (use only when the receipt itself teaches a lesson):**
6. `[N]-second call. AI booked the job. The interesting part isn't the speed — it's that the lead would have hit voicemail otherwise.`
7. `Closed [N] deals this week. AI handled [N]% of the pipeline triage. The lesson: pipeline triage is the highest-leverage AI job in sales.`
8. `Sent [N]K SMS this week. Reply rate: [N]%. Most operators don't realize this scale is achievable solo.`
9. `Here's what was sitting in our pipeline this morning before AI ran its sweep — and what was left after:`
10. `I haven't manually answered the phone at DD in [N] days. Here's what that frees up and why it matters:`

### The Hot Take (10 hooks)

1. `Every "AI agency" is selling you ChatGPT wrappers. Here's the test that reveals it:`
2. `If your AI can't [take an action], it's not AI. It's a smarter Google search.`
3. `Hot take: [contrarian statement]. Here's why:`
4. `[Industry] doesn't need [hyped thing]. It needs [boring thing] done well.`
5. `You don't have an AI problem. You have a [real underlying problem].`
6. `Stop paying for [hyped tool]. Build [actual thing] instead.`
7. `The AI agency selling you [pitch] has never run a real business. Here's how to spot it:`
8. `[Tool A] is a parlor trick. [Tool B taking action] is leverage. Different categories entirely.`
9. `Most "AI implementations" are ChatGPT in a trenchcoat. Here's what real implementation looks like:`
10. `Unpopular take: most service businesses don't need AI. They need their existing software to actually work.`

### The Teardown (10 hooks)

1. `Audited a [biz type] this week. Three things wrong, in order of cost:`
2. `[Biz type] near me has a website from 2014 and a CRM that's a Gmail folder. Here's the fix:`
3. `Saw a [biz type]'s lead form yesterday. [N] required fields. Submission rate is brutal. Why:`
4. `Walked through a [biz type]'s tech stack. They're paying $[X]/mo for [N] tools doing [Y]% of what they need:`
5. `Counted [N] places this [biz type] is bleeding leads. Starting with #1:`
6. `If your [biz type] business does [common thing], you're losing $[X]/[period]. Here's the fix:`
7. `Spent 20 minutes on a [biz type]'s site. Found [N] leaks. Here's #1:`
8. `[Biz type]'s "best practice" form has [N] fields. The version that converts has 4. Here's why:`
9. `🧵 Teardown: [biz type] website + lead flow. What's wrong, what to fix, what it costs to leave broken.`
10. `This is what most [biz type] websites get wrong about phone numbers:`

### The Story (10 hooks)

Concept-first: walkthrough of how a system works, using one of your businesses as the live example.

**Concept-first (lead with the question or pattern):**
1. `What does a modern [biz type] tech stack actually look like in 2026? Walked through ours this week:`
2. `How does a small business handle [process] without hiring for it? Here's the system that runs at one of mine:`
3. `Most [biz type] operators are paying $[X]/mo for [N] disconnected tools. Here's the integrated alternative — using mine as the worked example.`
4. `The minimum viable stack for a [biz type] in 2026 is smaller than you'd think. Here's what's in mine:`
5. `If you were starting a [biz type] today, here's the stack I'd recommend. (It's the one I run.)`

**Receipt-first (worked example as the hook):**
6. `[Biz] processes [N] [things] per [period] without a single human in the loop. Here's how the system works:`
7. `Built [biz]'s entire stack in [time]. Total operating cost: $[X]/mo. Here's what each piece does and why it's there:`
8. `[Biz] origin: started because [pain]. Now runs on [N-line stack]. Walking through it:`
9. `Behind the scenes at [biz]: the system that runs while I sleep. (And what it teaches about leverage.)`
10. `[Biz] gets [N] inbound calls/leads per [period]. Zero go unanswered. Here's the system — and why most service businesses don't have one yet.`

---

## 2. Post Templates (Claude API Scaffolds)

These are fill-in-the-blank structures Claude uses to generate posts. Each template specifies the input data needed and the output structure.

### Template: The Build

**Input data needed:**
- The principle/lesson (what does this build teach?)
- What was shipped (1 sentence)
- Time it took (specific)
- Outcome or comparison (number-anchored)
- Optional: image (screenshot, deploy notification, before/after)

**Output structure (concept-first):**
```
[HOOK: lead with the principle or common bad pattern]
[1–2 LINES: explain why most people get it wrong / why this matters]
[1 LINE: "Here's what I shipped today:" — bridge to your example]
[1–2 LINES: what you built, the time, the outcome]
```

**Length:** 4–7 lines. Hard cap 280 chars on X.

**Example output (concept-first):**
```
Most "best practice" lead forms have 12–14 fields. They feel thorough and convert poorly.

Cut to the 4 that actually matter and submission rates jump 2–3x. Every required field gates out a chunk of the people who'd become customers.

Rebuilt one this morning for my wholesaling business. 14 → 4. Up 3x in 24 hours.
```

---

### Template: The Receipt

**Input data needed:**
- The capability being demonstrated (what does this teach?)
- Source system (DD receptionist, Close CRM, Metastone deal analyzer, etc.)
- 3–5 specific numbers from the period
- One human-readable insight (what does this mean for an operator who isn't doing it yet?)
- Optional: dashboard screenshot or call log image

**Output structure (concept-first):**
```
[HOOK: lead with the capability — what's now possible]
[1–2 LINES: explain the capability concretely — what actions, what's new about this]
[1 LINE: "Mine did this [N] times yesterday." — bridge to receipt]
[2–4 NUMBERS, EACH ON OWN LINE]
[1 LINE: the lesson — "the point isn't that it works for me, it's that this is now achievable for [X]"]
```

**Length:** 6–10 lines.

**Example output (concept-first):**
```
An AI receptionist isn't a chatbot reading from a script.

It listens, qualifies, checks your real calendar, books a real slot, creates the contact in your CRM, and texts the customer their confirmation — before the call ends.

Mine handled 9 calls at my dumpster business yesterday:
6 booked.
2 quoted.
1 routed to me.
Total cost in usage: $14.

The point isn't that it works for me. The point is this is now a thing any service business can have.
```

**Anti-pattern to reject:** receipts with no concept lead-in. Just numbers in a list = humble-brag = killed.

---

### Template: The Hot Take

**Input data needed:**
- Trigger (news, tool, conversation, observation)
- The contrarian or precise framing
- One concrete example (often from your own work)

**Output structure:**
```
[HOOK with the take from Hot Take list]
[2–4 LINES: the argument, with concrete example]
[OPTIONAL: 1-line landing — what to do about it]
```

**Length:** 4–7 lines.

**Rules:**
- Must include at least one specific example from your real work
- No hashtags
- No "Thoughts?" or engagement-bait closers
- If the take is purely opinion with no example, kill it

**Example output:**
```
Every AI agency is pitching you "AI-powered solutions" right now.
Test: ask them to show you the AI taking an action inside a real business.
Booking an appointment. Updating a CRM record. Sending an SMS.
Most of them can't. They're showing you a prompt template.
Don't pay for prompt templates.
```

---

### Template: The Teardown

**Input data needed:**
- Business type or anonymized target
- 1–N specific issues observed (with screenshots/quotes if possible)
- The fix for each
- The cost of leaving it broken (in $ or leads where possible)

**Output structure (single post):**
```
[HOOK from Teardown list]
[ISSUE #1: one line]
[ISSUE #2: one line]
[ISSUE #3: one line]
[ONE-LINE LAND: what to do]
```

**Output structure (thread — preferred for Teardown):**
See Section 4: Thread Framework A.

**Anonymization rule:** Never name the business. Refer to "a plumbing company near Sioux Falls," "a property management firm I audited," etc.

---

### Template: The Story

**Input data needed:**
- The teachable question or pattern (e.g., "what does a modern X stack look like?", "how does a small biz handle Y without hiring?")
- Which Xovion-affiliated business is the worked example (DD / Big Sioux / Metastone)
- The stack (specific tools, not categories)
- The outcome (numbers or behavior change)
- What the audience should take from this (the operator-applicable lesson)
- Optional: architecture diagram, screenshot, dashboard

**Output structure (single post, concept-first):**
```
[HOOK: a question or pattern the reader cares about]
[1–2 LINES: frame the question — why most operators get this wrong, or what's changed]
[1 LINE: "Here's what mine looks like:" or similar bridge]
[2–4 LINES: the stack / outcome with specifics]
[1 LINE: closing lesson — what the reader should take from this]
```

**Output structure (thread — for deep dives):**
See Section 4: Thread Framework B.

**Length (single):** 6–9 lines.

**Example output (concept-first):**
```
What does a modern small-business website actually need in 2026?

Most operators are still buying $200/mo "industry template" sites that load in 4+ seconds and convert at under 1%. The whole category is broken.

Rebuilt mine for Big Sioux Home Buyers this month. Here's what mattered:

Astro + Tailwind. Cloudflare Pages. Lead form piping directly into the CRM. SMS auto-response within 90 seconds. Loads in under 1 second.

What it didn't need: stock photos, a blog nobody reads, 14 hero variations, $200/mo to a template provider.
```

---

## 3. Engagement Playbook

**Daily window:** 8:00–8:30am Central. Single block, then close X. Don't doomscroll.

### The 30-Minute Routine

| Minutes | Activity |
|---|---|
| 0–5 | Reply to comments on your last 3 posts (real responses, not "thanks!") |
| 5–15 | Read 3–5 posts from your watchlist accounts. Reply to 2–3 with substance. |
| 15–25 | Quote-tweet 0–1 post you genuinely have an operator angle on. Add value, don't just react. |
| 25–30 | Scan replies/mentions. Engage with anyone who looks like ICP. |

### The ICP Watchlist (curate to 25–40 accounts)

You curate this manually over time. Categories to populate:

| Category | What you're looking for | Where to find |
|---|---|---|
| **AI builders / shippers** | People building real AI tools, not selling courses | Search for "Vapi," "Retell," "Cloudflare Workers," "Astro" mentions; follow MCP/agent builders |
| **Operators in your verticals** | Real estate investors, service biz owners, property managers posting about their work | "REI Twitter," #wholesaling, #propertymanagement; small-account operators with 500–10K followers |
| **Adjacent infra** | Cloudflare, Anthropic, Astro, GHL, Close CRM accounts and their power users | Follow official + the loud users |
| **Local / regional** | Sioux Falls / SD / MN business owners | LinkedIn easier here; on X, search local hashtags |

**Anti-watchlist (do not engage):**
- Generic "AI thought leaders" with 100K+ followers (no signal, no fit)
- Crypto-AI hybrids
- Anyone whose pinned tweet is a paid course
- Engagement-pod accounts (you'll spot them — every reply is "🔥 great take")

### Reply Patterns That Work

**Pattern 1 — Add the missing example:**
> Original: "AI is changing how small businesses operate."
> Your reply: "Specifically: my AI receptionist took 9 calls at my dumpster business yesterday. 6 became jobs. Cost me $14. That's the change — not the abstract idea."

**Pattern 2 — Disagree productively (with evidence):**
> Original: "Every business needs a custom AI agent."
> Your reply: "Disagree. Most businesses need their existing software to actually work. AI agent on top of broken infrastructure = expensive broken infrastructure. Fix the pipes first."

**Pattern 3 — Sharper question:**
> Original: "Just deployed our new AI workflow!"
> Your reply: "What's it actually doing — taking actions in your stack, or generating drafts a human approves? Genuine question, the answer determines whether it's leverage or theater."

**Pattern 4 — Shared receipt:**
> Original: Someone shows their CRM stats.
> Your reply: One-line context + your equivalent number + what made the difference.

### What Never to Reply

- "🔥🔥🔥"
- "This"
- "Great post!"
- "100%"
- "💯"
- Anything an AI agency would post

---

## 4. Thread Frameworks

### Framework A — The Audit Thread (for Teardown pillar)

**Use when:** You audited a real (anonymized) business and have 3–7 concrete findings.

**Structure:**
```
Tweet 1 (hook):
🧵 Audited a [biz type] this week. [N] specific problems, in order of revenue impact.

Here's #1.

Tweet 2 (Issue #1 — the worst):
[Issue described in 1–2 lines]
[The fix in 1 line]
[The cost of leaving it: $ or % or lead count]

Tweet 3 (Issue #2):
[Same structure]

Tweet 4 (Issue #3):
[Same structure]

[Continue for 3–7 issues total]

Final tweet (CTA):
[Total cost or lead leakage if all left unfixed]
[1-line offer: "I do this audit for free for 5 people a month — DM if interested" OR link to crm-audit checklist]
```

**Length:** 5–8 tweets. Each tweet stands alone (people only read tweet 1 and the final).

### Framework B — The Build Story (for Story pillar)

**Use when:** Walking through how one of your businesses got built or how a specific subsystem works.

**Structure:**
```
Tweet 1 (hook):
[Business] processes [N] [things] per [period].
Here's the stack that makes it possible.
🧵

Tweet 2 (the problem):
[2–3 lines on what was broken before — the pain that drove the build]

Tweet 3 (the architecture in 1 image):
[Annotated diagram or stack list]
[1 line on the design choice]

Tweet 4–N (one piece of the stack per tweet):
[Tool name]
[What it does in this context]
[Why it beat the alternative]

Final tweet (the outcome):
[Specific number outcomes — calls/leads/deals/cost]
[1-line on what this means]
[Soft CTA: "Built the same way? Same tools available to you. xovionlabs.com"]
```

**Length:** 6–10 tweets.

### Framework C — The Receipt Deep Dive (for Receipt pillar, used sparingly)

**Use when:** You have one really compelling call/event/result that deserves its own thread.

**Structure:**
```
Tweet 1 (hook):
Yesterday at DD, my AI receptionist did this in 4 minutes:
🧵

Tweet 2 (context):
[1–2 lines: what kind of call, why it matters]

Tweet 3 (transcript snippet — formatted as block):
[Caller line]
[AI line]
[Caller line]
[AI line]

Tweet 4 (what happened in the systems):
[Action 1: Contact created in Close]
[Action 2: Calendar slot booked]
[Action 3: Confirmation SMS sent]
[Action 4: Notification to me]

Final tweet (the take):
[1–2 lines on what this replaces — the human cost or the missed-call cost]
[Demo number: "Hear it yourself: 662-670-1259"]
```

**Length:** 5–7 tweets.

---

## 5. Visual & Screenshot Conventions

| Pillar | Attach? | What to attach |
|---|---|---|
| The Build | Usually | Code snippet (dark theme), deploy notification, before/after UI screenshot |
| The Receipt | Always | CRM screenshot (redacted names), call log table, dashboard screenshot, transcript image |
| The Hot Take | Sometimes | Optional quote card OR screenshot of the thing you're calling out (with criticism context) |
| The Teardown | Usually | Annotated screenshot of the audited site (faces/business names blurred or cropped out) |
| The Story | Always | Site screenshot, architecture diagram, key dashboard, before/after metrics |

### Standards

- **Background:** Match brand (#0D1117 or similar dark). Light screenshots OK if showing client/external content.
- **Font for overlays:** JetBrains Mono or Space Mono (monospace = technical).
- **Redaction:** Black-bar over names, phone numbers (except yours), addresses. Anonymize relentlessly.
- **Aspect ratio:** 16:9 or 1.91:1 for X cards. Vertical 9:16 for IG/TikTok later.
- **Watermark:** Optional. Small "xovionlabs.com" bottom-right, low opacity. Don't overdo.
- **Avoid:** Stock photos (ever), AI-generated illustrations of "robots holding briefcases," generic abstract gradients, anything that looks like a generic LinkedIn post header.

### Screenshot tools to standardize on

- macOS / Windows native screenshot → CleanShot X or ShareX for annotation
- Carbon (carbon.now.sh) for code snippets
- Excalidraw for architecture diagrams
- Tweet screenshots: Tweetpik or built-in X share

---

## 6. Profile Optimization

### X Profile

| Field | Value |
|---|---|
| **Display name** | Austin Kost |
| **Handle (primary)** | @austinkost (or closest available — personal brand wins on X) |
| **Handle (org)** | @xovionlabs (post-launch, cross-promote occasionally) |
| **Header image** | Terminal-style image OR three-business logo strip (DD / Big Sioux / Metastone), dark background |
| **Profile image** | Real photo, not logo. Operators trust faces. |
| **Bio (160 chars)** | `I run 3 AI-powered businesses. Real estate. Acquisitions. Dumpsters. Building the systems that run them — and yours. xovionlabs.com` |
| **Location** | Sioux Falls, SD |
| **Website** | xovionlabs.com |
| **Pinned post** | "I built an AI receptionist for my dumpster business. Call it: +1 (662) 670-1259. Hear what's possible. I install one for your business in 7 days. xovionlabs.com/ai-receptionist" |

**Bio alternates to A/B test:**
- `Operator, not consultant. I run 3 AI-powered businesses and build the same systems for other operators. xovionlabs.com`
- `AI for operators, by an operator. Receipts > theory. Real estate / acquisitions / dumpsters. xovionlabs.com`

### LinkedIn Profile

| Field | Value |
|---|---|
| **Headline** | `Building AI systems for operators \| I run 3 AI-powered businesses (Metastone Capital, Big Sioux Home Buyers, Dump Dynasty) \| Xovion Labs` |
| **About (first 3 lines visible)** | `Most "AI agencies" are marketers who learned prompting. I'm an operator who built AI into real businesses. Real estate acquisitions. Direct-to-seller wholesaling. Equipment rentals. I run all three on AI infrastructure I built — and now I build the same systems for other operators.` |
| **About (continuation)** | Expand on each business with specific outcomes; close with services overview + CTA |
| **Featured** | Pin: AI Receptionist demo (with phone number), one case study, link to xovionlabs.com |
| **Experience** | List Metastone, Big Sioux, Dump Dynasty as roles. Each role gets a 2-3 line description focused on AI systems built. |

---

## 7. First-30-Days Content Calendar

Real material drawn from confirmed assets: DD AI receptionist, Big Sioux Astro site + Close CRM, Metastone AppFolio + Close + AI deal analysis, 22-stage pipeline, 13K+ weekly SMS.

Each entry: pillar / hook / source / asset / format.

### Week 1 — Establish voice + signal

| Day | Pillar | Hook angle | Source material | Asset | Format |
|---|---|---|---|---|---|
| Mon | The Build | "First post. I'm starting to publish what I actually build." | New publishing cadence | Profile screenshot or workspace photo | Single post, 4–5 lines |
| Tue | The Receipt | "DD receipts from yesterday: [N] calls, [N] booked." | DD receptionist call log | Call log screenshot (redacted) | Single post |
| Wed | The Hot Take | "Every AI agency is selling you ChatGPT wrappers. Here's the test." | Operator perspective | None or quote card | Single post, 5–7 lines |
| Thu | The Teardown | "🧵 Three things wrong with most service biz websites. Starting with phone numbers." | Generic audit pattern; reference real findings | Annotated screenshots | **Thread** (5–7 tweets) |
| Fri | The Story | "Big Sioux Home Buyers needed a site that doesn't look like 2014 SEO bait. Built in 3 days. Here's the stack." | Big Sioux build | Site screenshot or stack diagram | Single post |
| Sat | The Receipt | "Weekend at DD: AI handled [N] after-hours calls." | DD weekend log | Call summary | Light single post |
| Sun | (Engagement only) | — | Reply-day, no scheduled post | — | — |

### Week 2 — Depth, real numbers

| Day | Pillar | Hook angle | Source material | Asset | Format |
|---|---|---|---|---|---|
| Mon | The Build | "Shipped [thing] for [DD/Big Sioux/Metastone] this morning. [Time]. Here's the diff." | Recent commit/feature | Code or before/after | Single post |
| Tue | The Receipt | "Pulled this week's numbers from Metastone deal analyzer: [N] deals analyzed, [N] flagged for follow-up." | Metastone analyzer output | Dashboard screenshot | Single post |
| Wed | The Hot Take | "Most service businesses don't need AI. They need their existing software to actually work." | Operator view | None | Single post, 5–7 lines |
| Thu | The Teardown | "🧵 Audited a [biz type] this week. [N] leaks, in order of revenue impact." | Composite of real audits | Annotated screenshots | **Thread** |
| Fri | The Story | "DD origin: started because [pain]. Now it runs on [N-line stack]. Here's the build." | DD origin + current stack | Stack list or diagram | Single post or short thread |
| Sat | The Receipt | "Saturday DD calls answered while I was [doing X]." | DD weekend log | Single screenshot | Light post |

### Week 3 — Case study layer

| Day | Pillar | Hook angle | Source material | Asset | Format |
|---|---|---|---|---|---|
| Mon | The Build | "Push to prod: new [feature] for [biz]. Replaces [tool] that cost $[X]/mo." | Recent ship | Deploy notification | Single post |
| Tue | The Receipt | "13K+ outbound SMS this week from the acquisition pipeline. Here's what came back in." | Direct-to-seller SMS data | Reply rate stats or example replies (redacted) | Single post |
| Wed | The Hot Take | "MCP servers are the actual AI agency story. Most operators have never heard the term. Here's why it matters." | MCP perspective | None or simple diagram | Single post or short thread |
| Thu | The Teardown | "🧵 Most CRMs aren't broken. They're just used like spreadsheets. Here's what changes when you use one like a system." | CRM teardown pattern | Close CRM screenshot (your own, redacted) | **Thread** |
| Fri | The Story | "Metastone runs deal underwriting on AI now. Here's what the analyzer does and what it replaces." | Metastone deal analyzer | Analyzer output screenshot | Single post or thread |
| Sat | The Receipt | Light receipt | Pick from week | — | Single post |

### Week 4 — Convert to action

| Day | Pillar | Hook angle | Source material | Asset | Format |
|---|---|---|---|---|---|
| Mon | The Build | "[N] hours of work today. Here's what shipped." | Recent ship | Code or deploy | Single post |
| Tue | The Receipt | "Month one of publishing receipts. Here's what AI did across my 3 businesses in April." | Aggregate stats from all 3 | Dashboard composite | Single post or thread |
| Wed | The Hot Take | "What AI can't do (yet): [list]. Here's where humans still win." | Anti-hype perspective | None | Single post |
| Thu | The Teardown | "🧵 Full website audit: [vertical]. [N] issues, [N] fixes, $[X] in leakage I'd recover." | Specific vertical audit | Annotated screenshots | **Thread** + soft offer |
| Fri | The Story | "30 days of publishing. Here's what worked, what didn't, what's next." | This calendar's results | Engagement screenshot | Single post |
| Sat | The Receipt | Light receipt | — | — | Single post |

---

## 8. Anti-Patterns (Auto-Reject Filters)

Build these into the Claude prompt as REJECT rules. If a draft contains any of these, it gets sent back for regeneration before the approval queue.

### Word/phrase blocklist

- "Excited to announce"
- "🚀" "💡" "🔥" (any single emoji used as a "hook")
- "Game-changer" / "game-changing"
- "Revolutionary" / "revolutionize"
- "Transform" / "transformative"
- "Leverage" (as a verb)
- "Synergy" / "synergistic"
- "Unlock" (as in "unlock the power of")
- "In today's fast-paced world"
- "Are you tired of...?"
- "Here's the thing nobody tells you"
- "Buckle up"
- "The biggest mistake I see"
- "Stop doing X. Start doing Y." (overused; allowed sparingly)
- "Thoughts?" / "Agree?" / "What am I missing?" (engagement bait closers)
- "If you found this valuable..."
- "Drop a 🙌 if you agree"
- More than 0 hashtags on X (LinkedIn: max 3)

### Structural anti-patterns

- More than 2 em-dashes in a single post (AI signature)
- Sentence rhythm: short / short / short / long compound / short (AI signature — break this up)
- Lists of 7+ items (operator content is short)
- Threads where the value is locked behind tweet 5 (front-load the insight)
- Self-quote-tweeting old posts to "boost"
- Tagging influencers for engagement bait
- Generic motivational content ("If you believe in yourself...")
- "Build in public" performative version (vs actually showing receipts)

### Content anti-patterns

- Vague claims with no numbers ("massive results," "huge growth")
- Hot takes with no concrete example from your work
- Receipts with rounded-down numbers (use exact: "9 calls" not "almost 10")
- Teardowns naming specific businesses (always anonymize)
- AI imagery (robots, briefcases, glowing brains)

### Humble-brag anti-patterns (NEW — strict enforcement)

These get killed even if the numbers are real:

- **Receipts with no concept lead-in** — "9 calls. 6 booked. $14 cost." with no explanation of what's being demonstrated → it's a brag, not a teach. Add the principle on top.
- **Stats with no operator-applicable lesson** — "Sent 13K SMS this week" with no insight about what that scale means or how to think about it.
- **"Look at me" framing** — "I haven't manually answered the phone in 90 days" without bridging to "here's why that matters for any operator."
- **Stories framed as success showcase** — "Built X in 3 days, ships in <1s, costs $0" without the broader lesson about what's now possible.

### The two final filters — both must pass

**Filter 1 — The operator test:**
"Could a real operator who's actually built this have written this exact sentence?"
If no → regenerate.

**Filter 2 — The lesson test (NEW):**
"If I stripped out every reference to my businesses, would this post still teach the reader something useful?"
If no → it's a humble-brag → regenerate with concept-first framing.

---

## Updates & Ideas (Append Below)

> Add tactical refinements, hook variations that worked, anti-patterns you spot in the wild, results from specific posts. Most recent at top.

<!-- 2026-MM-DD: refinement / observation / experiment result -->
