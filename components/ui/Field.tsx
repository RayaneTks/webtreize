import { clsx } from 'clsx';

/**
 * Champ de formulaire unique du site — SPEC 5.
 *
 * Composant **serveur** : il reçoit `value` et `onChange`, mais ne déclare
 * aucune frontière client. C’est l’appelant — `ContactForm` — qui porte
 * `'use client'` ; ce fichier est alors compilé avec lui.
 *
 * `input` et `textarea` passent par la même API : seul `type` change. L’erreur
 * s’écrit en `accent-deep`, jamais en rouge Tailwind — le site n’a qu’une seule
 * couleur vive (charte §2). La bordure est `line-strong` (3,41:1 sur ivoire),
 * jamais `line` (1,39:1, sous le seuil de 3:1 exigé d’une bordure de composant).
 *
 * Comme `Button`, ce fichier compose ses classes avec `clsx` et non `cn` :
 * `tailwind-merge` confond l’échelle typographique du projet avec des couleurs
 * de texte et supprimerait `text-ink` ou `text-body` selon l’ordre. Détail dans
 * l’en-tête de `components/ui/Button.tsx`.
 *
 * L’anneau de focus vient de `@layer base` : rien à écrire ici.
 */

export type FieldProps = {
  /** Sert d’`id`, de `name` et de racine aux identifiants d’indication et d’erreur. */
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  /** Message d’erreur. Sa présence pose `aria-invalid` et la bordure terre cuite. */
  error?: string;
  /** Aide à la saisie, lue par les technologies d’assistance à la prise de focus. */
  hint?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  /** `textarea` uniquement. */
  rows?: number;
  value: string;
  onChange: (value: string) => void;
};

export function Field({
  id,
  label,
  type = 'text',
  required = false,
  error,
  hint,
  autoComplete,
  inputMode,
  rows = 5,
  value,
  onChange,
}: FieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  // L’erreur d’abord : c’est elle que l’on veut entendre en premier à la prise
  // de focus sur un champ invalide.
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  // Même hauteur que `Button` en taille « md » : le bouton d’envoi se pose sous
  // les champs sans décrochement de 6 px sur le bord droit.
  const control = clsx(
    'w-full rounded-xl border bg-surface text-body text-ink transition',
    error ? 'border-accent-deep' : 'border-line-strong',
  );

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-note font-semibold text-ink">
        {label}
        {/* L’étoile double l’attribut `required`, qui porte seul la sémantique. */}
        {required ? (
          <span aria-hidden="true" className="text-ink-faint">
            {' '}
            *
          </span>
        ) : null}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={clsx(control, 'resize-y px-4 py-3')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={clsx(control, 'h-[3.25rem] px-4')}
        />
      )}

      {hint ? (
        <p id={hintId} className="text-note text-ink-faint">
          {hint}
        </p>
      ) : null}

      {/* Pas de `role="alert"` ici : l’annonce du formulaire est portée par la
          zone `aria-live` de `ContactForm`, et le message est rattaché au champ
          par `aria-describedby`. Deux annonces vaudraient un doublon. */}
      {error ? (
        <p id={errorId} className="text-note font-medium text-accent-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
