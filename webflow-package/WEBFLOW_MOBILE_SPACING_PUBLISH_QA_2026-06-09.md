# IHL Referrals Mobile Spacing Publish QA

Date: 2026-06-09

## Status

Published to Webflow production after CEO approval.

Production URL:

`https://www.institute4healthyliving.com/referrals`

GitHub source commit:

`375ba03 Tighten mobile referral page spacing`

## Change Published

- Replaced the Webflow `/referrals` page embed with the current generated package:
  - `webflow-package/REFERRALS_WEBFLOW_EMBED_V3_2026-06-09.html`
- Mobile hero spacing tightened:
  - old live mobile rule: `.hero-grid { padding: 22px 0 48px; }`
  - new live mobile rule: `.hero-grid { padding: 10px 0 48px; }`
  - added `.intro { padding-top: 0; }` inside the mobile breakpoint.
- No referral endpoint, Turnstile key, PDF URL, form field logic or HubSpot behaviour was changed.

## Live Source Verification

Fresh production source check confirmed:

- `padding:10px 0 48px` present.
- `.intro{padding-top:0}` present.
- old `padding:22px 0 48px` rule absent.
- Apps Script intake endpoint still present.
- Webflow PDF URL unchanged.

## Mobile Layout Verification

Viewport: 390 x 844 mobile.

After publish:

| Element | Top |
|---|---:|
| Fixed nav bottom | 70px |
| Referral gateway wrapper | 70px |
| Eyebrow | 80px |
| H1 | 110px |
| Referral module | 366px |
| Upload tab | 844px |

Other checks:

- horizontal overflow: `0`;
- old mobile padding: `false`;
- new mobile padding: `true`.

Screenshot:

`render-check-2026-06-09-webflow-final/mobile-after-live-publish-375ba03.png`

## HubSpot / Workflow Status

HubSpot verification is not yet complete.

Blockers:

- HubSpot connector returned `token_expired`.
- Chrome HubSpot session required login/extension UI completion before inspection.

No HubSpot writes were performed.

Next check after HubSpot reconnect/sign-in:

- confirm no patient or clinical referral content is created in HubSpot after the controlled fake referral test;
- confirm any HubSpot-safe tracking receives only approved referrer/practice metadata, or nothing.

## Controlled Fake Referral Test Gate

Not yet run in this publish pass.

Run only after HubSpot access is restored and CEO confirms the fake-data test can proceed.

Expected test confirmations:

- fake referral row lands in the approved intake Sheet / Drive workflow;
- attachment lands in restricted private Drive storage;
- Zapier Slack/email alerts fire without patient/clinical content in alert text;
- auto-response comes from/reply-to `intake@institute4healthyliving.com`;
- HubSpot receives no patient name, DOB, phone, address, presenting concerns, risk context, referral letter, plan or attachment.
