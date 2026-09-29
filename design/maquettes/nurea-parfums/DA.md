# Nuréa Parfums — DA réelle et écrans améliorés

Écrans de présentation de la réalisation Nuréa Parfums pour le site WebTreize.
Principe (brief commun, version réécrite) : **on garde la DA du client et on
l'améliore** — mêmes couleurs, mêmes polices, mêmes composants, même architecture
d'écran, en plus épuré, plus lisible, plus moderne.

Sources : le site public (captures ordinateur 1440 et téléphone 390 : accueil,
index des marques, fiche parfum) et le dépôt `RayaneTks/nurea-parfums`
(`app/globals.css`, `src/design/brand.ts`, `src/design/fonts.ts`, `DESIGN.md` ;
`src/design/tokens.ts`, `src/design/globals.admin.css`, `docs/admin/DESIGN.md`,
`src/ui/primitives/*`, `src/app-shell/*`, `src/features/*`). La gestion n'a pas
été lancée en local (base PostgreSQL embarquée + reprise de données) : ses écrans
sont reconstitués d'après le code de ses composants, qui décrit précisément chaque
rayon, couleur, ombre et libellé.

---

## 1. DA réelle relevée

### La boutique (registre `brand`, charte v3)

| Élément | Valeur réelle |
|---|---|
| Fond | `#0A0508` noir ; surfaces `#140E12`, survol `#1C1418` |
| Texte | ivoire `#FDF8F4` ; secondaire `#E4D2DA` ; tertiaire `#B49FAB` |
| Accent | cuivre `#C4956A` — boutons pleins, filets à 16 %, libellés |
| Signature | bordeaux `#7B0B1D`, un seul aplat par page (le sceau) |
| Polices | **Newsreader** 400/500 (titres, noms de parfum) · **Instrument Sans** 400/500/600 (texte, interface) |
| Libellés | Instrument 600, capitales, interlettrage 0,18 em (`.nurea-label`) — marque, navigation, boutons |
| Formes | **angles 0** partout, aucune ombre, séparation au filet 1 px |
| Composants | en-tête logo cerclé + « NURÉA parfums », navigation en capitales ; bouton plein cuivre / bouton filet ; carte catalogue = photo 2:3 + panneau surface (marque en capitales cuivre, nom en Newsreader) ; pastilles « Nouveau », « Gamme complète » en aplat cuivre ; fiche = bloc bordé photo | informations, bouton Snapchat |
| Photos | mises en scène des flacons d'origine, sur fond sombre |

### La gestion (registre `product`, `app/admin`)

| Élément | Valeur réelle |
|---|---|
| Fond | gris système iOS `#F2F2F7` ; cartes blanches `#FFFFFF` ; zones atténuées `#EFEAE4` |
| Texte | `#111114` ; secondaire `#5F5862` ; tertiaire `#726B75` |
| Accent unique | bordeaux `#7B0B1D` (fond léger à 8 %) ; états : succès `#1B723F`, attente `#965411`, anomalie `#B72938` |
| Police | pile système **SF Pro** (`-apple-system`) ; chiffres tabulaires |
| Échelle | display 32/700, h1 28/700, h2 20/600, corps 15, légende 13 |
| Rayons | contrôles 12 px, cartes 14 px, feuilles 18 px, pastilles arrondies |
| Ombres | légères, teintées bordeaux (`0 1px 3px rgba(139,58,58,.03)`) |
| Navigation | barre d'onglets basse à 5 onglets (Accueil, Commandes, Vendre, Clients, Catalogue), icônes Lucide ; « Vendre » dans une pastille bordeaux |
| En-tête | monogramme bordeaux + bouton « Rechercher » en pilule (⌘K) |
| Composants | `Card`, `ListSection` + `ListRow` (56 px, chevron), `KpiTile`, `Chip` (actif : filet et fond bordeaux léger), `SegmentedControl`, `Stepper`, `StickyAction` avec ligne de résumé |
| Vocabulaire | Encaissé, À encaisser, Marge nette, Trésorerie, Reçu maintenant, poche, lot |

---

## 2. Audit du réel

