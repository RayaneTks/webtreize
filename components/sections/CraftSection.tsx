import { Reveal } from '@/components/motion/Reveal';
import { CRAFT_BLOCKS } from '@/lib/data/site';
import { cn } from '@/lib/utils';

export function CraftSection() {
  return (
    <section id="metier" className="section-pad bg-surface">
      <div className="site-container grid gap-[clamp(4.5rem,10vw,9.375rem)]">
        {CRAFT_BLOCKS.map((block, index) => (
          <div
            key={block.id}
            className={cn(
              'flex flex-wrap items-center gap-[clamp(2rem,5vw,5rem)]',
              index % 2 === 1 && 'flex-wrap-reverse',
            )}
          >
            {index % 2 === 1 && <Plate label={block.plate} />}

            <Reveal className="min-w-[min(100%,17.5rem)] flex-[1_1_21.25rem]">
              <p className="eyebrow-accent">{block.eyebrow}</p>
              <h2 className="mt-4 max-w-[18ch] text-display-sm font-extrabold">{block.title}</h2>
              <p className="lede mt-5 max-w-[46ch]">{block.body}</p>
            </Reveal>

            {index % 2 === 0 && <Plate label={block.plate} />}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Plaque image — remplacer par <Image> quand les photos client arrivent. */
function Plate({ label }: { label: string }) {
  return (
    <Reveal delay={0.06} className="min-w-[min(100%,17.5rem)] flex-[1_1_23.75rem]">
      <div className="plate flex aspect-[4/3] items-end p-[clamp(1rem,2vw,1.5rem)]">
        <span className="eyebrow">{label}</span>
      </div>
    </Reveal>
  );
}
