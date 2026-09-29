# Nuréa Parfums — audit et direction artistique

Écrans de présentation pour la réalisation Nuréa Parfums sur le site WebTreize.
Sources : le site public (captures du 30 septembre 2026, ordinateur et téléphone),
le dépôt `RayaneTks/nurea-parfums` (charte v3 `DESIGN.md`, `docs/admin/*`,
`docs/refonte/06-ECRANS-PARCOURS.md`, composants `src/features/*`), les logos et
photos réels du client.

---

## 1. Audit

### Ce que Nuréa a de solide

- **Une charte réelle et tenue** : quatre couleurs (noir `#0A0508`, ivoire `#FDF8F4`,
  cuivre `#C4956A`, bordeaux `#7B0B1D`), angles 0, aucune ombre, filets 1 px, un seul
  aplat bordeaux par page (le sceau). Deux familles à faible contraste, Newsreader et
  Instrument Sans. C'est une base rare chez un commerçant.
- **Un catalogue vrai** : 114 références, 44 marques, des photos produites par la
  maison, une fiche par parfum avec une adresse stable.
- **Une gestion d'une rigueur exceptionnelle** : vocabulaire canonique (Encaissé,
  À encaisser, Marge nette, Trésorerie — une définition chacun, testée au centime),
  « un état ne s'affiche que s'il est anormal », des boutons qui disent leur effet
  (« Encaisser 85 € »), la vente en 3 gestes, l'achat relu en dinars, le lot comme
  unité de rentabilité.

### Ce qui fait bas de gamme ou générique

