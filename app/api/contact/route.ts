import { NextRequest, NextResponse } from 'next/server';

// TODO: AVANT MISE EN LIGNE
// 1. Créer un compte sur resend.com
// 2. Ajouter RESEND_API_KEY dans .env.local
// 3. Remplacer l'adresse "onboarding@resend.dev" par l'email réel WebTreize
// 4. Configurer le domaine WebTreize dans Resend (DMARC)

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'contact@webtreize.com';

type ContactPayload = { name: string; email: string; message: string; budget?: string };

function validate(data: unknown): data is ContactPayload {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  if (typeof d.name !== 'string' || d.name.trim().length < 2) return false;
  if (typeof d.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return false;
  if (typeof d.message !== 'string' || d.message.trim().length < 10) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!validate(body)) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs correctement.' },
        { status: 400 },
      );
    }

    const { name, email, message, budget } = body;

    if (!RESEND_API_KEY) {
      console.log('── NOUVEAU LEAD WEBTREIZE ──');
      console.log(`Nom: ${name} | Email: ${email} | Budget: ${budget || 'NC'}`);
      console.log(`Message: ${message}`);
      console.log('────────────────────────────');
      return NextResponse.json({ success: true });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'WebTreize <noreply@webtreize.com>',
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Nouveau projet de ${name}${budget ? ` (${budget})` : ''}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#001F3F">Nouvelle demande de projet</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#888;width:100px">Nom</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              ${budget ? `<tr><td style="padding:8px 0;color:#888">Budget</td><td style="padding:8px 0">${budget}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px">
              <p style="color:#666;margin:0 0 8px;font-size:14px">Message :</p>
              <p style="color:#001F3F;margin:0;white-space:pre-wrap">${message}</p>
            </div>
          </div>`,
      }),
    });

    if (!res.ok) {
      console.error('Resend error:', await res.json().catch(() => ({})));
      return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
