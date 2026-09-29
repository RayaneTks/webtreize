# Encore 1 Dessert — audit et direction artistique

Écrans de présentation pour le portfolio WebTreize. Le brief commun
(`design/maquettes/BRIEF.md`) fait autorité ; ce document le décline pour ce
projet. Sources lues : dépôt `RayaneTks/encore1dessert` (README, CLAUDE.md,
`src/screens/*`, `src/components/*`, `src/lib/calculations.ts`,
`src/lib/commandeProduction.ts`, `src/data/initialData.ts`, `src/types/index.ts`,
`src/index.css`, `public/`).

---

## 1. Audit de l’application réelle

### Ce qui est réussi (et qu’il faut montrer)

- **La logique métier est juste et rare.** Matières → bases maison (coût au kg)
  → recettes (coût de revient, marge particulier et pro) ; un prix d’achat
  modifié se propage partout. C’est le vrai sujet de l’étude de cas.
- **La compta est figée.** Chaque vente garde son prix, son coût et sa légende
  au moment de l’encaissement ; supprimer une commande n’efface pas la vente.
- **Le suivi de production est pensé pour le labo** : l’onglet Cuisine regroupe
  toutes les commandes par dessert et on coche pièce par pièce ; une commande
  passe seule en « Prête » quand tout est coché, et « Livrée » propose
  d’enregistrer la vente.
- Bonnes intentions d’usage : cibles tactiles de 44 px, `tabular-nums` par
  endroits, `prefers-reduced-motion` respecté, pas de TVA inventée.

### Ce qui fait bas de gamme ou générique

- **La palette « Apple Gourmand / Quiet Luxury »** : crème `#FDF8F2`, chocolat
  `#241309`, caramel, cartes blanches à coins de 16–32 px. C’est exactement le
  cliché « artisanal = crème + brun ». Par-dessus, les couleurs Tailwind par
  défaut (emerald, amber, red, blue, teal, orange en fonds pâles) : aucun
  système, juste des pastilles.
- **Les émojis servent d’identité** à chaque matière, base, recette et commande
  (🧈 🥚 🥧 🍫, médailles 🥇🥈🥉, 📦, 🧾). Illisibles en petit, datés, et ils
  remplacent le travail typographique.
- **Inter partout**, poids 600–800, petites étiquettes en capitales
  `tracking-widest` sur chaque chiffre.
- **Le motif « carte + étiquette + gros chiffre » en série** : grille 2 × 2 de
  KPI en Compta, grille 3 × 2 « Coût unitaire / Marge Part. / Marge Pro… » dans
  chaque recette, carte sombre en dégradé pour le chiffre d’affaires.
- **Marges en feu tricolore** (vert ≥ 60 %, ambre ≥ 40 %, rouge) et barres de
  marge sans échelle ni repère : la couleur décide à la place du chiffre.
- **Pas d’identité** : le logo (lettres-biscuits illustrées) n’apparaît nulle
  part dans l’app ; `public/favicon.svg` est le logo Vite par défaut (la copie
  dans `design/maquettes/assets/e1d/` aussi — à ne pas utiliser) ; l’icône PWA
  est un « 1 » biscuit sur un dégradé gris.
- Le README (« ultra-premium », « fluidité parfaite », 🍩 🚀) décrit une
  plaquette, pas un outil.

### Défauts fonctionnels relevés en lisant le code (à signaler à la cliente)

1. **Rendement des bases faux** : `calculateBaseCost` additionne les quantités,
   unités comprises ; 1 œuf compte pour 1 g. La pâte sucrée « rend » 531 g au
   lieu de ~580 g, donc son coût au kg (et celui de chaque tarte) est surestimé.
   Les écrans de présentation comptent 50 g par œuf.
2. **« Recette × N » depuis Cuisine** : `ScaleModal` divise la quantité commandée
   par le nombre de parts (7 tartes → × 0,875). Les commandes comptent des
   desserts entiers, la mise à l’échelle compte des parts. À vérifier.
