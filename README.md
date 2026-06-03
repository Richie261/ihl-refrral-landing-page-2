# IHL Referrer Gateway

Static GitHub candidate for the Institute for Healthy Living referrer page.

## Current implementation

- `index.html` - referrer gateway candidate with live-site navigation labels and URLs, intake-first referral details strip, upload route and complete-online route.
- `referral.html` - legacy URL redirect to `index.html#referral-module`.
- `pack.html` - existing referrer pack page/link target.
- `referrer-pack.pdf` - current public-facing three-page referrer pack download, rebuilt from the checked 2026-06-02 page renders and kept under Webflow's 10 MB document asset limit.
- `colors_and_type.css` - IHL design tokens.
- `webflow-package/` - implementation checklist and QA gates for Webflow handoff.

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

The final Webflow-hosted PDF URL is created only after `referrer-pack.pdf` is uploaded to Webflow Assets. Webflow will assign the file a public CDN URL. Use that returned URL for the live `/referrals` page once the page has CEO approval to publish.

Do not upload referral submissions, referral letters, treatment plans or clinical attachments as public Webflow assets. The referrer pack PDF is public campaign material; referral uploads are private intake records and must land only in the approved secure intake destination.
