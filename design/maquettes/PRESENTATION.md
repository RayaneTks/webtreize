# Réalisations — mise en scène

> Spécification de direction artistique pour la présentation des réalisations
> (accueil `#realisations`, `/realisations`, `/realisations/[slug]`).
> Fait autorité sur la présentation ; `docs/charte-graphique.md` fait autorité sur tout le reste.
> Prototype : `design/maquettes/_presentation/prototype.html`. Captures avant/après :
> `design/maquettes/_presentation/captures/`.

**En une phrase :** on arrête de fabriquer des mises en scène de produit et on **accroche les
écrans comme des tirages**. Une plaque sable, des écrans nus posés côte à côte à la même hauteur,
une légende sous chacun, et le nom du client composé en grand dessous.

---

## 1 · Audit de l’existant

### Ce qui fait « template / AI slop »

1. **La composition est le visuel de Dribbble par défaut.** Un aplat coloré à grands coins arrondis,
   une fenêtre de navigateur avec ses trois pastilles et sa barre d’adresse en gélule, un téléphone
   avec son îlot qui flotte par-dessus, le tout sous une ombre portée. C’est exactement ce que
   sortent les kits de maquettes Figma, les gabarits Framer et les générateurs de sites : on
   pourrait remplacer « Nuréa » par n’importe quel nom sans rien changer. Pour un studio qui vend du
   *sur mesure*, c’est se présenter avec le costume de tout le monde.
2. **La charte est enfreinte au seul endroit où elle compte.** Les `.device-*` portent les seules
   ombres du site (trois couches, dont `0 28px 56px`), alors que la charte les met dans son négatif
   universel ; on a « Filets fins plutôt que cadres », et on dessine des cadres. Les quatre aplats
   (`#4a1d26`, `#0d1330`, `#e9d9c4`, `#0f4c63`) introduisent quatre couleurs hors palette :
   la section Réalisations devient la partie la plus bariolée d’un site qui revendique cinq valeurs.
   Et ces couleurs vont être contredites par les nouvelles DA de chaque projet.
3. **Les superpositions cachent le produit qu’elles prétendent montrer.** Chez Nuréa, le tableau de
   bord recouvre la moitié de l’accueil et le téléphone recouvre le tableau de bord ; chez Magda, deux
   téléphones mangent l’écran cuisine. Les écrans sont réduits à 16–22 % de la scène : à 390 px, un
   téléphone fait 60 px de large. La thèse de la section (« la vitrine et ce qu’il y a derrière »)
   est juste, mais elle est illisible : le prospect voit une texture, pas une caisse.
4. **Les pastilles et le triple lien.** Quatre « livrables » en gélules par projet (seize sur la
   page), plus une gélule « Voir l’étude de cas », plus un lien sur le titre, plus un lien sur
   l’image : trois liens vers la même page, et le motif « chips » que le brief commun
   (`design/maquettes/BRIEF.md`) désigne lui-même comme un marqueur de slop.
5. **Le rythme est un effet, pas une décision.** « Un grand, deux petits, un grand » ne répond à
   rien dans le contenu : il rétrograde Encore 1 Dessert (l’outil le plus convaincant pour un
   artisan) en demi-carte, et sur `/realisations` les quatre projets redeviennent identiques. Le
   mouvement ajoute la même fausse profondeur : écrans qui montent sur l’aplat au défilement, qui se
   soulèvent de 1,2 % au survol, titre de section qui se découvre à chaque `h2`.
6. **L’étude de cas est un gabarit rempli.** Les mêmes titres génériques sur les quatre pages
   (« Ce que nous avons construit. », « À l’écran, tel qu’il a été livré. », « Ce que chacun peut
   faire. ») ; chaque écran rejoué sur un aplat bordeaux (six aplats, 10 800 px de page pour Nuréa) ;
   les fonctionnalités séparées des écrans qu’elles décrivent ; ce que le client y gagne (« Au
   quotidien ») relégué en bas, alors que c’est la seule chose qu’un prospect pressé vient chercher.
   Ni année, ni rôle du studio.

### Ce qui tient, et qu’on garde

