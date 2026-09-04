# Design System : WebTreize — Studio

**Direction :** chaleureux plutôt que technique, calme plutôt que bruyant. Beaucoup de vide, une seule
couleur d’accent, deux familles de caractères. Rien de décoratif.

**Stack :** Next.js 16 · React 19 · Tailwind CSS 3 · Motion

**Sources de vérité, dans cet ordre :** `docs/charte-graphique.md` (la marque) > ce document
(le système) > le code. Les jetons vivent dans `tailwind.config.ts` et `app/globals.css` ; aucune
valeur de couleur, de taille, d’espacement, de durée ou de courbe ne s’écrit ailleurs.

---

## 1 · Palette

Cinq valeurs de charte, trois dérivées d’accessibilité, deux filets. **Dix jetons, pas onze.**

| Jeton | Valeur | Rôle |
| --- | --- | --- |
| `canvas` | `#f6f3ee` | Ivoire — fond dominant |
| `surface` | `#fffdfa` | Blanc chaud — sections alternées, encarts |
| `sand` | `#eae3d8` | Sable — plaques image, aplats |
| `ink` | `#17130f` | Encre — texte, section sombre |
| `accent` | `#c4552b` | Terre cuite — aplats, fonds, point du logotype |
| `ink-muted` | `#6b6259` | dérivée — paragraphes secondaires |
| `ink-faint` | `#756c65` | dérivée — étiquettes, mentions |
| `accent-deep` | `#a8461f` | dérivée — terre cuite **en texte** et au survol |
| `line` | `rgba(23,19,15,0.14)` | filet décoratif de séparation |
| `line-strong` | `rgba(23,19,15,0.5)` | bordure de composant interactif |

### 1.1 · Pourquoi trois dérivées, et pas une de plus

La charte fixe cinq valeurs. Elles ne suffisent pas à écrire une interface conforme : l’encre pleine
est trop dure pour un texte secondaire, et la terre cuite de la charte échoue le seuil AA dès qu’elle
sert de couleur de texte. Chaque dérivée répond donc à un besoin nommé, avec son ratio calculé.

Ratios WCAG 2.x (luminance relative), recalculés sur les valeurs réelles du fichier de configuration :

| Texte | sur `canvas` | sur `surface` | sur `sand` | sur `ink` |
| --- | --- | --- | --- | --- |
| `ink` #17130f | **16,69** | **18,20** | **14,50** | — |
| `ink-muted` #6b6259 | **5,40** | **5,88** | **4,69** | 3,09 |
| `ink-faint` #756c65 | **4,64** | **5,06** | 4,03 | 3,60 |
| `accent-deep` #a8461f | **5,33** | **5,81** | **4,63** | 3,13 |
| `accent` #c4552b | 4,05 | 4,42 | 3,52 | 4,12 |
| `canvas` #f6f3ee | — | — | — | **16,69** |
| blanc `#ffffff` | — | — | — | **18,48** |

Seuils : 4,5:1 pour du texte normal, 3:1 pour du grand texte (≥ 24 px, ou ≥ 18,66 px en 700+) et pour
un indicateur non textuel.

- **`ink-muted` #6b6259** — le seul ton de gris chaud qui franchisse 4,5:1 sur les **trois** fonds
  clairs du site (5,40 / 5,88 / 4,69). C’est donc le gris des paragraphes secondaires, et **le seul
  gris admis sur le sable**.
- **`ink-faint` #756c65** — un cran plus clair, pour que les étiquettes ne pèsent pas autant que le
  texte courant. Il franchit 4,5:1 sur ivoire (4,64) et sur blanc chaud (5,06). **Il ne franchit pas
  le seuil sur le sable (4,03)** : sur une plaque sable, une étiquette passe en `ink-muted`. Aucune
  valeur intermédiaire ne peut passer sur le sable sans se confondre avec `ink-muted` — la contrainte
  est structurelle, elle se respecte, elle ne se contourne pas.
