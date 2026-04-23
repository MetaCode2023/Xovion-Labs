# Sequence 4: Cold Email Outbound — "The Prospecting Series"
**6 emails over 21 days**

## GHL Setup Instructions

- **Trigger:** Manual enrollment (you add contacts from Apollo/LinkedIn research)
- **Audience:** GHL users, Close CRM users, AppFolio property managers, RE investors/wholesalers 5–50 employees
- **Source contacts via:** Apollo.io, LinkedIn Sales Navigator, or manual research
- **Sender:** Austin's personal email connected to GHL (not a noreply@ address)
- **Goal:** Get a reply that turns into a booked discovery call
- **Exit condition:** Any reply, any call booked — remove immediately and handle manually

---

## Sourcing Targets (Before You Enroll Anyone)

**Highest-value targets — start here:**

1. Real estate wholesalers and acquisition operators running GHL (identifiable via job posts, LinkedIn "GoHighLevel" mentions, Facebook GHL groups)
2. Property management companies using AppFolio (search "[City] property management AppFolio" — many list their tech stack on their site)
3. Service businesses with a GHL booking widget on their site (Wappalyzer browser extension shows the tech stack of any website)
4. Close CRM users in real estate or service industries (Close posts their customer stories — good sourcing list)

**Enroll in batches of 20–25 at a time.** Don't blast 200 contacts at once — you want to be able to respond manually when replies come in.

---

## Email 1 — Day 1

**Subject:** Your GHL setup

**Body:**

Hey [First Name],

Quick question — I work with operators running GHL setups and noticed [Company] is using it.

Are you happy with how the automations are firing right now, or is there something you keep meaning to fix but haven't gotten to?

Asking because I just rebuilt a setup for a [similar business type] and the before/after on lead follow-up was significant. Not a pitch — just curious if you're running into the same thing.

— Austin Xovion Labs

---

**Notes:**
- Keep this under 5 sentences. The shorter it is, the more it reads like a real person.
- Personalize `[similar business type]` — if they're a wholesaler, say wholesaler. If property manager, say property manager.
- Do NOT include a calendar link in Email 1. A link this early reads as automated.

---

## Email 2 — Day 4

**Subject:** Re: Your GHL setup

**Body:**

Hey [First Name],

Didn't hear back — no problem.

I'll leave you with one thing: the most common issue I find in GHL accounts that's actually costing operators money isn't the automation logic. It's the pipeline stage design.

Most people have 5–7 stages. That's not enough granularity to know who to call today. Your follow-up automations fire based on stage — if the stages aren't right, everything downstream is wrong.

Anyway — if this is relevant, happy to show you what a proper build looks like. Takes 30 minutes.

[Calendar Link]

— Austin

---

## Email 3 — Day 8

**Subject:** This might not be relevant — but

**Body:**

Hey [First Name],

I built a CRM triage system for a real estate wholesaling operation that was losing warm leads because their pipeline couldn't distinguish a real conversation from a voicemail left. Both contacts were sitting in the same stage. Both getting the same follow-up. Which meant the warm ones were going cold.

Fixed the stage architecture, wired in some routing logic, and their recovery rate on warm leads went up significantly.

If you're running any kind of high-volume outbound — real estate, service business, doesn't matter — same problem, same fix.

Worth 20 minutes if you're curious: [Calendar Link]

— Austin

---

## Email 4 — Day 12

**Subject:** The AI piece

**Body:**

Hey [First Name],

I've been talking about CRM stuff — but I haven't mentioned the piece that changes the math entirely.

We wire Claude directly into GHL and Close CRM. What that actually means in practice: new lead comes in, Claude reads the contact record, drafts the follow-up, flags what stage they should be in, and generates a Monday morning brief that surfaces everything that needs attention — without anyone logging in.

If your team is still doing any of that manually, the time cost adds up fast.

Happy to show you what the integration looks like on a short call: [Calendar Link]

— Austin

---

## Email 5 — Day 16

**Subject:** One honest question

**Body:**

Hey [First Name],

I've sent you a few emails. I want to ask directly:

Is there a specific reason this isn't relevant — or is it just not the right time?

If it's the latter, happy to check back in 60 days. If it's the former, I'd genuinely rather know. Helps me make sure I'm reaching the right people.

Either way — just reply here.

— Austin

---

**Notes:**
- This email consistently gets the highest reply rate of any sequence position.
- Do NOT add a calendar link. The only ask is a reply.
- Replies of "not the right time" are valuable — tag them `follow-up-60` and re-enroll in 60 days.

---

## Email 6 — Day 21

**Subject:** Last email from me

**Body:**

Hey [First Name],

Wrapping up my outreach on this one.

If any of the above was relevant and you want to pick it up when the timing's better — xovionlabs.com is where to find me. The calendar's always open.

Not going to keep your inbox hostage.

— Austin

---

**Notes:**
- No CTA. No calendar link. Clean exit.
- This email exists for one reason: close the loop so they remember the name positively.
- After this sends: tag contact `cold-seq-complete`, move to Stage 2 in pipeline ("Attempted Contact — No Response"), add to smart view "Cold Email — No Response After 5" for manual LinkedIn/phone escalation review.

---

## GHL Workflow Logic

```
TRIGGER: Tag added: `cold-email-enrolled`
ACTION: Send Email 1

WAIT: 3 days
CONDITION: Has replied or booked? → YES: Exit sequence
ACTION: Send Email 2

WAIT: 4 days
CONDITION: Has replied or booked? → YES: Exit sequence
ACTION: Send Email 3

WAIT: 4 days
CONDITION: Has replied or booked? → YES: Exit sequence
ACTION: Send Email 4

WAIT: 4 days
CONDITION: Has replied or booked? → YES: Exit sequence
ACTION: Send Email 5

WAIT: 5 days
CONDITION: Has replied or booked? → YES: Exit sequence
ACTION: Send Email 6
ACTION: Add tag `cold-seq-complete`
ACTION: Update pipeline stage → "Attempted Contact — No Response"
ACTION: Remove tag `cold-email-enrolled`
```

---

## Personalization Shortcuts (Do These Before Enrolling)

Before adding someone to this sequence, fill in these GHL contact fields:
- **First Name** — obvious but check the spelling
- **Company** — used in Email 1
- **Business Type** — drives the "similar business type" reference in Email 1
- **Current Tech Stack** — if you know they use GHL + Close, note it; reference it in Email 1 if relevant
- **Lead Source** — set to "Cold Email" so smart views filter correctly