- **La thèse** : montrer les outils, pas les pages d’accueil. C’est ce qui distingue WebTreize.
- **Le texte** : précis, sans chiffre inventé, sans superlatif. La promesse de chaque projet est bonne.
- **L’honnêteté** : la mention « données d’exemple », l’absence de témoignage fabriqué.
- **L’ossature typographique** : Plus Jakarta 800 serré pour les noms, filets `line` pour séparer,
  `eyebrow` pour les étiquettes de section.
- **La rigueur technique** : `sizes` exacts, alternatives textuelles détaillées,
  `prefers-reduced-motion` respecté, rien de masqué sans JavaScript.

---

## 2 · Principes

1. **Un écran est une pièce, pas un accessoire.** On le montre entier, droit, lisible, jamais
   recouvert. Pas d’appareil dessiné : le contenu de l’écran suffit à dire ce que c’est.
2. **Le studio parle en sable, le client parle dans ses écrans.** Le fond est toujours le sable de
   la charte (rôle officiel : « Aplats, blocs image »). L’identité du client vit à l’intérieur des
   écrans, où les designers de chaque projet l’ont posée. C’est ce qui donne aux quatre projets une
   seule voix — celle d’un atelier — sans les uniformiser.
3. **La vitrine, puis ce qu’il y a derrière.** Chaque accrochage se lit de gauche à droite : ce que
   voit le client du commerçant, puis l’outil du commerçant. Le rythme de la page naît de ces paires,
   pas d’une grille décorative.
4. **Une seule idée par visuel, de grandes marges** (charte §5). Deux écrans, trois au maximum.
5. **Le mouvement ne montre rien de plus.** Une apparition, une fois. Aucun effet qui simule une
   profondeur que la charte interdit de dessiner.

---

## 3 · Décisions, et pourquoi

| Sujet | Décision | Justification (charte / effet sur un prospect) |
| --- | --- | --- |
| Cadres d’appareil | **Aucun.** Écran ordinateur : rectangle nu, rayon 4 px. Écran téléphone : la forme de la dalle seule, rayon `14% / 6.5%` (≈ 55 pt d’un iPhone), sans coque ni îlot. Les deux avec un filet intérieur `inset 0 0 0 1px var(--color-line)`. | « Filets fins plutôt que cadres ». Un cadre dessiné signale une maquette ; un écran nu signale un travail réel. La barre d’état intégrée aux JPEG téléphone (47 px, cf. BRIEF) suffit à dire « téléphone ». |
| Ombres | **Aucune.** Suppression des seules ombres du site. | Négatif universel : *drop shadows*. Le contraste écran/sable fait le détachement. |
| Fond | **Sable `#EAE3D8`** pour toutes les plaques, sur l’ivoire de la page. Jamais la couleur du client. | Palette à cinq valeurs. Le prospect voit un catalogue cohérent, donc un studio qui a une méthode. |
| Forme de la plaque | `rounded-plate-lg`, padding 6,5 % de la largeur (7 % sous 768 px). | Même objet que les plaques photo du site ; le padding en pourcentage garde la proportion de marge à toutes les tailles (« grandes marges »). |
| Composition | **L’accrochage** : écrans alignés en haut, **tous à la même hauteur**, écartés de 3 % ; aucune superposition, aucune rotation. | La hauteur commune est la « ligne de cimaise » : d’un projet à l’autre, les écrans ont la même taille, le regard compare des métiers, pas des effets. |
| Recadrage | **Aucun recadrage** sur l’accueil (on montre l’écran entier). Sur mobile, on remplace l’écran ordinateur par un second écran téléphone plutôt que de le réduire à 20 %. | Un écran rogné ment sur le produit ; un écran à 20 % ne dit rien. |
| Rythme de l’accueil | **Une ligne par projet**, pleine largeur, toutes identiques en structure. La variété vient des paires : ordinateur + téléphone, téléphone + ordinateur, trois téléphones, ordinateur + téléphone. | Le rythme suit le contenu. Pentagram, Order, Koto : une liste régulière, c’est l’assurance d’un studio qui n’a pas besoin d’effets. |
| Titre de projet | Plus Jakarta Sans 800, `text-display-sm` (30 → 54 px), `-0.04em`. Numéro d’ordre en **Newsreader 300**, `text-title`, `ink-faint`, chiffres tabulaires. | Charte : Jakarta 800 serré pour les titres, Newsreader réservé « aux grands chiffres ». Le numéro rappelle le cartel d’un catalogue d’exposition, pas un compteur d’interface. |
| Informations | Accueil : métier et lieu, promesse, « Livré » en une phrase. Étude de cas : fiche (métier, lieu, année, livré, rôle du studio). | Le prospect cherche un métier proche du sien et ce qu’il obtiendra. Fini les pastilles : une phrase se lit, seize gélules se survolent. |
| Liens | **Un seul lien par projet** : le nom, étendu à toute la ligne. | Une tabulation par projet, un nom accessible juste, aucune redondance. |
| Survol | Le nom se souligne (filet 2 px, `--dur-state`), la flèche de « Lire l’étude de cas » glisse de 4 px. Les écrans ne bougent pas. | Le geste désigne le lien, pas l’image. Un écran qu’on agrandit dans un cadre fixe perd ses bords, donc de l’information. |
| Défilement | `Reveal` existant (opacité + 14 px, 450 ms), une fois, plaque puis légende à 60 ms. Aucune animation pilotée par le défilement dans ces pages, sauf le `.tirage` du héros de l’étude de cas (facultatif). | « Calme et confiance, jamais la performance technologique. » |
| Terre cuite | **Zéro** dans la section Réalisations. | La règle des trois se dépense ailleurs (bouton d’audit, logo). Les écrans des clients apportent leurs propres couleurs. |

