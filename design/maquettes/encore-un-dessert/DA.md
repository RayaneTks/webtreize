# Encore 1 Dessert — DA réelle, audit et améliorations

Écrans de présentation pour le portfolio WebTreize. Le brief commun
(`design/maquettes/BRIEF.md`) fait autorité : **une version améliorée de
l’existant, pas une nouvelle identité**.

Sources : dépôt `RayaneTks/encore1dessert` (lu, et lancé localement dans un
clone du scratchpad avec les données d’exemple ci-dessous à la place de
Supabase — rien n’a été poussé ni modifié à distance). Les vrais écrans ont été
capturés à 390 × 844 et comparés un à un avec les versions améliorées.

> Version précédente abandonnée : la « fiche de labo » (gris papier, bleu
> stylo, monospace). Retour client : trop éloignée de leur DA, pas assez
> épurée ni moderne.

---

## 1. DA réelle relevée

### Tokens (`src/index.css`, bloc `@theme`)

| Token | Hex | Rôle dans l’app |
|---|---|---|
| `gourmand-bg` | `#FDF8F2` | Crème chaude, fond de tous les écrans |
| `gourmand-chocolate` | `#241309` | Texte, boutons principaux, onglet actif, carte « Chiffre d’affaires » |
| `gourmand-biscuit` | `#9B7558` | Texte secondaire, onglets inactifs |
| `gourmand-cocoa` | `#5C3D2E` | Texte tertiaire, boutons secondaires |
| `gourmand-border` | `#EAD8C3` | Caramel pâle : bordures des cartes et des champs |
| `gourmand-caramel` | `#C05621` | Accent |
| `gourmand-strawberry` | `#B83232` | Danger |
| (Tailwind) emerald | `#059669` env. | Marges et bénéfices |

- **Police** : Inter (400 → 900), titres de page 30 px gras, `tracking-tight`.
- **Icônes** : Lucide (`lucide-react`), trait 2.
- **Composants** : `PageHeader` (titre + description + bouton carré chocolat
  « + »), `SectionCard` / `.gourmand-card` (carte blanche, bordure caramel pâle,
  `rounded-2xl`, ombre légère), `.gourmand-card-dark` (carte chocolat),
  `FilterPillRow` (pastilles arrondies, active en chocolat), `BottomNav`
  (6 onglets : Compta, Ordres, Vendre, Recettes, Bases, Matières — icônes
  LayoutDashboard, ClipboardList, Calculator, ChefHat, Beaker, Apple),
  pastilles de statut, boutons « Adapter » (balance) et « Tout marquer fait ».
- **Structure** : Recettes en cartes dépliables ; Ordres en deux vues
  (Commandes / Cuisine) ; Compta = carte sombre CA + KPI + Top rentabilité ;
  Matières = recherche + liste.

### Audit de l’existant (captures réelles)

**Réussi** : la logique métier (matières → bases maison → recettes, coût et
marges recalculés partout) ; la compta figée à la vente ; l’onglet Cuisine où
l’on coche pièce par pièce et où la commande passe seule en « Prête » ; les
cibles de 44 px ; une palette chaleureuse et cohérente avec le métier.

**À corriger** :
- émojis à la place d’icônes (chaque matière, base, recette, commande, les
  médailles du Top rentabilité), rendus différents selon le téléphone ;
- trop d’éléments par carte : dans Ordres, trois ou quatre pastilles de
  couleurs différentes (Pro, Aujourd’hui, statut) + émojis empilés + icônes ;
- petites étiquettes de 10 px en capitales espacées au-dessus de chaque chiffre ;
- grilles de mini-cartes (six dans une recette dépliée, quatre en Compta) sans
  élément dominant ;
- noms tronqués (« Tarte cacah… », « Caramel be… ») parce que prix, jauge et
  deux boutons se disputent la ligne ;
- prix sans unité (« 9,96 € », l’unité est dans un sous-titre en capitales) ;
- dégradé sur la carte sombre, feu tricolore vert/ambre/rouge sur les marges.

