# Email Sequences — Xovion Labs

All sequences are written and ready to paste into GHL Email Marketing > Campaigns.

## Sequences (in deployment priority order)

| File | Sequence | Trigger | Emails | Days | Status |
|------|----------|---------|--------|------|--------|
| `sequence-03-form-submission-intake.md` | Form Submission Intake | Contact form webhook | 4 | 7 | **Deploy first — fixes live lead leak** |
| `sequence-04-cold-outbound.md` | Cold Outbound Prospecting | Manual enrollment | 6 | 21 | Deploy week 2 |
| `sequence-01-crm-audit-checklist.md` | CRM Audit Checklist Nurture | Lead magnet download | 7 | 14 | Deploy with `/crm-audit` funnel page |
| `sequence-02-ai-roi-calculator.md` | AI ROI Calculator Nurture | Calculator completion | 5 | 10 | Deploy with `/ai-roi` funnel page |
| `sequence-05-re-engagement.md` | Dormant Contact Re-engagement | Manual quarterly sweep | 3 | 10 | Deploy month 2, run quarterly |

## Platform Setup Checklist (do these before deploying any sequence)

These sequences work in **GoHighLevel (recommended), ActiveCampaign, Close, HubSpot**, or any platform that supports tag-triggered automations, custom contact fields, and conditional email delays. GHL is the primary platform Xovion Labs uses and recommends — adapt syntax as needed for other tools.

- [ ] Connect and authenticate your sending domain (SPF, DKIM, DMARC) — required for deliverability on any platform
- [ ] Create all custom contact fields: Business Type, Service Interest, Current Tech Stack, Lead Source, `ai_roi_hours`
- [ ] Add your calendar booking link to all sequences (replace all `[Calendar Link]` placeholders)
- [ ] Replace all `[First Name]` with your platform's merge tag (GHL: `{{contact.first_name}}` / ActiveCampaign: `%FIRSTNAME%` / Close: `{{lead.contact_name}}` / HubSpot: `{{ contact.firstname }}`)
- [ ] Replace all `[Company]` with your platform's company merge tag
- [ ] Test each sequence with an internal email address before going live

## Sequences Still to Write

- Newsletter: "The Operator Brief" (monthly send template)
