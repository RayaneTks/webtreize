# Conciergerie Nuréa — audit, DA réelle et améliorations

Écrans de présentation pour le portfolio WebTreize : des **versions améliorées
du vrai site**, pas une nouvelle identité. Sources : la préversion Vercel
(captures 1440 × 900 et 390 × 844 du 30 septembre 2026) et le code du dépôt
`nureaconciergerie` (`globals.css`, `layout.tsx`, composants).

---

## 1. DA réelle relevée

**Polices** (`layout.tsx`) : Geist Sans pour tout, Geist Mono pour les
étiquettes et numéros. Titres en graisse 600, approche −0,025 à −0,035 em,
interligne 1,0–1,05. Corps 16 px, interligne 1,6.

**Couleurs** (`globals.css`)

| Jeton | Hex | Usage relevé |
|---|---|---|
| white | `#FFFFFF` | Fond des sections claires |
| cloud | `#FBFCFD` | Survol, fonds de champs |
| mist | `#F1F7FA` | Fond de la section « Fonctionnement » |
| azur-wash | `#E3F0F6` | Encadré des options, fonds d’icônes |
| ink | `#11313E` | Texte, voile de la photo d’ouverture |
| ink-soft | `#587685` | Texte secondaire |
| azur | `#1E92B8` | Bouton « Nous écrire », accents, numéros |
| azur-deep | `#0C617C` | Fond du simulateur |
| sky | `#7BC4DD` | Texte d’accent sur fond sombre |
| line | `#E4EBEF` | Filets |

**Composants** : bouton pilule (`rounded-full`) azur ou blanc translucide ;
champs `rounded-xl` ; encadré d’options `rounded-2xl` ; cartes d’étapes
`rounded-3xl` à ombre douce teintée d’encre ; icônes Phosphor en trait
régulier dans des carrés arrondis azur-wash ; photo plein cadre sous double
voile encre ; logo vague + point dans un carré arrondi, « Nuréa » et
« CONCIERGERIE » en petites capitales espacées.

**Structure** : en-tête fixe (transparent sur la photo, blanc au défilement) ·
ouverture plein cadre avec titre, sous-titre bleu ciel et bandeau de trois
conditions · « Ce que nous gérons, vraiment. » (cinq lignes + options) ·
« Fonctionnement » (trois cartes) · associés et quartiers · simulateur sur
bleu profond · questions · appel final · pied de page · barre fixe mobile
« Appeler / WhatsApp ».

---

## 2. Audit du site réel

| Section | Note | Ce qui freine |
|---|---|---|
| En-tête | 6/10 | Numéro provisoire affiché, pas de navigation vers les sections. |
| Ouverture | 5/10 | Villa avec piscine de banque d’images (pas Marseille, contredit « votre appartement »), crédit incrusté ; titre bridé à 20 caractères, cassé en cinq lignes ; deux liens texte sans action principale ; étiquettes mono en capitales espacées de 10 px. |
| Missions | 7/10 | Solide ; numéros mono minuscules, titre isolé sur une moitié de page. |
| Fonctionnement | 6/10 | Cartes propres, mais tout centré et pictogrammes décoratifs. |
| Associés | 6/10 | Bon texte ; photo à crédit incrusté ; quartiers en bandeau défilant. |
| Simulateur | 5/10 | Libellés et bornes à 10 px en bleu ciel à 30–60 % d’opacité, illisibles ; « nuits louées » alors que 75 % d’occupation sont encore déduits ; « ce que vous touchez réellement » promet trop ; calcul invisible ; formulaire qui flotte dans le vide. |
| Questions | 7/10 | Propre. |
| Appel final | 5/10 | Bloc en dégradé, tout centré. |
| E-mail reçu | 4/10 | Police système, lignes zébrées aux coins cassés, aucune marque, montant sans hiérarchie. |

---

## 3. Améliorations apportées

Tout reste dans la DA ci-dessus : Geist, mêmes jetons de couleur, mêmes
rayons, pilules, icônes Phosphor, photo plein cadre, simulateur sur
`#0C617C`, même ordre des sections.

**Fond**
- Aucun numéro de téléphone, aucune adresse, aucun domaine. « Appeler » reste un bouton sans numéro.
- La villa est remplacée par une vraie photo des calanques depuis la mer, recadrée pour ôter le crédit incrusté, le reflet d’objectif et le bastingage.
- Simulateur honnête : « Nuits disponibles à la location, par mois » (cohérent avec l’occupation de 75 % appliquée par le code) et le calcul affiché ligne à ligne. Contrôle : 130 € × 24 = 3 120 € ; × 0,75 = 2 340 € ; − 25 % = − 585 € ; net 1 755 €, soit `Math.round(130 × 24 × 0,75 × 0,75)`.
- Données d’exemple cohérentes entre le simulateur et l’e-mail (Hélène M., 130 €, 24 nuits, 1 755 €).

**Forme**
- Une action principale par écran : « Simuler mes revenus » (bouton pilule blanc) sur l’ouverture, « Recevoir mon étude gratuite » dans le simulateur, WhatsApp dans la barre mobile, « Répondre à Hélène » dans l’e-mail.
- Titre d’ouverture en deux lignes pleines au lieu de cinq ; phrase d’accroche courte ajoutée à partir du périmètre réel.
- Navigation par ancres vers les sections existantes.
- Étiquettes en Geist Sans 14–15 px en casse normale au lieu des capitales mono espacées de 10 px ; Geist Mono n’est plus nécessaire à l’écran. Seul le logo garde ses petites capitales.
- Bandeau des conditions : même principe, sans flou, avec une icône Phosphor par condition.
- Simulateur : curseurs à rail de 4 px et poignée de 24 px, bornes lisibles ; résultat et demande réunis dans une carte blanche `rounded-3xl` à l’ombre douce du site.
- Missions : icônes Phosphor dans des carrés azur-wash, colonnes plus équilibrées ; options en pastilles blanches dans l’encadré azur-wash.
- Mobile : cibles de 44 px au moins, conditions en liste à trois lignes, barre « Appeler / WhatsApp » conservée.
- E-mail : même contenu que le gabarit de `route.ts`, en Geist, filets au lieu du zébrage, total mis en valeur sur azur-wash avec sa ligne de calcul.

---

## 4. Écrans

| Fichier | Format | Contenu |
|---|---|---|
| `accueil.html` | ordinateur | Ouverture plein cadre, action principale, bandeau des conditions. |
| `simulateur.html` | ordinateur | Curseurs, revenu net avec son calcul, demande d’étude. |
| `services.html` | ordinateur | Cinq missions et options sur devis. |
| `accueil-mobile.html` | téléphone | Ouverture, conditions, barre Appeler / WhatsApp. |
| `demande-recue.html` | téléphone | L’e-mail du simulateur reçu par la conciergerie. |
