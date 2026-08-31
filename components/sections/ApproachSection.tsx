import { Reveal } from '@/components/motion/Reveal';
import { APPROACH } from '@/lib/data/site';

export function ApproachSection() {
  const [before, after] = APPROACH.quote.split(APPROACH.emphasis);

  return (
    <section id="approche" className="section-pad">
      <div className="site-container text-center">
        <Reveal>
          <p className="mx-auto max-w-[30ch] font-serif text-[clamp(1.75rem,4.6vw,3.625rem)] font-light leading-[1.16] tracking-[-0.02em] text-ink">
            {before}
            <em className="italic text-accent">{APPROACH.emphasis}</em>
            {after}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="lede mx-auto mt-[clamp(1.625rem,3vw,2.375rem)] max-w-[56ch]">{APPROACH.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
