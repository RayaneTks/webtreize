# WebTreize — Site du studio digital

Site vitrine d’un studio digital à Marseille, présentant ses services de création de sites, de visibilité locale et d’outils métier. Le site met en avant les réalisations du studio et propose un formulaire de contact.

## Fonctionnalités

- Pages de présentation du studio et de ses services.
- Galerie de réalisations et fiches de projet.
- Formulaire de contact avec validation des données.
- Pages légales, métadonnées de partage et sitemap.
- Animations tenant compte des préférences de réduction du mouvement.
- Configuration optionnelle de la mesure d’audience.

## Technologies

Next.js 16 · React 19 · TypeScript · Tailwind CSS · React Hook Form · Zod · Playwright.

L’envoi du formulaire utilise Resend via une route serveur.

## Installation

```bash
git clone https://github.com/RayaneTks/WebTreize.git
cd WebTreize
npm ci
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Configurer les coordonnées publiques, `RESEND_API_KEY` et `RESEND_FROM` depuis [`.env.example`](.env.example). La clé d’envoi reste côté serveur. La mesure d’audience est optionnelle et désactivée lorsque `NEXT_PUBLIC_ANALYTICS` est vide.

## Commandes

```bash
npm run lint      # Vérifier le code
npm run build     # Compiler le site
npm run start     # Démarrer la version compilée
npm run test:e2e  # Exécuter les parcours Playwright
```

Installer le navigateur nécessaire aux tests avec `npx playwright install chromium` si besoin.

## Organisation

| Chemin | Rôle |
|---|---|
| `app/` | Pages, routes API et métadonnées. |
| `components/` | Sections, formulaires et composants d’interface. |
| `lib/data/` | Contenus éditoriaux, réalisations et informations légales. |
| `design/` | Briefs et maquettes de projets. |
| `docs/` | Charte graphique et documentation visuelle. |
| `e2e/` | Tests de navigation et d’interface. |

## Documentation

- [Direction visuelle](DESIGN.md)
- [Charte graphique](docs/charte-graphique.md)
- [Principes d’imagerie](docs/imagerie.md)