---

## 4 · Données — `lib/data/realisations.ts`

Le type `Scene` (et ses quatre compositions) disparaît. On ajoute :

```ts
/** Un écran tel qu’il est accroché : l’écran, et sa légende courte (5 mots au plus). */
export type EcranAccroche = {
  readonly ecran: Ecran;
  /** « Le site, côté client », « La caisse, derrière le comptoir »… */
  readonly legende: string;
};

export type Accrochage = {
  /** ≥ 768 px — 2 ou 3 écrans, lus de gauche à droite : la vitrine, puis ce qu’il y a derrière. */
  readonly large: readonly EcranAccroche[];
  /** < 768 px — exactement 2 écrans téléphone. */
  readonly etroit: readonly [EcranAccroche, EcranAccroche];
};

export type Realisation = {
  // … id, nom, promesse, metaDescription, etude : inchangés
  readonly metier: string;          // « Parfumerie », « Snack, skatepark »… (remplace `secteur`)
  readonly lieu: string;            // « Marseille »
  readonly annee?: string;          // À RENSEIGNER par le studio. Absent = non affiché.
  readonly role?: readonly string[];// À RENSEIGNER. Ex. conception, design, développement, mise en ligne, suivi.
  readonly livrables: readonly string[]; // conservé, rendu en phrase
  readonly accrochage: Accrochage;
};
```

- `Ecran.barre` et `Realisation.url` ne sont plus affichés (plus de barre d’adresse, plus de lien
  vers les sites clients). Les supprimer du type.
- `EtudeDeCas.fonctionnalites[i].titre` doit être **identique** au `titre` du groupe d’écrans
  correspondant dans `interfaces` (l’étude de cas les fusionne, § 7.5). À corriger :
  Encore 1 Dessert, « Commandes et comptabilité » ↔ « Gestion » → choisir un seul libellé.
- `annee` et `role` : **ne rien inventer**. Tant qu’ils ne sont pas fournis, la ligne est omise.

### Accrochages retenus

Les chemins seront ceux des nouveaux JPEG (`/images/realisations/<projet>/<écran>.jpg`).

| Projet | `large` (gauche → droite) | `etroit` |
| --- | --- | --- |
| Nuréa Parfums | accueil du site (O) « Le site, côté client » · caisse (T) « La caisse, derrière le comptoir » | fiche parfum mobile (T) « Le site » · caisse (T) « La caisse » |
| Magda Mania | carte (T) « La carte, côté client » · écran cuisine (O) « L’écran de la cuisine » | carte (T) « La carte » · suivi (T) « Le suivi » |
| Encore 1 Dessert | commandes du jour (T) · fiche technique (T) · comptabilité (T) | fiche technique (T) · commandes (T) |
| Conciergerie Nuréa | **simulateur** (O) « Le simulateur, côté propriétaire » · e-mail reçu (T) « La demande reçue » | accueil mobile (T) « Le site » · e-mail reçu (T) « La demande reçue » |

