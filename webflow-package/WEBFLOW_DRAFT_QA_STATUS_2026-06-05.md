# IHL Referrals Webflow Launch QA Status

Date: 2026-06-05

## Status Verdict

Live MVP published. Needs final operational dummy submission checks before campaign traffic.

The refined referral gateway is now published at `https://www.institute4healthyliving.com/referrals` on the production Webflow domain. The page is suitable for controlled review/use, but campaign push should still wait for final attachment privacy confirmation and a deliberate operational sign-off.

## Verified Production State

- Production URL: `https://www.institute4healthyliving.com/referrals`
- Webflow publish readback: `Last Published: Fri Jun 05 2026 12:23:01 GMT+0000`.
- Webflow publish destinations: production `www.institute4healthyliving.com` and staging `ihl-therapy.webflow.io` were published from Designer.
- GitHub source status: pushed to `main`, latest commit `059bafd` (`Fix referral page Webflow scrolling`).
- Referrer pack PDF: Webflow CDN PDF returns `200`, `application/pdf`, length `665824`.
- Public PDF URL: `https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf`

## Live QA Results

| Item | Result | Notes |
| --- | --- | --- |
| Existing site header/footer | Pass | Production page uses current Webflow header/footer. |
| Referral gateway visible at top | Pass | New hero/gateway renders on production. |
| Intake-first utility strip | Pass | Shows intake email first, then EDI, then lookup name. |
| HealthLink EDI | Pass | `inshealh` visible and copy action present. |
| Lookup name | Pass | `Institute for Healthy Living` visible and copy action present. |
| Upload route visible | Pass | Upload referral/plan/letter route visible before data entry. |
| Complete online route visible | Pass | Online form route visible before data entry. |
| Route switching | Pass | Upload/online switch works on production. |
| Copy intake email | Pass | Button changed to `Copied` after click. |
| PDF links | Pass | Links point to the Webflow CDN-hosted PDF. |
| Emergency/crisis wording | Pass | Uses soft boundary language: not an emergency, acute-care or crisis-support pathway. |
| Removed old harsh wording | Pass | No `Routine referrals only`, `Direct referral`, or multidisciplinary wording found in the published embed. |
| GitHub/prototype visual artefacts | Pass with caveat | Old inherited Webflow announcement/version blocks still exist in global source, but are hidden/removed on this page by the referrals embed cleanup. Future tidy-up: remove them from the Webflow nav/component itself. |
| Form scroll | Pass | Webflow embed includes a scroll restoration guard. Production source contains `restorePageScroll`; browser Page Down moves through the module into the route cards and upload form. |
| Mobile layout | Pass with caveat | Embed stacks and remains readable. Existing site mobile nav remains the inherited constraint. |
| Cloudflare Turnstile | Pass for presence/security probe | Turnstile renders on production. Direct backend tests without a valid browser token are rejected. |
| Live form submission | Dummy upload completed accidentally | A QA-only upload submission appears to have completed while diagnosing the stuck live form. No real clinical data was intended or submitted. |
| Attachment destination/privacy | Landing confirmed; privacy still needs sign-off | Dummy file landed in Google Drive folder `Referral Documents_ Webform - IHL Intake` as `doff_John_05062026_referrer-pack.pdf`. Sharing/privacy settings still require deliberate review. |
| Auto-response from/reply-to intake | Evidence observed; not fully audited | Browser showed a Gmail tab titled `Referral received — Institute For Healthy Living`; sender/reply-to still needs direct email header check if required. |
| HubSpot boundary | Pass in page/source | Page and embed keep patient/clinical content in the secure intake pathway; no HubSpot write was performed. |

## Backend Security Probe

Direct POST to the configured Apps Script endpoint using the live form's flat field shape and a fake Turnstile token returned:

```json
{"success":false,"error":"Security verification failed"}
```

Direct POST without a usable token returned:

```json
{"success":false,"error":"Missing security token"}
```

Interpretation: the public endpoint is present and is not accepting direct bot-style submissions without valid Cloudflare Turnstile verification.

## Button / Link Matrix

| Button / Link | Expected Behaviour | Status |
| --- | --- | --- |
| Submit a Referral | Anchor-scrolls to referral gateway/module. | Pass by page structure |
| Download Referrer Pack | Opens/downloads Webflow-hosted PDF. | Pass |
| Speak with Intake Team | `tel:+61289370667` link. | Link present; not clicked to avoid OS call handoff |
| Copy intake email | Copies `intake@institute4healthyliving.com`. | Pass |
| Copy EDI | Copies `inshealh`. | Present; not separately clicked after intake copy pass |
| Copy lookup name | Copies `Institute for Healthy Living`. | Present; not separately clicked after intake copy pass |
| Upload route tab | Shows upload referral/plan/letter form. | Pass |
| Complete online tab | Shows full online referral form. | Pass |
| Submit Referral | Sends to approved secure intake endpoint only after validation and Turnstile. | Pending full browser dummy submission |
| Email to Practice Team | Opens local mail client with referrer pathway share text. | Link present; not clicked |

## Remaining Operational Blockers

1. Review/archive/delete the accidental dummy upload record/file if desired: `doff_John_05062026_referrer-pack.pdf` in `Referral Documents_ Webform - IHL Intake`.
2. Confirm the Drive file is private/restricted and that referral uploads are not publicly shared.
3. Confirm spreadsheet row contains secure attachment link only, and no public file sharing is created.
4. Confirm Zapier/team alert fires to the intended intake team destination.
5. Confirm auto-response sender and reply-to are `intake@institute4healthyliving.com`.
6. Confirm no patient/clinical content enters HubSpot after test submission.
7. Remove inherited announcement/version blocks from the Webflow nav/component when there is time; the current embed-level cleanup is acceptable for MVP but not ideal as a permanent site hygiene fix.

## Scroll Fix Added

The Webflow embed generator now adds page-level scroll hardening for the referrals page:

- forces `html` and `body` back to natural vertical page scrolling;
- keeps the referral module, active route form and wrapper elements at `height: auto` / `max-height: none`;
- restores scroll state on load, route switching, Turnstile render and user wheel/touch/key interaction.

This fix is intended to address Webflow/body overflow locks or custom embed wrapper scroll traps without changing the visual design.

Production retest after Webflow publish `Fri Jun 05 2026 12:23:01 GMT+0000`: browser Page Down moved from the hero/gateway area into the route cards and upload form. Scroll is no longer stuck in the visible form area.

## Campaign Gate

Webflow publish is complete with CEO approval.

Campaign sending remains NO-GO until page/form live dummy tests and HubSpot campaign gates pass.

Do not write patient names, DOB, Medicare details, referral letters, MHTPs, clinical notes, presenting concerns, risk details or attachments to HubSpot.
