# Sequence 1: CRM Audit Checklist Download — "The Diagnostic Series"
**7 emails over 14 days**

## Setup Instructions

- **Trigger:** Tag added: `lead-magnet-crm-audit` (fires when contact downloads the checklist from your lead capture page)
- **Sender:** Austin
- **Goal:** Book a discovery call within 14 days
- **Exit condition:** Discovery call booked — remove from sequence immediately
- **After sequence ends:** Add to newsletter list, add tag `welcome-seq-complete`
- **Compatible platforms:** GoHighLevel (recommended), ActiveCampaign, Close Sequences, HubSpot Workflows, or any platform that supports tag-triggered email automations

---

## Email 1 — Immediate (within 5 minutes of opt-in)

**Subject:** Your CRM audit checklist (+ what most people do wrong with it)

**Body:**

Hey [First Name],

Here's the checklist: [PDF Link or Google Drive Link]

Most people scan it, check 3 boxes, and call it done. That's not the point.

The point is to find the one or two places where real revenue is disappearing — not just the places that *look* like problems.

Do the exercise. Be honest with yourself. I'll follow up in 2 days with the #1 finding I see in every CRM audit I've run.

— Austin

---

**Notes:**
- Attach the CRM Audit Checklist PDF to this email OR link to a Google Drive/Notion URL
- No calendar link in this email — too early, they just opted in

---

## Email 2 — Day 2

**Subject:** The most expensive stage in your pipeline

**Body:**

Hey [First Name],

Here's the finding I see in almost every CRM audit I run:

There's a stage — usually called something like "Follow Up" or "Nurture" or "Active" — that's become a graveyard.

Warm leads. Cold leads. People who had real conversations six months ago. People who opted in from an ad last Tuesday. All sitting in the same bucket. All getting the same follow-up (or no follow-up).

The problem isn't that the leads are cold. It's that the pipeline can't tell the difference between them — so nothing fires at the right time for the right person.

I call it the Stage 3 Graveyard. Every pipeline has one.

Here's a 3-minute test: pull up your pipeline right now. How many contacts are sitting in your main follow-up stage with no activity in the last 14 days?

That number is the answer.

Reply and tell me what you found. I read every response.

— Austin

---

## Email 3 — Day 4

**Subject:** What a pipeline should actually tell you

**Body:**

Hey [First Name],

Most CRMs are set up as storage systems. You put contacts in, they sit there, and you go manually decide what to do with them.

That's not a pipeline. That's a database with extra steps.

A pipeline should function as a decision engine. Open it in the morning and it should tell you — without any clicking — who to call today, who's stalled, what needs attention, and what's about to go cold.

The difference between those two things is stage design. Not software. Not automations. The architecture of the stages themselves.

We built a 22-stage pipeline for a direct-to-seller real estate operation. Each stage maps to a specific moment in a real conversation — not just a vague status. When a contact moves through the pipeline, every automation knows exactly what that person needs next.

I wrote out the thinking behind it here if you want to see how it works in practice: [Link to Close CRM blog post]

— Austin

---

## Email 4 — Day 6

**Subject:** Why automating a broken pipeline makes it worse

**Body:**

Hey [First Name],

This one's counterintuitive.

When most operators decide they have a follow-up problem, their first move is to add more automations. More emails. More SMS sequences. More triggers.

That's wrong.

If your pipeline logic is broken — if the stages don't reflect real moments in a real conversation — then automations just fire at the wrong time. You're accelerating the chaos, not fixing it.

The sequence to actually fix this:

1. Map the real stages of your sales conversation (not generic statuses — actual decision points)
2. Clean the pipeline so every contact is in the right stage
3. *Then* build the automations that match each stage

We spend the first hour of every CRM build just mapping the logic. Before we touch a single workflow. Before we write a single email sequence.

If you want to see what that mapping looks like for your operation, here's 30 minutes: [Calendar Link]

— Austin

---

## Email 5 — Day 8

**Subject:** The call I wish I'd had three years ago

**Body:**

Hey [First Name],

Here's a short version of a real story.

We were running Big Sioux Home Buyers — direct-to-seller acquisitions in the Sioux Falls market. Our CRM looked organized. Stages, automations, the whole thing.

What it was hiding: about 40% of our warm leads were sitting in a "follow up" stage that nobody was actually touching. Not because we didn't care. Because the pipeline couldn't surface them as warm. They looked identical to the cold opt-ins.

We found out when we did a manual audit and started calling through the list. People remembered us. Some of them were ready to talk. We had just stopped showing up.

Fixing it wasn't a software upgrade. It was a complete rethink of the pipeline architecture.

If you're running any kind of outbound or inbound acquisition volume — real estate, services, doesn't matter — this problem is probably happening to you right now.

I do these calls specifically for operators who are already in the problem. Not people kicking tires.

If that's you: [Calendar Link]

— Austin

---

## Email 6 — Day 11

**Subject:** One question before I let you go

**Body:**

Hey [First Name],

I've been in your inbox for 10 days.

I'm only going to ask you this once: is there one specific thing happening in your pipeline right now that you *know* is broken but haven't fixed?

Could be anything. A stage that's bloated. A follow-up sequence that's not firing. Leads that are going dark after a certain point. Reporting that doesn't tell you what you actually need to know.

Just reply and tell me what it is. I'll give you my honest read in 5 minutes.

No agenda. Just want to be useful before I clear out of your inbox.

— Austin

---

**Notes:**
- This is a reply-invitation email only. No calendar link.
- This email gets high reply rates. When someone replies, handle it manually — move them to "Contacted — Conversation Started" in the pipeline and respond personally.

---

## Email 7 — Day 14

**Subject:** Last one from me for a while

**Body:**

Hey [First Name],

I'm not going to keep emailing you.

You got the checklist. You got the thinking behind it. If the timing isn't right or you're working through it on your own, that's completely fine.

I'll move you to our monthly Operator Brief — real notes from what we're building, what's working, what isn't. One email a month. No pitch content. You can unsubscribe anytime.

If you ever want to pick up the conversation: [Calendar Link]

It'll be there.

— Austin

---

## Workflow Logic
*(Example shown in GHL syntax — adapt trigger/condition names to your platform)*

```
TRIGGER: Tag added: `lead-magnet-crm-audit`
ACTION: Send Email 1 (immediate)

WAIT: 2 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 2

WAIT: 2 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 3

WAIT: 2 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 4

WAIT: 2 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 5

WAIT: 3 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 6

WAIT: 3 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 7
ACTION: Add tag `welcome-seq-complete`
ACTION: Add to newsletter contact list
ACTION: Remove tag `welcome-seq-active`
```

---

## Paste Notes
- Replace `[Calendar Link]` with your booking page URL
- Replace `[First Name]` with your platform's merge tag (GHL: `{{contact.first_name}}` / ActiveCampaign: `%FIRSTNAME%` / Close: `{{lead.contact_name}}`)
- The blog post link in Email 3 should point to the Close CRM pipeline post on xovionlabs.com
- Works in any platform that supports tag triggers, conditional exits, and timed delays
