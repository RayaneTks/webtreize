import { Fragment, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPageShell } from '@/components/layout/LegalPageShell';
import { Button } from '@/components/ui/Button';
import {
  getLegalDocument,
  LEGAL_SLUGS,
  LEGAL_TODO,
  type LegalDocument,
} from '@/lib/data/legal';
import { customMetadata } from '@/lib/seo';

/**
 * Les trois documents légaux.
 *
 * ## Espace d’URL fermé
 *
 * La route n’avait ni `generateStaticParams`, ni `dynamicParams`, ni
 * `notFound()` : n’importe quelle chaîne sous `/legal/` répondait 200 avec une
 * page complète — un espace d’URL infini, rendu à la demande, sur les trois
 * liens présents dans le pied de page de **toutes** les pages du site
 * (findings « seo-legal-slug-illimite » et « legal-slug-dynamique-sans-
 * generatestaticparams »). Les trois slugs réels sont désormais prérendus,
 * et tout le reste est un 404 franc.
 *
 * `/privacy` et `/terms` ne sont plus des pages : ce sont deux redirections 308
 * déclarées dans `next.config.ts`.
 *
 * ## Marqueurs visibles
 *
 * Les seuls trous du texte sont les faits que personne d’autre que l’éditeur ne
 * peut connaître — raison sociale, SIREN, siège, hébergeur. Ils restent
 * **visibles** dans la page, sur un aplat de sable, et sont récapitulés en fin
 * de document : une mention légale fausse expose davantage qu’une mention
 * incomplète, et le propriétaire du site doit voir ce qui manque du premier
 * coup d’œil. Tant que cette liste n’est pas vide, la page reste en `noindex`.
 */

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

/** Aucune autre valeur que les trois slugs prérendus n’atteint le composant. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

/** Les marqueurs laissés en clair dans les textes de `lib/data/legal.ts`. */
const MARKER = /(\[\[À COMPLÉTER[\s\S]*?\]\])/g;

/** Un document reste hors index tant qu’il lui manque une information. */
function pendingTodo(slug: LegalDocument['slug']) {
  return LEGAL_TODO.filter((todo) => todo.slug === slug);
}

/** Date de révision, figée et formatée en UTC pour rester stable au build. */
const DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

/** Découpe un texte sur ses marqueurs et les rend en `<mark>` sobre. */
function withMarkers(text: string): ReactNode[] {
  return text.split(MARKER).map((part, index) =>
    part.startsWith('[[') ? (
      <mark
        key={index}
        className="rounded-xl bg-sand px-1.5 py-0.5 font-medium text-ink"
      >
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocument(slug);

  if (!doc) {
    return { title: 'Page introuvable', robots: { index: false, follow: true } };
  }

  return customMetadata({
    path: `/legal/${doc.slug}`,
    title: doc.title,
    description: doc.description,
    noindex: pendingTodo(doc.slug).length > 0,
  });
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);

  if (!doc) notFound();

  const todo = pendingTodo(doc.slug);
  const updatedAt = DATE_FORMAT.format(new Date(doc.updatedAt));

  return (
    <LegalPageShell title={doc.title} description={doc.description}>
      <p className="text-note text-ink-faint">
        Dernière mise à jour <time dateTime={doc.updatedAt}>{updatedAt}</time>.
      </p>

      <div className="legal-prose mt-gap-md">
        {doc.sections.map((section) => (
          <section key={section.heading} aria-labelledby={sectionId(section.heading)}>
            <h2 id={sectionId(section.heading)}>{section.heading}</h2>

            {section.paragraphs?.map((paragraph, index) => (
              <p key={index}>{withMarkers(paragraph)}</p>
            ))}

            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet, index) => (
                  <li key={index}>{withMarkers(bullet)}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {todo.length > 0 ? (
        <aside
          aria-labelledby="a-completer-title"
          className="mt-gap-lg rounded-plate border border-line-strong bg-sand p-gap-sm"
        >
          <p className="eyebrow">Document incomplet</p>
          <h2 id="a-completer-title" className="mt-gap-xs text-title-sm font-bold text-ink">
            À fournir par l’éditeur du site
          </h2>
          <p className="mt-gap-xs text-note text-ink-muted">
            Les éléments ci-dessous apparaissent en clair dans le texte, sur fond sable. Tant
            qu’ils ne sont pas renseignés, cette page reste hors de l’index des moteurs de
            recherche.
          </p>
          <ul className="mt-gap-xs list-disc space-y-1.5 pl-5 text-note text-ink-muted">
            {todo.map((item) => (
              <li key={item.label}>{item.label}</li>
            ))}
          </ul>
        </aside>
      ) : null}

      <div className="mt-gap-lg border-t border-line pt-gap-md">
        <p className="text-body text-ink-muted">
          Une question sur ce document&#8239;? Écrivez-nous, nous répondons par écrit.
        </p>
        <div className="mt-gap-sm">
          <Button href="/contact" size="sm">
            Nous écrire
          </Button>
        </div>
      </div>
    </LegalPageShell>
  );
}

/** Identifiant d’ancre stable, dérivé du titre de section. */
function sectionId(heading: string): string {
  return heading
    .normalize('NFD')
    // Retire les diacritiques combinants laissés par la décomposition NFD.
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
