import { Reveal } from '@/components/motion/Reveal';
import { PROMISES } from '@/lib/data/site';

export function PromisesSection() {
  return (
    <section id="promesses" className="section-pad">
      <div className="site-container">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] text-center text-display-md font-extrabold">
            Trois choses qu&apos;on écrit noir sur blanc.
          </h2>
        </Reveal>

        <div className="mt-[clamp(2.75rem,6vw,5.375rem)] flex flex-wrap gap-[clamp(1.75rem,4vw,3.5rem)]">
          {PROMISES.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className="flex-[1_1_16.25rem]">
              <div className="rule-top">
                <h3 className="text-xl font-bold tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 text-base leading-[1.7] text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
