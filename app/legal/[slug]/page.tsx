import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPageShell } from '@/components/layout/LegalPageShell';
import { Button } from '@/components/ui/Button';
import {
  getLegalDocument,
  isLegalDraft,
  LEGAL_SLUGS,
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
 * ## Publié ou brouillon
 *
 * Un document dont il manque encore un fait — raison sociale, SIREN, siège,
 * hébergeur — n’est **pas rendu**. La page annonce sobrement une rédaction en
 * cours et renvoie vers le formulaire de contact.
 *
 * Le texte à trous a été essayé et retiré : sur la seule page où un prospect
 * vérifie que l’entreprise existe, une suite de crochets vides ne se lit pas
 * comme de la transparence mais comme un chantier laissé ouvert. Le studio vend
 * du soin ; il ne peut pas exposer son propre brouillon.
 *
 * Ce qui manque reste dans `LEGAL_TODO`, à destination de l’éditeur seul, et
 * n’est jamais servi au visiteur. Dès que la dernière entrée disparaît, le
 * document se publie de lui-même et redevient indexable.
 *
 * La politique de confidentialité, elle, est toujours publiée : le formulaire
 * collecte des données personnelles, l’information doit être en ligne au moment
 * de la collecte (RGPD art. 13). Elle a donc été rédigée pour ne dépendre
 * d’aucun fait manquant.
 */

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

/** Aucune autre valeur que les trois slugs prérendus n’atteint le composant. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

/** Date de révision, figée et formatée en UTC pour rester stable au build. */
const DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocument(slug);

  if (!doc) {
    return { title: 'Page introuvable', robots: { index: false, follow: true } };
  }

  const draft = isLegalDraft(doc.slug);

  return customMetadata({
    path: `/legal/${doc.slug}`,
    title: doc.title,
    // Une description qui décrirait un texte non publié serait fausse.
    description: draft
      ? `${doc.title} de WebTreize, studio digital à Marseille. Document en cours de rédaction.`
      : doc.description,
    noindex: draft,
  });
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);

  if (!doc) notFound();

  return isLegalDraft(doc.slug) ? <LegalDraft doc={doc} /> : <LegalContent doc={doc} />;
}

/* -------------------------------------------------------------------------- */

/** Document publié : le texte, en entier, sans aucun trou. */
function LegalContent({ doc }: { doc: LegalDocument }) {
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
              <p key={index}>{paragraph}</p>
            ))}

            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <LegalFooter />
    </LegalPageShell>
  );
}

/**
 * Document en cours de rédaction.
 *
 * Le ton est celui du reste du site : on annonce, on dit quoi faire, on
 * n’excuse pas. Aucune date de publication promise — une échéance annoncée puis
 * manquée est pire que pas d’échéance.
 */
function LegalDraft({ doc }: { doc: LegalDocument }) {
  return (
    <LegalPageShell
      title={doc.title}
      description="Ce document est en cours de rédaction. En attendant sa publication, écrivez-nous : nous répondons à toute question sur ce point par écrit."
    >
      <div className="legal-prose">
        <p>
          Nous préférons ne rien publier plutôt qu’un texte approximatif&#8239;: un document
          juridique incomplet engage autant qu’un document complet, et vous ne pourriez pas vous y
          fier.
        </p>
        <p>
          En attendant, deux choses restent vraies et vérifiables dès aujourd’hui. Le formulaire de
          contact ne collecte que quatre informations, dont l’usage est détaillé dans notre{' '}
          <a href="/legal/politique-confidentialite" className="link-draw text-accent-deep">
            politique de confidentialité
          </a>
          , publiée et complète. Et toute question sur nos conditions d’intervention reçoit une
          réponse écrite, avant tout engagement de votre part.
        </p>
      </div>

      <LegalFooter />
    </LegalPageShell>
  );
}

function LegalFooter() {
  return (
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
