import type { Route } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/sections/SectionHead';
import { Button } from '@/components/ui/Button';
import { Plate } from '@/components/ui/Plate';
import { CRAFT_BLOCKS } from '@/lib/data/site';

const SIZES = '(min-width: 1120px) 352px, (min-width: 768px) 31vw, 100vw';

/**
 * « Ce que nous faisons. » — trois encarts, un par métier du studio.
 *
 * Remplace les trois blocs en zigzag : une photo, une étiquette, un titre court,
 * une phrase, et tout l’encart mène à la section correspondante de /services.
 * Les textes sont ceux de `CRAFT_BLOCKS`, raccourcis, sans nouvelle promesse.
 */
export function ServicesTeaser() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad">
      <div className="site-container">
        <SectionHead id="services-title" title="Ce que nous faisons." />

        <ul role="list" className="mt-gap-lg grid gap-gap-sm md:grid-cols-3">
          {CRAFT_BLOCKS.map((block, index) => (
            <Reveal key={block.id} as="li" delay={index * 60} className="flex">
              <Link
                href={`/services#${block.serviceId}` as Route}
                className="encart encart--lien group w-full"
              >
                <div className="plate-in">
                  <Plate src={block.imageSrc} alt={block.imageAlt} ratio="4/3" sizes={SIZES} />
                </div>
                <p className="eyebrow">{block.eyebrow}</p>
                <h3 className="mt-2 text-title font-extrabold text-ink">{block.teaserTitle}</h3>
                <p className="mt-2 text-body text-ink-muted">{block.teaserBody}</p>
                <span className="encart__suite mt-auto pt-gap-sm">
                  En savoir plus <i aria-hidden="true">→</i>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={60} className="mt-gap-lg flex justify-center">
          <Button href="/services" variant="quiet" size="pill" arrow>
            Voir les services
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