- **`accent-deep` #a8461f** — la terre cuite de la charte à `#c4552b` plafonne à 4,05:1 sur l’ivoire :
  elle échoue en texte normal. `accent-deep` est sa version foncée : 5,33 sur ivoire, 5,81 sur blanc
  chaud, 4,63 sur sable, et **5,90:1 pour du blanc posé dessus** — c’est ce qui rend le survol du
  bouton primaire conforme, là où `accent` + blanc plafonne à 4,49:1.

Les filets ne sont pas du texte :

| Filet | sur `canvas` | sur `surface` | sur `sand` |
| --- | --- | --- | --- |
| `line` 14 % | 1,34 | 1,34 | 1,33 |
| `line-strong` 50 % | **3,41** | **3,47** | **3,29** |

`line` sépare — c’est un ornement de mise en page, exempté du seuil 3:1. `line-strong` délimite un
composant interactif (champ de formulaire, bouton discret) et **doit** tenir 3:1 : c’est pourquoi il
est à 50 % et non à 45 % comme envisagé au cahier des charges — à 45 % il tombait à 2,94:1 sur
l’ivoire, sous le seuil.

### 1.2 · Règles d’emploi

- La terre cuite **en texte** est toujours `accent-deep`. `accent` ne sert qu’aux aplats, aux fonds et
  au point du logotype.
- **La règle des trois terres cuites.** Trois occurrences d’accent au maximum par écran. Quand on en
  ajoute une, on en retire une.
- Le point du logotype est `accent` **sur tous les fonds**, clairs comme sombres. La charte interdit
  nommément le changement de couleur du point.
- Ne jamais employer `line` comme unique bordure d’un champ : 1,34:1, échec du seuil 3:1.
- Aucune couleur Tailwind générique (`red-500`, `black`…) sauf `text-white` posé sur `accent-deep`.
  **Les erreurs de formulaire s’écrivent en `accent-deep`, jamais en rouge** : le site n’a qu’une
  couleur vive.
- Sur fond `ink`, un texte secondaire s’écrit en `canvas` avec une opacité, jamais en `ink-muted`
  (3,09:1, échec).

---

## 2 · Typographie

**Plus Jakarta Sans** — titres en `800`, interlettrage très resserré ; texte courant en `400` ;
étiquettes en `600` majuscules. **Newsreader** `300` — citations et grands chiffres **uniquement**,
jamais dans un paragraphe.

Une seule échelle, dix crans. Toute taille littérale (`text-[1.03125rem]`…) est un défaut.

| Jeton | Taille | Interligne | Interlettrage | Usage |
| --- | --- | --- | --- | --- |
| `text-label` | 0.8125rem | 1.4 | 0.1em | étiquettes `.eyebrow` |
| `text-note` | 0.875rem | 1.6 | — | mentions, légal, navigation |
| `text-body` | 1rem | 1.7 | — | texte courant |
| `text-body-lg` | 1.0625rem | 1.72 | — | lede, listes, boutons |
| `text-title-sm` | 1.1875rem | 1.35 | −0.025em | question de FAQ, sous-titre |
| `text-title` | 1.375rem | 1.3 | −0.03em | titre de bloc |
| `text-display-sm` | clamp(1.875 → 3.375rem) | 1.03 | −0.04em | titre de section |
| `text-display-md` | clamp(2 → 3.75rem) | 1.02 | −0.045em | titre de section large |
| `text-display-lg` | clamp(2.25 → 4.75rem) | 1 | −0.05em | titre de page |
| `text-display-xl` | clamp(2.625 → 6rem) | 0.98 | −0.05em | h1 de l’accueil |

L’interlettrage fait partie du cran : dans le texte courant, on n’ajoute **jamais** de `tracking-*`
par-dessus. Deux exceptions, et deux seulement, parce que les valeurs de l’échelle sont calées sur
les chasses de Plus Jakarta Sans en `800` :

- **Le logotype et le monogramme** (`components/ui/Logo.tsx`) resserrent à −0.045em et −0.04em. La
  charte § 3 impose au mot de marque un interlettrage plus serré que celui d’un titre courant.