Pour la conciergerie, le simulateur remplace l’accueil : la paire « le propriétaire simule → la
conciergerie reçoit les chiffres » raconte le produit en deux images.

---

## 5 · Composant `Accrochage`

Remplace `ProjectStage.tsx` et `Devices.tsx`. Composant serveur, sans état.

### Structure

```html
<div class="accrochage">                                   <!-- plaque sable, container-type: inline-size -->
  <div class="accrochage__rang accrochage__rang--large"
       style="--cols: 1.6fr .4621fr; --somme: 2.0621; --n: 2">
    <figure class="ecran ecran--ordinateur">
      <div class="ecran__dalle"><img …></div>              <!-- next/image, width 1440 height 900 -->
      <figcaption>Le site, côté client</figcaption>
    </figure>
    <figure class="ecran ecran--telephone">
      <div class="ecran__dalle"><img …></div>              <!-- next/image, width 390 height 844 -->
      <figcaption>La caisse, derrière le comptoir</figcaption>
    </figure>
  </div>
  <div class="accrochage__rang accrochage__rang--etroit" style="--n: 2"> … deux figures téléphone … </div>
</div>
```

Variables calculées dans le TSX à partir des formats (`R_O = 1.6`, `R_T = 0.4621`) :

- `--cols` : chaque colonne en `fr` égal au ratio largeur/hauteur de son écran
  (`1.6fr` ordinateur, `.4621fr` téléphone). Des colonnes proportionnelles aux ratios donnent
  des écrans **de même hauteur** sans aucune mesure.
- `--somme` : somme des ratios du rang. `--n` : nombre d’écrans.
- `--ref` : somme de référence qui fixe la hauteur commune. `2.0621` (ordinateur + téléphone) sur
  l’accueil et le héros ; `1.5` pour une planche de téléphones dans l’étude de cas ; `1.6` pour une
  planche ordinateur seule.

### CSS (dans `app/globals.css`, couche `components`, en remplacement de `.device-*` et `.stage*`)

```css
.accrochage {
  container-type: inline-size;
  padding: 6.5%;
  border-radius: theme('borderRadius.plate-lg');
  background: var(--color-sand);
  --ref: 2.0621;
}
.accrochage__rang {
  display: grid;
  grid-template-columns: var(--cols);
  column-gap: 3cqi;
  align-items: start;
  margin-inline: auto;
  /* Même hauteur d’écrans d’un projet à l’autre : un rang plus court se centre. */
  width: min(100%, calc(var(--somme) / var(--ref) * 97cqi + (var(--n) - 1) * 3cqi));
}
.accrochage__rang--etroit { display: none; }

@media (max-width: 767.98px) {
  .accrochage { padding: 7% 7% 6%; }
  .accrochage__rang--large { display: none; }
  .accrochage__rang--etroit { display: grid; --cols: 1fr 1fr; column-gap: 4cqi; width: min(100%, 30rem); }
}

.ecran__dalle { position: relative; overflow: hidden; background: var(--color-canvas); }
.ecran--ordinateur .ecran__dalle { aspect-ratio: 1440 / 900; border-radius: 4px; }
.ecran--telephone  .ecran__dalle { aspect-ratio: 390 / 844;  border-radius: 14% / 6.5%; }
.ecran__dalle img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
/* Filet intérieur : le bord d’un écran clair ne se perd pas dans le sable. Pas une ombre. */
.ecran__dalle::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: inset 0 0 0 1px var(--color-line); pointer-events: none;
}
.ecran figcaption { @apply mt-3 max-w-[38ch] text-note text-ink-muted; }
```

Le `box-shadow: inset` est ici un filet dessiné à l’intérieur de l’image, pas une ombre : 1 px, sans
flou, à la couleur `line`. Tailwind purge : les noms de classe sont écrits en toutes lettres.

### Tailles servies (`sizes`)

| Contexte | Ordinateur | Téléphone |
| --- | --- | --- |
| Rang large, accueil et héros (`--ref 2.0621`) | `(min-width: 1280px) 800px, 66vw` | `(min-width: 1280px) 232px, 20vw` |
| Rang étroit | — | `(max-width: 767px) 42vw, 240px` |
| Planche d’étude de cas | `(min-width: 1280px) 1066px, 88vw` | `(min-width: 1280px) 320px, (min-width: 768px) 26vw, 44vw` |