3. **La marge cible** (Réglages, 65 % par défaut) est enregistrée mais n’est
   utilisée par aucun calcul ni aucun écran.
4. La liste des recettes n’affiche que la marge particulier ; la marge pro,
   plus basse, n’est visible qu’en dépliant.

### Notes par écran (état actuel du code)

| Écran | Note | En une ligne |
|---|---|---|
| Vendre (caisse) | 5/10 | Efficace, mais bouton « ENCAISSER » en capitales espacées, ombres, émojis produits. |
| Ordres · Commandes | 6/10 | Bonne logique, mais quatre pastilles colorées par carte et fonds teintés selon l’urgence. |
| Ordres · Cuisine | 6/10 | Le meilleur principe de l’app ; une ligne de 52 px par pièce (4 tartes = 4 lignes) noie la liste. |
| Recettes | 5/10 | Accordéons à émojis, grille de six mini-cartes, feu tricolore ; le coût en direct n’existe que dans la modale. |
| Bases | 5/10 | Même gabarit que Recettes, rendement faux (voir 1). |
| Matières | 6/10 | La plus sobre ; mais le prix s’affiche sans son unité (l’unité est dans un sous-titre en capitales). |
| Compta | 4/10 | Carte sombre en dégradé, KPI en cartes, médailles, bénéfice en vert : le cumul de tous les tics. |
| Réglages | 6/10 | Fonctionnel ; la marge cible ne sert à rien (voir 3). |

**Ce qu’il faut corriger pour le portfolio** : retirer émojis, pastilles et
cartes ; rendre le chiffre dominant et aligné ; donner à chaque nombre son
unité ; montrer la marge contre une échelle et un repère ; donner une identité
qui vienne du métier et pas d’un « style pâtisserie ».

---

## 2. Direction artistique

### Concept

**La fiche de labo** — un outil qui se remplit comme une fiche technique de
pâtisserie et se lit comme le ticket d’une balance : encre noire, chiffres à
chasse fixe, stylo bleu pour tout ce qu’on saisit.

Un outil qu’on consulte à 6 h, au labo, les mains dans la farine : grand
contraste, gros chiffres, zones de pouce larges, rien à déchiffrer.

### Références réelles

- **Fiches techniques de fabrication** (format enseigné à Ferrandi ou à l’École
  Lenôtre) : tableau Denrées / Quantité / Prix unitaire / Coût, total, coefficient.
- **Balances de laboratoire** (Soehnle Professional, Bizerba) : chiffres alignés
  à droite, unité fixe, rien d’autre.
- **Carnets à souches de bons de commande** (Exacompta) : papier gris clair,
  filets imprimés, cases à cocher.
- **Étiquettes de production et tickets thermiques** : caractères à chasse fixe.
- **Sacs de farine de meunerie** : grotesques étroites, imprimées gras.
- **Tableurs financiers** (la cliente remplaçait un Excel) : convention « bleu =
  donnée saisie, noir = formule » ; **comptabilité** : un filet avant le total,
  un double filet sous le résultat.
- **Logiciels pros de food cost** (Koust, Meez, Apicbase) pour la densité.

### Palette

| Rôle | Hex | Usage |
|---|---|---|
| Papier | `#F3F3EF` | Fond. Le gris clair d’un carnet à souches : ni crème, ni blanc clinique. |
| Encre | `#141414` | Texte, filets de section, tout résultat calculé, cases faites. |
| Graphite | `#5E5E59` | Texte secondaire, unités, dates. |
| Gris | `#9A9A93` | Onglets inactifs, éléments terminés. |
| Trait | `#D8D8D1` | Filets entre lignes. |
| Bleu stylo | `#1F3DAA` | **Uniquement les valeurs saisies** : grammages, prix d’achat, prix de vente, quantités commandées. |
| Orange biscuit | `#E2661A` | Pris sur le « 1 » du logo. **Ce qui pèse** : le coût dans une marge, les pièces qui restent à faire. |
| Rouge | `#C22F1B` | Réservé : commande en retard, marge sous la cible. Jamais décoratif. |
| Blanc | `#FFFFFF` | Champs de saisie. |

