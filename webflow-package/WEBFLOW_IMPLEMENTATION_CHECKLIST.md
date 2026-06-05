# IHL Referrer Gateway - Webflow Implementation Checklist

Date: 2026-05-30  
Status: implementation package only. Do not publish without CEO approval.

## Implement

1. Use the existing Webflow `/referrals` page as the base.
2. Use `webflow-package/REFERRALS_WEBFLOW_EMBED_V3_2026-06-05.html` as the body-only Webflow package. Keep the live Webflow header, navigation and footer outside this embed.
3. Keep the current global site navigation/menu. The GitHub candidate mirrors the live menu labels and URLs:
   - Home
   - Our Team
   - Our Offerings: Who We Support, What We Support, How We Support, Fees & Rebates
   - Blog
   - Referrals
   - About Us: Administration Team, Our Values, Work With Us
   - Phone: 02 8937 0667
   - Book an appointment
4. Replace/refine the current referral action area with the gateway module from `index.html`.
5. Keep referral destination details visible before any form fields:
   - Email intake: `intake@institute4healthyliving.com`
   - Secure messaging EDI: `inshealh`
   - Search: `Institute for Healthy Living`
   - Copy actions for all three values.
6. Keep both submission routes visible before the referrer starts:
   - Upload existing referral / plan / letter.
   - Complete referral online.
7. Make the referrer pack link visible near the action area.
8. Use the verified Webflow Assets PDF URL for all referrer pack links: `https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf`.
9. Implement both referral routes through the approved secure intake pathway, not a generic marketing/contact form.
10. Use `webflow-package/FORM_FIELD_MAPPING_V3_TO_SECURE_ENDPOINT_2026-06-05.md` for the MVP field mapping.
11. Keep the referrer pack section visible below the referral gateway:
   - heading: `The IHL referrer pack.`
   - copy: `How we work, on a page — what we treat and how to refer.`
   - actions: Download Referrer Pack, Email to Practice Team.
12. Keep the emergency and acute-care boundary visible below the pack section.
13. Use the existing IHL favicon/site identity, not GitHub/prototype identity.
14. Use page-level scrolling only. Do not implement a slide-over, modal, iframe with its own scroll, or nine-step wizard.

## Do Not Touch

- Do not redesign the whole site.
- Do not rebuild unrelated `/referrals` sections.
- Do not change campaign strategy.
- Do not add multidisciplinary wording.
- Do not add GitHub, prototype, version, `v1`, `v7` or placeholder artefacts.
- Do not publish Webflow without explicit CEO approval.
- Do not run a live dummy submission without explicit CEO approval.
- Do not connect patient or clinical form data to HubSpot.
- Do not start campaign sends, workflows, sequences or pack sends.
- Do not upload clinical/referral-submission attachments to public Webflow Assets. Only the public referrer pack PDF belongs in Webflow Assets.

## Required Form Logic

### Upload existing referral / plan / letter

Required:

- uploaded document;
- document type;
- referrer name;
- role;
- practice / clinic;
- referrer email;
- patient name;
- patient phone;
- acknowledgement.

This route is deliberately minimal. If the uploaded referral, plan or specialist letter already carries the referral details, do not force the referrer through the full online referral fields.

Document type options:

- Referral letter;
- Mental Health Treatment Plan;
- PAMP;
- EDTP;
- Specialist letter;
- Other referral / plan / letter.

### Complete referral online

Required:

- patient name;
- DOB;
- address / suburb;
- phone;
- referral date;
- plan / referral type;
- sessions requested or remaining;
- therapy type;
- Patient concern / risk context;
- symptoms / presenting concerns;
- provider number;
- referrer name;
- profession / role;
- practice / clinic;
- referrer email;
- referrer phone;
- typed / electronic signature;
- acknowledgement.
- submission date/time captured by the secure intake workflow.

Optional:

- diagnosis and medications, if known;
- referral / plan / letter attachment unless required by the risk-context rule.

Patient concern / risk context:

- No additional concern flagged.
- Additional clinical context.
- Higher clinical concern.
- Referrer discussion requested.

Validation:

- If Additional clinical context, Higher clinical concern or Referrer discussion requested is selected, require a short note or attached referral / plan / letter.
- If Referrer discussion requested is selected, require direct referrer phone / mobile.

## Submission And Data Boundary

Before publish, confirm:

- form submissions land only in the approved secure intake destination;
- Cloudflare Turnstile token is validated server-side before the submission is processed;
- attachments are private, access-controlled and not publicly indexed;
- intake team receives an alert with only the safe operational minimum;
- auto-response is from and reply-to `intake@institute4healthyliving.com`;
- no patient names, DOB, Medicare details, presenting concerns, risk details, referral letters, MHTPs, attachments or clinical notes enter HubSpot.

HubSpot may receive either nothing, or only safe referrer/practice metadata after human approval.

## Human Verification

The GitHub candidate includes an authorised-referrer confirmation and honeypot only. Webflow production still needs Cloudflare Turnstile or equivalent before public campaign push.

Turnstile must be validated server-side by the live submission endpoint or automation workflow before any submission is accepted, stored or alerted. A client-side widget by itself is not sufficient.

## QA Gates

- Desktop layout: nav, left intro and right module render without overlap.
- Mobile layout: natural page scroll works with mouse wheel, trackpad and touch.
- Route selector: both routes visible before fields; switching routes does not lose page scroll.
- Intake email, EDI and search-name copy buttons work.
- Upload route validates required fields.
- Online route validates required fields.
- Risk-context rule works.
- Referrer discussion requires direct phone.
- Referrer pack link opens.
- All pack links marked `data-ihl="pack-download"` use the final Webflow PDF URL.
- Email to Practice Team opens a prefilled mailto with the public `/referrals` pathway link.
- Success/fallback message is correct for the connected state.
- No `contact@institute4healthyliving.com` auto-response.
- No GitHub/prototype/version artefacts visible.
- Referrer pack link uses the verified final Webflow CDN PDF URL, not a local file path or GitHub prototype URL.

## Publish Gate

Publish only after CEO approval and after Sathvika or intake confirms:

- destination;
- attachment privacy;
- auto-response sender/reply-to;
- alert routing;
- dummy referral test plan;
- no HubSpot patient/clinical-data leakage.
