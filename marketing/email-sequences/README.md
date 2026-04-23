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

## GHL Build Checklist (do these before deploying any sequence)

- [ ] Connect sending email domain in GHL (Settings > Email Services)
- [ ] Authenticate domain: SPF, DKIM, DMARC records added to DNS
- [ ] Create all custom contact fields (Business Type, Service Interest, Current Tech Stack, Lead Source, ai_roi_hours, etc.)
- [ ] Add GHL calendar booking link to all sequences (replace all `[Calendar Link]` placeholders)
- [ ] Replace all `[First Name]` with GHL merge tag: `{{contact.first_name}}`
- [ ] Replace all `[Company]` with GHL merge tag: `{{contact.company_name}}`
- [ ] Test each sequence with a real email address before going live

## Sequences Still to Write

- Newsletter: "The Operator Brief" (monthly send template)
