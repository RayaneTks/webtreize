# Magda Mania — audit et direction artistique

## 1. Audit de l’application réelle

Sources : code du dépôt `RayaneTks/magda-mania` (`app/globals.css`, `components/client/*`,
`components/kitchen/*`, `components/admin/*`, `db/seed-data.ts`), anciennes captures
(`503d4e9`), affiche A4 du stand.

### Face client (carte, options, suivi) : 5/10
- Réussi : le fond est solide (option de sauce obligatoire avec « Sans sauce » en premier,
  ruptures affichées, suivi en temps réel, Web Push expliqué avant d’être demandé). Le
  bandeau d’accueil sur fond nuit sert bien le logo néon.
- Bas de gamme / générique : c’est le gabarit d’appli de livraison. Cartes blanches à
  coins de 20 px et ombre portée, pastilles de catégories avec émojis (🎡 ⭐ 🥪), boutons
  « + » ronds roses répétés à chaque ligne, bandeau dégradé rose-bleu en haut, trame de
  points en fond. Le fond crème coupe l’appli de son identité : l’affiche du stand, elle,
  est sur fond nuit.
- Typo : Fredoka (arrondie, enfantine) pour les titres, Plus Jakarta pour le reste. Aucune
  des deux ne vient du logo ni du lieu ; le logo porte déjà toute la rondeur nécessaire.
- Ton : l’appli vouvoie (« Commandez d’ici… », « Votre commande ») alors que la clientèle
  est faite de riders ; la présentation passe au tutoiement, à répercuter dans l’appli.
- Incohérences : les anciennes captures montrent des « Menu Panini americano » à 7,90 € ;
  le fichier de carte (`seed-data.ts`) dit « Menu Paninis » à 8,90 € avec choix du panini.
  On suit le code.
- Suivi : le numéro est le bon élément dominant, mais pris dans une carte arrondie avec
  une pulsation `pulse-ring`, des étapes en ronds à icônes, un vert émeraude étranger à
  la marque.

### Écran cuisine : 6/10
- Réussi : l’intention est celle d’un vrai KDS : tri par ancienneté, compteur de minutes,
  paliers de temps restant (5/10/15/20/30), consigne mise en évidence, bouton unique pour
  l’étape suivante, annulation avec motif obligatoire, son et Web Push de cuisine.
- À corriger : numéro de commande à 24 px, articles à 15 px, options à 12 px : illisible
  à 2 m. L’état ne se lit qu’au liseré (rouge/émeraude/or), pas en bloc. Les tickets
  « prêtes » restent mêlés à la production. Compteurs en pastilles. Barre d’outils très
  chargée (six boutons de même poids).

### Espace gérant : 5/10
- Réussi : le bon geste est au bon endroit (interrupteur de disponibilité, stock ± en
  plein service, filtres « En rupture » / « Stock bas », édition de la carte à part).
- Générique : chaque produit est une carte arrondie séparée (30 cartes à faire défiler),
  interrupteurs vert/rouge avec « OK / ✕ », barre dégradée, émojis de catégories. Aucune
  densité de logiciel pro : pas de tableau, pas de colonnes, le prix et la TVA en petit
  gris sous le nom.

## 2. Direction artistique

**Concept.** L’enseigne néon allumée au-dessus du stand : tout est sur la nuit du logo,
le texte est blanc comme un tube éteint, et deux tubes seulement s’allument, le rose
quand c’est à toi de bouger, le bleu quand ça suit son cours.

**Références réelles.** Affiche A3/A4 du stand (fond nuit, grande capitale grasse) ;
menu-boards de street-food à lettres blanches et prix alignés ; graphismes de planches
et marquages de skatepark en grotesque large et grasse (numéros de modules, panneaux
de zones) ; tickets de caisse thermiques (chasse fixe, filets pointillés) ; KDS pro
Toast et Square KDS : bandeau d’en-tête coloré par état, minuterie en haut à droite,
bouton d’avancement unique en bas, rail des commandes prêtes.

**Palette** (partie du logo et de `globals.css`)

| Rôle | Hex | Usage |
| --- | --- | --- |
| Nuit | `#0e1430` | fond client et cuisine, encre du gérant |
| Nuit profonde | `#080c1f` | fond d’écran cuisine, entre les tickets |
| Nuit relevée / filets | `#161d3f` / `#273158` / `#3a4677` | surfaces, séparateurs, contours |
| Blanc tube | `#f4f6fb` | texte, bouton d’action cuisine |
| Texte secondaire | `#a2b3da` / `#7a8cc0` | options, légendes |
| Rose néon | `#f50054` | ce qui réclame un geste : commander, payer, « c’est prêt », retard, rupture |
| Bleu néon | `#0080f8` (texte `#4fa8ff`) | en cours, en direct, ouvert |
| Or | `#ffc023` | à lancer, nouvelle, consigne client, stock bas |
| Papier (gérant) | `#f3f4f8` / `#ffffff` | fond et tableaux du back-office |