- **Newsreader en `300`** (`SerifQuote`, le grand chiffre de `AuditSection`) reprend `tracking-tight`
  et un interligne propre : à 54 px, un serif léger posé à −0.05em avec un interligne de 1,03 se
  télescope. La correction accompagne le changement de famille, elle ne rouvre pas l’échelle.

Réglages posés une fois pour toutes sur `body` :

- `font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1` — crénage et ligatures.
- `font-variant-numeric: proportional-nums` par défaut ; `tabular-nums` se pose au cas par cas sur
  les chiffres alignés ou animés (le « 48 » du compteur), pour que la largeur ne tremble pas.
- `font-size: max(1rem, 16px)` — garde-fou de lisibilité.
- `text-wrap: balance` sur `h1`–`h4`, `text-wrap: pretty` et `hyphens: auto` sur `p` et `li`
  (le document porte `lang="fr"`, la césure suit donc les règles françaises).

Typographie française obligatoire dans les textes : apostrophes courbes `’`, guillemets `«  »`,
espace fine insécable ` ` avant `: ; ! ?`, espace insécable ` ` avant les unités.

---

## 3 · Rythme et espacement

Sept jetons, et on n’en sort pas. Toute valeur `clamp()` littérale dans un composant est un défaut.

| Jeton | Valeur | Usage typique |
| --- | --- | --- |
| `gap-xs` | clamp(0.75rem, 1.2vw, 1rem) | paragraphe → paragraphe |
| `gap-sm` | clamp(1.25rem, 2.2vw, 1.75rem) | étiquette → titre |
| `gap-md` | clamp(1.75rem, 3.4vw, 2.75rem) | titre → texte |
| `gap-lg` | clamp(2.5rem, 5vw, 4rem) | texte → grille, gouttières de grille |
| `gap-xl` | clamp(3.5rem, 7vw, 6rem) | bloc → bloc dans une section |
| `section` | clamp(4.75rem, 11vw, 10.5rem) | respiration verticale de section |
| `section-lg` | clamp(5.25rem, 12vw, 11rem) | bandes pleine largeur (section encre) |

S’emploient avec tous les préfixes Tailwind : `mt-gap-md`, `py-section`, `gap-gap-lg`,
`space-y-gap-sm`.

**Rayons — deux seulement**, plus deux valeurs natives :
`rounded-plate` (clamp 1 → 1.625rem) et `rounded-plate-lg` (clamp 1.125 → 2.125rem) pour les plaques,
`rounded-full` pour les boutons, `rounded-xl` pour les champs. Aucun littéral.

**Largeurs :** `max-w-site` = 1120 px (la colonne unique du site), `max-w-plate` = 1280 px (les
plaques, qui débordent volontairement). Toutes les sections passent par `.site-container` — y compris
la FAQ, qui limite sa colonne de texte en interne et non par un conteneur plus étroit.

**Aucune ombre portée.** Le jeton `boxShadow.menu` a été supprimé : un panneau en surimpression se
détache par un fond opaque et un filet `line`, jamais par une ombre. La charte l’interdit nommément.

---

## 4 · Mouvement — vocabulaire fermé

Deux courbes, quatre durées. Rien d’autre dans tout le code.

| Variable CSS | Classe Tailwind | Valeur | Usage |
| --- | --- | --- | --- |
| `--ease-out` | `ease-out` | cubic-bezier(0.32, 0.72, 0, 1) | entrées, déplacements |
| `--ease-swap` | `ease-swap` | cubic-bezier(0.65, 0, 0.35, 1) | échanges d’état, rare |
| `--dur-micro` | `duration-micro` | 150 ms | couleur, opacité d’un survol |
| `--dur-state` | `duration-state` | 250 ms | bascule d’état, ouverture d’un menu |
| `--dur-reveal` | `duration-reveal` | 450 ms | apparition courte |
| `--dur-long` | `duration-long` | 700 ms | apparition longue, image |

