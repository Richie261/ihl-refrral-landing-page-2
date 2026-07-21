# IHL Referrer Pack PDF Asset Handoff

Date: 2026-07-21

## Current Public GitHub URL

Use this for staging/source-control review:

`https://richie261.github.io/ihl-refrral-landing-page-2/referrer-pack.pdf`

The file in the repo is `referrer-pack.pdf`. It has been replaced with the canonical July 2026 campaign draft and is under 2 MB for email and Webflow upload.

Canonical local source:

`/Users/richie/Documents/New project/referrer-campaign/canonical-assets/IHL_Referrer_Guide_July_2026_CURRENT_CAMPAIGN_DRAFT_2026-07-21.pdf`

Canonical SHA256:

`36c285569812b6d4ffd6fea32b4d459ae53173f461ac7f5e6271d14e5c913a8b`

## Final Webflow URL

Current Webflow-hosted PDF URL on the live page is stale and must be replaced:

`https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf`

That URL returns the older June asset. Do not treat it as the final July pack URL.

Required Webflow step:

1. Upload the July `referrer-pack.pdf` from this repo to Webflow Assets.
2. Copy the new Webflow CDN URL.
3. Replace `WEBFLOW_JULY_2026_REFERRER_PACK_PDF_URL_REPLACE_ME` in the pending Webflow embed.
4. Replace all live Download Referrer Pack links on `/referrals` with the new verified Webflow CDN URL.
5. QA that the link opens/downloads on desktop and mobile.

## Privacy Boundary

The public referrer pack PDF can be hosted in Webflow Assets.

Referral submissions, referral letters, MHTPs, plans, risk details and clinical attachments must not be uploaded to public Webflow Assets and must not be written to HubSpot.
