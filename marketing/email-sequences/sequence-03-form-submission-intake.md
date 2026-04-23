# Sequence 3: Form Submission Intake — "The Intake Series"
**4 emails over 7 days**

## GHL Setup Instructions

- **Trigger:** Contact form webhook submission
- **Condition:** Contact did NOT book a call (no appointment exists)
- **Sender name:** Austin
- **Goal:** Get them to book a discovery call within 7 days
- **Exit condition:** If they book a call at any point, remove from sequence immediately

---

## Email 1 — Send 30 minutes after form submission

**Subject:** Got your message — one question before I respond

**Body:**

Hey [First Name],

Got your message.

Before I fire back with something useful, I want to make sure I'm giving you the right context — not a generic reply.

Two quick questions:

→ [Link to 2-question survey]

Takes 60 seconds. Helps me give you a real answer instead of a canned one.

— Austin

---

**Survey to build (linked above):**
Question 1: "What's your biggest bottleneck right now?" (multi-choice: Lead follow-up / CRM or pipeline chaos / Website doesn't convert / Manual tasks eating time / Not sure where to start)
Question 2: "What have you already tried?" (multi-choice: Hired someone / Bought software / Tried to DIY / Nothing yet / Other)

Survey completion → update contact custom fields → tag `intake-survey-complete`

---

## Email 2 — Send 24 hours after Email 1

**Subject:** Here's what I'm thinking for your [business type]

**Send the version that matches their Business Type field. If unknown, send Version D.**

---

### Version A — Real Estate (Investor / Wholesaler / Flipper)

Hey [First Name],

Based on what you shared — here's where I'd start.

The highest-leverage problem for most real estate operators isn't marketing or lead gen. It's what happens *after* a lead comes in.

Most setups I look at have the same issue: a pipeline that can't tell the difference between someone who just opted in cold versus someone who had a real conversation three days ago. Both sitting in the same "follow up" stage. Both getting treated the same — which means the warm one goes cold.

We fixed this for a direct-to-seller acquisition operation. 22-stage pipeline, AI-generated Monday brief, zero manual triage. The recovery rate on warm leads was significant. It runs inside their existing CRM — whatever they use.

If you're running any kind of outbound or inbound acquisition volume, the architecture matters more than the tool.

30 minutes to walk through yours: [Calendar Link]

— Austin

---

### Version B — Property Manager

Hey [First Name],

Based on what you shared — here's where I'd start.

Most property management operations I look at are running on three or four disconnected platforms. Something for the portfolio. Something else for leasing leads. Maybe a CRM that nobody logs into regularly. A lot of copying and pasting in between.

The problem isn't the tools — it's that nothing talks to anything else. So the data that should be driving decisions is buried in tabs nobody opens.

We wired Claude directly into an AppFolio operation — automated the weekly portfolio report, flagged maintenance patterns before they became tenant issues, cut 3 hours of Monday morning admin to about 15 minutes. Works alongside whatever else they're running.

If your operation is fragmented across platforms, the integration path is simpler than it sounds.

30 minutes to look at your setup: [Calendar Link]

— Austin

---

### Version C — Service Business

Hey [First Name],

Based on what you shared — here's where I'd start.

The most common problem I see in service businesses isn't getting leads — it's what happens between "lead fills out a form" and "lead becomes a paying client."

There's usually a gap in there filled with manual follow-up that's inconsistent, slow, or just not happening at all. The software isn't the issue. The connection between the software and the actual follow-up is.

We build the infrastructure that closes that gap — website connected to CRM, automations that fire the right message at the right time, the whole thing running without someone manually checking a spreadsheet. Works with most major CRMs and automation platforms.

30 minutes to look at where yours is leaking: [Calendar Link]

— Austin

---

### Version D — Equipment Rental / Other / Unknown

Hey [First Name],

Based on what you shared — here's where I'd start.

Most operators I talk to aren't losing business because of bad marketing. They're losing it because their systems can't keep up with the leads they already have.

Inquiry comes in. Nobody follows up fast enough. Lead goes somewhere else.

We build the infrastructure that makes sure that doesn't happen — website, CRM, automations, all connected and running without manual babysitting. We don't care what stack you're on. We've built on top of most of them.

30 minutes to look at your setup: [Calendar Link]

— Austin

---

## Email 3 — Send 3 days after Email 1

**Subject:** The 30-minute call I do (and why it's worth your time)

**Body:**

Hey [First Name],

I want to be straight with you about what actually happens on our discovery call — because "book a free call" sounds like the beginning of a pitch, and that's not what this is.

Here's exactly what we do in 30 minutes:

I look at your current setup — whatever you've got: CRM, website, automations, tools. I tell you what's working, what's not, and where the highest-leverage fix is.

If we're a fit to work together, I'll tell you what that looks like and what it would take.

If we're not a fit — I'll tell you that too, and point you somewhere that might actually help.

No slide deck. No proposal on the call. No follow-up pressure.

I do these specifically for operators who are already in the problem — not people kicking tires. If something in your setup is costing you real time or real money, that's the call.

Here's the link: [Calendar Link]

— Austin

---

## Email 4 — Send 7 days after Email 1

**Subject:** Closing the loop on your message

**Body:**

Hey [First Name],

I'm going to stop following up on this after today.

You reached out a week ago. Either the timing's off, you went a different direction, or it's just not the right moment — all fine.

If the conversation is still relevant, here's the calendar: [Calendar Link]

If not, I'll move you to our monthly Operator Brief — one email a month, real notes from what we're building, no sales content. Unsubscribe anytime.

Either way — hope whatever you're building is moving.

— Austin

---

## GHL Workflow Logic

```
TRIGGER: Contact form webhook received
WAIT: 30 minutes
ACTION: Send Email 1

WAIT: 24 hours
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 2 (conditional on Business Type field)

WAIT: 2 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 3

WAIT: 4 days
CONDITION: Has appointment booked? → YES: Exit sequence
ACTION: Send Email 4
ACTION: Add tag `intake-seq-complete`
ACTION: Add to newsletter list
```

---

## Paste Notes
- Replace `[Calendar Link]` with your booking page URL
- Replace `[First Name]` with your email platform's merge tag (e.g. `{{contact.first_name}}` in GHL)
- Replace `[business type]` in subject with the contact's business type field
- Default to Version D if Business Type field is empty
- Works in GHL, ActiveCampaign, Close, HubSpot, or any email platform that supports conditional content and webhook triggers