Les rangs masqués en `display: none` ne chargent pas leurs images (`loading="lazy"` par défaut de
`next/image`). **`priority` uniquement sur l’écran ordinateur du rang large du héros** de l’étude
de cas, jamais sur une image du rang étroit ni sur l’accueil (la section est sous la ligne de
flottaison).

### Mesures de contrôle

| Largeur | Plaque | Écran ordinateur | Écran téléphone |
| --- | --- | --- | --- |
| 1440 (plate-container 1224) | 1224 × ≈ 575 | 801 × 501 | 232 × 501 |
| 1280 | 1224 | idem | idem |
| 768 (704) | 704 × ≈ 350 | 461 × 288 | 133 × 288 |
| 390 (350, rang étroit) | 350 × ≈ 370 | — | 146 × 316 |
| 360 (320, rang étroit) | 320 × ≈ 340 | — | 133 × 288 |

---

## 6 · Accueil — `WorkSection` et `/realisations`

### En-tête de section

Inchangé dans son contenu (`eyebrow`, `h2` `text-display-md`, `lede`, lien « Toutes les
réalisations »). Retirer `sweep` du `h2` : un seul titre animé par page suffit (celui du héros).

### Une ligne par projet

```html
<ol class="mt-gap-xl grid gap-gap-xl" role="list">
  <li>
    <article class="projet relative" aria-labelledby="projet-nurea-parfums-titre">
      <Reveal class="plate-container">
        <Accrochage … />
      </Reveal>
      <Reveal delay={60} class="site-container mt-gap-sm grid gap-x-gap-lg gap-y-gap-xs md:grid-cols-12">
        <div class="md:col-span-6 lg:col-span-5">
          <span aria-hidden="true" class="projet__num">01</span>
          <h3 id="projet-nurea-parfums-titre" class="text-display-sm font-extrabold">
            <a href="/realisations/nurea-parfums" class="projet__lien link-draw">Nuréa Parfums</a>
          </h3>
          <p class="mt-2 text-body text-ink-muted">Parfumerie, Marseille</p>   <!-- + « , 2025 » si annee -->
        </div>
        <div class="md:col-start-7 md:col-span-6 md:pt-1.5">
          <p class="max-w-[46ch] text-body text-ink-muted">{promesse}</p>
          <p class="mt-3 max-w-[52ch] text-body text-ink-muted">
            <b class="font-semibold text-ink">Livré</b>&ensp;Site catalogue, back-office, caisse mobile, comptabilité.
          </p>
          <span aria-hidden="true" class="projet__cue mt-gap-xs">Lire l’étude de cas <i>→</i></span>
        </div>
      </Reveal>
    </article>
  </li>
  …
</ol>
<p class="site-container mt-gap-lg border-t border-line pt-gap-md text-note text-ink-faint">{MENTION_DONNEES_EXEMPLE}</p>
```

- **Livrables** : `livrables.join(', ')` avec une majuscule initiale et un point final. Plus de `<ul>` de pastilles.
- **Métier** en phrase (`text-body`, `ink-muted`), pas en `eyebrow` : les majuscules espacées restent réservées à l’étiquette de section.
- **Plaque en `plate-container` (1280), texte en `site-container` (1120)** : la plaque déborde de
  la colonne de texte de 80 px à 1440, ce qui est l’usage prévu de `.plate-container`.

```css
.projet__num { display: block; margin-bottom: .6rem; font-family: var(--font-serif); font-weight: 300;
  @apply text-title; line-height: 1; color: var(--color-ink-faint);
  font-variant-numeric: tabular-nums lining-nums; }
/* Le nom est le seul lien : il couvre toute la ligne, plaque comprise. */
.projet__lien::after { content: ''; position: absolute; inset: 0; border-radius: theme('borderRadius.plate-lg'); }
.projet__lien:focus-visible { outline: none; }
.projet__lien:focus-visible::after { outline: 2px solid var(--focus-ring); outline-offset: 6px; }
.projet__cue { display: inline-flex; gap: .45em; font-weight: 600; @apply text-note; color: var(--color-ink); }
.projet__cue i { font-style: normal; transition: transform var(--dur-state) var(--ease-out); }
@media (hover: hover) {
  .projet:hover .projet__lien, .projet__lien:focus-visible { background-size: 100% 2px; }
  .projet:hover .projet__cue i { transform: translateX(4px); }
}
```

