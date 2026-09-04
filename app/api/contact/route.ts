import { NextRequest, NextResponse } from 'next/server';

import { CONTACT_EMAIL } from '@/lib/constants';
import { checkRateLimit, clientIpFrom } from '@/lib/rate-limit';
import {
  CONTACT_MIN_SUBMIT_DELAY_MS,
  contactSchema,
  toFieldErrors,
  type ContactFieldErrors,
} from '@/lib/validation/contact';

/**
 * Réception du formulaire de contact — le seul canal de conversion du site.
 *
 * Règle de conduite : un lead ne disparaît jamais en silence. Ou bien il part
 * chez Resend, ou bien le visiteur voit une erreur explicite avec une adresse de
 * repli. La seule exception est la soumission identifiée comme robot, à qui l’on
 * renvoie un 200 neutre pour ne rien lui apprendre.
 *
 * RGPD : aucune donnée personnelle n’est journalisée. Ni nom, ni adresse, ni
 * message, ni téléphone — pas même en développement, où le journal se limite à
 * « lead reçu » et à la longueur du message.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ À FAIRE AVANT MISE EN LIGNE                                              │
 * │ 1. Poser RESEND_API_KEY dans les variables d’environnement de            │
 * │    l’hébergeur (pas dans le dépôt).                                      │
 * │ 2. Vérifier le domaine d’envoi dans Resend (SPF, DKIM, DMARC).           │
 * │ 3. Poser RESEND_FROM avec l’expéditeur réel du domaine vérifié.          │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

/** Corps utile maximal. Le message est déjà borné à 4 000 caractères par le schéma. */
const MAX_BODY_BYTES = 32 * 1024;

/** Au-delà, on considère que Resend ne répondra pas. */
const RESEND_TIMEOUT_MS = 8000;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/** Expéditeur du courriel. Doit appartenir à un domaine vérifié chez Resend. */
const RESEND_FROM = process.env.RESEND_FROM || 'WebTreize <noreply@webtreize.com>';

/** Espace fine insécable — U+202F, devant « : ; ! ? ». */
const FINE = ' ';

/** Espace insécable — U+00A0, devant les unités. */
const NBSP = ' ';

const FALLBACK = `Écrivez-nous à ${CONTACT_EMAIL}, nous répondons aussi vite.`;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Nettoie une valeur destinée à un en-tête de courriel : pas de saut de ligne. */
function singleLine(value: string, maxLength = 120): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLength);
}

/** Réponse commune : jamais mise en cache, jamais rejouée par un intermédiaire. */
function json(body: unknown, init?: ResponseInit): NextResponse {
  const response = NextResponse.json(body, init);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

/**
 * Réponse renvoyée au robot : rigoureusement identique à un vrai succès.
 * Aucun code, aucun message, aucun en-tête ne trahit la règle déclenchée.
 */
function neutralSuccess(): NextResponse {
  return json({ success: true });
}

function fieldErrorResponse(fieldErrors: ContactFieldErrors): NextResponse {
  return json(
    {
      success: false,
      error: 'Le formulaire n’est pas encore complet.',
      fieldErrors,
    },
    { status: 400 },
  );
}

/** Formule le délai d’attente en français, sans afficher un décompte en secondes. */
function formatRetryDelay(seconds: number): string {
  if (seconds <= 60) return 'dans une minute';
  const minutes = Math.ceil(seconds / 60);
  return `dans ${minutes}${NBSP}minutes`;
}

/** Un `AbortSignal.timeout` rejette avec un `TimeoutError` ; certains agents renvoient `AbortError`. */
function isTimeout(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  const name = (error as { name?: unknown }).name;
  return name === 'TimeoutError' || name === 'AbortError';
}

export async function POST(request: NextRequest) {
  // ── 1. Plafond de taille ────────────────────────────────────────────────────
  // Les Route Handlers de l’App Router n’imposent aucune limite : sans ce test,
  // un corps de plusieurs dizaines de méga-octets serait parsé en mémoire.
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json(
      { success: false, error: `Votre message est trop volumineux. ${FALLBACK}` },
      { status: 413 },
    );
  }

  // ── 2. Limitation de débit ──────────────────────────────────────────────────
  const verdict = checkRateLimit(clientIpFrom(request.headers));
  if (!verdict.allowed) {
    return json(
      {
        success: false,
        error: `Trop d’envois depuis cette connexion. Réessayez ${formatRetryDelay(
          verdict.retryAfterSeconds,
        )}, ou écrivez-nous à ${CONTACT_EMAIL}.`,
        retryAfter: verdict.retryAfterSeconds,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(verdict.retryAfterSeconds) },
      },
    );
  }

  // ── 3. Lecture du corps ─────────────────────────────────────────────────────
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return json(
        { success: false, error: `Votre message est trop volumineux. ${FALLBACK}` },
        { status: 413 },
      );
    }
    raw = JSON.parse(text);
  } catch {
    return json({ success: false, error: 'Requête illisible.' }, { status: 400 });
  }

  // ── 4. Leurre ───────────────────────────────────────────────────────────────
  // Testé avant la validation : le robot qui l’a rempli n’a pas à découvrir
  // quels champs sont mal formés.
  const honeypot = (raw as { company?: unknown } | null)?.company;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return neutralSuccess();
  }

  // ── 5. Validation ───────────────────────────────────────────────────────────
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = toFieldErrors(parsed.error);

    // Aucun champ visible en défaut : seul l’horodatage manque ou n’est pas un
    // nombre. C’est la signature d’un envoi direct, sans passer par la page.
    if (Object.keys(fieldErrors).length === 0) return neutralSuccess();

    return fieldErrorResponse(fieldErrors);
  }

  const { name, email, phone, message, renderedAt } = parsed.data;

  // ── 6. Horodatage de rendu ──────────────────────────────────────────────────
  // Moins de trois secondes entre l’affichage du formulaire et l’envoi : personne
  // ne lit, ne saisit et n’envoie aussi vite. Un horodatage postérieur à
  // l’horloge du serveur ne prouve rien (horloge du visiteur en avance) : on
  // laisse passer plutôt que de perdre un vrai lead.
  const elapsed = Date.now() - renderedAt;
  if (elapsed >= 0 && elapsed < CONTACT_MIN_SUBMIT_DELAY_MS) {
    return neutralSuccess();
  }

  // ── 7. Configuration ────────────────────────────────────────────────────────
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    if (IS_PRODUCTION) {
      // Le lead ne part pas : on le dit. Ni au visiteur ni au studio on ne
      // laisse croire que le message est arrivé.
      console.error(
        '[contact] RESEND_API_KEY absente en production : le lead n’a pas pu être transmis.',
      );
      return json(
        {
          success: false,
          error: `Le formulaire est momentanément indisponible. ${FALLBACK}`,
        },
        { status: 500 },
      );
    }

    // Développement : aucun courriel n’est envoyé, et on le journalise sans
    // aucune donnée personnelle.
    console.info(`[contact] lead reçu (développement) — message de ${message.length} caractères.`);
    return json({ success: true });
  }

  // ── 8. Envoi ────────────────────────────────────────────────────────────────
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : '';
  const safeMessage = escapeHtml(message);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      // Sans ce signal, une lenteur de Resend bloque la fonction jusqu’au
      // délai de la plateforme — facturé, et invisible pour le visiteur.
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [CONTACT_EMAIL],
        // Adresse brute, jamais échappée : ce n’est pas du HTML.
        reply_to: email,
        subject: `Nouveau projet${FINE}: ${singleLine(name)}`,
        text: buildEmailText({ name, email, phone, message }),
        html: buildEmailHtml({ safeName, safeEmail, safePhone, safeMessage }),
      }),
    });

    if (!response.ok) {
      // Statut seul : le corps de la réponse Resend peut contenir l’adresse du
      // destinataire, donc une donnée personnelle.
      console.error(`[contact] Resend a refusé l’envoi — statut ${response.status}.`);
      return json(
        { success: false, error: `L’envoi n’a pas abouti de notre côté. ${FALLBACK}` },
        { status: 502 },
      );
    }

    return json({ success: true });
  } catch (error) {
    if (isTimeout(error)) {
      console.error(`[contact] Resend n’a pas répondu en ${RESEND_TIMEOUT_MS}${NBSP}ms.`);
      return json(
        {
          success: false,
          error: `Notre service d’envoi met trop de temps à répondre. ${FALLBACK}`,
        },
        { status: 504 },
      );
    }

    console.error('[contact] échec réseau vers Resend.');
    return json(
      { success: false, error: `L’envoi n’a pas abouti de notre côté. ${FALLBACK}` },
      { status: 502 },
    );
  }
}

