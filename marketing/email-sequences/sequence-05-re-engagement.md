# Sequence 5: Re-Engagement — Dormant Contacts
**3 emails over 10 days — run quarterly**

## GHL Setup Instructions

- **Trigger:** Manual enrollment via Smart View "Nurture — Re-Engage Candidates"
- **Audience:** Contacts in pipeline Stage 12 (Nurture — Long-Term) OR Stage 10 (Closed — Lost, Not Now), last activity more than 60 days ago
- **When to run:** First week of each quarter (Jan, Apr, Jul, Oct)
- **How to run:** Pull the smart view, review the list manually, select the contacts that are worth re-engaging, bulk-enroll in this sequence
- **Goal:** Restart a conversation — not necessarily close immediately
- **Exit condition:** Any reply or call booked

---

## Email 1 — Day 0 (immediately on enrollment)

**Subject:** It's been a while — [First Name]

**Body:**

Hey [First Name],

Quick honest note.

We talked [timeframe] ago about [Service Interest — pulled from custom field]. Things move fast and timing doesn't always line up.

I wanted to check in — has anything changed in how you're set up, or are you still running into the same thing you mentioned when we first connected?

No agenda. Just genuinely curious where things landed.

— Austin

---

**Notes:**
- `[timeframe]` — use GHL date merge to calculate months since last contact, or manually set during enrollment (e.g., "a few months ago" / "earlier this year")
- `[Service Interest]` = GHL merge tag for the `Service Interest` custom field
- If Service Interest field is empty, replace with "getting your systems sorted out" — generic but honest
- Keep this email short. The shorter it is, the more real it sounds.

---

## Email 2 — Day 4

**Subject:** What we've built since we last talked

**Body:**

Hey [First Name],

In case it's useful context — here's a few things we've shipped since we last connected:

**Wired Claude into a live property management operation running AppFolio.** Cut weekly portfolio reporting from 3 hours to about 15 minutes. The system reads maintenance trends, flags delinquency patterns, and surfaces what needs attention before anyone logs in.

**Rebuilt the website + GHL pipeline for a service business** that was losing inbound leads because their contact form wasn't connected to anything actionable. New site, new GHL structure, follow-up automations running within 5 minutes of every inquiry.

**Deployed a 22-stage acquisition pipeline** for a direct-to-seller real estate operation — AI-generated Monday brief, automated triage, zero manual CRM review.

If any of that is relevant to where you are now, here's the calendar: [Calendar Link]

— Austin

---

**Notes:**
- Update these proof points quarterly with what you've actually built recently
- Keep it to 2–3 items. More than that reads like a pitch deck.
- No pressure language in the CTA — just the link.

---

## Email 3 — Day 10

**Subject:** Archiving this thread — wanted to give you a heads-up

**Body:**

Hey [First Name],

Going to move you to our monthly Operator Brief after this — one email a month, real notes from what we're building, no sales content. You can unsubscribe anytime.

If now is actually the right time to have the conversation: [Calendar Link]

It'll be there.

— Austin

---

## GHL Workflow Logic

```
TRIGGER: Manual enrollment (tag added: `nurture-seq-active`)
ACTION: Send Email 1

WAIT: 4 days
CONDITION: Has replied or booked? → YES: Exit sequence, remove tag, move to Stage 3
ACTION: Send Email 2

WAIT: 6 days
CONDITION: Has replied or booked? → YES: Exit sequence, remove tag, move to Stage 3
ACTION: Send Email 3
ACTION: Remove tag `nurture-seq-active`
ACTION: Add to newsletter contact list
```

---

## Smart View Filter (to find these contacts each quarter)

In GHL > Smart Views, create view with these filters:

- Pipeline Stage = "Nurture — Long-Term" OR "Closed — Lost (Not Now)"
- Last Activity Date = more than 60 days ago
- Tag does NOT contain `nurture-seq-active` (prevents re-enrolling someone already in the sequence)
- Tag does NOT contain `DNC`

Sort by: Last Activity Date, oldest first.

Review this list before enrolling — not every contact warrants a re-engagement. Use judgment. Skip anyone you know is a permanent no.
