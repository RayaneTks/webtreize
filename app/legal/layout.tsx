import type { Metadata } from 'next';

/**
 * Segment légal.
 *
 * Il rendait un `<div data-legal-page>` autour de tout l’arbre de la page —
 * header et pied de page compris — pour un attribut qu’aucune règle CSS ni
 * aucun test ne visait : une enveloppe morte, héritée d’une feuille de style
 * supprimée depuis.
 *
 * Ce que ce fichier apporte à la place tient en une ligne de métadonnées : le
 * `noindex` du segment. Tant que les documents portent des marqueurs
 * « [[À COMPLÉTER … ]] », ils ne doivent pas entrer dans l’index. Chaque page y
 * ajoute son propre `canonical` et son propre titre ; `follow: true` partout,
 * pour que les liens de ces pages — notamment vers /contact — continuent de
 * transmettre du signal.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
