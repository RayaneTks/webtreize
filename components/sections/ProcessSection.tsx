import { Reveal } from '@/components/motion/Reveal';
import { PROCESS_STEPS } from '@/lib/data/site';

export function ProcessSection() {
  return (
    <section id="methode" className="section-pad bg-surface">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Comment ça se passe</p>
          <h2 className="mt-4 max-w-[20ch] text-display-md font-extrabold">
            Quatre temps, sans mauvaise surprise.
          </h2>
        </Reveal>

        <ol className="mt-[clamp(2.5rem,5vw,4.5rem)] flex flex-wrap gap-[clamp(1.5rem,3.4vw,2.75rem)]">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05} className="flex-[1_1_13.75rem]">
              <li className="rule-top list-none">
                <span className="text-[0.9375rem] font-extrabold text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[1.1875rem] font-bold tracking-[-0.025em]">{step.title}</h3>
                <p className="mt-2.5 text-[0.96875rem] leading-[1.7] text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
