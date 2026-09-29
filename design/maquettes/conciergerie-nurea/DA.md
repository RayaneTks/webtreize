# Conciergerie Nuréa — audit et direction artistique

Écrans de présentation pour le portfolio WebTreize. Site audité : la préversion
Vercel (capture du 30 septembre 2026) et le code du dépôt `nureaconciergerie`.

---

## 1. Audit du site réel

Ce qu’il faut garder : le contenu est honnête et précis (25 % sur l’encaissé,
aucun engagement, cautions Swikly, cinq missions nommées, options sur devis,
dix quartiers cités) ; la section « missions » est déjà construite en lignes et
pas en cartes ; le simulateur calcule juste et envoie ses chiffres à la
conciergerie. Ce qui déclasse le site, c’est l’enveloppe : on reconnaît le
gabarit de conciergerie Airbnb avant de reconnaître Nuréa.

| Section | Note | Constat |
|---|---|---|
| En-tête | 5/10 | Marque lisible, mais « CONCIERGERIE » interlettré à .32em, bouton pilule translucide sur la photo, et **le numéro provisoire affiché en clair**. Pas de navigation vers les sections. |
| Ouverture | 4/10 | Le poncif du secteur : photo plein cadre + double voile en dégradé + titre géant. La photo est une **villa avec piscine à débordement**, pas Marseille, qui contredit « votre appartement ». Le titre, bridé à 20 caractères, casse en cinq lignes d’un mot. Coordonnées décimales en capitales espacées. Bandeau de conditions en verre dépoli. Le bon contenu (commission, engagement, cautions) est là, mais relégué en bas. |
| Missions | 7/10 | La meilleure section : cinq lignes numérotées, sobres. À reprendre : numéros minuscules en mono, titre isolé à gauche avec une moitié de page vide, encadré d’options arrondi sur aplat bleu pâle. |
| Déroulé | 4/10 | Titre centré, trois cartes blanches à coins très arrondis, pictogramme dans un carré arrondi, numéro, soulèvement au survol : le motif le plus générique du web. |
| Associés | 5/10 | Texte juste (« deux associés, pas de centre d’appel »). Mais la photo montre vraisemblablement Port-Miou, à Cassis, en cadre arrondi à ombre portée ; puces à pictogrammes dans des ronds ; les quartiers défilent en bandeau animé, alors qu’ils sont une vraie information. |
| Simulateur | 6/10 | Bonne structure (aplat bleu, gros montant). Mais : libellés à 0,6 rem en bleu ciel à 30 % d’opacité, illisibles ; le curseur s’appelle « nuits louées » alors que le code applique encore 75 % d’occupation, ce qui fait **deux réductions** pour une ; « le montant affiché est ce que vous touchez réellement » promet trop ; le calcul n’est jamais montré. |
| Questions | 7/10 | Accordéon propre, questions réelles. RAS, hormis l’interlettrage des numéros. |
| Appel final | 3/10 | Bloc en dégradé azur, coins de 2 rem, tout centré, « Prêt à déléguer ? ». |
| Pied de page | 6/10 | Clair, mais numéro provisoire et adresse e-mail en clair. |
| E-mail reçu | 4/10 | Police système, lignes zébrées avec coins arrondis sur une seule cellule (rendu cassé), aucune marque, « Email » sans trait d’union, montant en azur sans hiérarchie. |

**Transverses.** Photographies : les quatre sont des photos libres de banque
d’images avec le **crédit du photographe incrusté** en bas à gauche
(« ccnull.de Bilddatenbank », « sergei.gussev », « topten5 », « ChodHound ») ; le
salon (`interieur.jpg`) est un intérieur nordique générique. Typographie : Geist
et Geist Mono, la pile par défaut de Vercel, sans choix argumenté ; étiquettes
mono en capitales interlettrées à .16–.18em partout.

**Corrections appliquées dans les écrans de présentation**
- Aucun numéro, aucune adresse, aucun domaine. « Appeler » reste un bouton, sans numéro.
- Villa et salon retirés ; seule la photo des calanques depuis la mer est gardée, recadrée pour ôter le crédit, le reflet d’objectif et le bastingage.
- Titre composé en trois lignes pleines ; conditions remontées en fiche lisible.
- Navigation par ancres vers les sections existantes (Missions, Déroulé, Simulateur, Questions).
- Simulateur : curseur renommé « Nuits ouvertes à la location, par mois » pour que l’occupation de 75 % ait un sens ; calcul affiché ligne à ligne ; promesse ramenée à « estimation ».
- Déroulé en frise, missions en registre, options en liste.
- E-mail : même contenu que le gabarit de `route.ts`, mis en page au gabarit Nuréa, avec la ligne de calcul.

**Contrôle du calcul** (formule de `RevenueCalculator.tsx` :
`Math.round(prix × nuits × 0,75 × (1 − 0,25))`) : 130 € × 24 nuits = 3 120 € ;
× 75 % = 2 340 € ; − 25 % = − 585 € ; net = 1 755 € (`Math.round(1755) = 1755`).
Les montants intermédiaires sont entiers : aucun arrondi ne fausse le relevé.

---

## 2. Direction artistique

**Concept.** *Le registre de la capitainerie* : Nuréa tient votre bien comme un
port tient son registre, conditions affichées, chiffres posés ligne à ligne,
rien d’enjolivé.

