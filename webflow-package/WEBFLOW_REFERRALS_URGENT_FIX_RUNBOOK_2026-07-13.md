# Webflow Referrals Urgent Fix Runbook

Date: Monday 13 July 2026; updated Wednesday 22 July 2026  
Status: ready for Webflow login / Designer action  

## Goal

Fix the live `/referrals` page issues immediately:

1. Remove stray `v7` / `v1` / placeholder announcement artefacts.
2. Update the referrer pack download to the latest July email-safe pack with clinicians on page 2.

## Latest PDF

Use this file:

`/Users/richie/Documents/New project/referrer-campaign/ihl-refrral-landing-page-2/referrer-pack.pdf`

Source copied from canonical campaign asset:

`/Users/richie/Documents/New project/referrer-campaign/canonical-assets/IHL_Referrer_Guide_July_2026_FINAL_EMAIL_PRINT_READY_2026-07-22.pdf`

Current size: about `1.6 MB`.

Do not upload or email the old `11 MB` PDF.

## Webflow Fix Steps

1. Open Webflow Designer for the live IHL site.
2. Open the `/referrals` page.
3. Delete the stray announcement/prototype blocks above the referrals embed:
   - any visible `v7`;
   - any visible `v1`;
   - any block containing `This is some text inside of a div block.`
4. Upload the latest July `referrer-pack.pdf` to Webflow Assets.
5. Copy the new Webflow CDN URL for the uploaded PDF.
6. Open:

   `webflow-package/REFERRALS_WEBFLOW_EMBED_V3_2026-07-13_PENDING_WEBFLOW_PDF_URL.html`

7. Replace every instance of:

   `WEBFLOW_JULY_2026_REFERRER_PACK_PDF_URL_REPLACE_ME`

   with the new Webflow CDN PDF URL.

8. Replace the existing referrals-page embed/action-area code with the updated July embed.
9. Save and publish after visual check.

## Immediate Fallback If Webflow Asset Upload Is Blocked

The updated pack is also live through GitHub Pages:

`https://richie261.github.io/ihl-refrral-landing-page-2/referrer-pack.pdf`

If Webflow asset upload is blocked but the page must be fixed immediately, use:

`webflow-package/REFERRALS_WEBFLOW_EMBED_V3_2026-07-13_GITHUB_PDF_FALLBACK.html`

This keeps the live referrals page pointing to the latest July pack while the Webflow-hosted asset is arranged.

## Emergency Alternative

If the announcement blocks cannot be deleted quickly, add this snippet to the page before publish:

`webflow-package/REFERRALS_WEBFLOW_EMERGENCY_CLEANUP_SNIPPET_2026-07-13.html`

This hides/removes the stray announcement/version blocks client-side. Deleting the blocks in Designer remains the cleaner fix.

## Required QA After Publish

- Live page no longer exposes visible `v7`.
- Live page no longer exposes visible `v1`.
- Live page no longer shows `This is some text inside of a div block.`
- `Download Referrer Pack` opens the July PDF with clinical team on page 2.
- PDF file is about `1.6 MB`, not `11 MB`.
- PDF footer wording is softened to: `Availability subject to change · IHL is not a crisis or emergency service.`
- `Submit a Referral` scrolls to the form.
- Intake email copy button still copies `intake@institute4healthyliving.com`.
- EDI copy button still copies `inshealh`.
- Mobile page scrolls naturally.

## Boundary

Do not change form destination, Zapier, HubSpot, sender settings or clinical-data routing as part of this fix.
