import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { TrackView } from '@/components/analytics/TrackView';
import { PageShell } from '@/components/layout/PageShell';
import { LineMask } from '@/components/motion/LineMask';
import { Reveal } from '@/components/motion/Reveal';
import { Accrochage, SIZES_ACCROCHAGE, type Sizes } from '@/components/realisations/Accrochage';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import {
  getRealisation,
  livrablesEnPhrase,
  MENTION_DONNEES_EXEMPLE,
  metierEtLieu,
  REALISATIONS,
  REALISATIONS_HREF,
  realisationHref,
  type Cote,
  type Ecran,
  type Realisation,
} from '@/lib/data/realisations';
import { breadcrumbJsonLd, customMetadata } from '@/lib/seo';

/**
 * Étude de cas — une page par réalisation.
 *
 * L’ordre est pensé pour un prospect qui a une minute : qui, quoi, ce que ça a
 * changé ; puis le récit ; puis les écrans, côté par côté, avec ce qu’on y fait
 * en regard — pour qui veut vérifier (design/maquettes/PRESENTATION.md, § 7).
 *
 * Aucun chiffre ni témoignage n’est écrit ici : tout vient de
 * `lib/data/realisations.ts`. Les résultats mesurés et les avis ne sont rendus
 * que s’ils existent.
 */

type Props = { params: Promise<{ slug: string }> };

/** Seules les réalisations publiées existent : tout autre segment est un 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return REALISATIONS.map((projet) => ({ slug: projet.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projet = getRealisation(slug);
  if (!projet) return {};

  return customMetadata({
    path: realisationHref(projet.id),
    title: `${projet.nom} — étude de cas`,
    description: projet.metaDescription,
  });
}

/** Planche d’un seul écran d’ordinateur : il occupe toute la plaque. */
const SIZES_PLANCHE_ORDINATEUR: Sizes = {
  ordinateur: '(min-width: 1280px) 1066px, 88vw',
  telephone: '(min-width: 1280px) 320px, 44vw',
};

/** Planche de téléphones : trois au plus par rang. */
const SIZES_PLANCHE_TELEPHONES: Sizes = {
  ordinateur: '(min-width: 1280px) 1066px, 88vw',
  telephone: '(min-width: 1280px) 320px, (min-width: 768px) 26vw, 44vw',
};

/** Fixe la hauteur des planches de téléphones (≈ 318 px à 1440). */
const REFERENCE_TELEPHONES = 1.5;
const REFERENCE_ORDINATEUR = 1440 / 900;
const RATIO_TELEPHONE = 390 / 844;