**Références réelles**
- Les avis aux navigateurs et tableaux d’affichage de la capitainerie du Vieux-Port : texte sec, filets, numérotation.
- La bordure graduée des cartes marines du SHOM (échelle des latitudes en segments alternés noir et blanc), qui devient la signature graphique.
- Les numéros de poste peints sur les quais et les coques : chiffres larges, sans fioriture.
- L’annuaire des marées et le livre de bord de plaisance : colonnes d’heures et de chiffres en police de machine.
- Le relevé mensuel de gestion locative : le propriétaire lit un calcul, pas un slogan.
- La papeterie des hôtels de bord de mer (fiche de chambre, en-tête sobre, un seul filet de couleur) pour l’e-mail.

**Palette** (partie de l’azur réel du site, `#1E92B8`)

| Nom | Hex | Rôle |
|---|---|---|
| Calcaire | `#F2F4F3` | Fond de page. Le blanc froid des calanques, pas de crème. |
| Blanc | `#FFFFFF` | Champs, feuille de l’e-mail, barre du téléphone. |
| Encre de port | `#0F2A35` | Texte, filets forts, bouton principal, échelle graduée. |
| Encre douce | `#4E6B77` | Texte secondaire, étiquettes (contraste 5,2:1 sur calcaire). |
| Filet | `#CDD6D9` | Filets de registre et séparateurs. |
| Azur Nuréa | `#1E92B8` | Signal unique : la seconde ligne du titre, les numéros de mission, le rail rempli des jauges, l’onglet actif. Jamais en petit texte. |
| Azur texte | `#136F92` | Liens en petit corps (e-mail). |
| Bleu capitainerie | `#0B4A61` | Seul aplat : le relevé du simulateur, le déroulé, le total de l’e-mail. |
| Ciel | `#A9D6E6` | Texte secondaire sur bleu capitainerie (6,2:1). |

Pas de dégradé, pas d’ombre, pas de verre dépoli. Photos désaturées à 88 %.

**Typographie** (Google Fonts, deux familles)
- **Archivo**, variable en graisse et en chasse (62–125). Grotesque d’origine XIXe, dont les chasses larges rappellent le lettrage des coques et de la signalétique portuaire. Titres en chasse 104–110 %, graisse 600–620, approche −0,02 à −0,03 em ; texte courant en chasse 100 %, graisse 400.
- **IBM Plex Mono** pour les métadonnées : étiquettes, coordonnées, graduations, ligne de calcul. En bas de casse, interlettrage .01em, jamais en capitales espacées.
- Échelle ordinateur : 74 / 52 / 48 / 30 / 20 / 18 / 17 / 15 / 12,5 px. Téléphone : 32 / 22 / 16 / 15 / 11,5 px.
- Chiffres tabulaires dans les colonnes et tableaux, proportionnels pour le grand montant. Espaces fines insécables (U+202F) avant « : » et « % » et entre milliers, insécable (U+00A0) avant « € ».

**Grille**
- Ordinateur 1440 : 12 colonnes, marges 64, gouttières 24, en-tête 76. Texte sur 7 colonnes, image ou registre sur 5 à 8.
- Téléphone 390 : marges 24, zone d’état de 47 px dans la couleur de fond, en-tête 56, barre d’action de 76.

**Composants**
- *Échelle graduée* : bande de 6–7 px en segments encre et calcaire, cadre d’un pixel. Une par écran, au plus. Elle ouvre la fiche de conditions et la feuille de l’e-mail.
- *Fiche* : étiquette mono, valeur en Archivo 600, précision en encre douce ; colonnes séparées par un filet vertical, sans cadre.
- *Registre* : filet encre de 2 px en tête, lignes numérotées (numéro Archivo chasse 118 % en azur), titre, description.
- *Jauge* : rail de 2 px, graduations mineures au pas du curseur, majeures chiffrées en mono, curseur rond blanc cerclé d’encre.
- *Relevé* : lignes libellé à gauche, montant tabulaire à droite, filet entre chaque ligne, total isolé en très grand.
- *Boutons* : rectangles à 3 px de rayon. Principal encre sur calcaire, blanc sur capitainerie ; secondaire en lien souligné d’un filet d’un pixel.

**Ton.** Vouvoiement, phrases courtes, faits vérifiables (taux, délais, noms de
quartiers). On écrit « estimation », pas « ce que vous touchez réellement ».
Aucun superlatif.

**À faire**
- Montrer le calcul avant le résultat.
- Afficher les conditions dès l’ouverture, au même niveau que la promesse.
- N’employer que des photos de Marseille, sans crédit incrusté ; à terme, des photos des logements gérés.
- Un seul aplat bleu par écran, un seul signal azur par bloc.

**À ne pas faire**
- Photo plein cadre sous voile dégradé, villa, piscine, salon de banque d’images.
- Cartes arrondies à pictogramme, pilules, dégradés, bandeaux défilants.
- Capitales interlettrées, mono décorative.
- Un grand montant sans sa ligne de calcul.
- Un numéro de téléphone, un domaine ou une adresse sur un écran de présentation.

---

## 3. Écrans

| Fichier | Format | Contenu |
|---|---|---|
| `accueil.html` | ordinateur | Titre, calanques depuis la mer, fiche des conditions sous l’échelle graduée. |
| `simulateur.html` | ordinateur | Jauges tarif et nuits, relevé estimatif, demande d’étude. |
| `services.html` | ordinateur | Registre des cinq missions, options sur devis, déroulé en trois étapes. |
| `accueil-mobile.html` | téléphone | Ouverture, fiche des conditions, barre Appeler / WhatsApp. |
| `demande-recue.html` | téléphone | L’e-mail du simulateur tel que la conciergerie le reçoit. |

Données d’exemple : Hélène M., 130 € la nuit, 24 nuits ouvertes, 1 755 € nets
estimés par mois, identiques dans le simulateur et l’e-mail.
