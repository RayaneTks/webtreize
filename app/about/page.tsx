import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { SerifQuote, SerifQuoteEmphasis } from '@/components/sections/SerifQuote';
import { TeamSection } from '@/components/sections/TeamSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { Reveal } from '@/components/motion/Reveal';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { GEO_LINE } from '@/lib/constants';
import { Plate } from '@/components/ui/Plate';
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

/**
 * Page « Le studio ».
 *
 * ## Ce qu’elle ne fait plus
 *
 * Elle republiait intégralement deux sections de l’accueil — la boucle
 * `PROCESS_STEPS` et la boucle `PROMISES`, mêmes textes, `h2` quasi identiques —
 * après avoir écrit « Le détail complet est sur la page d’accueil » quatorze
 * lignes plus haut (finding « about-duplique-la-home »). Deux URL portant les
 * mêmes blocs, sur le site d’un studio qui vend du référencement.
 *
 * Le contenu est désormais propre à la page : pourquoi un petit studio, où il
 * travaille, qui répond, et ce qu’il refuse de faire. Rien qui soit déjà écrit
 * ailleurs, rien qui ne soit vérifiable.
 *
 * L’étymologie « WebTreize, c’est le 13 en provençal » a été retirée : une page
 * qui doit inspirer confiance ne s’ouvre pas sur une affirmation que le
 * visiteur ne peut pas vérifier.
 *
 * ## Accent
 *
 * Une seule terre cuite dans le corps de page : le mot souligné de la citation. Les
 * étiquettes restent en `.eyebrow` (encre pâle) et non en `.eyebrow-accent` :
 * avec le point du logotype du header et celui du footer, la règle des trois de
 * la charte est déjà à son plafond.
 */
export const metadata: Metadata = pageMetadata('about');

const JSON_LD = [
  webPageJsonLd('about', 'AboutPage'),
  breadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Le studio', path: '/about' },
  ]),
];

/** Cadrage vertical du plan de travail — voir docs/imagerie.md. */
const ATELIER_SIZES = '(min-width: 1120px) 420px, (min-width: 700px) 40vw, 100vw';

const ATELIER_ALT =
  'Le plan de travail du studio : un carnet ouvert, un crayon et une tasse en céramique, éclairés par la fenêtre.';

/**
 * Ce que le studio ne fait pas — la seule liste du site qui se lit en creux.
 * Chaque ligne est un fait constatable sur ce site même ou dans un devis, jamais
 * une promesse à tenir plus tard.
 */
const REFUS = [
  {
    title: 'Pas de faux avis, pas de chiffres gonflés',
    body: 'Nous n’affichons que ce que vous pouvez vérifier : des sites en ligne dont l’adresse est publique, et des avis signés par les personnes qui les ont donnés.',
  },
  {
    title: 'Pas de jargon',
    body: 'Si une phrase de nos échanges a besoin d’un glossaire, elle est mal écrite. Nous la réécrivons jusqu’à ce qu’elle se lise sans effort.',
  },
  {
    title: 'Pas de devis qui gonfle en route',
    body: 'Ce qui n’était pas prévu est chiffré à part, et vous décidez avant que nous le fassions. Aucune ligne n’apparaît sur une facture sans être passée par vous.',
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageShell
        eyebrow="Le studio"
        title="Le studio digital marseillais, en clair."
        description="Un seul interlocuteur, du premier échange à la mise en ligne. Et un site dont vous gardez tous les accès."
      >
        <section
          aria-labelledby="taille-title"
          className="section-pad border-t border-line bg-surface text-center"
        >
          <div className="site-container">
            <h2 id="taille-title" className="sr-only">
              Pourquoi un petit studio
            </h2>
            <Reveal>
              <SerifQuote>
                Un petit studio, <SerifQuoteEmphasis>volontairement</SerifQuoteEmphasis>.
              </SerifQuote>
            </Reveal>
            <Reveal delay={60}>
              <p className="lede mx-auto mt-gap-lg max-w-[54ch] text-left sm:text-center">
                Nous prenons peu de projets à la fois, pour les tenir de bout en bout. Pas de
                commercial qui promet, pas d’équipe qui découvre le dossier après la
                signature&#8239;: la personne qui vous écoute est celle qui construit.
              </p>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="lieu-title" className="section-pad">
          <div className="site-container grid items-start gap-x-gap-lg gap-y-gap-md md:grid-cols-[1fr_minmax(0,20rem)]">
            <Reveal>
              <p className="eyebrow">Où nous sommes</p>
              <h2 id="lieu-title" className="mt-gap-xs max-w-[18ch] text-display-sm font-extrabold">
                Installés à Marseille, pas derrière un formulaire.
              </h2>
              <div className="mt-gap-sm max-w-[54ch] space-y-4 text-body text-ink-muted">
                <p>
                  {GEO_LINE} Quand c’est possible, nous venons voir&#8239;: un comptoir, une
                  devanture, un atelier, cela change ce que nous écrivons ensuite. Sinon, un appel
                  en visio et quelques photos suffisent pour démarrer.
                </p>
                <p>
                  Vous parlez à la personne qui conçoit, qui développe et qui met en ligne. Il n’y a
                  pas de chef de projet à informer, pas de studio à qui transmettre, pas de délai
                  perdu entre deux services.
                </p>
                <p>
                  Nous ne prenons que ce que nous pouvons finir. C’est la raison pour laquelle nous
                  répondons par un audit écrit avant un devis&#8239;: si votre besoin n’est pas pour nous,
                  vous le saurez tout de suite, et vous garderez l’audit.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <Plate src="/images/about-atelier.jpg" alt={ATELIER_ALT} ratio="3/4" sizes={ATELIER_SIZES} />
            </Reveal>
          </div>
        </section>

        <TeamSection />

        <TestimonialsSection />

        <section aria-labelledby="refus-title" className="section-pad bg-surface">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Ce que nous ne faisons pas</p>
              <h2
                id="refus-title"
                className="mt-gap-xs max-w-[20ch] text-display-sm font-extrabold"
              >
                Trois choses que vous ne verrez jamais ici.
              </h2>
            </Reveal>

            <ul className="mt-gap-lg grid gap-gap-md sm:grid-cols-3">
              {REFUS.map((item, index) => (
                <Reveal key={item.title} as="li" delay={index * 60} className="rule-top">
                  <h3 className="text-title-sm font-bold text-ink">{item.title}</h3>
                  <p className="mt-gap-xs text-body text-ink-muted">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="joindre-title" className="section-pad">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Nous joindre</p>
              <h2
                id="joindre-title"
                className="mt-gap-xs max-w-[16ch] text-display-sm font-extrabold"
              >
                Du lundi au vendredi, de 9&#160;h à 18&#160;h.
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <ContactChannels className="mt-gap-lg" />
            </Reveal>
          </div>
        </section>

        <PageCtaBand />
      </PageShell>

      {JSON_LD.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
