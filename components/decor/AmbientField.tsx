export function AmbientField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-hero-light" />
      <div className="absolute -right-[20%] top-[8%] h-[420px] w-[420px] rounded-full bg-accent/[0.04] blur-3xl" />
      <div className="absolute -left-[10%] bottom-[5%] h-[320px] w-[320px] rounded-full bg-navy/[0.03] blur-3xl" />
    </div>
  );
}
