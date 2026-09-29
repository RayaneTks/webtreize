# Brief commun — écrans des réalisations WebTreize

WebTreize (studio web, Marseille) présente ses réalisations à des prospects
B2B (commerçants, artisans). Chaque écran montré doit donner envie : épuré,
moderne, agréable à utiliser, du niveau d’un produit soigné d’aujourd’hui.

## Règle n° 1 : rester dans la DA réelle du projet

**On n’invente pas une nouvelle identité.** On part de ce que le client a
réellement : son logo, ses couleurs, ses polices, ses photos, ses composants,
la structure de ses écrans. On garde tout cela reconnaissable au premier coup
d’œil — quelqu’un qui connaît le vrai site ou la vraie app doit dire « c’est
bien eux, en mieux ».

Ce qu’on fait : une **version améliorée** de l’existant.
- mêmes couleurs de marque, mêmes familles typographiques que le code du client
  (relevées dans son `globals.css` / `index.css` / `layout.tsx` / config
  Tailwind) ;
- même vocabulaire de composants (si l’app a des cartes arrondies, on garde des
  cartes arrondies ; si elle a des pastilles de statut, on garde des pastilles),
  mais plus propres, plus cohérents, mieux espacés ;
- même architecture d’écran (onglets, navigation, sections), clarifiée.

Ce qu’on améliore :
- **l’épure** : de l’air, moins d’éléments par écran, une grille régulière
  (multiples de 4 / 8 px), des alignements nets ;
- **la hiérarchie** : un élément dominant, un titre clair, une seule action
  principale visible par écran ;
- **l’ergonomie** : textes lisibles (corps 14–16 px au moins sur mobile),
  cibles tactiles de 44 px, contrastes suffisants, états clairs, libellés
  compréhensibles par un commerçant ;
- **la modernité** : rayons, ombres légères et surfaces cohérents, typographie
  bien réglée (interlignage, graisse, chiffres tabulaires pour les montants),
  icônes d’un même jeu et d’une même épaisseur, photos produit bien cadrées.

## Ce qu’on évite (« AI slop »)

- une identité inventée qui ne ressemble plus au client ;
- les dégradés et halos décoratifs, fonds « aurora », effets de verre gratuits ;
- les émojis en guise d’icônes ;
- les tableaux de bord remplis de chiffres décoratifs, graphiques sans échelle,
  cartes KPI empilées sans hiérarchie ;
- la surdensité : tableaux serrés, polices monospace partout, texte de 11 px ;
- les styles incohérents d’un écran à l’autre du même projet ;
- les textes de remplissage marketing (« ultra-premium », « fluide ») ;
- les fausses barres d’état maladroites : pour un téléphone, 47 px en haut dans
  la couleur de fond de l’écran, l’heure à gauche, les icônes à droite, sobres.

## Données

Données d’exemple réalistes et cohérentes entre elles (prénoms + initiale,
montants qui se recoupent, dates de fin septembre 2026), produits réels du
catalogue quand ils existent. Aucune fonctionnalité inventée. Aucun numéro de
téléphone, aucune adresse, aucun domaine du client à l’écran.

## Contraintes techniques

- Un fichier HTML autonome par écran, dans `design/maquettes/<projet>/`.
- Déclarer le format en tête : `<meta name="format" content="ordinateur">`
  (1440 × 900) ou `<meta name="format" content="telephone">` (390 × 844).
  `html, body` exactement à ces dimensions, `overflow: hidden`.
- L’écran remplit son format jusqu’aux bords (le site WebTreize dessine le
  contour). Éviter le sable `#EAE3D8` comme fond dominant.
- Images : uniquement les ressources réelles du client (logo, photos produit).
  Dépôts GitHub lisibles avec `gh api repos/RayaneTks/<depot>/contents/<chemin>
  -H "Accept: application/vnd.github.raw"`.
- Rendu : `node scripts/maquettes.mjs <projet>` depuis la racine du dépôt.
  Il écrit `public/images/realisations/<projet>/<écran>.jpg` et un aperçu
  `design/maquettes/<projet>/.apercu/<écran>.png` à relire avec l’outil Read.
- Ne jamais modifier les dépôts ni les sites des clients. Ne rien modifier en
  dehors de `design/maquettes/<projet>/` et de
  `public/images/realisations/<projet>/`.
