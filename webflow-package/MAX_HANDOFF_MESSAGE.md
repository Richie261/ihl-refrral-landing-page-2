# Short Max Handoff Message

Hi Max,

We have a concrete GitHub candidate for the `/referrals` page module now. Please do not redesign the full site or rebuild the whole page.

Task: implement/review the referral gateway module from the GitHub candidate into the existing Webflow `/referrals` page.

PDF asset: upload `referrer-pack.pdf` to Webflow Assets and use the Webflow CDN URL for the live Download Referrer Pack links. The current GitHub Pages PDF URL is a staging/source-control URL only.

Keep:

- current IHL global menu/navigation;
- referral destination strip at the top of the module: intake email `intake@institute4healthyliving.com`, secure messaging EDI `inshealh`, search name `Institute for Healthy Living`;
- two visible routes before fields: Upload existing referral / plan / letter, or Complete referral online;
- natural page scrolling on desktop and mobile;
- referrer pack link near the action area.

Please confirm before publish:

- form submission destination;
- attachment privacy/access;
- team alert route;
- auto-response from and reply-to `intake@institute4healthyliving.com`;
- CAPTCHA/human verification option;
- no patient or clinical content entering HubSpot.

Important boundary: the public referrer pack PDF may be hosted in Webflow Assets. Referral submissions, referral letters, MHTPs, plans, risk details and clinical attachments must not be uploaded to public Webflow Assets or written to HubSpot.

No Webflow publish, live dummy submission, HubSpot write, workflow/sequence enrolment or campaign send without Richie/CEO approval.
