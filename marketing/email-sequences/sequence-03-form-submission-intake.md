# Sequence 3: Form Submission Intake — "The Intake Series"
**4 emails over 7 days**

## GHL Setup Instructions

- **Trigger:** Contact form webhook submission (existing webhook at `services.leadconnectorhq.com/hooks/...`)
- **Condition:** Contact did NOT book a call (no appointment exists)
- **Sender name:** Austin
- **Sender email:** your GHL connected email (e.g. austin@xovionlabs.com)
- **Goal:** Get them to book a discovery call within 7 days
- **Exit condition:** If they book a call at any point, remove from sequence immediately

---

## Email 1 — Send 30 minutes after form submission

**Subject:** Got your message — one question before I respond

**Body:**

Hey [First Name],

Got your message.

Before I fire back with something useful, I want to make sure I'm actually giving you the right context — not a generic reply.

Two quick questions:

→ [Link to 2-question GHL survey]

Takes 60 seconds. Helps me give you a real answer instead of a canned one.

— Austin

---

**GHL Survey to create (linked above):**
Question 1: "What's your biggest bottleneck right now?" (multi-choice: Lead follow-up / CRM/pipeline chaos / Website doesn't convert / Manual tasks eating time / Not sure where to start)
Question 2: "What have you already tried?" (multi-choice: Hired someone / Bought software / Tried to DIY / Nothing yet / Other)

Survey completion → update contact custom fields → tag `intake-survey-complete`

---

## Email 2 — Send 24 hours after Email 1

**Subject:** Here's what I'm thinking for your [business type]

**GHL Conditional Content — send the version that matches their `Business Type` field:**

---

### Version A — Real Estate (Investor / Wholesaler / Flipper)

Hey [First Name],

Based on what you shared — here's where I'd start.

The highest-leverage problem for most real estate operators isn't marketing or lead gen. It's what happens *after* a lead comes in.

Most setups I look at have the same issue: a pipeline that can't tell the difference between someone who just opted in cold versus someone who had a real conversation three days ago. Both contacts are sitting in the same "follow up" stage. So they get treated the same. Which means the warm one goes cold.

We fixed this exact problem for a direct-to-seller acquisition operation — 22-stage pipeline, AI-generated Monday brief, zero manual triage. The recovery rate on warm leads was significant.

If you're running any kind of outbound or inbound acquisition volume, the architecture matters more than the automation.

30 minutes to walk through yours: [Calendar Link]

— Austin

---

### Version B — Property Manager

Hey [First Name],

Based on what you shared — here's where I'd start.

Most property management operations I look at are running on three or four disconnected platforms. AppFolio for the portfolio. Something else for leasing leads. Maybe a CRM that nobody logs into. And a lot of copying and pasting between all of them.

The problem isn't the tools. It's that nothing talks to anything else, so the data that should be driving decisions is buried in tabs nobody opens.

We wired Claude directly into an AppFolio operation — automated the weekly portfolio report, flagged maintenance patterns before they became tenant issues, cut 3 hours of Monday morning admin to about 15 minutes.

If your operation runs on AppFolio or a similar system, the integration path is straightforward.

30 minutes to look at your setup: [Calendar Link]

— Austin

---

### Version C — Service Business

Hey [First Name],

Based on what you shared — here's where I'd start.

The most common problem I see in service businesses isn't getting leads. It's what happens between "lead fills out a form" and "lead becomes a paying client."

There's usually a gap in there — and it's filled with manual follow-up that's inconsistent, slow, or just not happening at all.

We build the infrastructure that closes that gap. Website that actually connects to your CRM. Automations that fire the right message at the right time. No one manually checking a spreadsheet.

30 minutes to look at where yours is leaking: [Calendar Link]

— Austin

---

### Version D — Equipment Rental / Other

Hey [First Name],

Based on what you shared — here's where I'd start.

Most operators I talk to aren't losing business because of bad marketing. They're losing it because their systems can't keep up with the leads they already have.

Inquiry comes in. Nobody follows up fast enough. Lead goes somewhere else.

We build the infrastructure that makes sure that doesn't happen — website, CRM, automations, all connected. Not theoretical. We run this in our own operations before we build it for anyone else.

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

If we're not a fit — I'll tell you that too, and point you toward something that might actually help.

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

You reached out [X days] ago. Either the timing's off, you went a different direction, or it's just not the right moment — all of that's fine.

If the conversation is still relevant, here's the calendar: [Calendar Link]

If not, I'll move you to our monthly Operator Brief — one email a month, real notes from what we're building, no sales content. You can unsubscribe anytime.

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
ACTION: Send Email 2 (conditional content based on Business Type field)

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

## Notes

- Replace all `[Calendar Link]` with your GHL booking page URL
- Replace all `[First Name]` with GHL merge tag: `{{contact.first_name}}`
- Replace `[Business Type]` in subject/body with GHL merge tag: `{{contact.business_type}}`
- The 2-question survey in Email 1 needs to be built in GHL Surveys first, then the link dropped in
- If `Business Type` field is empty (they didn't fill out the form field), default to Version D