### Responsive

| Largeur | Légende | Accrochage |
| --- | --- | --- |
| 360–767 | Empilée : numéro, nom, métier, promesse, livré, « Lire l’étude de cas ». | Rang étroit : deux téléphones, 30 rem max, centrés. |
| 768–1023 | Deux colonnes 6/6. | Rang large. |
| 1024–1279 | Colonnes 1–5 et 7–12. | Rang large. |
| ≥ 1280 | Idem ; plaque plafonnée à 1224 px. | Rang large, hauteur d’écran 501 px. |

### Page `/realisations`

Même composant de ligne (titres en `h2`). Deux différences :

1. **Un index** sous l’en-tête de page, avant la première plaque (`site-container`, `mt-gap-lg`) :
   quatre lignes à filet `border-t border-line`, `py-3`, grille `md:grid-cols-12` — numéro
   Newsreader (col. 1), nom `text-title font-extrabold` (col. 2–5), métier et lieu (col. 6–8,
   `text-note text-ink-muted`), livrables (col. 9–12, `text-note text-ink-muted`, masqué sous
   768 px). Chaque ligne est une ancre vers `#projet-<id>`. C’est le sommaire d’un catalogue : le
   prospect voit en quatre lignes s’il y a un métier proche du sien.
2. `priority` : aucun — la première plaque est sous l’index.

---

## 7 · Étude de cas — `/realisations/[slug]`

L’ordre est pensé pour un prospect qui a une minute : **qui, quoi, ce que ça a changé**, puis le
récit, puis les écrans pour qui veut vérifier.

### 7.1 En-tête (remplace le titre de `PageShell` : ajouter à `PageShell` une prop `header?: ReactNode` qui remplace le bloc par défaut)

```html
<header class="pt-gap-xl">
  <div class="site-container">
    <nav aria-label="Fil d’Ariane">…</nav>                          <!-- au-dessus du h1, text-note -->
    <h1 class="mt-gap-sm text-display-lg font-extrabold" data-line-mask>Nuréa Parfums</h1>
    <div class="mt-gap-md grid gap-gap-lg lg:grid-cols-12">
      <p class="lg:col-span-6 max-w-[44ch] text-title-sm font-normal text-ink-muted">{promesse}</p>
      <dl class="lg:col-start-8 lg:col-span-5 fiche">
        <div><dt>Métier</dt><dd>…</dd></div>
        <div><dt>Lieu</dt><dd>…</dd></div>
        <div><dt>Année</dt><dd>…</dd></div>            <!-- omis si absent -->
        <div><dt>Livré</dt><dd>…</dd></div>
        <div><dt>Rôle du studio</dt><dd>…</dd></div>   <!-- omis si absent -->
      </dl>
    </div>
  </div>
  <div class="plate-container mt-gap-lg tirage">
    <Accrochage accrochage={projet.accrochage} priority />
  </div>
</header>
```

```css
.fiche > div { display: grid; grid-template-columns: 7.5rem 1fr; gap: 1rem; padding-block: .6rem;
  border-top: 1px solid var(--color-line); @apply text-note; }
.fiche > div:last-child { border-bottom: 1px solid var(--color-line); }
.fiche dt { color: var(--color-ink-faint); }
.fiche dd { color: var(--color-ink); }
```

Le héros reprend **exactement** l’accrochage de l’accueil : le visiteur retrouve l’image sur
laquelle il a cliqué. Suppression de la ligne de pastilles et du lien « En ligne ».

### 7.2 Ce qui a changé

`section`, `site-container`, `py-gap-xl`. Grille `lg:grid-cols-12` : étiquette `h2.eyebrow`
« Ce qui a changé » en col. 1–3 ; liste `ol` en col. 4–12, `md:grid-cols-2`, `gap-x-gap-lg
gap-y-gap-sm`. Chaque `li` : `border-t border-line pt-gap-xs`, `text-title-sm` (19 px), poids 500,
`ink`. Source : `etude.auQuotidien`. Puis `etude.resultatsMesures` s’il existe (inchangé).