| Écran | Note | Constat |
|---|---|---|
| Accueil boutique | 5/10 | Identité juste, mais accroche générique (« L'excellence du parfum ») sur une photo d'ambiance sombre et floue ; trois lignes de capitales empilées ; deux blocs « Parfum du moment » identiques ; grille de 12 photos aux univers très disparates. |
| Index des marques | 7/10 | Calme et utile. |
| Fiche parfum | 5/10 | Bonne structure (photo | infos | Snapchat), mais contenu mince et gabarit ; les formats 10 · 50 · 80 ml, cœur de l'offre, sont relégués en note grise ; sur téléphone, le bouton passe sur deux lignes. |
| Gestion · Accueil | 6/10 | Architecture excellente ; à l'écran, beaucoup de tuiles de même poids (libellés en capitales 11 px + chiffres), aucun chiffre ne domine. |
| Gestion · Vendre | 7/10 | Parcours remarquable (3 gestes) ; écran long, très chargé (coût en dinars, taux, note, monnaie…). |

---

## 3. Améliorations apportées

**Communes** — aucune couleur, police ou forme nouvelle : tout vient des jetons
relevés ci-dessus. Une action principale par écran. Corps de texte 15–17 px,
cibles de 44 px minimum, montants en chiffres tabulaires, espaces fines françaises.

**Boutique**
- Accueil : la phrase la plus juste du client (« Les grands parfums, choisis un par
  un. », tirée de sa page La parfumerie) remplace l'accroche générique ; la photo
  d'ambiance floue laisse la place à trois vraies cartes du catalogue, choisies dans
  une même famille de photos (ambrées, sombres) ; trois faits sobres (114 références,
  44 marques, 10 · 50 · 80 ml).
- Capitales espacées gardées (elles sont la signature de la charte) mais limitées à
  leur rôle : navigation, marque, boutons, une seule ligne d'accroche.
- Fiche : même bloc bordé photo | informations, avec de l'air ; les formats 10 · 50 ·
  80 ml sortent de la note pour devenir une information lisible (sans être un
  sélecteur : le site ne vend pas en ligne) ; le bouton Snapchat reprend l'icône
  réelle et tient sur une ligne ; sur téléphone, il devient une barre fixe.

**Gestion**
- Mêmes cartes blanches arrondies, même gris iOS, même bordeaux, mêmes icônes Lucide,
  même barre d'onglets ; mais **un chiffre dominant** (Encaissé · septembre), la
  Marge nette en pastille bordeaux juste dessous, le reste en secondaire.
- Libellés en minuscules plutôt qu'en capitales de 11 px.
- « À faire » réduit aux alertes réelles, avec une pastille d'icône par type.
- Vendre : le ticket se lit d'un coup d'œil (client, article, total, reçu, poche) ;
  les détails d'achat (coût en dinars, taux) restent repliés comme dans l'app et ne
  sont pas montrés ; le bouton annonce son montant (« Encaisser 85 € »).
- Écran ordinateur : l'Accueil de la gestion mis en page large (la vraie app est un
  rail de téléphone de 430 px, même sur ordinateur). Les onglets passent en haut ;
  « Vendre » devient le bouton principal de la page, pour ne pas montrer deux chemins
  vers la même action.
- Police : SF Pro n'étant pas diffusable, le rendu utilise **Inter**, son équivalent
  le plus proche.

---

## 4. Écrans

| Fichier | Format | Contenu |
|---|---|---|
| `boutique-accueil.html` | ordinateur | Accroche, deux actions, trois faits, sélection du moment en trois cartes du catalogue. |
| `boutique-fiche.html` | ordinateur | Fiche « Contre Moi », Louis Vuitton : photo, formats, commande Snapchat. |
| `boutique-fiche-mobile.html` | téléphone | Fiche « Tobacco Vanille », Tom Ford, barre de commande fixe. |
| `gestion-tableau.html` | ordinateur | Accueil de la gestion : Encaissé du mois dominant, à faire, journée, top parfums, lots ouverts. |
| `gestion-caisse.html` | téléphone | Vendre : un article, total, reçu maintenant, poche, « Encaisser 85 € ». |
| `gestion-accueil.html` | téléphone | Accueil de la gestion sur téléphone. |

### Données d'exemple (elles se recoupent)

Septembre : Encaissé 6 480 €, Marge nette 1 912 € (30 %), À encaisser 760 €,
Trésorerie 5 215 € — identiques sur ordinateur et téléphone. Aujourd'hui (mercredi
30 septembre) : 395 € encaissés, 3 ventes, 1 commande prise, 2 à livrer demain.
Lots ouverts : « Commande de septembre » (arrivée prévue 3 oct., 9 documents, marge
nette 312 €) — celui que le ticket de vente propose — et « Commande d'août »
(14 documents, 545 €). Ticket : Stronger With You 50 ml à 85 €, marge avant
dépenses 30,85 €, réglé en espèces.

---

## 5. Présentation sur WebTreize

Ordinateur : **`boutique-accueil`** (l'identité en un regard). Téléphone :
**`gestion-caisse`** (l'outil sur le terrain). Aplat de scène : bordeaux `#7B0B1D`,
la couleur commune aux deux registres.
