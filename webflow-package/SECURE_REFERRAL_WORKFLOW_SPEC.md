# Secure Referral Workflow Spec

Date: 2026-06-04

Status: implementation direction. Do not publish, activate Zapier, run live dummy submissions or write to HubSpot without CEO approval.

## Principle

The public `/referrals` page is a gateway only. Patient and clinical referral content must move through a secure intake pathway into the approved private intake Drive/Sheet flow. HubSpot may receive either nothing or only approved referrer/practice/campaign metadata after review.

## Two Submission Routes

### 1. Upload existing referral / plan / letter

Use when the referral, MHTP, PAMP, EDTP, CDM plan or specialist letter is already completed.

Minimum live behaviour:

- Cloudflare Turnstile human verification.
- Healthcare referrer / authorised practice team confirmation.
- Secure acknowledgement that the uploaded document is intended for IHL intake and has authority to be shared for referral review.
- Required upload.
- Required document type.
- Minimal routing fields only:
  - referrer name;
  - referrer role;
  - practice / clinic;
  - referrer email;
  - patient name;
  - patient phone;
  - optional non-urgent routing note.

No duplicate full clinical form is required if the uploaded document carries the referral details.

### 2. Complete referral online

Use when the online form needs to carry the referral details.

Minimum live behaviour:

- Cloudflare Turnstile human verification.
- Healthcare referrer / authorised practice team confirmation.
- Full referral fields.
- Optional attachment.
- Typed / electronic signature.
- Submission date/time captured by the secure intake workflow.
- Server-side timestamp preferred as the source of truth.

Risk-context validation:

- If Additional clinical context, Higher clinical concern or Referrer discussion requested is selected, require either a short note or an attachment.
- If Referrer discussion requested is selected, require a direct referrer phone/mobile.

## Security Controls

Required before public campaign push:

- HTTPS page and submission endpoint.
- Cloudflare Turnstile widget on both routes.
- Turnstile token validated server-side before the submission is processed.
- Honeypot field retained as a low-friction secondary spam control.
- File type and size restrictions.
- Private attachment storage.
- Intake-only access permissions.
- Minimal team alerting that does not expose patient or clinical details in the alert body.

Client-side Turnstile alone is not enough. The live implementation must verify the token server-side before accepting or routing the referral.

## Data Flow

Target MVP flow:

1. Referrer submits through Webflow page.
2. Secure intake endpoint validates Turnstile and form rules.
3. Submission row is created in the approved intake Sheet / Referrals 3.0 destination.
4. Uploaded documents are saved in the approved private intake Drive folder.
5. The Sheet stores a private Drive file/folder link.
6. Team alert is sent with safe operational minimum only.
7. Auto-response is sent from/reply-to `intake@institute4healthyliving.com`.

Recommended attachment folder naming:

`REF-[submission-id]_[FirstName]-[SurnameFirst3]`

Do not put clinical details in folder names or team alert text.

## HubSpot Boundary

HubSpot must not receive:

- patient names;
- DOB;
- Medicare details;
- patient contact details;
- presenting concerns;
- risk details;
- diagnoses;
- medications;
- referral letters;
- MHTPs;
- care plans;
- attachments;
- intake or clinical notes.

HubSpot may receive only approved safe metadata if later reviewed:

- referrer/practice name;
- practice/company;
- work email;
- work phone;
- domain/website;
- suburb/location;
- relationship owner;
- campaign/referral pathway status;
- safe follow-up task history.

## Publish Gate

Do not publish until:

- final submission endpoint is confirmed;
- Turnstile server-side validation is confirmed;
- Drive/Sheet destination is confirmed;
- attachment privacy is confirmed;
- auto-response sender/reply-to is confirmed as `intake@institute4healthyliving.com`;
- dummy submission has been approved and tested;
- no patient/clinical content enters HubSpot;
- CEO gives explicit publish approval.
