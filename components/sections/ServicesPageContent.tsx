import { Reveal } from '@/components/motion/Reveal';
import { GOOGLE_BUSINESS_SERVICE, SERVICES } from '@/lib/data/site';
import { cn } from '@/lib/utils';

const ALL_SERVICES = [...SERVICES, GOOGLE_BUSINESS_SERVICE];

const EYEBROWS: Record<string, string> = {
  web: 'Le site',
  seo: 'La visibilité',
  apps: 'Les outils',
  google: 'La fiche Google',
};

export function ServicesPageContent() {
  return (
    <section className="section-pad border-t border-line bg-surface">
      <div className="site-container grid gap-[clamp(3.5rem,8vw,7rem)]">
        {ALL_SERVICES.map((service, index) => (
          <div
            key={service.id}
            className={cn(
              'flex flex-wrap gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-6',
              index > 0 && 'rule-top pt-[clamp(2.5rem,5vw,4rem)]',
            )}
          >
            <Reveal className="min-w-[min(100%,16rem)] flex-[1_1_22rem]">
              <p className="eyebrow-accent">{EYEBROWS[service.id] ?? 'Service'}</p>
              <h2 className="mt-4 max-w-[16ch] text-display-sm font-extrabold">{service.title}</h2>
            </Reveal>

            <Reveal delay={0.06} className="min-w-[min(100%,16rem)] flex-[1_1_22rem]">
              <p className="lede max-w-[46ch]">{service.description}</p>
              <ul className="mt-7 grid gap-3.5">
                {service.points.map((point) => (
                  <li key={point} className="rule-top pt-3.5 text-base text-ink">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
