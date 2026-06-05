# IHL Referrer Pack PDF Asset Handoff

Date: 2026-06-04

## Current Public GitHub URL

Use this for staging/source-control review:

`https://richie261.github.io/ihl-refrral-landing-page-2/referrer-pack.pdf`

The file in the repo is `referrer-pack.pdf`. It is the current public-facing three-page referrer pack rebuilt from the checked 2026-06-02 page renders and is under 10 MB for Webflow upload.

## Final Webflow URL

Verified Webflow-hosted PDF URL:

`https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf`

Use this URL for all live Download Referrer Pack links on `/referrals`.

Completed Webflow step:

1. `referrer-pack.pdf` uploaded to Webflow Assets.
2. Webflow CDN URL copied and verified.
3. PDF URL returns HTTP 200 and `application/pdf`.

Remaining Webflow step:

1. Replace all live Download Referrer Pack links on `/referrals` with the verified Webflow CDN URL.
2. QA that the link opens/downloads on desktop and mobile.

## Privacy Boundary

The public referrer pack PDF can be hosted in Webflow Assets.

Referral submissions, referral letters, MHTPs, plans, risk details and clinical attachments must not be uploaded to public Webflow Assets and must not be written to HubSpot.
