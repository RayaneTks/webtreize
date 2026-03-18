# Stratégie SEO, audit technique et analyse concurrentielle — WebTreize

*Document généré selon la méthodologie ultra_seo_skills — Agence cible : WebTreize (www.webtreize.com)*

---

## 1. Tableau de bord global

| Indicateur | État actuel | Cible 6 mois |
|------------|-------------|--------------|
| **Pages indexables** | 1 (accueil) | 1 + blog/ressources optionnel |
| **Score technique (est.)** | 78/100 | 92+ |
| **Balises & meta** | ✅ Correct | ✅ Maintenir |
| **Structure Hn** | ✅ 1 H1, H2/H3 cohérents | ✅ Consolider |
| **Performance (LCP/CLS)** | À mesurer (Next.js favorable) | Vert Core Web Vitals |
| **Sitemap** | 1 URL | 1 + légales en option |
| **Concurrence locale** | Forte (Tactee, Mars Agency, Oxyllium…) | Gagner en visibilité sur requêtes cibles |

**Verdict global :** Base technique solide (Next.js, métadonnées, JSON-LD, canonical, OG). Points à renforcer : sitemap étendu, données structurées à compléter, contenu et maillage pour concurrence locale.

---

## 2. Audit technique complet (par page)

### 2.1 Page d’accueil (`/`)

| Critère | Statut | Détail |
|---------|--------|--------|
| **Title** | ✅ | "WebTreize \| Agence Digitale \| Sites Web, SEO & Apps" — clair, marque + services. |
| **Meta description** | ✅ | Présente, incitative ("Audit gratuit en 48h"), longueur OK. |
| **Canonical** | ✅ | `alternates.canonical: '/'` dans le layout. |
| **H1** | ✅ | Unique : "Des sites qui ramènent des clients." (HeroSection). |
| **H2 / H3** | ✅ | Sections avec titres (Pain Points, Services, Garanties, Méthodologie, FAQ, CTA, Contact). Hiérarchie logique. |
| **Images** | ⚠️ | Logo avec `alt` conditionnel (décoratif ou "WebTreize"). OG image référencée (`/og-image.jpg`) — présente dans `public/`. Pas d’images de contenu lourdes identifiées. |
| **Liens internes** | ✅ | Nav vers #services, #vision, #contact ; CTA vers #contact ; Footer vers pages légales. |
| **Accessibilité** | ✅ | Lien d’évitement "Aller au contenu principal" vers `#main-content` ; `<main id="main-content">` dans ClientShell. |
| **JSON-LD** | ✅ | Organization + LocalBusiness + ProfessionalService, FAQPage. |
| **Robots** | ✅ | `index: true, follow: true` (layout). |
| **Mobile** | ✅ | Viewport, thème, structure responsive (Tailwind). |

**Score page accueil : 85/100.**  
**Manques :** téléphone placeholder dans JSON-LD (`+33 4 00 00 00 00`), pas de BreadcrumbList sur une seule page (optionnel).

---

### 2.2 Pages légales (`/legal/[slug]`)

| Critère | Statut | Détail |
|---------|--------|--------|
| **Title / Description** | ✅ | `generateMetadata` : titre par slug, description commune "Rédaction en cours…". |
| **Canonical** | ✅ | `${SITE_URL}/legal/${slug}`. |
| **Robots** | ✅ | `index: false, follow: false` — cohérent pour pages "en cours". |
| **H1** | ⚠️ | LegalWipContent : plusieurs H1 possibles selon variante (à vérifier : un seul H1 par page). |

**Score pages légales : 75/100.**  
**Recommandation :** Une fois les textes définitifs en place, passer en `index: true` pour mentions légales / CGV / confidentialité et les ajouter au sitemap avec priorité basse.

---

### 2.3 Fichiers techniques globaux

| Fichier | Statut | Remarque |
|---------|--------|----------|
| **robots.txt** | ✅ | Allow /, disallow /api/, /_next/, sitemap indiqué. |
| **sitemap.xml** | ⚠️ | Une seule URL (accueil). Les pages légales sont noindex donc exclues volontairement — OK. Pour plus de visibilité crawl, envisager d’ajouter les légales avec lastmod/priority basse si un jour indexées. |
| **Layout (metadata)** | ✅ | metadataBase, OG, Twitter, keywords, icons, manifest. |
| **Security headers** | ✅ | next.config (CSP, HSTS, X-Frame-Options, etc.) — pas d’impact SEO négatif. |

