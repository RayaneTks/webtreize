/** Catégories pour la demande d’audit — couvrent l’ensemble des activités sans s’exclure mutuellement. */
export const AUDIT_CATEGORIES = [
  { value: 'site-presence', label: 'Site web, refonte & présence en ligne' },
  { value: 'seo-local', label: 'SEO, fiche Google & visibilité locale' },
  { value: 'apps-outils', label: 'Applications & outils sur mesure' },
  { value: 'image-contenu', label: 'Image, contenu & communication digitale' },
  { value: 'strategie', label: 'Stratégie & accompagnement digital' },
  { value: 'autre', label: 'Autre demande' },
] as const;

export const AUDIT_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  AUDIT_CATEGORIES.map(c => [c.value, c.label])
);