/**
 * Version texte du courriel — meilleure délivrabilité, et lisible dans les
 * clients qui refusent le HTML.
 */
function buildEmailText(lead: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): string {
  const lines = [
    'Nouvelle demande de projet',
    '',
    `Nom      : ${lead.name}`,
    `E-mail   : ${lead.email}`,
  ];

  if (lead.phone) lines.push(`Téléphone: ${lead.phone}`);

  lines.push('', 'Message :', lead.message);

  return lines.join('\n');
}

/**
 * Gabarit HTML aux couleurs de la charte : ivoire #F6F3EE, blanc chaud #FFFDFA,
 * sable #EAE3D8, encre #17130F, terre cuite #C4552B. La terre cuite n’apparaît
 * que deux fois — le filet de tête et le point du logotype — la règle des trois
 * est donc tenue. Styles en ligne uniquement : les clients de messagerie
 * n’appliquent pas de feuille externe.
 */
function buildEmailHtml(lead: {
  safeName: string;
  safeEmail: string;
  safePhone: string;
  safeMessage: string;
}): string {
  const label =
    'padding:10px 0;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#6B6259;width:110px;vertical-align:top';
  const value = 'padding:10px 0;font-size:15px;line-height:1.6;color:#17130F;vertical-align:top';

  const phoneRow = lead.safePhone
    ? `<tr><td style="${label}">Téléphone</td><td style="${value}"><a href="tel:${lead.safePhone}" style="color:#17130F">${lead.safePhone}</a></td></tr>`
    : '';

  return `<div style="margin:0;padding:32px 16px;background:#F6F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#FFFDFA;border-top:3px solid #C4552B;padding:32px">
    <p style="margin:0;font-size:17px;font-weight:800;letter-spacing:-0.045em;color:#17130F">webtreize<span style="color:#C4552B">.</span></p>
    <h1 style="margin:28px 0 0;font-size:23px;line-height:1.3;font-weight:800;letter-spacing:-0.03em;color:#17130F">Nouvelle demande de projet</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:24px;border-collapse:collapse">
      <tr><td style="${label}">Nom</td><td style="${value}">${lead.safeName}</td></tr>
      <tr><td style="${label}">E-mail</td><td style="${value}"><a href="mailto:${lead.safeEmail}" style="color:#17130F">${lead.safeEmail}</a></td></tr>
      ${phoneRow}
    </table>
    <div style="margin-top:24px;padding-top:24px;border-top:1px solid #EAE3D8">
      <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#6B6259">Message</p>
      <p style="margin:12px 0 0;font-size:16px;line-height:1.7;color:#17130F;white-space:pre-wrap">${lead.safeMessage}</p>
    </div>
  </div>
</div>`;
}
