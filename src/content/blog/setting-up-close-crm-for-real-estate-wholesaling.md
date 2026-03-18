---
title: "Setting Up Close CRM for Real Estate Wholesaling"
description: "The exact pipeline architecture, smart views, and automation workflows I use to manage a high-volume wholesaling operation — 13,000+ outbound texts per week, 22 pipeline statuses, and AI-generated deal reports."
pubDate: 2026-03-10
tags: ["CRM", "Real Estate", "Automation"]
author: Austin
readingTime: 10
---

Most real estate wholesalers use Close CRM wrong. They import a lead list, send some texts, and call it a day. They're leaving massive efficiency on the table.

After running a high-volume wholesaling operation through Close — 13,000+ outbound texts per week, multiple markets, AI deal analysis — here's the exact setup I use.

## Why Close CRM?

Before getting into the setup: why Close over GHL, HubSpot, or a spreadsheet?

- **SMS is first-class** — built-in texting, not a Zapier hack
- **Smart views** — saved filters that act like dynamic contact lists
- **Bulk actions** — send mass texts, update statuses, assign tasks at scale
- **API** — everything is accessible, which matters when you're adding AI

## The 22-Status Pipeline

Most people default to 5-8 statuses. Not enough granularity for a serious operation.

Here's my pipeline structure:

**New Leads**
1. New — Raw import, uncontacted
2. Attempted Contact — Texted or called, no response
3. Contacted — Had a conversation

**Qualifying**
4. Needs Follow-up — Not ready now, check back
5. Qualified — Confirmed seller motivation
6. Appointment Set — Visit scheduled
7. Appointment Complete — Visited property

**Offer Phase**
8. Offer Sent — Verbal or written offer made
9. Offer Declined — They said no (keep in nurture)
10. Negotiating — Active back and forth
11. Under Contract — Signed

**Disposition**
12. Marketing to Buyers — Active buyer outreach
13. Showing — Buyer viewing scheduled
14. Buyer Offer Received — LOI or offer in
15. Buyer Negotiating — Working terms
16. Buyer Under Contract — Signed with buyer

**Closing**
17. Title Opened — Title company engaged
18. Clear to Close — Title cleared
19. Closing Scheduled — Date set
20. Closed — Deal done

**Dead**
21. Dead — Not a deal right now
22. DNC — Do not contact

This granularity means you know exactly where every lead is. Your smart views segment by status automatically. Your follow-up sequences trigger based on status transitions.

## Smart Views That Matter

Smart views are saved filter sets. I have these always visible:

- **Hot Today** — Active conversations from the last 48 hours
- **Follow-up Due** — Tasks due or overdue
- **Offer Pipeline** — Statuses 8-16, everything in active deal flow
- **Nurture** — Dead/Declined leads, filter by "last contacted > 30 days"
- **No Activity 7 Days** — Qualified leads that fell through the cracks

## The SMS Infrastructure

13,000 texts per week doesn't happen manually. Here's how the automation works:

1. **Import leads** → status set to "New" automatically
2. **Day 1 sequence triggers** → initial outreach text sent
3. **Response detected** → lead moved to "Contacted," assigned to rep
4. **No response** → 3-day follow-up text, then 7-day, then 14-day
5. **Interested reply** → immediate task created for callback

The sequences live in Close's automation builder. The key is writing texts that don't sound like a bot — short, direct, genuine.

## Adding AI to the Workflow

This is where it gets interesting. I connect Close CRM to Claude via MCP (Model Context Protocol), which means I can:

- Pull all leads in a status and have Claude analyze for deal potential
- Generate weekly intelligence reports summarizing pipeline activity
- Draft personalized follow-up messages based on lead notes and history

The weekly intelligence report is my favorite. Every Monday, a script pulls the prior week's data from Close and Claude generates a structured summary: deals closed, pipeline movement, follow-up priorities, red flags. 5 minutes of reading that would take 2 hours to compile manually.

## Getting Started

If you're setting up Close for wholesaling from scratch:

1. Start with 10-12 statuses — you can always add more
2. Build your first smart view before you import leads
3. Set up SMS templates for your initial outreach sequences
4. Import a small test batch before your full list

And if you want this built for your operation — pipeline design, automations, AI integrations, and all — that's one of the core services we offer at Xovion Labs.