Règle : jamais plus de deux tubes allumés sur un même élément ; aucun dégradé décoratif,
aucun halo (le néon est suggéré par la couleur pleine, pas par un glow).

**Typographie** (Google Fonts, deux familles)
- **Archivo** variable (axe de largeur 62–125) : une seule famille, trois voix.
  Large 118–125 % noir 800–900 pour l’enseigne, les titres et les numéros de commande
  (la grotesque large des planches et des marquages) ; normale pour l’interface ;
  étroite 82–92 % pour les libellés longs de la cuisine (« Lancer la préparation »).
- **IBM Plex Mono** : ce qui sort d’une imprimante à tickets : heures, minuteries,
  téléphones, reçu du client, historique.
- Échelle téléphone : 12,5 / 13,5 / 15 / 17 / 20 / 31 / 44 / 118. Échelle cuisine :
  13,5 / 16 / 21 / 28 / 44. Chiffres tabulaires pour tous les montants. Espaces fines
  (U+202F) avant « : ? % » et entre nombre et unité, insécable devant « € ».
- Pas de capitales espacées ; interlettrage négatif sur les grands corps.

**Grille.** Téléphone : marges de 20 px, pas de 4 px, lignes de carte de 92 px. Cuisine :
4 colonnes de tickets + rail de 268 px, gouttières de 10 px, boutons tactiles ≥ 44 px
(60 px pour l’action principale). Gérant : 2 colonnes (tableau + colonne service de
352 px), lignes de tableau de 44 px.

**Composants.** Rayons de 2 à 4 px (étiquette, ticket), jamais de carte arrondie. Ligne
de carte : vignette dans un puits nuit, nom, description, prix large aligné à droite,
« + » en contour. Ticket cuisine : bandeau plein à la couleur de l’état (or à lancer,
bleu en préparation, rose en retard), numéro à 44 px, quantité en case (pleine si ≥ 2),
options en « libellé gris / valeur blanche », consigne sur aplat or, pied mono
« payée hh:mm / total ». Interrupteur gérant : nuit quand disponible, rose en rupture.

**Ton.** Tutoiement, phrases courtes, vocabulaire du lieu (« session », « comptoir »).
« Un creux entre deux sessions ? », « C’est prêt. », « Annonce ton numéro au comptoir ».

**À faire.** Un élément dominant par écran (l’accroche, le numéro, la file de tickets,
le tableau). Montrer les états réels (épuisé, retard, nouvelle, rupture, stock bas).
Données qui se recoupent d’un écran à l’autre.

**À ne pas faire.** Fond crème, Fredoka, émojis, pastilles de statut en série, halos,
cartes à ombre, fausse notification iOS, vert émeraude (étranger à la marque).

## 3. Écrans et données d’exemple

Samedi 26 septembre 2026, service de midi. Numéros du jour depuis MM-101 (règle du code).

- `client-carte.html` (13:24) : carte, rubrique « Nos menus », Menu Pasta Box épuisé,
  panier à 4,00 € (une Crêpe Nutella).
- `client-panier.html` (13:25) : composition du Menu Paninis 8,90 € (Raclette, Oasis
  tropical, Sans sauce).
- `client-suivi.html` (13:39) : MM-135, Sofia A., prête ; Menu Paninis 8,90 € + Crêpe
  Nutella 4,00 € = 12,90 €, dont TVA 10 % 1,17 € sur base 11,73 €, Apple Pay.
- `cuisine.html` (13:42) : MM-134 (17 min, en retard, 18,80 €), MM-136 (11 min,
  14,90 €), MM-138 (6 min, 17,00 €), MM-139 (2 min, nouvelle, 12,00 €) ; au comptoir
  MM-133 et MM-135 (prête depuis 3 min, même commande que le suivi).
- `gerant-carte.html` : Carte & stocks, 29 produits, 2 ruptures (Menu Pasta Box, Pasta
  Box, cohérent avec la carte client), pomme d’amour en stock bas (4, alerte à 5),
  « 4 en cuisine » comme sur l’écran cuisine.

Écarts assumés par rapport à l’appli : tutoiement ; commandes prêtes regroupées dans un
rail « Au comptoir » (mêmes données, mêmes actions) ; stock suivi et prise de commande
réunis dans une colonne à droite de la page Carte & stocks (fonctions existantes,
réparties dans l’appli entre cette page, l’écran cuisine et les réglages).