`--ease-out` et `--dur-micro` sont les **valeurs par défaut** de Tailwind : un `transition-colors`
écrit seul reçoit déjà la courbe et la durée de la maison. Il n’y a donc plus aucune raison d’écrire
une durée ou une courbe littérale dans un composant.

Seule exception documentée : le retour d’appui à **80 ms**, fixé par le cahier des charges et déclaré
une unique fois dans `.press` (`app/globals.css`) pour qu’aucun composant n’ait à l’écrire.

### 4.1 · Reveal — le contenu existe sans JavaScript

**Aucune animation ne masque du texte dans le HTML servi.** Le style de base ne masque rien : le
voile n’existe que sous `html.js`, classe posée avant la première peinture par un script inline du
`<head>`. Sans JavaScript, tout est visible immédiatement.

Contrat CSS, à respecter par `components/motion/Reveal.tsx` :

- l’élément porte `data-reveal` et, s’il est décalé, la variable `--reveal-delay` (en ms) ;
- un observateur client unique pose `data-revealed` ; la transition dure `--dur-reveal` ;
- sous `prefers-reduced-motion: reduce`, le voile est levé même si `data-revealed` n’arrive jamais.

### 4.2 · Masque de ligne du h1

Le `h1` est l’élément LCP : il **ne s’anime jamais en opacité**. Il porte `data-line-mask` et se
découvre par `clip-path`, opacité constante à 1 — le navigateur peint donc le LCP dès la première
frame. Sans JavaScript, aucun masque. Sous `prefers-reduced-motion`, aucun masque non plus.

### 4.3 · Fondu de la plaque image — même contrat

Une image n’échappe pas à la règle 4.1. Le fondu de chargement de `Plate` était écrit en `opacity-0`
dans le rendu serveur et levé par le `onLoad` de `next/image` : sans JavaScript ce gestionnaire
n’est jamais appelé, et les quatre photos de l’accueil restaient invisibles pour toujours.

Contrat CSS, symétrique de celui de `Reveal` :

- l’image porte `data-plate-image`, et `data-plate-loaded` une fois chargée ;
- le voile et la transition (`--dur-long`) n’existent que sous `html.js` ;
- sous `prefers-reduced-motion: reduce`, la photo est peinte dès son arrivée, sans fondu.

### 4.4 · Focus — un seul anneau, impossible à oublier

Une règle unique, posée dans la couche `base` sur les éléments interactifs eux-mêmes :

```css
outline: 2px solid var(--focus-ring);
outline-offset: 2px;
```

`--focus-ring` vaut `accent-deep` (3,13:1 minimum sur tous les fonds du site). Sur un bloc à fond
encre, la classe `.on-ink` le repasse en `accent` plein (4,12:1). Aucun composant n’a de classe de
focus à écrire, et aucun ne peut être livré sans anneau. `--tw-ring-offset-color` est en outre forcé
à `canvas` sur `body` : un anneau Tailwind hérité ne peut plus dessiner un halo blanc pur.

**Cibles tactiles :** 24 × 24 px effectifs au minimum pour tout élément interactif (WCAG 2.2).

### 4.5 · Micro-interactions

- **Boutons** — survol vers `accent-deep` en `--dur-micro` ; appui `scale(0.985)` en 80 ms (`.press`).
  Flèche `→` : 3 px de décalage en `--dur-micro`, jamais plus.
- **Liens de texte** — `.link-draw` : soulignement dessiné de gauche à droite
  (`background-size: 0 1px → 100% 1px`), 1 px d’épaisseur, 0.22em sous le texte. Pas de
  `text-decoration` qui saute. Actif au survol **et au focus clavier**.
- **FAQ** — ouverture animée **sans une ligne de JavaScript** : `interpolate-size: allow-keywords` sur
  `:root` et transition de `block-size` / `content-visibility` sur `::details-content`. Les
  navigateurs sans support ignorent ces règles : ouverture instantanée, aucun défaut visible. Le
  chevron pivote en `--dur-state`.
