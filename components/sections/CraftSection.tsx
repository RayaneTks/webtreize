import { Reveal } from '@/components/motion/Reveal';
import { Plate } from '@/components/ui/Plate';
import { CRAFT_BLOCKS, type CraftBlock } from '@/lib/data/site';

/** Largeurs servies pour les plaques 4/3 — voir docs/imagerie.md. */
const CRAFT_PLATE_SIZES = '(min-width: 1120px) 520px, (min-width: 700px) 46vw, 100vw';

/**
 * « Ce que nous faisons » — trois blocs texte / plaque alternés.
 *
 * ## Nommage des régions
 *
 * L’ancre `#metier` était portée par un `<section>` sans nom accessible : la
 * section contient trois `h2` de rang égal, aucun ne pouvait la nommer
 * (finding « a11y-sections-sans-nom-accessible »). Plutôt que d’inventer un
 * quatrième titre au-dessus des trois autres, l’ancre est portée par un
 * simple conteneur et **chaque bloc devient sa propre région**, nommée par son
 * propre `h2`. Le plan de titres est inchangé, l’ancre du footer fonctionne à
 * l’identique, et plus aucune région n’est anonyme.
 *
 * ## Mise en page
 *
 * Grille à colonnes explicites plutôt que `flex-wrap` : avec deux enfants
 * seulement, le repli était sûr ici, mais la grille rend l’alternance lisible
 * sans `flex-wrap-reverse`, dont l’ordre de lecture dépendait du repli.
 * L’ordre du DOM est toujours texte puis image — l’ordre de lecture ne change
 * jamais, seule la colonne d’affichage alterne à partir de `md`.
 *
 * ## Accent
 *
 * Les trois étiquettes étaient en `.eyebrow-accent` : trois terres cuites pour
 * une même information répétée, sur une section qui n’en mérite aucune
 * (finding « regle-trois-terres-cuites-explosee »). Elles passent en
 * `.eyebrow`.
 */
export function CraftSection() {
  return (
    <div id="metier" className="section-pad bg-surface">
      <div className="site-container grid gap-gap-xl">
        {CRAFT_BLOCKS.map((block, index) => {
          const titleId = `metier-${block.id}-title`;
          const plateFirst = index % 2 === 1;

          return (
            <section
              key={block.id}
              aria-labelledby={titleId}
              className="grid items-center gap-gap-lg md:grid-cols-2"
            >
              <Reveal className={plateFirst ? 'md:order-2' : undefined}>
                <p className="eyebrow">{block.eyebrow}</p>
                <h2 id={titleId} className="mt-gap-xs max-w-[18ch] text-display-sm font-extrabold">
                  {block.title}
                </h2>
                <p className="lede mt-gap-sm max-w-[46ch]">{block.body}</p>
              </Reveal>

              <Reveal delay={60} className={plateFirst ? 'md:order-1' : undefined}>
                <CraftPlate block={block} />
              </Reveal>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Plaque du bloc : la vraie photo dès que `imageSrc` est renseigné,
 * sinon le cadrage en attente.
 */
function CraftPlate({ block }: { block: CraftBlock }) {
  if (block.imageSrc) {
    return (
      <Plate src={block.imageSrc} alt={block.imageAlt} ratio="4/3" sizes={CRAFT_PLATE_SIZES} />
    );
  }

  return <Plate ratio="4/3" caption={block.plate} />;
}
