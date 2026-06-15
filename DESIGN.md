# Design System: WebTreize — Lumière Éditoriale

**Direction:** Clair, accueillant, professionnel. Navy + orange brand. Pas de décoration gratuite.

**Stack:** Next.js 16 · React 19 · Tailwind CSS 3 · Motion

## Palette
- **Canvas** `#faf9f7` · **Surface** `#ffffff` · **Ink** `#0c1220`
- **Accent** `#D9480F` · **Navy** `#001F3F`

## Composants partagés
- `PageShell` / `LegalPageShell` — en-têtes secondaires
- `ServiceCard` — services (accueil + page services)
- `ContactChannels` — email, Snapchat, Marseille
- `PageCtaBand` — CTA navy en bas des pages internes
- `RankPreview` — seul visuel métier du hero (aperçu SEO local)
- `GrainOverlay` — texture légère globale

## Règles
- Pas de SVG décoratif sans fonction
- Pas de faux numéros de téléphone
- Même header/footer/shell sur toutes les pages
- `/terms` et `/privacy` redirigent vers `/legal/*`