| Écran | Note | Constat |
|---|---|---|
| Accueil (ordinateur) | 5/10 | Accroche interchangeable (« L'excellence du parfum », « au meilleur prix », « disponible immédiatement ») posée sur une photo d'ambiance boueuse où l'on ne lit rien. Trois lignes en capitales espacées cuivre empilées. Deux blocs « Parfum du moment » identiques, même phrase gabarit. Puis une grille de 12 photos aux univers opposés (éclaboussure bleue, feu de camp, piscine, pique-nique) : on dirait une banque d'images, pas une sélection. |
| Accueil (téléphone) | 5/10 | Même accroche ; deux boutons en capitales espacées l'un sous l'autre ; la photo d'ambiance mange l'écran sans rien montrer. |
| Toutes les marques | 7/10 | L'index A–Z est calme et utile. Page longue, lettres isolées, mais juste. |
| La parfumerie | 6/10 | La meilleure phrase du site (« Les grands parfums, choisis un par un. ») et la mosaïque de flacons. Mais les « 01 / 02 / 03 » en trois colonnes identiques sont exactement l'anti-référence que le projet s'interdit. |
| Fiche parfum | 4/10 | Presque vide : une phrase gabarit qui répète le nom et la marque, un bouton cuivre en capitales. L'offre réelle — un flacon Nuréa en 10, 50 ou 80 ml — est reléguée dans une note grise de 12 px. Sur téléphone, « COMMANDER SUR / SNAPCHAT » passe sur deux lignes. |
| Gestion · Accueil (d'après le code) | 6/10 | Architecture d'information excellente, habillage d'app iOS quelconque : gris système `#F2F2F7`, cartes blanches arrondies 14 px, `KpiTile` (libellé en capitales 11 px + gros chiffre) en grille — le motif générique par excellence. Rien n'y dit Nuréa, hors le bordeaux. |
| Gestion · Vendre | 7/10 | Le meilleur parcours du produit ; visuellement, chips arrondies et cartes empilées sans hiérarchie. |
| Gestion · Fiche lot | 6/10 | Cinq tuiles identiques ; le contenu unique (l'achat en dinars, par taux) est caché derrière un tap. |
| Ancienne maquette WebTreize | 3/10 | Tableau de bord sombre générique : cartes KPI, petites capitales, barres décoratives sans échelle, Cormorant + Inter. |

### Ce qu'il fallait corriger pour le portfolio

1. **Choisir les photos** : ne garder qu'une famille cohérente (flacons ambrés sur noir :
   Baccarat Rouge 540, Tobacco Vanille, Marrakech Intense, Contre Moi) au lieu de la
   grille bariolée.
2. **Parler vrai** : reprendre les phrases justes du client (« choisis un par un », « un
   catalogue tenu à la main ») plutôt que l'accroche de parfumerie générique.
3. **Faire de la fiche un objet** : dire le flacon Nuréa (10 · 50 · 80 ml) en grand,
   là où l'œil regarde le flacon d'origine — sans jamais le montrer.
4. **Retirer les capitales espacées** partout.
5. **Donner à la gestion l'univers de la boutique** — même encre, même papier, mêmes
   filets — tout en restant un registre dense, pas une vitrine.

---

## 2. Direction artistique

### Concept

**L'encre et le papier.** La vitrine s'imprime à l'encre noire du packaging, la
gestion se tient sur le papier ivoire des cartes de la maison, comme un registre de
comptoir : mêmes filets, mêmes chiffres, même signature.

(La charte le dit elle-même : le noir est « l'encre packaging », l'ivoire « le papier
des cartes ».)

### Références réelles

- **Le Labo** — étiquettes composées à la commande : le flacon personnalisé se dit par
  la typographie, pas par la photo. C'est exactement le cas du flacon Nuréa.
- **Éditions de Parfums Frédéric Malle** — le nom du parfum comme titre, en grand,
  sur fond neutre ; le catalogue comme une édition.
- **Serge Lutens, Palais-Royal** — le noir et un seul signe.
- **Cachet de cire et carte de correspondance gravée** — le sceau bordeaux, un par support.
- **Registre de caisse à colonnes (Exacompta) et bordereau fournisseur** — filets fins,
  double filet sous les totaux, colonnes de chiffres alignées.
- **Stripe Dashboard, Square POS, Shopify POS** — densité, chiffres tabulaires,
  une action principale par écran, bouton qui annonce son montant.

### Palette

| Nom | Hex | Rôle |
|---|---|---|
| Encre | `#0A0508` | Fond de la vitrine ; texte et filets forts de la gestion |
| Encre 2 | `#140E12` | Fond des planches photo (vitrine) |
| Papier | `#FDF8F4` | Texte de la vitrine ; fond de la gestion |
| Papier 2 | `#F6EEE8` | Barres d'app et barre d'onglets (gestion) |
| Cuivre | `#C4956A` | Bouton plein de la vitrine, filets à 22 % et 45 %, numéros de planche. Jamais de texte sur papier (2,5:1) |
| Bordeaux | `#7B0B1D` | L'action principale de la gestion, l'onglet actif. Un seul aplat par écran |
| Texte 2 / 3 (vitrine) | `#E4D2DA` / `#B49FAB` | Chapô, légendes (14:1 et 8,2:1 sur encre) |
| Texte 2 / 3 (gestion) | `#3D343A` / `#6B6270` | Légendes, en-têtes de colonnes |
| Ocre | `#A35B12` | Uniquement un montant non reçu (« À encaisser ») ou une commande en attente |
| Alerte | `#9B1020` | Uniquement une créance de plus de 30 jours |

Aucun vert, aucun fond de pastille : un état se lit par un mot coloré, et « soldé » se
lit par l'absence de montant.

### Typographie

Les deux familles du client, chargées depuis Google Fonts ; la gestion les reçoit à
son tour (elle composait en police système).

- **Newsreader** (500, axe optique) — noms de parfum, titres, et **un seul** chiffre
  dominant par écran de gestion (Marge nette, Encaissé du mois, Total du ticket).
- **Instrument Sans** (400, 500, 600) — tout le reste ; chiffres tabulaires
  (`tabular-nums lining-nums`) dans les tableaux et montants.

| Rôle | Vitrine | Gestion |
|---|---|---|
| Nom de parfum, écran | Newsreader 112 / 0,92, −0,03 em | — |
| Titre | Newsreader 64 / 1,02 | Newsreader 40 |
| Chiffre dominant | — | Newsreader 54–58 |
| Chapô | Newsreader 21 / 1,5 | — |
| Chiffre secondaire | — | Instrument 22–30, 500 |
| Texte / interface | Instrument 15 | Instrument 13,5–15 |
| Légende, en-tête de colonne | Instrument 12,5–13 | Instrument 12,5 |

Minuscules partout, capitale d'initiale seulement. Aucun interlettrage ajouté.
Espace fine insécable (U+202F) avant `: ; ! ?`, entre milliers et entre chiffre et
unité (`80 ml`) ; insécable (U+00A0) devant `€` et `DA`.

### Grille

- Vitrine, 1440 : marges 72 px, 12 colonnes, gouttière 24 px ; photo toujours au
  format 2:3 ; les blocs partagent leur filet (grille à `gap: 1px`).
- Gestion, 1440 : marges 48 px ; corps en 1 fr + 392 px ; lignes de registre à 30 px.
- Téléphone : marges 16 px (gestion) et 24 px (vitrine) ; 47 px réservés à la barre
  d'état, dans la couleur du fond.
- Base 4 px ; échelle 8 · 16 · 24 · 40 · 72.

### Composants

- **Planche** : photo 2:3 dans un filet cuivre, numérotée ; la légende (nom en
  Newsreader, marque en Instrument) vit à côté, comme dans un catalogue d'exposition.
- **Formats** : « Votre flacon Nuréa » en trois colonnes 10 · 50 · 80 ml, filets
  verticaux. Une information, pas un sélecteur (le site ne vend pas en ligne).
- **Bouton plein** : un seul par écran ; cuivre sur encre (vitrine), bordeaux sur
  papier (gestion) ; son libellé dit l'effet (« Encaisser 85 € »).
- **Équation du lot** : Encaissé − Achat des parfums − Frais de lot = Marge nette,
  posée comme une ligne de registre, filet d'encre au-dessus.
- **Registre** : tableau à filets, en-têtes en minuscules, colonnes de montants
  alignées à droite, total sous double filet.
- **Onglets** : texte seul, onglet actif en bordeaux avec un trait de 2 px.
- **Segments et puces** : rectangles à filet ; l'état choisi est inversé (encre plein).

### Ton

Vitrine : vouvoiement, phrases courtes, faits (« Remis en main propre à Marseille, ou
envoyé partout en France »). Gestion : tutoiement et vocabulaire exact du produit
(Encaissé, À encaisser, Marge nette, Achat des parfums, Frais de lot, poche, lot).

### À faire / à ne pas faire

| À faire | À ne pas faire |
|---|---|
| Une famille de photos cohérente par écran | La grille de 12 univers colorés |
| Le nom du parfum comme titre, très grand | Des capitales espacées pour la marque |
| Dire le flacon Nuréa (10 · 50 · 80 ml) | Montrer un flacon Nuréa, ou un prix en vitrine |
| Un chiffre dominant, les autres en registre | Des tuiles KPI arrondies en grille |
| L'état anormal en un mot coloré | Des pastilles vert / orange / rouge |
| Filets, double filet sous les totaux | Ombres, arrondis, dégradés, halos |
| Données qui se recoupent au centime | Des montants décoratifs |

---

## 3. Écrans

| Fichier | Format | Contenu |
|---|---|---|
| `boutique-accueil.html` | ordinateur | Accueil de présentation : la phrase du client, la mosaïque de trois flacons numérotés et leur légende, la mention du flacon Nuréa. |
| `boutique-fiche.html` | ordinateur | Fiche « Contre Moi », Louis Vuitton : planche 2:3, nom en titre, formats 10 · 50 · 80 ml, commande Snapchat, les 7 autres parfums de la marque. |
| `boutique-fiche-mobile.html` | téléphone | Fiche « Tobacco Vanille », Tom Ford, barre de commande fixe. |
| `gestion-tableau.html` | ordinateur | Fiche du lot « Commande d'août » : équation de la marge, registre des 14 documents, achat relu en dinars par taux, frais de lot. |
| `gestion-caisse.html` | téléphone | Vendre : deux lignes (une offerte), coût en dinars, reçu, poche, monnaie à rendre, « Encaisser 85 € ». |
| `gestion-accueil.html` | téléphone | Accueil de la gestion : à faire, journée, Encaissé du mois et Marge nette, lots ouverts. |

**Fidélité.** Tout ce qui est montré existe dans le code (E01, E06 et sa feuille
« Achat des parfums », E11). Deux libertés de présentation, assumées : la gestion réelle
est une app de téléphone (rail de 430 px, même sur ordinateur) — l'écran ordinateur
en est une mise en page large, avec les mêmes données et les mêmes libellés ; et elle
compose aujourd'hui en police système sur gris iOS — la présentation lui donne
l'encre, le papier et les deux familles de la marque.

### Données d'exemple (elles se recoupent)

Lot « Commande d'août » : 14 documents ; Payé cumulé 1 965 € = Encaissé ; Achat des
parfums 91 000 DA au taux 275 (330,91 €) + 237 900 DA au taux 277 (858,84 €) =
328 900 DA = 1 189,75 € (documents engagés seulement, la commande en attente est
exclue) ; Frais de lot 120 + 65 + 45 = 230 € ; Marge nette 1 965 − 1 189,75 − 230 =
545,25 €, soit 28 % de l'Encaissé ; À encaisser 70 + 160 + 110 = 340 €. Le même lot et
la même marge figurent sur l'Accueil de la gestion ; le lot ouvert le plus récent,
« Commande de septembre », est celui que le ticket de caisse propose.

Ticket : 85 € (Stronger With You, 50 ml) + La Nuit Trésor 10 ml offert ; coûts
15 000 DA et 3 500 DA au taux 277 = 54,15 € + 12,64 € ; marge avant dépenses 18,21 € ;
100 € donnés, 15 € à rendre.

---

## 4. Scène de présentation sur WebTreize

Recommandation : **`boutique-fiche` (ordinateur) + `gestion-caisse` (téléphone)**, et
`gestion-tableau` en troisième si la scène en accepte trois. Aplat : **bordeaux
`#7B0B1D`** — la cire du sceau, la seule couleur que la vitrine noire et la gestion
ivoire portent toutes les deux.