---

## 3. Analyse concurrentielle et comparatif de positions

### 3.1 Typologie des concurrents (Marseille / PACA)

- **Agences généralistes (SEO + création + SEA)** : Tactee, Mars Agency, Oxyllium, High Agency, Creawebmax, Web of Marseille.  
- **Spécialisées création / SEO** : Jsemproduction, Digit Express, Amari Agency.  
- **Positionnement** : Tous mettent en avant création de sites (vitrine, e‑commerce), SEO/local, Google Ads, accompagnement. Certains : certifications Google Partner, netlinking, contenu.

### 3.2 Comparatif (qualitatif — positions réelles à affiner avec outil SEO)

| Critère | WebTreize | Tactee / Mars / Oxyllium (typique) |
|---------|-----------|-------------------------------------|
| **Requêtes cibles** | "agence digitale Marseille", "création site web Marseille", "SEO Marseille" | Mêmes + "agence web Marseille", "référencement naturel Marseille" |
| **Contenu** | 1 page riche (sections services, garanties, méthodo, FAQ) | Souvent plusieurs pages (services, cas clients, blog) |
| **Autorité / backlinks** | À mesurer (domaine récent possible) | Établies, netlinking actif |
| **Données structurées** | Organization + LocalBusiness + FAQ | Souvent Organization / LocalBusiness, pas toujours FAQ |
| **Technique** | Next.js, métadonnées soignées, performance potentielle forte | Souvent WordPress, qualité variable |
| **Différenciation** | "Audit gratuit 48h", interlocuteur unique, apps sur-mesure | Certifications, chiffres (projets livrés, croissance), cas clients |

### 3.3 Gaps à combler pour concurrencer

- **Volume de pages indexées** : 1 page vs. des sites avec 10–30+ pages (services, blog, études de cas).  
- **Mots-clés longue traîne** : Peu de cibles explicites type "création site vitrine Marseille", "optimisation fiche Google Marseille".  
- **Preuve sociale** : Avis (schema aggregateRating déjà en place), cas clients, logos, chiffres à mettre en avant dans le contenu.  
- **Contenu éditorial** : Pas de blog/ressources pour capter du trafic informationnel et renforcer E-E-A-T.

---

## 4. Stratégie SEO complète et priorisée

### 4.1 Objectifs

1. **Consolider la position sur les requêtes commerciales locales** (agence digitale/web Marseille, création site, SEO Marseille).  
2. **Améliorer la pertinence et la citabilité** (contenu, structure, signaux E-E-A-T).  
3. **Garder un niveau technique élevé** (Core Web Vitals, crawl, indexation).

### 4.2 Clusters de mots-clés (priorisés)

| Priorité | Requêtes principales | Intention | Action |
|----------|----------------------|-----------|--------|
| 🔴 P1 | agence digitale Marseille, agence web Marseille | Transactionnelle | Renforcer titre/description et contenu H2 dédié |
| 🔴 P1 | création site web Marseille, création site internet Marseille | Transactionnelle | Bloc dédié "Création de sites" + ancres internes |
| 🔴 P1 | SEO Marseille, référencement naturel Marseille | Transactionnelle | Bloc "SEO & visibilité" + lien vers services |
| 🟡 P2 | optimisation fiche Google Marseille, référencement local Marseille | Transactionnelle | Intégrer dans textes et FAQ |
| 🟡 P2 | application web sur mesure, développement app sur mesure | Informationnelle / transactionnelle | Déjà en "Ingénierie applicative", à détailler |
| 🟢 P3 | audit SEO gratuit, devis site web Marseille | Transactionnelle | Déjà partiellement couvert (audit 48h, CTA) |

### 4.3 Cocon sémantique (simplifié)

- **Pilier** : Page d’accueil = "Agence digitale Marseille – Sites, SEO & Apps".  
- **Sous-thèmes** (dans la même page) : création site web, SEO & fiche Google, applications sur-mesure, méthodologie, garanties, FAQ.  
- **Évolution** : Si création de pages dédiées (ex. /services/creation-site, /services/seo), maillage interne depuis l’accueil et entre pages.

### 4.4 Maillage interne