### 7.3 Le récit

Trois sections (`Le contexte`, `Le problème`, `Notre réponse`) dans la même grille : étiquette
`eyebrow` col. 1–3, texte col. 4–10, `max-w-[62ch]`, `text-body text-ink-muted`, paragraphes
espacés de 1 rem. Espacement `py-gap-md` entre elles, **sans filet** ; un filet `border-line` et
`gap-xl` seulement avant et après le récit. Les titres génériques en `display-sm` disparaissent.

### 7.4 Les écrans, par côté

Une section par groupe d’`interfaces` (« Côté client », « Côté cuisine », « Côté gérant »…),
séparée par `border-t border-line`, `py-gap-xl` :

1. **Tête** (`site-container`, grille 12) : `h2` `text-title font-extrabold` col. 1–3 ; à droite
   (col. 4–12), la liste des fonctionnalités **du même côté**, en deux colonnes à filets
   (`border-t border-line py-2.5 text-body text-ink-muted`). Les écrans et ce qu’ils font sont
   enfin au même endroit.
2. **Planches** (`plate-container`, `mt-gap-lg`, `grid gap-gap-md`) :
   - chaque écran ordinateur sur sa propre plaque, rang à un écran (`--somme 1.6; --ref 1.6`),
     légende complète (`ecran.legende`) sous l’écran ;
   - les écrans téléphone du groupe réunis sur une plaque, `--ref 1.5` (téléphones de 318 px à
     1440), trois au plus par rang ;
   - si l’écran porte `donnees: 'exemple'`, la légende se termine par « Données d’exemple. »
     (insécable) — la mention est au plus près de l’écran concerné.
3. Sous 768 px, sous chaque écran ordinateur : lien `Voir l’écran en grand` (`text-note
   font-semibold link-draw`) vers le JPEG d’origine, qui s’ouvre dans l’onglet (zoom natif du
   téléphone). Un écran de 1440 px réduit à 305 px n’est plus lisible ; on ne le cache pas, on
   donne le moyen de le lire.

Rien de la section « Fonctionnalités » séparée ne subsiste. `Construit avec : …` passe en
`text-note text-ink-faint` à la fin du dernier groupe.

### 7.5 Suite

- `TestimonialsSection` : inchangé (ne s’affiche que s’il existe un avis réel).
- **Étude de cas suivante** : un seul lien couvrant un bloc `md:grid-cols-[5fr_7fr]` — à gauche
  `eyebrow` + nom en `text-display-sm` (`link-draw`, 2 px au survol) + métier ; à droite l’accrochage
  large du projet suivant en réduction (padding 5 %, images `alt=""` car décoratives dans ce lien).
- `PageCtaBand` : inchangé.

### Responsive de l’étude de cas

| Largeur | Comportement |
| --- | --- |
| 360–767 | Tout empilé ; fiche en pleine largeur sous la promesse ; héros en rang étroit ; planches ordinateur à 88 vw avec « Voir l’écran en grand » ; téléphones deux par rang. |
| 768–1023 | Fiche sous la promesse ; rang large ; fonctionnalités en deux colonnes sous le titre du côté. |
| ≥ 1024 | Grilles 12 colonnes décrites ci-dessus. |

---

## 8 · Mouvement

| Élément | Mouvement | Sous `prefers-reduced-motion: reduce` |
| --- | --- | --- |
| Plaque d’un projet | `Reveal` : opacité 0 → 1, 14 px, `--dur-reveal`, `--ease-out`, une fois | Aucun (règles existantes) |
| Légende d’un projet | Idem, `delay={60}` | Aucun |
| Nom au survol | Filet 0 → 100 %, 2 px, `--dur-state` | Transition neutralisée par le bloc global |
| Flèche au survol | `translateX(4px)`, `--dur-state` | Idem |
| Héros de l’étude de cas | `.tirage` existant (facultatif) — déjà enveloppé dans `no-preference` | Aucun |
| h1 de l’étude de cas | `data-line-mask` existant | Aucun |

**Supprimés** : `@keyframes ecran-monte` et ses règles, la translation au survol `.stage-link`,
`sweep` sur les `h2` de ces pages. Aucun parallaxe, aucune image qui grossit au survol.

