# Magda Mania — DA réelle et versions améliorées

Retour client sur la première version (fond nuit, Archivo, mono) : trop éloignée de la DA
de l'app. Cette version repart de l'app réelle et l'améliore sans la réinventer.

## 1. DA réelle relevée

Sources : dépôt `RayaneTks/magda-mania` (`app/globals.css`, `app/layout.tsx`,
`components/client/*`, `components/ui/*`, `components/order/OrderTracker.tsx`,
`components/kitchen/*`, `components/admin/*`, `db/seed-data.ts`) et anciennes captures
(`503d4e9` : magda-mania.jpg, magda-carte.jpg, magda-mobile.jpg).

**Polices** (`layout.tsx`, next/font) : Fredoka 500/600/700 pour les titres, noms de
produits et prix (`font-display`, interlettrage −0,015em) ; Plus Jakarta Sans 400–800 pour
le texte.

**Couleurs** (`globals.css`, `@theme`)

| Jeton | Hex | Usage dans l'app |
| --- | --- | --- |
| `magda-600` | `#f50054` | rose du néon : bouton principal, « + », barre panier, quantités en cuisine |
| `magda-50/100/500/700` | `#fff0f5` `#ffe1ec` `#ff0a60` `#cc0046` | option choisie, pastille « Obligatoire » |
| `spark-600` / `spark-300` | `#0080f8` / `#7fc0ff` | bleu du néon : « skatepark », filet de marque |
| `gold-400` | `#ffc023` | alertes, « Nouvelle », consigne client, temps restant |
| `night-950` | `#0e1430` | texte, pastille active, carte d'accueil, fond cuisine |
| `night-900/800` | `#1d2749` / `#2c3a64` | tickets et filets de la cuisine |
| `night-500/400/100` | `#4c66ae` `#6f88c5` `#e8ecf6` | textes secondaires, bordures |
| `cream-100` / `cream-200` / blanc | `#fbfaf9` / `#f2f1ef` / `#ffffff` | fond clair, puits photo, cartes |
| emerald / red (Tailwind) | `#10b981` / `#ef4444` | prête, disponible / retard, rupture |

**Formes** : `--radius-card` 20 px (cartes), 16 px (vignettes, boutons, options), 12 px
(boutons cuisine et admin), pastilles `rounded-full` ; ombre `shadow-lift` douce ;
`stripe-band`, filet dégradé rose → bleu de 6 px en tête des écrans ; icônes Lucide trait 2.

**Composants** : carte produit blanche (vignette 96 px sur `cream-200`, nom Fredoka, prix
Fredoka gras, « + » rond rose), pastilles de catégories 44 px, barre « Voir ma commande »
rose flottante, fiche produit en feuille arrondie, suivi avec carte numéro nuit + 3 étapes
à icônes, tickets cuisine `night-900` bordés à 2 px, espace gérant clair avec onglets
pastilles et interrupteurs vert/rouge.

**Ton** : vouvoiement (« Commandez d'ici », « Votre commande », « On vous prévient »).

## 2. Audit rapide

- Client (6/10) : identité juste, mais écran chargé : émojis dans les pastilles et les
  titres, grosse carte d'accueil avec trame de points et trois niveaux de texte, halo rose
  sous chaque « + », mention « à composer » en 11 px, prix pris dans un bandeau translucide
  sur la fiche produit.
- Suivi (6/10) : bon numéro dominant, mais libellé en capitales espacées, pulsation,
  encadrés colorés empilés.
- Cuisine (6/10) : bonnes fonctions (temps restant, consignes, annulation motivée), mais
  numéro à 24 px, articles à 15 px, options à 12 px : illisible à 2 m. En-tête chargé de
  six boutons de même poids. Téléphone du client affiché sur chaque ticket.
- Gérant (5/10) : bons gestes, mais trente cartes séparées, interrupteurs « OK / ✕ »,
  prix et TVA en 12 px, émojis de catégories.

## 3. Améliorations apportées

Communes : mêmes polices, mêmes jetons, mêmes rayons, même vocabulaire (cartes arrondies,
pastilles, photos produit, boutons roses). Grille de 4/8 px, marges de 20 px sur
téléphone, cibles de 44 px au moins, corps de 14 à 17 px, chiffres tabulaires, espaces
fines avant « : % » et insécables devant « € ». Émojis remplacés par du texte ou des
icônes Lucide de même trait. Aucun halo ni trame.

- **Carte client** : pastilles sans émojis ; carte d'accueil resserrée (logo, une phrase,
  bande partenaire séparée) ; cartes produit plus aérées, photo mieux cadrée, prix en
  19 px ; une seule action forte, la barre « Voir ma commande ».
- **Composer un menu** : prix dans le bouton d'ajout ; photo seule dans son puits ;
  options en deux lignes (garniture / composition) au lieu d'un libellé tiret ;
  pastille « Obligatoire » conservée.
- **Suivi** : numéro à 64 px, libellé en casse normale, étapes à icônes conservées,
  estimation de la cuisine et confirmation des alertes lisibles, reçu simplifié.
- **Cuisine** : quatre colonnes au lieu de trois ; état en pastille pleine en tête de
  ticket (Prête, En retard, En préparation, Nouvelle) ; numéro à 54 px, articles à 22 px,
  options à 17 px, attente à 26 px ; libellés « Votre boisson » ramenés à « Boisson » ;
  téléphone retiré ; indicateurs d'en-tête passés en texte discret, une seule commande
  (« Fermer la cuisine »).
- **Gérant** : produits regroupés par catégorie dans une carte à lignes ; interrupteur
  plus grand avec libellé « Disponible / En rupture » ; ligne en rupture teintée avec
  l'explication ; « Stock bas » et « Sauces et boissons » (panneau réel de la page) en
  colonne à droite.

## 4. Données d'exemple

Samedi 26 septembre 2026. Numéros du jour à partir de MM-101 (règle du code).

- Carte 13:24 : panier d'une Crêpe Nutella, 4,00 €.
- Composer 13:25 : Menu Paninis 8,90 € (Raclette choisi).
- Suivi 13:42 : MM-135, Sofia A., en préparation, prête dans environ 4 min (vers 13:46) ;
  Menu Paninis (Raclette, Oasis tropical, Sans sauce) 8,90 € + Crêpe Nutella 4,00 € =
  12,90 €, dont TVA 10 % 1,17 € (base 11,73 €), Apple Pay.
- Cuisine 13:42 : MM-133 prête (15,90 €), MM-134 en retard 17 min (18,80 €), MM-135
  (même commande que le suivi, palier 5 min), MM-136 nouvelle (12,00 €). Compteurs 1 / 2 /
  1 / 1.
- Gérant : 29 produits, Menu Pasta Box et Pasta Box en rupture, pomme d'amour à 4 (alerte
  à 5), Algérienne épuisée (aucune commande en cours ne la demande).
