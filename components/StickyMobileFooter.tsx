'use client';

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function StickyMobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/15 bg-void/95 px-4 pb-3 pt-3 backdrop-blur-xl md:hidden [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-lg items-center justify-center">
        <button
          type="button"
          onClick={scrollToContact}
          className="min-h-[48px] w-full rounded-full bg-action py-3.5 text-base font-black text-white shadow-action active:scale-[0.98]"
        >
          DEVIS GRATUIT
        </button>
      </div>
    </div>
  );
}
