# CEO Handover - Referrer Page Sprint

Date: 2026-05-30  
Workstream: Referral Campaign + Webflow/Max

## Decisions Made

- Use the existing `/referrals` page base.
- Focus implementation on the right-side referral gateway/module, not a whole-site redesign.
- Match the live website menu labels and URLs in the GitHub candidate.
- Replace the generic short form with the locked two-route gateway:
  - HealthLink utility strip;
  - Upload existing referral / plan / letter;
  - Complete referral online.
- Keep GitHub candidate submission disabled until an approved secure intake destination is connected.

## Files Updated

- `index.html` - rebuilt as the current referrer gateway candidate.
- `referral.html` - changed legacy form URL into a redirect to the gateway module.
- `README.md` - updated implementation and safety notes.
- `webflow-package/WEBFLOW_IMPLEMENTATION_CHECKLIST.md` - Max/Webflow checklist.
- `webflow-package/MAX_HANDOFF_MESSAGE.md` - short handoff message.

## Blockers

- Webflow form submission destination is not confirmed.
- Attachment storage privacy is not confirmed.
- Zapier/team alert route is not approved or configured.
- CAPTCHA/human verification is not implemented for production.
- Auto-response from/reply-to `intake@institute4healthyliving.com` still needs Webflow/form-system confirmation.
- Referrer pack PDF/public download status still needs final confirmation.
- No live dummy submission can be run without CEO approval.

## Risks

- Patient and clinical referral content must not enter HubSpot.
- Attachments must not be publicly accessible or indexable.
- GitHub candidate is public if GitHub Pages is enabled, so its submit action is deliberately blocked until secure infrastructure is connected.
- Live Webflow still needs removal of prototype artefacts if present on the `/referrals` page.

## Next Actions

1. QA the GitHub candidate locally and on GitHub Pages.
2. Confirm whether the repo URL should remain `ihl-refrral-landing-page-2` or be moved/renamed to a cleaner slug.
3. Give Max the narrow Webflow checklist and ask only for implementation/review.
4. Confirm Drive/Zapier destination design without writing patient/clinical data to HubSpot.
5. Get CEO approval before Webflow publish or live dummy submission.

## CEO Chat Needs To Know

The page/module can progress as a Webflow implementation candidate, but the campaign remains NO-GO until the page/form infrastructure and HubSpot gates pass. No patient/clinical data should be routed to HubSpot.
