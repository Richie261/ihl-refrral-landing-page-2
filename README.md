# IHL — For Referrers

Standalone landing page for healthcare professionals referring to the
Institute for Healthy Living (Bondi Junction, Sydney).

## Entry point
- `index.html` — the gateway page (Editorial Ledger design)
- `referral.html` — the referral form (Centred card design, linked from the gateway CTA)

## Pages

### Gateway (`index.html`)
Landing page for healthcare professionals. Three contact pathways in an editorial ledger; a single primary CTA — “Submit a referral” — that routes to `referral.html`.

### Referral form (`referral.html`)
Short clinical intake form: patient details, therapy type, referring practitioner, clinical (risk + presenting concerns), attachments. Native browser validation. Drag-and-drop file upload (no backend wired — the submit handler currently shows a success state; a TODO comment marks the spot to POST to a real intake endpoint).

## Design system
- `colors_and_type.css` — IHL design tokens (do not edit casually; this
  file is the single source of truth for colours, type, spacing, radii)
- `assets/logo/` — IHL logo SVGs

## Live preview
If GitHub Pages is enabled on this repo, the page is served at:
`https://<your-handle>.github.io/<repo-name>/`

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
- The form (`referral.html`) handles file uploads and validation in
  vanilla JS at the bottom of the file. To wire a real backend,
  replace the submit handler's success-only branch with a POST to
  your intake endpoint (a `TODO (backend)` comment marks the line).
