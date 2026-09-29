# Brief commun — écrans des réalisations WebTreize

WebTreize (studio web, Marseille) présente ses réalisations à des prospects
B2B (commerçants, artisans). Cette section fait basculer un visiteur hésitant :
chaque écran montré doit avoir le niveau d’un studio de design sérieux. Un
écran moyen fait plus de dégâts que pas d’écran du tout.

Les liens vers les sites en ligne ne sont PAS affichés. Les écrans présentés
sont donc des **versions de présentation** : on peut corriger, épurer et
élever le design d’un écran réel pour l’afficher, à condition de rester
fidèle à ce que le produit fait réellement (aucune fonctionnalité inventée).
Les données (clients, chiffres, commandes) sont des données d’exemple
réalistes, cohérentes entre elles et avec le métier.

## Ce qu’on refuse : l’« AI slop »

Ce qui rend un écran générique, interchangeable, « fait par une IA » :

- la grille de cartes à coins arrondis identiques, chacune avec une petite
  étiquette en majuscules espacées + un gros chiffre + une ligne grise ;
- l’interlettrage large en majuscules partout (`letter-spacing: .16em`) ;
- le couple « crème + serif élégante + brun » par défaut pour tout ce qui est
  artisanal, le « quiet luxury » plaqué ;
- Inter / Plus Jakarta partout, sans choix typographique argumenté ;
- les pastilles (« chips ») de statut colorées en série, vert/orange/rouge
  pâles ;
- les dégradés radiaux, halos lumineux, glows, fonds « aurora » ;
- les émojis, les icônes génériques en trait fin posées pour décorer ;
- les graphiques en barres décoratifs sans axe ni échelle lisible ;
- tout centré, tout espacé pareil, aucune hiérarchie franche ;
- les textes de remplissage marketing (« ultra-premium », « fluide », « sans
  effort ») ;
- les fausses barres d’état et encoches qui imitent maladroitement un
  téléphone (le cadre du téléphone est ajouté par le site WebTreize : l’écran
  commence sous la barre d’état, mais laisse 47 px en haut pour elle, dans la
  couleur de fond de l’écran, avec l’heure à gauche et les icônes à droite
  dessinées sobrement — ou rien).

## Ce qu’on veut

- **Une direction artistique propre à chaque projet**, dérivée de son métier
  et de son identité réelle (logo, couleurs, photos, ton), avec des
  références concrètes du monde réel (maisons, enseignes, imprimés,
  signalétique, outils professionnels du secteur). Écrire cette DA avant de
  dessiner, puis s’y tenir sur tous les écrans du projet.
- **Une typographie choisie** (Google Fonts, chargées dans le HTML), avec un
  système : 2 familles maximum, échelle définie, chiffres tabulaires pour les
  montants, césures et espaces fines françaises (U+202F avant : ; ! ? et
  entre chiffres et unités, U+00A0 devant €).
- **Une hiérarchie franche** : un élément dominant par écran, de vrais
  contrastes d’échelle, des alignements sur une grille, de l’air qui a un sens.
- **Des interfaces crédibles** : les outils de gestion doivent avoir la
  densité et la précision d’un vrai logiciel pro (pensez à la rigueur de
  Stripe, Linear, Shopify POS, Square, Toast, un logiciel de caisse ou de
  cuisine réel) — pas une maquette Dribbble.
- **Des données d’exemple crédibles** : prénoms + initiale, montants qui se
  recoupent, dates et heures cohérentes (fin septembre 2026), produits réels
  du catalogue quand ils existent.

## Contraintes techniques

- Un fichier HTML autonome par écran, dans `design/maquettes/<projet>/`.
- Déclarer le format en tête : `<meta name="format" content="ordinateur">`
  (1440 × 900) ou `<meta name="format" content="telephone">` (390 × 844).
  `html, body` exactement à ces dimensions, `overflow: hidden`.
- Images : uniquement les ressources réelles du client (logo, photos produit),
  copiées dans `design/maquettes/<projet>/assets/`. Les dépôts GitHub sont
  lisibles avec `gh api repos/RayaneTks/<depot>/contents/<chemin> -H "Accept:
  application/vnd.github.raw"`. Aucune photo générée, aucune image d’illustration
  inventée.
- Rendu : `node scripts/maquettes.mjs <projet>` depuis la racine du dépôt.
  Il écrit `public/images/realisations/<projet>/<écran>.jpg` et un aperçu
  `design/maquettes/<projet>/.apercu/<écran>.png` à relire avec l’outil Read.
- Ne jamais modifier les dépôts ni les sites des clients. Ne rien modifier en
  dehors de `design/maquettes/<projet>/` et de
  `public/images/realisations/<projet>/`.
