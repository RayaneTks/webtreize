const ITEMS = ['Réponse sous 48h', '0€ sans engagement', 'Stack Next.js · React 19'] as const;

export function TrustStrip() {
  return (
    <div className="border-b border-line bg-surface">
      <div className="site-container py-4 md:py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted md:justify-between md:gap-x-0">
          {ITEMS.map((item, i) => (
            <li key={item} className="flex items-center gap-4">
              {i > 0 ? (
                <span className="hidden h-1 w-1 rounded-full bg-line-strong md:block" aria-hidden />
              ) : null}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