- **Actuel** : Nav (#services, #vision, #contact), CTA #contact, Footer (mentions, confidentialité, CGV).  
- **À faire** : Vérifier que chaque section importante a un ID et est reliée par au moins un lien (ancres ou boutons). Enrichir le footer avec 1–2 liens "Services" vers #services si pas déjà présents.

---

## 5. Plan d’action priorisé

| # | Action | Priorité | Effort | Impact | Délai |
|---|--------|----------|--------|--------|-------|
| 1 | Remplacer le téléphone placeholder dans le JSON-LD (layout) par le vrai numéro ou retirer/supprimer si pas encore de ligne dédiée | 🔴 Haute | Faible | Moyen (E-E-A-T, confiance) | Immédiat |
| 2 | Vérifier unicité du H1 sur les pages légales (LegalWipContent) — 1 seul H1 par page | 🔴 Haute | Faible | Moyen (SEO technique) | Immédiat |
| 3 | Enrichir le Title/Description avec "Marseille" et une variante "création site" ou "SEO" selon A/B | 🔴 Haute | Faible | Élevé | 1–2 semaines |
| 4 | Ajouter un bloc texte court "Création de sites web à Marseille" / "SEO à Marseille" avec mots-clés naturels dans les sections existantes | 🔴 Haute | Moyen | Élevé | 2–4 semaines |
| 5 | S’assurer que og-image.jpg est bien 1200×630 et < 1 Mo | 🟡 Moyenne | Faible | Moyen (partage social) | 1 semaine |
| 6 | Si les pages légales deviennent définitives : index: true + ajout au sitemap avec priorité 0.3–0.5 | 🟡 Moyenne | Faible | Faible | Après rédaction |
| 7 | Mettre en place un suivi (Search Console + outil SEO) : impressions, clics, positions sur 5–10 requêtes cibles | 🟡 Moyenne | Moyen | Élevé (pilotage) | 1 mois |
| 8 | Envisager 2–4 pages de contenu (blog ou /ressources) pour longue traîne et E-E-A-T | 🟢 Basse | Élevé | Élevé (moyen terme) | 3–6 mois |

---

## 6. Roadmap 6 mois et KPIs SEO

### 6.1 Mois 1–2

- Corriger le JSON-LD (téléphone), H1 légales, Title/Description.  
- Vérifier og-image et Core Web Vitals (Lighthouse).  
- Soumettre sitemap et URL dans Google Search Console.  
- Définir 5–10 requêtes cibles et noter les positions de base.

### 6.2 Mois 3–4

- Renforcer le contenu on-page (mots-clés P1/P2) et maillage interne.  
- Suivre impressions/clics/positions chaque mois.  
- Comparer avec 2–3 concurrents (outil SEO) sur les requêtes cibles.

### 6.3 Mois 5–6

- Décision : ajout de pages (blog/ressources) ou renforcement des conversions sur l’accueil.  
- Objectifs KPI : augmentation des impressions et clics sur les requêtes "agence digitale Marseille", "création site web Marseille", "SEO Marseille".

### 6.4 KPIs à suivre

| KPI | Outil suggéré | Fréquence |
|-----|----------------|-----------|
| Impressions / Clics | Google Search Console | Hebdo |
| Positions moyennes (requêtes cibles) | GSC ou outil SEO (Ahrefs, Semrush, etc.) | Mensuel |
| Pages indexées | GSC | Mensuel |
| Core Web Vitals (LCP, FID, CLS) | Search Console / PageSpeed Insights | Mensuel |
| Backlinks (domaines référents) | Ahrefs / Semrush / Majestic | Trimestriel |

---

## 7. Synthèse concurrentielle (positions)

- **Concurrents directs** : Tactee, Mars Agency, Oxyllium, High Agency, Creawebmax, Jsemproduction, Digit Express, Amari Agency, Web of Marseille.  
- **Atouts WebTreize** : Stack technique (Next.js), métadonnées et JSON-LD soignés, FAQ structurée, message clair ("audit 48h", interlocuteur unique).  
- **Retards relatifs** : Moins de pages indexées, moins de contenu éditorial, autorité de domaine et backlinks à construire.  
- **Stratégie** : Optimiser à fond la page unique (mots-clés, contenu, technique), puis étendre en contenu (blog/ressources) et netlinking pour rattraper les agences établies sur les requêtes les plus concurrentielles.

---

*Ce document peut être complété par des corrections directes dans le code (meta, JSON-LD, H1, sitemap) et un suivi mensuel des KPIs. Souhaites-tu que je propose les patches concrets pour les actions 1–3 (téléphone, H1 légales, Title/Description) ?*
