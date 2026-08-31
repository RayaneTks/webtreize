import { Reveal } from '@/components/motion/Reveal';
import { CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';
import { AUDIT } from '@/lib/data/site';

export function AuditSection() {
  return (
    <section
      id="audit"
      className="bg-ink-deep py-[clamp(5.25rem,12vw,11rem)] text-center text-canvas"
      aria-labelledby="audit-title"
    >
      <div className="site-container">
        <Reveal>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-canvas/55">
            {AUDIT.eyebrow}
          </p>
          <h2
            id="audit-title"
            className="mx-auto mt-[clamp(1.125rem,2.4vw,1.75rem)] max-w-[20ch] text-display-lg font-extrabold text-canvas"
          >
            {AUDIT.title}
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mx-auto mt-[clamp(1.375rem,2.6vw,2rem)] max-w-[54ch] text-[clamp(1.03125rem,1.35vw,1.21875rem)] leading-[1.7] text-canvas/70">
            {AUDIT.body}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-[clamp(1.75rem,3.4vw,2.75rem)] font-serif text-[clamp(3.25rem,9vw,7.75rem)] font-light leading-none tracking-[-0.03em] text-canvas">
            {AUDIT.delay}
            <span className="text-[0.42em] tracking-[0.02em]"> {AUDIT.delayUnit}</span>
          </p>
          <p className="mt-2.5 text-[0.90625rem] text-canvas/55">{AUDIT.note}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-[clamp(2rem,4vw,3.25rem)] flex flex-wrap items-center justify-center gap-x-7 gap-y-3.5">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary-inverse">
              Demander mon audit
            </a>
            <a
              href={SNAPCHAT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[3.375rem] items-center text-[1.03125rem] font-semibold text-canvas/80 transition-colors hover:text-white"
            >
              ou par Snapchat&nbsp;→
            </a>
          </div>
          <p className="mt-[clamp(1.625rem,3vw,2.375rem)] text-[0.90625rem] text-canvas/50">
            {CONTACT_EMAIL} · Marseille &amp; PACA · lun–ven 9h–18h
          </p>
        </Reveal>
      </div>
    </section>
  );
}
