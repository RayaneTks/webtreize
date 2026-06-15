'use client';

import Link from 'next/link';
import { ArrowLeft, House } from '@phosphor-icons/react';
import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell>
        <section className="site-container flex min-h-[calc(100dvh-var(--header-height))] flex-col justify-center py-20">
          <p className="text-sm font-medium text-accent">Erreur 404</p>
          <h1 className="mt-4 max-w-lg text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            Page introuvable
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            L&apos;URL demandée n&apos;existe pas ou a été déplacée.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="secondary" onClick={() => window.history.back()}>
              <ArrowLeft size={18} weight="bold" />
              Revenir
            </Button>
            <Link href="/" className={cn(buttonVariants({ size: 'md' }))}>
              <House size={18} weight="bold" />
              Accueil
            </Link>
          </div>
        </section>
        <Footer />
      </ClientShell>
    </div>
  );
}