| Écran réel | Note |
|---|---|
| Vendre (caisse) | 5/10 |
| Ordres · Commandes | 6/10 |
| Ordres · Cuisine | 6/10 |
| Recettes | 5/10 |
| Bases | 5/10 |
| Matières | 6/10 |
| Compta | 5/10 |

### Défauts de calcul relevés dans le code (à signaler à la cliente)

1. **Rendement des bases faux** : `calculateBaseCost` additionne les quantités,
   unités comprises ; 1 œuf compte pour 1 g. La pâte sucrée « rend » 531 g au
   lieu d’environ 580 g, donc son coût au kilo est surestimé (4,94 €/kg au lieu
   de 4,52 €/kg), et avec lui celui de chaque tarte (l’app affiche 6,11 € pour
   la tarte cacahuète caramel, 5,99 € une fois corrigé). Les écrans de
   présentation comptent 50 g par œuf.
2. **« Voir la recette × N » depuis Cuisine** : `ScaleModal` divise la quantité
   commandée par le nombre de parts (7 tartes → × 0,875). Les commandes
   comptent des desserts entiers, la mise à l’échelle compte des parts.
3. **La marge cible** (Réglages, 65 % par défaut) est enregistrée mais n’est
   utilisée par aucun calcul ni aucun écran.

---

## 2. Améliorations apportées

Même palette, même Inter, mêmes icônes Lucide, mêmes onglets, mêmes libellés,
mêmes cartes arrondies. Seuls ajouts : deux teintes dérivées du crème et du
caramel pâle pour les blocs internes (`#F8EFE5`) et les séparateurs
(`#F1E6D8`), et le vert déjà utilisé par l’app pour les marges (`#047857`,
assombri pour le contraste).

- **Émojis → icônes Lucide** du jeu de l’app, même trait : une icône par rayon
  de matières, une par famille de recette, aucune décorative.
- **Une chose dominante par écran** : le coût de revient (Recettes), la liste du
  jour (Ordres), l’avancement 10 / 22 (Cuisine), le chiffre d’affaires
  (Compta).
- **Une seule action principale** : le bouton carré chocolat « + » de
  `PageHeader` ; les autres actions deviennent secondaires (bordure caramel
  pâle).
- **Recettes** : la grille de six mini-cartes devient un bloc « Coût de
  revient » + une composition lisible (étiquette « Base » sur les bases maison)
  + deux cartes Particulier / Pro avec le taux de marge, sa jauge et le montant.
  Plus de noms tronqués.
- **Ordres · Commandes** : une pastille de type (Pro / Particulier) et une de
  statut par carte, au lieu de quatre ; « Aujourd’hui » devient un titre de
  section ; les desserts s’affichent un par ligne avec leur quantité ; une
  jauge d’avancement cuisine remplace « cuisine 4/6 » perdu dans la méta.
- **Ordres · Cuisine** : une ligne par client avec une pastille ronde par tarte
  (au lieu d’une ligne de 52 px par pièce) ; cercles vides bien contrastés,
  cercles faits en vert avec coche.
- **Matières** : regroupées par rayon, prix toujours suivi de son unité
  (/kg, /L, /unité), conditionnement d’achat en sous-titre.
- **Compta** : carte chocolat unie (sans dégradé) pour le chiffre d’affaires,
  bénéfice net et coût matières ; une seule carte « Marge globale » qui
  rassemble pièces vendues, ventes et marge par vente ; Top rentabilité classé
  1-2-3 au lieu des médailles.
- **Typographie** : corps de 14 à 16 px, rien sous 12 px, chiffres tabulaires
  partout, pas de capitales espacées ; grille de 4 / 8 px, marges latérales de
  20 px, cartes à 20 px de rayon, boutons et pastilles de 36 à 48 px.
- **Typographie française** : fine insécable avant % et entre chiffre et unité,
  insécable devant €.

---

## 3. Écrans

Données d’exemple, mercredi 30 septembre 2026, 6 h 42. Calculs de
`calculations.ts` (prix normalisé au kg, au litre ou à l’unité ; marge =
(prix − coût) ÷ prix), rendement des bases corrigé. Lignes de coût arrondies au
centime, total = leur somme.

