# Nuréa Parfums — écrans de l’étude de cas

Les écrans de l’étude de cas sont des **captures du site réel** (dépôt
`RayaneTks/nurea-parfums`, état du 26/10/2026), lancé en local :

- la **vitrine** avec son instantané de démonstration
  (`src/lib/catalog/demo-catalogue.json`), réduit à huit parfums dont les
  visuels sont disponibles ;
- la **gestion** avec la base de test de ses parcours de bout en bout
  (`e2e/fixtures/seed.ts`) : clients, ventes et lots **fictifs**. Aucun chiffre
  de la parfumerie n’en sort.

> Historique : les écrans du 30/09/2026 étaient des versions de présentation
> redessinées dans l’ancienne charte (noir et cuivre, angles droits). La vitrine
> a été entièrement refaite le 22/10/2026 : les captures réelles la montrent
> désormais telle qu’elle est.

## 1. DA

- **Vitrine** : clair et sombre, Fraunces pour les titres, Figtree pour le
  texte, marque en doré sur sombre et bordeaux sur clair, couleur d’ambiance
  tirée de chaque flacon. Barre haute avec recherche, « Ma sélection » (cœur)
  et bascule de thème ; fiche en feuille par-dessus le catalogue.
- **Gestion** : registre d’application iOS, fond gris système, cartes blanches,
  bordeaux `#7B0B1D` pour l’action principale ; barre d’onglets Accueil ·
  Commandes · Vendre · Clients · Catalogue. Pensée pour le téléphone : sur
  ordinateur elle garde sa colonne, d’où des captures au format téléphone
  seulement.

## 2. Captures

| Fichier | Format | Contenu |
|---|---|---|
| `boutique-accueil.html` | ordinateur | Accueil sombre : titre, « Voir le catalogue », Snapchat, photo du flacon Nuréa. |
| `boutique-fiche.html` | ordinateur | Fiche « Contre Moi » ouverte par-dessus l’accueil. |
| `boutique-fiche-mobile.html` | téléphone | Fiche « Tobacco Vanille », parfums voisins, bouton Snapchat. |
| `gestion-accueil.html` | téléphone | Accueil de la gestion : à faire, la journée. |
| `gestion-caisse.html` | téléphone | Vendre : vente ou commande, stock, parfums vendus récemment. |
| `gestion-lot.html` | téléphone | Un lot d’achat : encaissé, marge nette, frais, ventes rattachées. |
| `couverture.html` | couverture | Accueil de la vitrine et lot d’achat, sur fond bordeaux. |

Ordinateur 1440 × 900 rendu ×2, téléphone 390 × 844 rendu ×3, vitrine en thème
sombre. Le carnet fournisseur n’est pas montré : il porte des montants et des
habitudes d’achat propres à la parfumerie.

## 3. Refaire les captures

1. Vitrine : `npm ci`, `npx next dev` **sans aucun fichier `.env`** (ceux du
   poste de Rayane pointent sur la production) ; la vitrine sert alors
   l’instantané de démonstration. Les visuels des parfums sont hébergés chez
   Supabase : s’ils ne répondent pas, pointer les fiches de l’instantané
   (copie locale, jamais poussée) vers des visuels posés dans `public/`.
2. Gestion : PostgreSQL local sur le port 54329 (`nurea` / `nurea`), puis un
   spec Playwright local dans `e2e/captures/` lancé comme les autres captures
   (`NUREA_CAPTURES=1 npx playwright test captures/<spec> --project=Desktop`) :
   la préparation recrée la base de test, la remplit et se connecte.
3. Écrire les captures en JPEG dans `assets/`, puis
   `node scripts/maquettes.mjs nurea-parfums`.
