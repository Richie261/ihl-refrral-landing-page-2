# Referral Gateway V3 Field Mapping

Date: 2026-06-05  
Status: implementation mapping. Do not publish or run a live dummy referral without CEO approval.

## Current Secure Endpoint Shape

The existing secure intake pathway accepts the legacy referral payload keys below, then the server-side Apps Script validates Cloudflare Turnstile, saves attachments to the restricted intake Drive folder and forwards the safe payload to the existing Zapier/Sheet workflow.

Legacy payload keys:

| Key | Current meaning |
|---|---|
| `rname` | referrer name |
| `rpract` | practice / clinic |
| `rphone` | referrer phone |
| `remail` | referrer email |
| `pname` | patient name |
| `pphone` | patient phone |
| `pemail` | patient email, if collected |
| `age` | patient age category, if collected |
| `gname`, `gphone`, `gemail` | guardian fields, if collected |
| `therapy` | therapy / referral type |
| `risk` | numeric risk routing value |
| `concerns` | intake clinical/routing note |
| `turnstile_token` | Cloudflare Turnstile token |
| `submission_timestamp` | browser ISO timestamp |
| `uploaded_documents_url` | populated by Apps Script after private Drive upload |

## V3 Adapter Mapping

The generated Webflow embed maps the refined two-route gateway into the existing secure endpoint without exposing Zapier in browser code.

### Upload Existing Referral / Plan / Letter

| V3 field | Endpoint key | Notes |
|---|---|---|
| `referrer_name` | `rname` | required |
| `practice` | `rpract` | required |
| `referrer_email` | `remail` | required |
| not collected in this route | `rphone` | intentionally blank for MVP unless CEO adds phone to upload route |
| `patient_name` | `pname` | required |
| `patient_phone` | `pphone` | required |
| not collected in this route | `pemail` | intentionally blank |
| `document_type` | `therapy` | used as practical intake classification |
| fixed value `1` | `risk` | upload route does not ask a risk rating; clinical detail should sit in the attached document |
| `document_type`, `referrer_role`, `routing_note`, data-boundary note | `concerns` | compact routing note only; uploaded document carries the clinical referral |
| uploaded file | `fileData[]`, `fileName[]`, `fileMime[]` | base64 encoded client-side, saved privately by Apps Script |

### Complete Referral Online

| V3 field | Endpoint key | Notes |
|---|---|---|
| `referrer_name` | `rname` | required |
| `practice` | `rpract` | required |
| `referrer_phone` | `rphone` | required |
| `referrer_email` | `remail` | required |
| `patient_name` | `pname` | required |
| `patient_phone` | `pphone` | required |
| not collected | `pemail` | intentionally blank |
| selected `therapy_type` values | `therapy` | comma-separated |
| `risk_context` | `risk` | `none = 1`, `additional = 3`, `higher = 4`, `discussion = 4` |
| DOB, address/suburb, referral date, plan type, sessions, concerns, diagnosis/medications, risk note, provider number, role, signature | `concerns` | structured text block for intake Sheet |
| optional attachment | `fileData[]`, `fileName[]`, `fileMime[]` | base64 encoded client-side, saved privately by Apps Script |

## MVP Limitation

The adapter allows the new gateway to use the existing secure pathway quickly, but the existing Zapier/Sheet mapping is still legacy-shaped. In the fastest MVP path, newer structured fields such as DOB, address/suburb, provider number, plan type and signature are preserved inside the intake `concerns` text block rather than separate columns.

That is acceptable for a controlled MVP if intake confirms it can work from the Sheet row plus private Drive links. For cleaner long-term intake intelligence, update the Sheet/Zapier mapping to add dedicated V3 columns after CEO approval.

## HubSpot Boundary

HubSpot must receive no patient or clinical content from this flow.

Allowed later, only after review:

- referrer name;
- practice / clinic;
- referrer work email;
- referrer work phone;
- safe campaign/referral pathway metadata.

Blocked:

- patient name, DOB, phone, address;
- presenting concerns, diagnosis, medications, risk context;
- referral letters, MHTPs, plans, attachments;
- intake notes or clinical notes.
