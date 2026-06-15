import { EnvelopeSimple, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';
import { SnapchatIcon } from '@/components/ui/SnapchatIcon';

export function ContactChannels({ className }: { className?: string }) {
  return (
    <ul className={className}>
      <li className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <MapPin size={20} weight="duotone" />
        </span>
        <div>
          <p className="font-medium text-ink">Basés à Marseille</p>
          <p className="text-sm text-muted">Interventions en PACA et à distance</p>
        </div>
      </li>
      <li className="mt-5 flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <EnvelopeSimple size={20} weight="duotone" />
        </span>
        <div>
          <p className="font-medium text-ink">Email</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-subtle text-sm">
            {CONTACT_EMAIL}
          </a>
        </div>
      </li>
      <li className="mt-5 flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFFC00] text-black">
          <SnapchatIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-medium text-ink">Snapchat</p>
          <Link
            href={SNAPCHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-subtle text-sm"
          >
            @webtreize
          </Link>
        </div>
      </li>
    </ul>
  );
}
