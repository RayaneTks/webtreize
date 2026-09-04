# WebTreize — Charte graphique & guide de génération d'images

> Transcription fidèle de `charte-graphique-webtreize.pdf` (2026), pour usage par les agents et les développeurs.
> Source de vérité pour toute décision visuelle. En cas de conflit avec le code, **la charte gagne**.

## 1 · Essence de marque

**Un studio d'artisan, pas une agence de communication.**

WebTreize s'adresse aux commerçants et artisans de Marseille. L'image de marque doit inspirer le
calme et la confiance, jamais la performance technologique. Trois mots gouvernent chaque visuel :
**chaleureux**, **épuré**, **solide**.

| On veut évoquer | On veut éviter |
| --- | --- |
| La lumière du matin sur un plan de travail. Le papier épais. Un atelier rangé. Une poignée de main. | Le néon, le circuit imprimé, la ville futuriste, le graphique qui monte, la poignée de main en costume. |

## 2 · Palette

Cinq valeurs, une seule couleur vive. **La terre cuite n'apparaît que trois fois par visuel au
maximum** — un titre accentué, un bouton, le point du logo. Quatrième apparition = on en retire une.

| Nom | Hex | À écrire dans un prompt | Rôle |
| --- | --- | --- | --- |
| Ivoire | `#F6F3EE` | `warm ivory` | Fond dominant |
| Blanc chaud | `#FFFDFA` | `warm off-white` | Encarts, respiration |
| Sable | `#EAE3D8` | `soft sand beige` | Aplats, blocs image |
| Terre cuite | `#C4552B` | `burnt terracotta orange` | Accent unique |
| Encre | `#17130F` | `deep warm brown-black` | Texte, fond sombre |

> Les hex seuls sont mal respectés par les modèles. Écrivez toujours le nom anglais **et** le code :
> « warm ivory background (#F6F3EE) ».

## 3 · Typographie

- **Plus Jakarta Sans** — titres en `800`, interlettrage très resserré (`-0.05em`). Texte courant en
  `400`. Étiquettes en `600` majuscules, interlettrage `0.1em`.
- **Newsreader** — poids `300`, réservé aux citations et aux grands chiffres. Italique pour le mot mis
  en valeur. **Jamais dans un paragraphe.**

> Aucun modèle d'image n'écrit correctement un texte long. **Générez l'image sans texte**, puis
> ajoutez les mots dans Canva/Figma avec les vraies polices. Les deux familles sont gratuites sur
> Google Fonts.

## 4 · Logotype

- Toujours en minuscules : `webtreize.` Le point terre cuite est l'élément de marque : il ferme le mot
  comme on termine une phrase.
- Monogramme `13` en carré arrondi : avatar réseaux et favicon.
- **Ne demandez jamais le logo à un modèle d'image.** Générez le fond, puis incrustez le fichier logo
  par-dessus. Zone de respiration minimale autour du logo : la hauteur du mot.
- **Interdits :** ombre, contour, dégradé, rotation, majuscules, italique, changement de couleur du point.

## 5 · Style photographique

C'est le poste le plus important : une bonne photo fait plus pour l'image de marque que n'importe quel
effet graphique.

| | |
| --- | --- |
| **Lumière** | Naturelle, chaude, de côté. Fin de matinée ou fin d'après-midi. Ombres douces et longues. Jamais de flash, jamais de lumière bleue. |
| **Sujets** | Mains au travail, outils, comptoirs, devantures, matières brutes. Un vrai lieu de Marseille. Les visages entiers sont rares et jamais souriants à la caméra. |
| **Cadrage** | Beaucoup de vide autour du sujet, décentré. Faible profondeur de champ. Focale 35 ou 50 mm, hauteur d'œil. |
| **Matières** | Bois clair, lin, papier épais, plâtre, céramique, laiton mat. Rien de brillant, rien de chromé. |
| **Traitement** | Grain argentique léger, contraste doux, hautes lumières crémeuses. Aucun filtre saturé, aucun virage bleu-orange. |
| **Composition** | Filets fins plutôt que cadres. Grandes marges. Une seule idée par visuel. Si c'est serré, on retire du contenu, pas de l'espace. |

## 6 · Prompt de base

### STYLE DE BASE — à copier en tête de chaque demande

```
Editorial photography in a warm minimalist style. Natural side light, late morning, soft
long shadows. Warm ivory and sand beige palette (#F6F3EE, #EAE3D8), deep warm brown-black
accents (#17130F), one single burnt terracotta accent (#C4552B). Matte natural materials:
light wood, linen, thick paper, plaster, ceramic. Generous empty space, off-centre
composition, shallow depth of field, 50mm lens at eye level. Subtle film grain, gentle
contrast, creamy highlights. Calm, confident, artisanal. No text.
```

### NÉGATIF UNIVERSEL — à copier

```
neon, blue tech glow, circuit board, futuristic city, hologram, gradient background,
lens flare, glass morphism, 3D render, stock-photo businessmen, handshake in suits,
rising bar chart, cluttered layout, drop shadows, chrome, glossy plastic, saturated
filter, teal and orange grade, emoji, watermark, distorted text, gibberish letters
```

## 7 · Prompts prêts à l'emploi

**A · Fond de story verticale — 9:16** (flyers Snapchat / Instagram)
```
[STYLE DE BASE] — Vertical 9:16 poster background. A craftsman's hands at work on a
light wood workbench, seen from above, positioned in the lower third of the frame. The
top two thirds are almost empty warm ivory wall, ready for text. One small burnt
terracotta object as the only colour accent.
```

**B · Post carré — 1:1**
```
[STYLE DE BASE] — Square 1:1. A modern smartphone lying flat on a sand beige linen
surface next to a thick paper notebook and a matte brass pen. Screen off. Warm side
light from the left, soft shadow to the right. Large empty space in the upper half.
```

**C · Photo de métier — 4:3**
```
[STYLE DE BASE] — 4:3. Interior of a small [boulangerie / garage / salon de coiffure
/ cabinet] in Marseille, early morning, empty of customers. Warm light through
the shopfront window. Real, slightly worn, well kept. Shot from the doorway, wide
empty foreground.
```

**D · Bannière large — 16:9** (en-tête de site, couverture LinkedIn, miniature)
```
[STYLE DE BASE] — Wide 16:9 banner. A quiet Marseille street corner shopfront at golden
hour, shot slightly from the side. The left half of the frame is a plain sun-lit ivory
wall left empty for text. No people, no cars, no signage text.
```

**E · Aplat graphique sans photo — tout format**
```
Minimal editorial background, flat warm ivory paper (#F6F3EE) with very subtle fibre
texture, one thin burnt terracotta hairline (#C4552B) crossing the lower third, large
soft shadow of a window frame falling from the upper left. Nothing else. No text, no
logo, no gradient, no 3D.
```

## 8 · Méthode de travail

1. Générez toujours **sans texte**, en prévoyant une zone vide pour l'accroche.
2. Ajoutez le texte et le logo dans un second outil, avec Plus Jakarta Sans en `800` très resserré.
3. Vérifiez la règle des trois : la terre cuite ne doit pas apparaître plus de trois fois sur le visuel fini.
4. Si le visuel semble chargé, retirez un élément — jamais de l'espace.
5. Gardez les images qui marchent dans un dossier de référence : les modèles acceptent une image de
   style en entrée, c'est le moyen le plus fiable de rester constant.

## Le test final

> **Est-ce que ce visuel pourrait être l'affiche d'un bon restaurant ?**
> Si oui, c'est du WebTreize. S'il ressemble à une publicité de logiciel, on recommence.
