import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/sections/SectionHead';
import { Button } from '@/components/ui/Button';
import { GEO_LINE } from '@/lib/constants';
import { REALISATIONS, REALISATIONS_HREF } from '@/lib/data/realisations';
import { FONDATEUR, PROMISES } from '@/lib/data/site';

/**
 * « Le studio, en vrai. » — ce qu’on peut vérifier, en cinq cases.
 *
 * L’atelier (ou le fondateur, dès que sa photo existe), un interlocuteur unique,
 * le nombre de projets livrés — calculé, jamais écrit à la main — et deux
 * engagements repris des promesses. Newsreader ne sert qu’aux deux chiffres
 * (charte §3). Aucune terre cuite dans la grille.
 */
export function StudioBento() {
  const [dates, propriete] = PROMISES;

  return (
    <section id="studio" aria-labelledby="studio-title" className="section-pad">
      <div className="site-container">
        <SectionHead id="studio-title" title="Le studio, en vrai." />

        <div className="mt-gap-lg grid gap-gap-sm md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <Reveal className="encart p-gap-xs lg:col-span-2 lg:row-span-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-plate bg-sand lg:aspect-auto lg:flex-1">
              <Image
                src={FONDATEUR?.photo ?? '/images/studio-bureau.jpg'}
                alt={
                  FONDATEUR?.alt ??
                  'Un bureau en chêne clair dans une pièce vide aux murs de calcaire, un ordinateur portable fermé posé dessus, traversé par la lumière d’une fenêtre.'
                }
                fill
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="px-gap-xs pb-gap-xs pt-gap-sm text-body text-ink-muted">
              {FONDATEUR ? `${FONDATEUR.prenom}, ${FONDATEUR.role}. ` : null}
              {GEO_LINE}
            </p>
          </Reveal>

          <Reveal delay={60} className="encart encart--sable">
            <p className="font-serif text-display-md font-light leading-none tabular-nums text-ink lg:text-display-lg">
              1
            </p>
            <p className="mt-gap-sm text-body text-ink-muted">
              seul interlocuteur&#8239;: celui qui conçoit et qui développe.
            </p>
          </Reveal>

          <Reveal delay={120} className="flex">
            <Link href={REALISATIONS_HREF} className="encart encart--sable encart--lien group w-full">
              <p className="font-serif text-display-md font-light leading-none tabular-nums text-ink lg:text-display-lg">
                {REALISATIONS.length}
              </p>
              <p className="mt-gap-sm text-body text-ink-muted">projets livrés, montrés écran par écran.</p>
              <span className="encart__suite mt-auto pt-gap-sm">
                Les voir <i aria-hidden="true">→</i>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={60} className="encart">
            <h3 className="text-title-sm font-extrabold text-ink">{dates.title}</h3>
            <p className="mt-2 text-body text-ink-muted">
              Le calendrier est écrit dans le devis, phase par phase. Vous le lisez avant de signer.
            </p>
          </Reveal>

          <Reveal delay={120} className="encart">
            <h3 className="text-title-sm font-extrabold text-ink">{propriete.title}</h3>
            <p className="mt-2 text-body text-ink-muted">{propriete.body}</p>
          </Reveal>
        </div>

        <Reveal delay={60} className="mt-gap-lg flex justify-center">
          <Button href="/about" variant="quiet" size="pill" arrow>
            Découvrir le studio
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