- **Header** — au-delà de 8 px de défilement, apparition d’un filet `line` en bas et passage du fond à
  `canvas/92`, en `--dur-state`. Pas de rétraction, pas de masquage : la charte est calme.

---

## 5 · Classes du système — `app/globals.css`

**Conteneurs :** `.site-container`, `.plate-container` (gouttière alignée sur `.site-container`
jusqu’à `md`), `.section-pad`.

**Typographie :** `.eyebrow` (label + `ink-faint`), `.eyebrow-accent` (label + `accent-deep`),
`.lede` (body-lg + `ink-muted`), `.rule-top` (filet haut + `pt-gap-sm`), `.legal-prose`.

`.eyebrow-accent` est la variante d’accent de l’étiquette. **Aucune page ne l’emploie aujourd’hui**,
et c’est délibéré : les quatre étiquettes de `/services` et les trois de `CraftSection` la portaient,
ce qui mettait à lui seul chaque écran au-delà des trois terres cuites. Elle reste déclarée pour le
jour où une page n’aura qu’une seule étiquette à faire ressortir — jamais pour une série.

**Mouvement :** `.link-draw`, `.press`, `.on-ink`.

**FAQ :** `.faq-item`, `.faq-sign`. Le chevron est en `ink-muted` et non en terre cuite : quatre
questions à l’écran feraient quatre terres cuites, la règle des trois prime.

**Navigation :** `.nav-link`.

**Supprimées :** `.plate` — `components/ui/Plate.tsx` est la source unique de la figure ;
`.btn-primary`, `.btn-primary-inverse`, `.btn-text` — `components/ui/Button.tsx` ; `.input-field`,
`.input-field--error` — `components/ui/Field.tsx`. Ces cinq classes n’ont plus aucun appelant, elles
ne sont donc plus déclarées : une classe dépréciée qui survit à sa migration finit par revenir.

---

## 6 · Composants

Les signatures sont fixées par le cahier des charges de la passe « studio ».

- `Button` (`primary` · `inverse` · `quiet` · `text`, tailles `md` 3.25rem / `sm` 2.25rem)
- `Field` (`aria-invalid`, `aria-describedby`, erreur en `accent-deep`, bordure `line-strong`)
- `Accordion` — `<details>` natif enrichi, aucun état React
- `Plate` — plaque image, `bg-sand`, rayons `rounded-plate` / `rounded-plate-lg`, fondu piloté par
  le CSS du socle (§ 4.3)
- `Counter` — seul composant autorisé à importer `motion/react`
- `Logo` / `LogoLink` / `Monogram` — le point est `accent` sur tous les fonds

Îlots clients autorisés : `ClientShell`, `Header`, `ContactForm`, `Counter`, `Plate`,
`RevealObserver`. Tout le reste est serveur.

Une seule implémentation de « moins d’animations » dans tout le dépôt :
`hooks/usePrefersReducedMotion.ts`. Le `useReducedMotion` de `motion/react` n’est importé nulle
part — c’est ce qui garantit que `Counter` reste le seul point d’entrée de la librairie.

**Images sociales.** Les quatre cartes de partage sont composées par le code, pas photographiées :
`lib/og.tsx` et un `opengraph-image.tsx` par route, en 1200 × 630 via `next/og`. Deux terres cuites
sur le visuel — le point du logotype et le filet du bas — donc une de moins que le plafond.

---

## 7 · Règles

- **Le vide fait le prestige.** Une idée par section. Si c’est serré, on retire du contenu, jamais de
  l’espace.
- **Des filets, pas des cadres.** Séparer par un trait fin ou un changement de fond. Pas de cartes
  bordées, pas d’ombres portées, pas de dégradés.
- **Rien de décoratif.** Un effet qui ne sert pas la lecture est retiré : pas d’icône d’illustration,
  pas de curseur personnalisé, pas de bruit, pas de parallaxe.
- **De vraies photos.** Lumière naturelle et chaude, mains au travail, lieux réels de Marseille.
- **Aucun contraste sous 4,5:1** pour du texte normal, sous 3:1 pour une bordure de composant.