export default async function EtudeDeCasPage({ params }: Props) {
  const { slug } = await params;
  const projet = getRealisation(slug);
  if (!projet) notFound();

  const { etude } = projet;
  const index = REALISATIONS.findIndex((p) => p.id === projet.id);
  const suivant = REALISATIONS[(index + 1) % REALISATIONS.length];

  const jsonLd = breadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Réalisations', path: REALISATIONS_HREF },
    { name: projet.nom, path: realisationHref(projet.id) },
  ]);

  const fiche = [
    ['Métier', projet.metier],
    ['Lieu', projet.lieu],
    ['Année', projet.annee],
    ['Livré', livrablesEnPhrase(projet)],
    ['Rôle du studio', projet.role?.join(', ')],
  ].filter((ligne): ligne is [string, string] => Boolean(ligne[1]));

  return (
    <>
      <TrackView event="visite_realisation" props={{ projet: projet.id }} />

      <PageShell
        header={
          <header className="pt-gap-xl">
            <div className="site-container">
              <nav aria-label="Fil d’Ariane">
                <ol className="flex flex-wrap items-center gap-x-2 text-note text-ink-muted">
                  <li>
                    <Link href="/" className="nav-link inline-flex py-2">
                      Accueil
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={REALISATIONS_HREF} className="nav-link inline-flex py-2">
                      Réalisations
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="py-2 text-ink">
                    {projet.nom}
                  </li>
                </ol>
              </nav>

              <LineMask as="h1" className="mt-gap-sm text-display-lg font-extrabold">
                {projet.nom}
              </LineMask>

              <div className="mt-gap-md grid gap-gap-lg lg:grid-cols-12">
                <p className="max-w-[44ch] text-title-sm font-normal text-ink-muted lg:col-span-6">
                  {projet.promesse}
                </p>
                <dl className="fiche lg:col-span-5 lg:col-start-8">
                  {fiche.map(([terme, valeur]) => (
                    <div key={terme}>
                      <dt>{terme}</dt>
                      <dd>{valeur}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="plate-container tirage mt-gap-lg">
              <Accrochage large={projet.accrochage.large} etroit={projet.accrochage.etroit} priority />
            </div>
          </header>
        }
      >
        {/* — Ce qui a changé : ce que le prospect pressé vient chercher — */}
        <section aria-labelledby="changements-title" className="site-container py-gap-xl">
          <div className="grid gap-gap-md lg:grid-cols-12">
            <h2 id="changements-title" className="eyebrow lg:col-span-3">
              Ce qui a changé
            </h2>
            <ol role="list" className="grid gap-x-gap-lg gap-y-gap-sm md:grid-cols-2 lg:col-span-9">
              {etude.changements.map((ligne, i) => (
                <Reveal key={ligne} as="li" delay={i * 60} className="border-t border-line pt-gap-xs">
                  <p className="text-title-sm font-medium text-ink">{ligne}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          {etude.resultatsMesures.length > 0 ? (
            <div className="mt-gap-lg grid gap-gap-md lg:grid-cols-12">
              <h3 className="eyebrow lg:col-span-3">Résultats mesurés, communiqués par le client</h3>
              <ul className="grid gap-gap-sm md:grid-cols-2 lg:col-span-9">
                {etude.resultatsMesures.map((ligne) => (
                  <li
                    key={ligne}
                    className="border-t border-line pt-gap-xs text-title-sm font-semibold text-ink"
                  >
                    {ligne}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {/* — Le récit — */}
        <section aria-label="Le récit" className="border-y border-line">
          <div className="site-container grid gap-gap-md py-gap-xl">
            <Recit titre="Le contexte" textes={etude.contexte} />
            <Recit titre="Le problème" textes={etude.probleme} />
            <Recit titre="Notre réponse" textes={etude.reponse} />
          </div>
        </section>

        {/* — Les écrans, par côté, avec ce qu’on y fait en regard — */}
        {etude.cotes.map((cote, i) => (
          <CoteSection
            key={cote.titre}
            cote={cote}
            premier={i === 0}
            dernier={i === etude.cotes.length - 1}
            technique={etude.technique}
          />
        ))}

        <p className="site-container pb-gap-lg text-note text-ink-muted">{MENTION_DONNEES_EXEMPLE}</p>

        <TestimonialsSection realisationId={projet.id} className="section-pad bg-surface" />

        {suivant && suivant.id !== projet.id ? <Suivant projet={suivant} /> : null}

        <PageCtaBand
          title="Votre activité mérite le même soin."
          description="Décrivez-nous votre activité en quelques lignes. Nous vous répondons par écrit avec ce qui vous freine, et dans quel ordre le corriger."
          label="Demander mon audit gratuit"
        />
      </PageShell>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function Recit({ titre, textes }: { titre: string; textes: readonly string[] }) {
  return (
    <div className="grid gap-gap-xs lg:grid-cols-12">
      <h2 className="eyebrow lg:col-span-3">{titre}</h2>
      <div className="max-w-[62ch] space-y-4 lg:col-span-7">
        {textes.map((texte) => (
          <p key={texte} className="text-body text-ink-muted">
            {texte}
          </p>
        ))}
      </div>
    </div>
  );
}

/** « La commande prête. Données d’exemple. » — la mention au plus près de l’écran. */
function legendeComplete(ecran: Ecran): string {
  return ecran.donnees === 'exemple' ? `${ecran.legende} Données${' '}d’exemple.` : ecran.legende;
}

/**
 * Un côté du produit : son titre et ses fonctionnalités, puis ses écrans.
 * Chaque écran d’ordinateur sur sa propre planche ; les téléphones réunis.
 * Sous 768 px, un écran d’ordinateur réduit n’est plus lisible : un lien ouvre
 * l’image d’origine, que le téléphone permet d’agrandir.
 */
function CoteSection({
  cote,
  premier,
  dernier,
  technique,
}: {
  cote: Cote;
  premier: boolean;
  dernier: boolean;
  technique: readonly string[];
}) {
  const id = `cote-${cote.titre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;
  const ordinateurs = cote.ecrans.filter((e) => e.format === 'ordinateur');
  const telephones = cote.ecrans.filter((e) => e.format === 'telephone');

  // Un téléphone seul se perd sur sa propre plaque : il rejoint le dernier écran
  // d’ordinateur, comme sur l’accrochage de l’accueil.
  const apparie = telephones.length === 1 && ordinateurs.length > 0;
  const planchesOrdinateur = ordinateurs.map((ecran, i) =>
    apparie && i === ordinateurs.length - 1 ? [ecran, telephones[0]] : [ecran],
  );
  const telephonesSeuls = apparie ? [] : telephones;

  return (
    <section aria-labelledby={id} className={premier ? 'py-gap-xl' : 'border-t border-line py-gap-xl'}>
      <div className="site-container grid gap-gap-md lg:grid-cols-12">
        <h2 id={id} className="text-title font-extrabold lg:col-span-3">
          {cote.titre}
        </h2>
        <ul className="grid gap-x-gap-lg md:grid-cols-2 lg:col-span-9">
          {cote.fonctionnalites.map((point) => (
            <li key={point} className="border-t border-line py-2.5 text-body text-ink-muted">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="plate-container mt-gap-lg grid gap-gap-md">
        {planchesOrdinateur.map((ecrans) => (
          <Reveal key={ecrans[0].src}>
            <Accrochage
              large={ecrans.map((ecran) => ({ ecran, legende: legendeComplete(ecran) }))}
              reference={ecrans.length > 1 ? REFERENCE_ORDINATEUR + RATIO_TELEPHONE : REFERENCE_ORDINATEUR}
              sizes={ecrans.length > 1 ? SIZES_ACCROCHAGE : SIZES_PLANCHE_ORDINATEUR}
            />
            <a
              href={ecrans[0].src}
              className="link-draw mt-gap-xs inline-block py-1 text-note font-semibold text-ink md:hidden"
            >
              Voir l’écran en grand
            </a>
          </Reveal>
        ))}
        {telephonesSeuls.length > 0 ? (
          <Reveal>
            <Accrochage
              large={telephonesSeuls.map((ecran) => ({ ecran, legende: legendeComplete(ecran) }))}
              reference={Math.max(REFERENCE_TELEPHONES, telephonesSeuls.length * RATIO_TELEPHONE)}
              sizes={SIZES_PLANCHE_TELEPHONES}
            />
          </Reveal>
        ) : null}
      </div>

      {dernier ? (
        <p className="site-container mt-gap-lg text-note text-ink-muted">
          Construit avec&#8239;: {technique.join(' · ')}
        </p>
      ) : null}
    </section>
  );
}

/** L’étude de cas suivante : un seul lien, le nom, étendu au bloc. */
function Suivant({ projet }: { projet: Realisation }) {
  return (
    <nav aria-label="Étude de cas suivante" className="border-t border-line">
      <div className="projet site-container relative grid items-center gap-gap-md py-gap-xl md:grid-cols-[5fr_7fr]">
        <div>
          <p className="eyebrow">Étude de cas suivante</p>
          <p className="mt-gap-xs text-display-sm font-extrabold">
            <Link href={realisationHref(projet.id) as Route} className="projet__lien link-draw">
              {projet.nom}
            </Link>
          </p>
          <p className="mt-2 text-body text-ink-muted">{metierEtLieu(projet)}</p>
        </div>
        <div className="hidden md:block">
          <Accrochage large={projet.accrochage.large} decoratif className="accrochage--reduit" />
        </div>
      </div>
    </nav>
  );
}
