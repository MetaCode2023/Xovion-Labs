# Sequence 2: AI ROI Calculator — "The Numbers Series"
**5 emails over 10 days**

## Setup Instructions

- **Trigger:** Tag added: `lead-magnet-ai-roi` (fires when contact completes the AI ROI Calculator survey)
- **Personalization:** Email 1 uses custom field `ai_roi_hours` (populated from survey result) — set this up in the survey workflow before launching
- **Sender:** Austin
- **Goal:** Book a discovery call within 10 days
- **Exit condition:** Discovery call booked — remove from sequence immediately
- **Compatible platforms:** GoHighLevel (recommended), ActiveCampaign, HubSpot, or any platform that supports custom contact fields and conditional send logic

---

## Email 1 — Immediate (within 5 minutes of survey completion)

**Subject:** Your results: [ai_roi_hours] hours/month in manual work

**Body:**

Hey [First Name],

Based on what you told me, you're losing approximately **[ai_roi_hours] hours per month** to manual data handling and follow-up management.

At your rate, that's real money sitting in tasks a system should be doing.

This isn't an estimate to make you feel bad. It's a starting point.

Most operators I talk to already know this is happening. The gap is knowing exactly *where* it's happening — and what the fix actually looks like in their specific setup.

That's what I do in the first 30 minutes with anyone I work with.

Here's the link: [Calendar Link]

— Austin

---

**Notes:**
- `[ai_roi_hours]` = merge tag for the custom field populated by the survey result (GHL: `{{contact.ai_roi_hours}}`)
- If the survey doesn't calculate hours automatically, set up a workflow that maps their answer choices to an hours estimate and writes it to the `ai_roi_hours` field before this email fires
- Do not send this email if the field is empty — add a condition check in the workflow

---

## Email 2 — Day 2

**Subject:** The three manual tasks that eat the most operator time

**Body:**

Hey [First Name],

Across every operation I've worked with, the same three tasks show up as the biggest time drains:

**1. Lead triage**
Deciding which contacts deserve attention right now vs. which ones can wait. Most people do this manually every morning. Open the CRM. Scroll through. Make judgment calls. It takes 30–45 minutes and the judgment is inconsistent.

**2. Follow-up sequencing**
Figuring out who hasn't heard from you, what they need to hear, and making sure it actually gets sent. When this runs manually, it doesn't run consistently.

**3. Report generation**
Pulling numbers. Checking pipeline health. Summarizing what happened last week. Most operators either skip this or spend 2–3 hours on it every Monday.

All three of these can run without a human in the loop. Not *better* AI — just AI that's actually connected to your data.

Which of those three is your biggest drain right now? Reply and tell me.

— Austin

---

## Email 3 — Day 4

**Subject:** What "wiring AI into your operation" actually looks like

**Body:**

Hey [First Name],

Most people's version of AI in their business looks like this: open ChatGPT, describe the situation, copy the output, paste it somewhere.

That's not an automation. That's an expensive copy-paste tool.

Here's what a real integration looks like in practice:

New lead comes in through a web form. A webhook fires to a Claude instance that reads the contact record — business type, service interest, how they heard about you. Claude triages the lead, assigns the right pipeline stage, drafts a personalized first follow-up, and updates the contact record. All of it happens in under 2 seconds. Zero human time per lead.

On Monday morning, that same Claude instance reads the entire pipeline — every open deal, every stalled contact, everything that moved last week — and generates a brief. Five minutes of reading replaces two hours of manual CRM review.

This isn't a demo setup. It's running in our own operations right now.

If you want to see what it looks like applied to your stack, here's 30 minutes: [Calendar Link]

— Austin

---

## Email 4 — Day 7

**Subject:** A real one from the trenches

**Body:**

Hey [First Name],

We run AppFolio for the property management side of our portfolio and Close CRM for acquisitions. For a long time, these were two completely separate worlds. Data in AppFolio. Deals in Close. No connection between them.

When we wired Claude into both of them, the first thing we found was that we'd been missing maintenance patterns that were directly correlated to tenant turnover. The data was there — in AppFolio — the whole time. We just weren't reading it.

That's the thing about connecting AI to your actual business data. You don't always find what you expect to find. Sometimes you find something more useful.

We stopped logging in to run reports. We stopped manually reviewing the pipeline every morning. The system surfaces what matters, and we act on it.

If your operation is running on any combination of GHL, Close, AppFolio — or honestly any CRM with an API — the integration path is straightforward.

Here's 30 minutes to look at yours: [Calendar Link]

— Austin

---

## Email 5 — Day 10

**Subject:** Still thinking about [Company]'s setup?

**Body:**

Hey [First Name],

You built your ROI estimate [X] days ago.

Either you're working through it yourself, something came up, or the timing isn't right. All of that is fine.

If the problem is still on your mind, here's where to pick it up: [Calendar Link]

If not — you'll hear from me once a month with the Operator Brief. Real notes from what we're building. No pitch content.

— Austin

---

**Notes:**
- `[X]` = number of days since opt-in (calculate from your platform's date fields or just hardcode "10")
- `[Company]` = merge tag for company name field — if empty, just use "your operation"

---

## Workflow Logic
*(Example shown in GHL syntax — adapt trigger/condition names to your platform)*

```
TRIGGER: Tag added: `lead-magnet-ai-roi`
CONDITION: `ai_roi_hours` field is not empty
ACTION: Send Email 1 (immediate)

WAIT: 2 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 2

WAIT: 2 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 3

WAIT: 3 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 4

WAIT: 3 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 5
ACTION: Add tag `welcome-seq-complete`
ACTION: Add to newsletter contact list
```

---

## Paste Notes
- Replace `[Calendar Link]` with your booking page URL
- Replace `[First Name]` with your platform's merge tag
- The `ai_roi_hours` field needs to be created as a custom contact field in your CRM before launch
- Works in GoHighLevel, ActiveCampaign, HubSpot, or any platform supporting custom fields and conditional email logic
