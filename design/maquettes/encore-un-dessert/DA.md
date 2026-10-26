# Encore 1 Dessert — écrans de l’étude de cas

Les écrans de l’étude de cas sont des **captures de l’application réelle**
(dépôt `RayaneTks/encore-un-dessert`, état du 24/10/2026), lancée en local avec
des **données d’exemple fictives** : aucun chiffre, client ou recette de la
pâtisserie n’en sort.

> Historique : les écrans du 30/09/2026 étaient des versions de présentation
> redessinées. L’application a été refaite le 04/10/2026 (navigation en cinq
> onglets avec la caisse au centre, atelier, liste de courses, vocabulaire
> simplifié) : les captures réelles la montrent désormais telle qu’elle est.

## 1. DA de l’application

- Fond crème `#FDF8F2`, texte et boutons chocolat `#241309`, accent caramel
  `#C05621`, bénéfices en vert ; Inter ; icônes Lucide ; émojis pour les
  desserts et les ingrédients.
- Navigation : Commandes · Atelier · **Caisse** (au centre, en relief) ·
  Ventes · Réglages. L’atelier regroupe Desserts, Préparations et Ingrédients ;
  les commandes ont trois vues : Commandes, Cuisine, Courses.

## 2. Captures

Téléphone 390 × 844, rendu ×3, mode application installée (sans barre de
navigateur). Date figée : jeudi 22 octobre 2026, 7 h 42.

| Fichier | Contenu |
|---|---|
| `caisse.html` | La caisse, trois articles touchés : total, bénéfice, « Encaisser ». |
| `commandes.html` | Les commandes rangées par échéance, avec leur avancement en cuisine. |
| `cuisine.html` | La production regroupée par dessert : 8 faits sur 25. |
| `courses.html` | La liste de courses calculée depuis les commandes, par rayon. |
| `fiche-dessert.html` | La tarte cacahuète caramel dépliée : coût de revient, bénéfices, composition. |
| `ventes.html` | Les 30 derniers jours : argent encaissé, bénéfice, desserts les plus rentables. |
| `couverture.html` | Cuisine, fiche et ventes sur fond caramel. |

Chaque fichier HTML affiche la capture correspondante de `assets/`.

## 3. Refaire les captures

1. Cloner le dépôt de l’application, `npm install`, puis `npx vite`.
2. Ouvrir la page avec Playwright à 390 × 844, `navigator.standalone = true`,
   et répondre aux appels `POST /api/db` par une base en mémoire remplie de
   données fictives (ingrédients, préparations, sept desserts, six commandes,
   une cinquantaine de ventes sur trente jours).
3. Capturer chaque écran, l’écrire en JPEG dans `assets/`, puis
   `node scripts/maquettes.mjs encore-un-dessert`.

Rien n’est jamais écrit dans la base de la cliente.
