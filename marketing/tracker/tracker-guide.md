# Campaign Tracker Guide

Open `campaign-tracker.csv` in Google Sheets, Excel, or Numbers. One row per contact.

---

## Column Definitions

| Column | What to enter |
|---|---|
| **Name** | First + last name if known. First name only is fine. |
| **Business** | Business name |
| **Vertical** | HVAC / Plumber / Dentist / Gym / Law Firm |
| **Channel** | LinkedIn DM / Instagram DM / Email / SMS |
| **Date Contacted** | YYYY-MM-DD format (e.g. 2026-04-23) |
| **Response** | What they said (or "No reply") |
| **Follow-Up Date** | When to check back — leave blank if Won or Lost |
| **Status** | See status definitions below |
| **Notes** | Anything relevant — referral source, specific objection, prior context |

---

## Status Definitions

| Status | Meaning |
|---|---|
| **New** | On the list, not yet contacted |
| **Contacted** | First message sent, no reply yet |
| **Warm** | Replied with something positive or interested |
| **Call Booked** | Demo call on calendar |
| **Won** | Closed — AI receptionist deal signed |
| **Lost** | Not interested, wrong fit, or unresponsive after 3 touches |
| **No Response** | Sent 3 touches across the sequence with zero reply — archive |

---

## Follow-Up Timing (Email Sequence)

| Touch | When |
|---|---|
| First contact | Day 1 |
| Follow-up 1 | Day 4 |
| Follow-up 2 (breakup) | Day 10–12 |
| Move to Lost / No Response | After Day 12 with no reply |

For DMs and SMS, follow-up timing is shorter — see the script files.

---

## Weekly Review Habit

Every Monday:
1. Check Follow-Up Date column — who needs a touch today or this week?
2. Update any Status changes from last week
3. Add new contacts from the week's prospecting
4. Flag anyone in "Warm" who hasn't moved to "Call Booked" — follow up manually