Pas de vert « succès » : une chose faite est noire et cochée.

### Typographie (Google Fonts, deux familles)

- **Archivo** (variable, chasse 62–125 %, graisse 100–900) — tout le texte.
  Ses largeurs étroites rappellent les grotesques imprimées sur les sacs de
  farine ; une seule famille donne titres, intitulés et corps.
  - Titre d’écran : 700, chasse 82 %, 31–32 px, interlettrage −0,012 em.
  - Intitulé de section : 700, chasse 75 %, 13 px, **en bas de casse**.
  - Nom de ligne : 600–650, 15,5–17 px. Corps : 400–500, 14–15 px.
  - Onglets : 600, chasse 80 %, 13,5 px.
- **IBM Plex Mono** (400, 500, 600) — tout ce qui se pèse, se compte ou se paie.
  La chasse fixe aligne les colonnes comme sur un ticket de balance.
  - Chiffre dominant : 500, 40–58 px, interlettrage −0,06 em.
  - Montants de ligne : 500, 14,5–16 px. Méta-données : 400, 12,5–13 px.

Échelle : 11 · 12,5 · 13 · 14 · 15 · 17 · 24 · 32 · 40 · 52 px.
Typographie française : fine insécable (U+202F) avant % et : et entre chiffre et
unité, insécable (U+00A0) devant €, séparateur de milliers en fine.

### Grille

- 390 × 844, marge latérale 16 px, 47 px réservés à la barre d’état.
- Les chiffres s’alignent à droite sur x = 374 sur tous les écrans.
- Tableau de composition : nom (souple) · poids 72 px · €/kg 58 px · coût 58 px.
- Rythme vertical par pas de 4 px ; lignes de 46 à 52 px ; cases de
  production de 32 px ; onglets de 84 px avec la zone du geste.

### Composants

- **En-tête** : surtitre graphite (date, nombre d’éléments), titre, un bouton
  rectangulaire à droite.
- **Boutons** : rectangles, trait encre de 1,5 px, rayon 3 px ; plein pour
  l’action principale. Pas d’icône décorative.
- **Filets** : 2 px encre = début de section ; 1 px trait = ligne ; 1 px encre
  puis double filet de 3 px = total (convention comptable).
- **Statut de commande** : carré vide = en attente, carré plein = prête. Le mot
  à droite, en toutes lettres. Pas de pastille.
- **Cases de production** : une case par pièce, pleine et cochée quand elle est
  faite ; compteur « reste » encadré en orange.
- **Barre d’avancement** : un segment par pièce commandée (22 segments pour 22
  pièces). L’échelle est le nombre.
- **Jauge de marge** : marge en encre depuis la gauche, coût en orange à droite,
  repère de la marge cible (65 %) légendé.
- **Onglets** : six mots, sans icônes ; l’onglet actif est gras, avec un filet
  de 3 px.

### Ton

Les mots du labo et de la compta, pas ceux d’une plaquette : « Coût de
revient », « Reste », « Tout marquer fait », « dont pros ». Phrases courtes,
chiffres toujours avec leur unité.

### À faire / à ne pas faire

| À faire | À ne pas faire |
|---|---|
| Un chiffre dominant par écran, en mono. | Des grilles de cartes « étiquette + gros chiffre ». |
| Le bleu pour ce qu’on saisit, le noir pour ce qui est calculé. | Colorer une marge en vert/orange/rouge. |
| Toute jauge avec son échelle, sa valeur ou son repère. | Des barres décoratives. |
| Les totaux sous filet et double filet. | Des ombres, des dégradés, des coins très arrondis. |
| Des sommes qui se recoupent à l’écran. | Un chiffre qu’on ne peut pas vérifier. |
| Nommer le statut en toutes lettres. | Des pastilles pâles en série, des émojis. |
| Intitulés en bas de casse, étroits et gras. | Capitales espacées. |

---

## 3. Écrans

