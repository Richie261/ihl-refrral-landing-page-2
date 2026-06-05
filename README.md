# IHL Referrer Gateway

Static GitHub candidate for the Institute for Healthy Living referrer page.

## Current implementation

- `index.html` - referrer gateway candidate with live-site navigation labels and URLs, intake-first referral details strip, upload route and complete-online route.
- `referral.html` - legacy URL redirect to `index.html#referral-module`.
- `pack.html` - existing referrer pack page/link target.
- `referrer-pack.pdf` - current public-facing three-page referrer pack download, rebuilt from the checked 2026-06-02 page renders and kept under Webflow's 10 MB document asset limit.
- `colors_and_type.css` - IHL design tokens.
- `webflow-package/` - implementation checklist, secure workflow spec and QA gates for Webflow handoff.
  - `REFERRALS_WEBFLOW_EMBED_V3_2026-06-05.html` - body-only Webflow embed package for the refined referral gateway. It keeps the live Webflow header/footer outside the embed and uses placeholders for the Webflow PDF URL, Turnstile site key and Apps Script intake endpoint.
  - `FORM_FIELD_MAPPING_V3_TO_SECURE_ENDPOINT_2026-06-05.md` - field mapping from the refined two-route gateway into the existing secure intake endpoint.
  - `WEBFLOW_TRANSFER_RUNBOOK_2026-06-05.md` - practical draft, QA and publish-gate runbook.
  - `NEXT_EXECUTION_RUNBOOK_2026-06-04.md` - no-Max execution path for Webflow, secure endpoint verification and launch gates.

## Referral module structure

The page uses the locked MVP direction:

- Referral details utility strip:
  - Email intake: `intake@institute4healthyliving.com`
  - Secure messaging EDI: `inshealh`
  - Search: `Institute for Healthy Living`
  - Copy actions for all three values
- Upload existing referral / plan / letter route:
  - document type
  - uploaded document
  - referrer details
  - patient name and phone
  - acknowledgement
- Complete referral online route:
  - patient details
  - referral / plan details
  - therapy type
  - patient concern / risk context
  - presenting concerns
  - diagnosis and medication context, if known
  - referrer details
  - typed signature
  - acknowledgement

## Safety state

This GitHub build does not submit or store referral data. The submit handler prevents transmission and shows a safe fallback message until Webflow is connected to an approved secure intake destination.

Before public Webflow publish:

- connect the form to the approved secure submission destination;
- confirm attachment storage is private and not publicly indexed;
- confirm the auto-response is from and reply-to `intake@institute4healthyliving.com`;
- add the approved human verification layer, such as Cloudflare Turnstile or equivalent;
- validate the human verification token server-side before accepting the submission;
- confirm no patient or clinical content is written to HubSpot.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

If GitHub Pages is enabled, the candidate should be available at:

`https://richie261.github.io/ihl-refrral-landing-page-2/`

Public PDF URL:

`https://richie261.github.io/ihl-refrral-landing-page-2/referrer-pack.pdf`

## Webflow PDF URL

Verified Webflow-hosted PDF URL:

`https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf`

Use this URL for the live `/referrals` page once the page has CEO approval to publish.

Do not upload referral submissions, referral letters, treatment plans or clinical attachments as public Webflow assets. The referrer pack PDF is public campaign material; referral uploads are private intake records and must land only in the approved secure intake destination.
