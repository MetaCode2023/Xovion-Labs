# Sequence 4: Cold Email Outbound — "The Prospecting Series"
**6 emails over 21 days**

## Setup Instructions

- **Trigger:** Manual enrollment after contact research and import
- **Sender:** Austin's personal email (not a noreply@ or team@ address — this reads as personal outreach)
- **Goal:** Get a reply that turns into a booked discovery call
- **Exit condition:** Any reply or call booked — remove immediately and handle manually
- **Works in:** GHL Campaigns, Instantly, Smartlead, Close Sequences, or any cold email platform

---

## Who to Target

This sequence works for any operator running a business with a sales pipeline and follow-up problem. You don't need to know what CRM they use. The pain is universal.

**Highest-value segments — start here:**

1. **Real estate investors and wholesalers** — running high-volume outbound, usually using some combination of CRM + dialer + skip tracing tools. Pain: leads fall through the cracks between tools. Source: PropStream, BatchLeads, LinkedIn, Facebook real estate investing groups.

2. **Property management companies** — managing 50–500+ units, usually on AppFolio or Buildium, often with a disconnected leasing CRM. Pain: reporting is manual, maintenance is reactive, leasing follow-up is slow. Source: LinkedIn (search "property manager" + city), NARPM member directories, AppFolio user communities.

3. **Service businesses with a sales process** — HVAC, roofing, pest control, home services — anyone running a booked-appointment model with inbound and outbound leads. Pain: form submissions don't get followed up fast enough, no real pipeline visibility. Source: LinkedIn, local business directories, Clutch, Angi Pro.

4. **Multi-location operators** — franchise owners, regional operators, anyone managing multiple locations or revenue streams. Pain: each location has slightly different systems, nothing consolidates, reporting is a nightmare. Source: LinkedIn, franchise association directories, local business journals.

**Enroll in batches of 20–25.** Do not blast 200 contacts at once — you need to be able to respond personally when replies come in.

---

## Email 1 — Day 1

**Subject:** Quick question about your follow-up process

**Body:**

Hey [First Name],

Quick question — I work with operators running businesses with active sales pipelines, and I've been looking at a few companies in [their space].

Is your follow-up system running the way you want it to right now, or is there something you keep meaning to fix but haven't gotten to?

Asking because I just overhauled a setup for a [similar operator type] and the difference in how many warm leads they were actually recovering was significant. Not a pitch — just curious if you're running into the same thing.

— Austin
Xovion Labs

---

**Notes:**
- Keep this under 5 sentences. The shorter it is, the more it reads like a real person wrote it.
- Personalize `[their space]` and `[similar operator type]` to match who you're emailing
- Do NOT include a calendar link in Email 1 — a link this early reads as automated

---

## Email 2 — Day 4

**Subject:** Re: Quick question about your follow-up process

**Body:**

Hey [First Name],

Didn't hear back — no problem.

I'll leave you with one thing: the most common issue I find in sales pipelines that's actually costing operators money isn't the automation logic or the tool they're using. It's the pipeline stage design.

Most people have 4–6 stages. That's not enough granularity to know who to call today. Your follow-up automations fire based on stage — if the stages aren't right, everything downstream fires at the wrong time for the wrong person.

Doesn't matter if you're on GoHighLevel, Close, HubSpot, or a spreadsheet. The logic problem is the same.

Happy to show you what a proper architecture looks like. Takes 30 minutes.

[Calendar Link]

— Austin

---

## Email 3 — Day 8

**Subject:** This might not be relevant — but

**Body:**

Hey [First Name],

I rebuilt a pipeline for a real estate wholesaling operation that was losing warm leads because their CRM couldn't distinguish a real conversation from a voicemail left. Both contacts were sitting in the same stage. Both getting the same follow-up. The warm ones were going cold.

Fixed the stage architecture, wired in some routing logic, and their recovery rate on warm leads went up significantly. Same principle works in any business running high-volume outbound or inbound — service businesses, property management, acquisitions, doesn't matter.

The tool they used didn't change. The structure did.

Worth 20 minutes if you're curious: [Calendar Link]

— Austin

---

## Email 4 — Day 12

**Subject:** The AI piece most operators are missing

**Body:**

Hey [First Name],

I've been talking about pipeline structure — but I haven't mentioned the piece that changes the math entirely.

We wire AI directly into your existing CRM and automation stack. What that looks like in practice: a new lead comes in, the system reads the contact record, assigns the right pipeline stage, drafts the follow-up, and updates the record — in under 2 seconds. Zero human time per lead.

Monday morning, the same system reads your entire pipeline and generates a brief — every open deal, every stalled contact, everything that moved last week — without anyone logging in to run a report.

We've built this on top of GoHighLevel, Close CRM, AppFolio, and custom stacks. Whatever you're running, the integration path is similar.

Happy to show you what it looks like on a short call: [Calendar Link]

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
- No calendar link in this email. The only ask is a reply.
- This email consistently gets the highest reply rate of the sequence.
- "Not the right time" replies are valuable — tag them and re-enroll in 60 days.

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
- This email exists to close the loop so they remember the name positively if they ever need this later.
- After this sends: tag `cold-seq-complete`, move to "Attempted Contact — No Response" pipeline stage, add to smart view for manual LinkedIn/phone escalation review.

---

## Workflow Logic

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

## Before Enrolling Anyone

Fill in these fields on each contact so personalization fires correctly:
- First Name (check spelling)
- Company
- Business Type (drives "similar operator type" personalization in Email 1)
- Lead Source → set to "Cold Email"
