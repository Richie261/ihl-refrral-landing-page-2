# Webflow Transfer Runbook

Date: 2026-06-05  
Status: ready for configured Webflow draft. Do not publish without CEO approval.

## Files

| File | Purpose |
|---|---|
| `webflow-package/REFERRALS_WEBFLOW_EMBED_V3_2026-06-05.html` | Body-only Webflow embed package for the refined referral gateway. |
| `webflow-package/FORM_FIELD_MAPPING_V3_TO_SECURE_ENDPOINT_2026-06-05.md` | Field mapping from the two-route gateway into the existing secure Apps Script/Zapier/Sheet pathway. |
| `referrer-pack.pdf` | Current public three-page referrer pack for upload to Webflow Assets. |

## Replace Before Publish

In the Webflow embed, replace:

| Placeholder | Replace with |
|---|---|
| `WEBFLOW_REFERRER_PACK_PDF_URL` | `https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf` |
| `TURNSTILE_SITE_KEY_REPLACE_ME` | the production Cloudflare Turnstile site key for `www.institute4healthyliving.com` |
| `APPS_SCRIPT_INTAKE_URL_REPLACE_ME` | the approved Apps Script intake web app URL |

Do not put the Cloudflare Turnstile secret in Webflow. The secret belongs only in Apps Script / server-side configuration.

## Webflow Draft Steps

1. Open Webflow site and go to the existing `/referrals` page.
2. Keep the existing live Webflow header, navigation and footer.
3. Replace only the referral page embed/action area with `REFERRALS_WEBFLOW_EMBED_V3_2026-06-05.html`.
4. Confirm `referrer-pack.pdf` is present in Webflow Assets.
5. Replace every `WEBFLOW_REFERRER_PACK_PDF_URL` placeholder with the verified Webflow CDN URL.
6. Add the production Turnstile site key.
7. Add the approved Apps Script intake URL.
8. Save as a Webflow draft.
9. Do not publish until CEO gives explicit approval.

## Functional QA Before Publish

- Desktop layout renders with the existing site menu and footer.
- Mobile layout scrolls naturally; no nested iframe/modal scroll.
- Submit a Referral scrolls to the module.
- Intake email copy button works.
- EDI copy button works.
- Search-name copy button works.
- Upload route is visible first and validates required fields.
- Complete online route is visible before fields and validates required fields.
- Online risk-context rule works:
  - additional clinical context requires note or attachment;
  - higher clinical concern requires note or attachment;
  - referrer discussion requested requires note/attachment and direct referrer phone.
- Cloudflare Turnstile renders on both routes.
- Submit is blocked if Turnstile is incomplete.
- File type and size checks work before transmission.
- Success message says: `Thank you. Your referral has been received by the IHL intake team and will be reviewed during business hours.`
- Error message directs referrers to `intake@institute4healthyliving.com`.
- Referrer pack opens from all pack CTAs.
- Email to Practice Team opens a mailto with the public `/referrals` link.
- No `Routine referrals only`, `typically within one business day`, `direct referral`, `GP referral`, `TAC`, GitHub/prototype/version wording, or multidisciplinary claim appears.

## Data-Flow QA Before Publish

- Apps Script validates Turnstile server-side before saving or forwarding.
- Attachments save only to the restricted intake Drive folder.
- Sheet row lands in the approved `Dr. Referrals 3.0` destination.
- Sheet row contains a private Drive link for uploaded attachments.
- Unauthenticated/private-browser access to the attachment link does not open the file.
- Team alert reaches internal intake only.
- Auto-response is from/reply-to `intake@institute4healthyliving.com`.
- Direct Zapier webhook is not present in browser source.
- HubSpot receives no patient or clinical content.

## Current Local QA

Passed on 2026-06-05 using system Chrome against a local Webflow-style wrapper:

- body-only embed root present;
- no actual duplicate site header/footer inside the embed;
- hero text renders: `Refer a patient to IHL.`;
- upload route visible by default;
- online route hidden by default;
- route switch works;
- intake email copy button changes to `Copied`;
- two Turnstile containers are present;
- all three referrer pack links use the Webflow PDF placeholder in the source embed and are ready to be replaced in the Webflow draft;
- Webflow PDF URL verified: `https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf`;
- no horizontal overflow at desktop 1365px or mobile 390px.

## Final Gates

CEO approval is still required for:

- adding production endpoint and Turnstile details to the Webflow draft;
- running a live dummy referral submission;
- publishing Webflow production;
- any Zapier mapping change;
- any HubSpot write or campaign send.
