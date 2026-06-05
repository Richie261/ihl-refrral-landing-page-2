# IHL Referrals Webflow Draft QA Status

Date: 2026-06-05

## Status Verdict

Needs light fix before publish.

The updated referral gateway has been transferred into the Webflow `/referrals` page draft and renders in Webflow preview. It is not yet published to the public production site.

## Verified Live / Draft State

- Production URL: `https://www.institute4healthyliving.com/referrals`
- Production status: still the earlier Webflow publish from 2026-05-25.
- Production still contains visible/prototype artefacts in source including `v7`, `v1`, and placeholder announcement text.
- Webflow draft status: updated referral gateway is saved in Designer preview.
- GitHub candidate status: updated source/package is pushed to GitHub.
- Referrer pack PDF: Webflow CDN-hosted PDF returns `200` and `application/pdf`.
- Public PDF URL: `https://cdn.prod.website-files.com/66fb6bc216ae048b2c95647d/6a22a95cdccc42a061e09c06_referrer-pack.pdf`

## Draft QA Results

| Item | Result | Notes |
| --- | --- | --- |
| Existing site header/footer | Pass with caveat | Draft uses current Webflow header/footer. Narrow mobile inherits the existing menu behaviour, which is a little cramped at 393px but not caused by the embed. |
| Referral gateway visible at top | Pass | Hero and gateway render in Webflow preview after scoped IHL tokens were embedded. |
| Intake-first utility strip | Pass | Shows intake email first, then secure messaging EDI, then lookup name. |
| HealthLink EDI | Pass | `inshealh` visible and copy action present. |
| Lookup name | Pass | `Institute for Healthy Living` visible and copy action present. |
| Upload route visible | Pass | Upload route is visible before form entry. |
| Complete online route visible | Pass | Complete online route is visible before form entry. |
| Route switching | Pass | Switching between upload and complete online works in Webflow preview. |
| PDF links | Pass | Links point to the Webflow CDN-hosted referrer pack PDF. |
| Emergency/crisis wording | Pass | Uses soft boundary language: not an emergency, acute-care or crisis-support pathway. |
| Form scroll | Pass in preview | Mouse/trackpad scroll works naturally in Webflow preview across the form. |
| Mobile layout | Pass with caveat | Embed stacks and remains readable at Mobile L and Mobile P. Existing site nav remains the inherited constraint. |
| Cloudflare Turnstile containers | Present | Turnstile placeholder containers render; final live behaviour still needs dummy-test approval. |
| Live form submission | Not tested | Do not run live dummy submission until CEO approval. |
| Attachment destination/privacy | Not verified in live workflow | Must be verified before publish or before accepting public submissions. |
| Auto-response from/reply-to intake | Not verified in live workflow | Must be confirmed before campaign push. |
| HubSpot boundary | Design-safe | Page copy and package specify no patient/clinical content to HubSpot. Actual workflow must preserve this. |

## Button / Link Matrix

| Button / Link | Expected Behaviour | Status |
| --- | --- | --- |
| Submit a Referral | Anchor-scrolls to referral gateway/module. | Ready for final preview retest |
| Download Referrer Pack | Opens/downloads Webflow-hosted PDF. | Pass |
| Speak with Intake Team | `tel:+61289370667` link. | Link present; not clicked to avoid OS call handoff |
| Copy intake email | Copies `intake@institute4healthyliving.com`. | Ready for final preview retest |
| Copy EDI | Copies `inshealh`. | Ready for final preview retest |
| Copy lookup name | Copies `Institute for Healthy Living`. | Ready for final preview retest |
| Upload route tab | Shows upload referral/plan/letter form. | Pass |
| Complete online tab | Shows full online referral form. | Pass |
| Submit Referral | Sends to approved secure intake destination only after Turnstile and validation. | Not live-tested |
| Email to Practice Team | Opens local mail client with referrer pathway share text. | Link present; not clicked |

## Remaining Publish Blockers

1. Remove or hide public/prototype artefacts from the production page before publish: `v7`, `v1`, and placeholder announcement text.
2. Confirm the Webflow draft contains only one intended referral page body between the existing header and footer.
3. Confirm live form submissions land in the approved secure intake destination.
4. Confirm attachments are private and stored in the approved intake Drive/folder path, with secure links in the intake spreadsheet where appropriate.
5. Confirm auto-response sender and reply-to are `intake@institute4healthyliving.com`.
6. Confirm Cloudflare Turnstile passes on the live domain.
7. Run one CEO-approved dummy referral test after publish gate approval.
8. Confirm HubSpot receives no patient names, DOB, Medicare details, referral letters, MHTPs, clinical notes, presenting concerns, risk details or attachments.

## Publish Gate

Do not publish Webflow until Richie/CEO explicitly approves.

Do not run a live dummy referral submission until Richie/CEO explicitly approves.

Do not start campaign sends until page/form QA and HubSpot campaign gates pass.
