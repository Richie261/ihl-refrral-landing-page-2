# IHL — For Referrers

Standalone landing page for healthcare professionals referring to the
Institute for Healthy Living (Bondi Junction, Sydney).

## Entry point
- `index.html` — the page (Editorial Ledger design, Variant B)
- `referrer-pack.pdf` — downloadable referrer pack used by the secondary CTA

## Design system
- `colors_and_type.css` — IHL design tokens (do not edit casually; this
  file is the single source of truth for colours, type, spacing, radii)
- `assets/logo/` — IHL logo SVGs

## Live preview
If GitHub Pages is enabled on this repo, the page is served at:
`https://<your-handle>.github.io/<repo-name>/`

## Current link targets
- Primary CTA, `Submit a referral`: `https://www.institute4healthyliving.com/referrals`
- Secondary CTA, `Download referrer pack`: `referrer-pack.pdf`
- HealthLink EDI copy value: `inshealh`

## Local preview
Any static server works. Quickest:
```
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes for Codex / contributors
- Match the existing visual vocabulary in `colors_and_type.css`. Use
  the CSS custom properties (`--ihl-ink`, `--ihl-paper`, `--ihl-rule`,
  `--serif`, `--sans`) rather than introducing new values.
- The page is intentionally minimal — three referral routes (form,
  HealthLink, email) presented as a quiet ledger. Resist adding
  marketing copy, icons, or "feature" sections.
- Primary CTA is `Submit a referral`. Black pill, not forest green —
  forest is reserved for the brand mark.
- The EDI copy chip is plain JS (see inline script at the bottom of
  `index.html`). No build step.