---

## 9 · Accessibilité

- **Un lien par projet** (le nom). Le lien étendu couvre plaque et légende ; la « flèche » est `aria-hidden`.
- **Focus** : anneau `--focus-ring` 2 px, décalé de 6 px, sur toute la ligne via `::after`.
- **Images** : l’`alt` détaillé existant est conservé (il décrit le contenu de l’écran). La
  `figcaption` nomme l’écran ; elle ne répète pas l’`alt`. Dans le bloc « suivant », `alt=""`.
- **Contrastes sur sable** (calculés) : `ink` 14,5:1, `ink-muted` **4,69:1** (conforme AA en
  14 px), `ink-faint` **4,03:1 — interdit en texte sur le sable**. Les légendes sont donc en `ink-muted`.
- **Numéro d’ordre** `aria-hidden` (l’ordre de la liste `ol` le porte déjà).
- **Cibles tactiles** : la ligne entière est cliquable ; « Voir l’écran en grand » a une hauteur de
  ligne ≥ 24 px (WCAG 2.5.8).
- **Titres** : `h2` de section → `h3` par projet sur l’accueil ; `h2` par projet sur
  `/realisations` ; sur l’étude de cas, `h1` puis `h2` par section et par côté.
- **Sans JavaScript** : tout est visible (le `Reveal` ne masque que sous `html.js`).

---

## 10 · À supprimer

- `components/realisations/Devices.tsx`, `components/realisations/ProjectStage.tsx` (et `fondSombre`).
- Dans `app/globals.css` : `.device-browser*`, `.device-phone*`, `.stage*`, `.stage-link`,
  `@keyframes ecran-monte` et son bloc dans `@supports (animation-timeline)`.
- Dans `lib/data/realisations.ts` : `Scene`, `scene`, `url`, `Ecran.barre`.
- Dans `ProjectCard.tsx` : `ProjectGrid` (le rythme 1-2-1), les pastilles, le bouton « Voir l’étude de cas ».
- Dans l’étude de cas : `GroupeInterfaces` sur aplat, la section « Fonctionnalités » séparée, le lien « En ligne ».

Les tests e2e existants restent valides : chaque étude de cas est liée depuis `#realisations`,
« données d’exemple » figure sur `/`, `/realisations` et chaque étude.

---

## 11 · Contrat avec les designers d’écrans

Pour que l’accrochage fonctionne, chaque JPEG livré dans `public/images/realisations/<projet>/` doit :

- remplir son format **jusqu’aux bords** (1440 × 900 ou 390 × 844), sans coin arrondi, sans cadre,
  sans ombre, sans marge de fond : le site dessine la forme et le filet ;
- pour un téléphone, garder les 47 px de barre d’état dans la couleur de fond de l’écran (BRIEF) —
  c’est elle qui dit « téléphone » en l’absence de coque ; l’îlot n’est **pas** dessiné par le site,
  donc rien ne doit être posé au centre de cette bande ;
- porter son élément dominant dans le **tiers haut** : sur l’accueil, les écrans sont vus à 55 %
  environ, le haut est lu d’abord ;
- ne pas utiliser le sable `#EAE3D8` comme fond dominant (l’écran se fondrait dans la plaque ; le
  filet limite le dégât, il ne le supprime pas).

---

## 12 · Recette

- [ ] Aucun `box-shadow` autre que le filet `inset 0 0 0 1px` des écrans ; aucun dégradé ; aucune couleur hors charte hors des JPEG.
- [ ] Sur l’accueil à 1440, les écrans des quatre projets ont la même hauteur (501 px ± 1).
- [ ] À 360 et 390 px : deux téléphones par plaque, pas de défilement horizontal (vérifié sur le prototype).
- [ ] Une seule tabulation par projet ; focus visible autour de toute la ligne.
- [ ] « données d’exemple » présent sur `/`, `/realisations` et chaque étude de cas.
- [ ] Terre cuite : zéro occurrence dans la section Réalisations.
- [ ] `prefers-reduced-motion: reduce` : aucune animation, tout est visible.
- [ ] Le test de la charte : cette section pourrait-elle être la page « Nos maisons » du catalogue
      d’un bon restaurant ? Oui : du papier, des tirages, des légendes.
