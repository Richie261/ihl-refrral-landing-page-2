# IHL Referral Page/Form Next Execution Runbook

Date: 2026-06-04

Status: no-Max execution path. GitHub preview is updated. Do not publish Webflow, activate Zapier, run live dummy submissions, write HubSpot or write Drive without explicit CEO approval.

## Current Position

- Latest Claude Design was reviewed in Chrome.
- GitHub implementation has been aligned with the latest MVP direction:
  - hero: `Refer a patient to IHL.`
  - intake-first details strip;
  - two visible pathways;
  - visible referrer pack section;
  - emergency / acute-care boundary;
  - stable public PDF link;
  - IHL favicon/site identity.
- Public GitHub page is deployed:
  - `https://richie261.github.io/ihl-refrral-landing-page-2/`
- Public GitHub PDF is deployed:
  - `https://richie261.github.io/ihl-refrral-landing-page-2/referrer-pack.pdf`

## What Matters For Public Launch

The page/design is close enough. Do not keep polishing.

The launch-critical path is:

1. Upload the public referrer pack PDF to Webflow Assets and replace all `data-ihl="pack-download"` links with the Webflow CDN URL.
2. Implement the page body into the existing Webflow `/referrals` page while preserving the current live header/footer.
3. Wire both form routes to the secure intake endpoint.
4. Confirm Cloudflare Turnstile is validated server-side before any Sheet/Drive/Zapier/HubSpot write.
5. Confirm submissions and attachments land in the approved restricted intake Drive/Sheet workflow.
6. Confirm HubSpot receives no patient, clinical, risk, attachment or secure-link content.
7. Run one fake-data dummy submission only after approval.
8. Publish only after CEO approval.

## Existing Backend Candidate

Local migration notes show an existing Apps Script single-endpoint architecture from May 2026:

- Webflow posts to Apps Script, not directly to Zapier.
- Apps Script validates Cloudflare Turnstile server-side.
- Apps Script saves attachments into restricted Drive.
- Apps Script forwards the payload server-side to Zapier.
- Zapier writes the intake Sheet and handles notifications / safe metadata.

This is the fastest likely backend path, but it must be re-verified live before reuse.

Do not assume the old endpoint is still safe or mapped correctly for the refreshed two-route form.

## Field Mapping Decision

The refreshed MVP form has two routes:

- `upload_existing_document`
- `complete_referral_online`

The older endpoint/Zapier flow expects older payload fields such as referrer name, practice, patient name, patient phone, therapy, risk and concerns.

Recommended approach:

- Do not overload clinical fields with unrelated data if we can avoid it.
- Prefer a small v2 mapping update so the intake Sheet records:
  - submission route;
  - document type;
  - plan/referral type;
  - referral date;
  - DOB/address when supplied;
  - provider number when supplied;
  - sessions requested/remaining;
  - signature/timestamp for online route;
  - private Drive attachment link.

Acceptable emergency fallback:

- Map the minimum fields into the existing endpoint only if Richie approves a temporary MVP and intake confirms the Sheet is still usable.

## Required Read-Only Verification Before Editing Live

Before changing Webflow or running a dummy submission, verify:

- current Webflow `/referrals` page source and whether old form is still present;
- current Apps Script deployed source matches the server-side Turnstile version;
- Apps Script has the Turnstile secret in Script Properties;
- Apps Script can still call Cloudflare `siteverify`;
- Zapier trigger is not exposed directly in browser code;
- Zapier Sheet step maps patient/clinical content only to the intake Sheet;
- Zapier HubSpot step maps safe referrer/practice metadata only, or is disabled;
- Drive upload folder remains restricted;
- `Referrals 3.0` Sheet and attachment folder are the intended live destinations.

## Exact CEO Approvals Needed

Ask Richie for these only when ready to act:

1. Approval to edit the Webflow `/referrals` draft page without publishing.
2. Approval to upload the public `referrer-pack.pdf` to Webflow Assets.
3. Approval to inspect Webflow, Apps Script, Zapier, Drive/Sheet and HubSpot read-only for this workflow.
4. Approval to update the secure endpoint / Zapier field mapping if needed.
5. Approval to run one fake-data dummy referral submission.
6. Final approval to publish Webflow.

## QA Gate

Public launch requires:

- Submit a Referral scrolls/opens the gateway.
- Download Referrer Pack opens the final Webflow-hosted PDF.
- Email to Practice Team opens a prefilled email.
- Copy intake email, EDI and lookup name work.
- Upload route blocks submit without required document/details.
- Online route blocks submit without required fields.
- Risk-context rule works.
- Referrer discussion requires direct referrer phone/mobile.
- Turnstile missing/fake token cannot create Sheet rows, Drive files or Zapier tasks.
- Attachment links are private.
- Intake receives alert with safe operational minimum.
- Auto-response is from/reply-to `intake@institute4healthyliving.com`.
- HubSpot receives no patient/clinical/attachment content.