| Fichier | Format | Légende | Texte alternatif |
|---|---|---|---|
| `fiche-dessert.html` | téléphone | La fiche d’une tarte : sa composition, son coût de revient et sa marge particulier et pro. | Recette de la tarte cacahuète caramel dépliée : coût de revient de 5,99 €, soit 0,75 € la part, composition en cinq lignes (pâte sucrée, caramel beurre salé, cacahuètes, chocolat au lait, fleur de sel) avec grammages et coûts, puis prix particulier 44 € (86,4 % de marge) et pro 38 € (84,2 %). |
| `commandes.html` | téléphone | Les commandes du jour, leur statut et leur avancement en cuisine. | Onglet Ordres, commandes du mercredi 30 septembre : Bistrot du Cours (pro, prête, 5 pièces), La Cantine Chave (pro, en attente, cuisine 4 sur 6), Sonia B. (particulier, en attente), chacune avec ses desserts et ses notes de livraison. |
| `production.html` | téléphone | La cuisine : toutes les commandes regroupées par dessert, cochées tarte par tarte. | Vue Cuisine : 10 pièces faites sur 22, 12 à faire ; la tarte cacahuète caramel est dépliée avec une pastille par tarte pour chaque client (3 faites pour le Bistrot du Cours, 1 à faire pour Sonia B., 3 pour le lendemain). |
| `ingredients.html` | téléphone | Les matières premières par rayon, avec leur prix au kilo, au litre ou à l’unité. | Liste des 20 matières premières classées par rayon (crèmerie, élevage, épicerie) : pour chacune, le conditionnement acheté et le prix normalisé, par exemple le beurre doux à 9,96 € le kilo ou les œufs à 0,21 € l’unité. |
| `compta.html` | téléphone | Le bilan des 30 derniers jours : chiffre d’affaires, bénéfice, marge et desserts les plus rentables. | Tableau de bord des 30 derniers jours : 5 906 € de chiffre d’affaires, 4 941,27 € de bénéfice net, 964,73 € de coût matières, 83,7 % de marge globale, 163 pièces vendues en 71 ventes, puis les trois desserts les plus rentables. |

### Recoupements

- Recette : 1,45 + 1,41 + 0,86 + 2,24 + 0,03 = 5,99 € ; 320 g × 4,52 €/kg =
  1,45 € ; pâte sucrée = 2,62 € pour 580 g = 4,52 €/kg ; caramel = 1,49 € pour
  403 g = 3,70 €/kg ; (44 − 5,99) ÷ 44 = 86,4 % ; (38 − 5,99) ÷ 38 = 84,2 % ;
  44 ÷ 5,99 = × 7,3 ; 5,99 ÷ 8 = 0,75 € la part.
- Ordres : 3 commandes en attente aujourd’hui + 2 demain = 5 ; 16 pièces
  aujourd’hui + 6 demain = 22 ; 10 faites, 12 restantes ; La Cantine Chave :
  2 tartes chocolat + 2 flans faits sur 6.
- Matières : chaque conditionnement redonne le prix (16,25 € ÷ 25 kg =
  0,65 €/kg ; 6,30 € ÷ 30 = 0,21 €/unité).
- Compta : 5 906 − 964,73 = 4 941,27 € ; ÷ 5 906 = 83,7 % ; 4 941,27 ÷ 71 =
  69,60 € ; bénéfices par dessert 1 796,52 + 1 194,36 + 846,24 + 634,41 +
  469,74 = 4 941,27 € (les deux derniers hors Top 3) ; 163 pièces.

---

## 4. Recommandation pour l’accueil WebTreize

Trois téléphones, dans cet ordre :

1. `fiche-dessert.html` — le cœur de l’outil : ce que coûte et rapporte une tarte ;
2. `production.html` — la cuisine, compréhensible sans lire ;
3. `compta.html` — le résultat du mois.

Aplat : **chocolat `#241309`** (la couleur principale de la marque) ; les écrans
crème s’y détachent nettement.