Données d’exemple, fin septembre 2026 (mercredi 30 septembre, 6 h 42). Tous les
calculs suivent `calculations.ts` (prix normalisé au kg, au litre ou à l’unité ;
marge = (prix − coût) ÷ prix), rendement des bases corrigé (1 œuf = 50 g).
Les lignes de coût sont arrondies au centime et le total est leur somme.

| Fichier | Format | Légende | Texte alternatif |
|---|---|---|---|
| `fiche-dessert.html` | téléphone | La fiche technique : chaque grammage a un prix, chaque tarte deux marges. | Fiche technique de la tarte cacahuète caramel : cinq composants avec poids, prix au kilo et coût, un coût de revient de 5,99 €, puis les prix particulier (44 €) et pro (38 €) avec leurs marges de 86,4 % et 84,2 % face à une marge cible de 65 %. |
| `commandes.html` | téléphone | Les commandes du jour, leur statut et ce que la cuisine a déjà fait. | Liste des commandes du mercredi 30 septembre : cinq commandes de restaurants et de particuliers avec les desserts demandés, les notes de livraison, le statut en attente ou prête et l’avancement en cuisine. |
| `production.html` | téléphone | La cuisine : toutes les commandes regroupées par dessert, cochées pièce par pièce. | Onglet cuisine : 10 pièces faites sur 22, une barre d’un segment par pièce, puis chaque dessert avec le nombre restant ; la tarte cacahuète caramel est dépliée, avec une case par tarte pour chaque client. |
| `ingredients.html` | téléphone | Les matières premières, du conditionnement d’achat au prix au kilo, au litre ou à l’unité. | Liste des matières premières par rayon (crèmerie, élevage, épicerie) : pour chacune, le conditionnement acheté et le prix normalisé, par exemple la farine T55 à 0,65 € le kilo. |
| `compta.html` | téléphone | Le bilan du mois : chiffre d’affaires, coût matières, bénéfice net, et ce que rapporte chaque dessert. | Tableau de bord des 30 derniers jours : 5 906 € de chiffre d’affaires, 964,73 € de coût matières, 4 941,27 € de bénéfice net (83,7 %), 163 pièces vendues, puis le bénéfice par dessert. |

### Recoupements

- Fiche : 1,45 + 1,41 + 0,86 + 2,24 + 0,03 = 5,99 € ; 320 g × 4,52 €/kg = 1,45 € ;
  pâte sucrée = 2,62 € pour 580 g = 4,52 €/kg ; caramel = 1,49 € pour 403 g =
  3,70 €/kg ; (44 − 5,99) ÷ 44 = 86,4 % ; (38 − 5,99) ÷ 38 = 84,2 % ;
  44 ÷ 5,99 = × 7,35 ; 5,99 ÷ 8 = 0,75 € la part.
- Ordres : 3 commandes en attente aujourd’hui + 2 demain = 5 ; 16 pièces
  aujourd’hui + 6 demain = 22 ; 10 faites, 12 restantes. Par dessert : 3 + 3 +
  7 + 6 + 3 = 22 et 2 + 3 + 3 + 2 + 0 = 10.
- Matières : chaque conditionnement redonne le prix normalisé (16,25 € ÷ 25 kg =
  0,65 €/kg ; 6,30 € ÷ 30 = 0,21 €/u).
- Compta : 3 318 + 2 588 = 5 906 € ; 5 906 − 964,73 = 4 941,27 € ; ÷ 5 906 =
  83,7 % ; 4 941,27 ÷ 71 ventes = 69,60 € ; la somme des bénéfices par dessert
  redonne 4 941,27 € et celle des pièces 163.

---

## 4. Recommandation pour la scène WebTreize

Trois téléphones, dans cet ordre :

1. `production.html` — la cuisine, l’écran qu’on comprend sans lire ;
2. `fiche-dessert.html` — au centre, le cœur de l’outil (coût et marges) ;
3. `compta.html` — le résultat du mois.

Aplat : **orange biscuit `#E2661A`**, la couleur du « 1 » du logo. Les écrans
gris papier et encre s’y détachent nettement, et la scène ne ressemble plus au
cliché crème de l’ancienne présentation (`#e9d9c4`).
