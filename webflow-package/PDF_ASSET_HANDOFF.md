# IHL Referrer Pack PDF Asset Handoff

Date: 2026-06-04

## Current Public GitHub URL

Use this for staging/source-control review:

`https://richie261.github.io/ihl-refrral-landing-page-2/referrer-pack.pdf`

The file in the repo is `referrer-pack.pdf`. It is the current public-facing three-page referrer pack rebuilt from the checked 2026-06-02 page renders and is under 10 MB for Webflow upload.

## Final Webflow URL

The final Webflow-hosted PDF URL does not exist until the file is uploaded to Webflow Assets.

Required Webflow step:

1. Upload `referrer-pack.pdf` to Webflow Assets.
2. Copy the Webflow CDN URL assigned by Webflow.
3. Replace all live Download Referrer Pack links on `/referrals` with that Webflow CDN URL.
4. QA that the link opens/downloads on desktop and mobile.

## Privacy Boundary

The public referrer pack PDF can be hosted in Webflow Assets.

Referral submissions, referral letters, MHTPs, plans, risk details and clinical attachments must not be uploaded to public Webflow Assets and must not be written to HubSpot.
