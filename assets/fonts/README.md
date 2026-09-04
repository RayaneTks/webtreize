# Fichiers de police embarqués

Ces `.ttf` ne sont **pas** servis au navigateur : le site charge les mêmes familles via
`next/font/google` (`app/layout.tsx`). Ils existent uniquement pour la génération des images
OpenGraph côté serveur (`next/og` / satori), qui a besoin de TTF et ne sait pas lire les WOFF2
produits par `next/font`.

| Fichier | Famille | Usage |
| --- | --- | --- |
| `PlusJakartaSans-ExtraBold.ttf` | Plus Jakarta Sans 800 | titres des images OG |
| `PlusJakartaSans-Regular.ttf` | Plus Jakarta Sans 400 | textes des images OG |
| `Newsreader-Light.ttf` | Newsreader 300 | citations et grands chiffres |
| `Newsreader-LightItalic.ttf` | Newsreader 300 italique | mot mis en valeur |

Licence : SIL Open Font License 1.1 pour les deux familles — redistribution et intégration
autorisées. Sources : <https://fonts.google.com/specimen/Plus+Jakarta+Sans> et
<https://fonts.google.com/specimen/Newsreader>.
