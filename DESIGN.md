# Design System : WebTreize — Studio

**Direction :** chaleureux plutôt que technique, calme plutôt que bruyant. Beaucoup de vide, une seule couleur d'accent, deux familles de caractères. Rien de décoratif.

**Stack :** Next.js 16 · React 19 · Tailwind CSS 3 · Motion

## Palette

| Rôle | Valeur | Usage |
| --- | --- | --- |
| Ivoire | `#F6F3EE` | fond principal |
| Blanc chaud | `#FFFDFA` | sections claires alternées |
| Sable | `#EAE3D8` | plaques image, encarts |
| Encre | `#1C1814` / `#17130F` | texte, section sombre |
| Terre cuite | `#C4552B` | accent unique |
| Texte secondaire | `#6B6259` (muted) · `#8A8078` (subtle) | paragraphes, étiquettes |

La terre cuite ne sert qu'à trois choses par écran : le point du logo, un mot mis en valeur dans un titre, le bouton principal. Quatrième apparition = on en retire une.

## Typographie

- **Plus Jakarta Sans** — titres en `800`, interlettrage `-0.045em` à `-0.05em` ; texte en `400`.
- **Newsreader** (serif, `300`) — uniquement citations et grands chiffres. Italique pour le mot accentué. Jamais dans un paragraphe courant.
- Étiquettes : `600`, majuscules, `tracking-[0.1em]`, classe `.eyebrow`.

## Logotype

- `webtreize.` en minuscules, `font-extrabold`, `tracking-[-0.045em]`. Le point est terre cuite.
- Monogramme `13` en carré arrondi pour l'avatar et le favicon (`app/icon.svg`).
- Jamais d'ombre, de contour, de dégradé ni de rotation.

## Composants

- `Logo` / `LogoLink` / `Monogram` — `components/ui/Logo.tsx`
- `Header` — sticky, 60px, fond ivoire flouté, un seul bouton `Parlons-en`
- `HeroSection` — centré, plaque 16/9 pleine largeur en dessous
- `CraftSection` — blocs texte/plaque alternés, un sujet par bloc
- `PromisesSection` / `ProcessSection` — colonnes séparées par un filet haut (`.rule-top`)
- `AuditSection` — la seule section sombre du site
- `FaqSection` — `<details>` natif, filets fins

## Pages internes

Même grammaire que l'accueil : en-tête étiquette + grand titre + lede, sections séparées par un filet ou un changement de fond, aucune carte bordée.

- `PageShell` / `LegalPageShell` — en-tête de page, pas de bandeau coloré
- `ServicesPageContent` — un service par bloc, titre à gauche, détail et points à droite
- `ContactChannels` — trois colonnes `rule-top`, sans pastille ni icône
- `PageCtaBand` — reprend `AuditSection` (fond encre) pour clore chaque page interne
- Formulaire `/contact` — champs `.input-field`, bouton `.btn-primary`, pas de cadre autour

## Règles

- **Le vide fait le prestige.** Marges verticales `py-section`. Une idée par section. Si c'est serré, on retire du contenu, pas de l'espace.
- **Des filets, pas des cadres.** Séparer par un trait fin ou un changement de fond. Pas de cartes bordées partout, pas d'ombres portées, pas de dégradés.
- **De vraies photos.** Lumière naturelle et chaude, mains au travail, lieux réels de Marseille. Les `.plate` sont des placeholders à remplacer par `next/image`.
- Pas de SVG décoratif, pas d'icône d'illustration, pas de faux numéros de téléphone.
- Même header/footer sur toutes les pages. `/terms` et `/privacy` redirigent vers `/legal/*`.
