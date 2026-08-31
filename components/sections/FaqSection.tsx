import { Reveal } from '@/components/motion/Reveal';
import { FAQ_ITEMS } from '@/lib/data/faq';

export function FaqSection() {
  return (
    <section id="questions" className="section-pad">
      <div className="mx-auto w-full max-w-[50rem] px-5 sm:px-6 md:px-8">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,4vw,3.125rem)] font-extrabold leading-[1.05] tracking-[-0.045em]">
            Questions fréquentes
          </h2>
        </Reveal>

        {FAQ_ITEMS.map((item, index) => (
          <Reveal key={item.q} delay={index * 0.04}>
            <details className="faq-item">
              <summary>
                {item.q}
                <span className="faq-sign" aria-hidden="true">
                  →
                </span>
              </summary>
              <p className="mt-4 max-w-[62ch] text-[1.03125rem] leading-[1.72] text-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
