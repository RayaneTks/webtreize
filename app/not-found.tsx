import Link from 'next/link';
import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell>
        <section className="site-container flex min-h-[calc(100dvh-var(--header-height))] flex-col justify-center py-[clamp(4rem,10vw,8rem)]">
          <p className="eyebrow-accent">Erreur 404</p>
          <h1 className="mt-[clamp(1.125rem,2.4vw,1.75rem)] max-w-[14ch] text-display-lg font-extrabold">
            Page introuvable.
          </h1>
          <p className="lede mt-6 max-w-[42ch]">
            L&apos;adresse demandée n&apos;existe pas ou a été déplacée.
          </p>
          <div className="mt-[clamp(2rem,4vw,3rem)]">
            <Link href="/" className="btn-primary">
              Retour à l&apos;accueil
            </Link>
          </div>
        </section>
        <Footer />
      </ClientShell>
    </div>
  );
}
