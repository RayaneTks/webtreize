'use client';

import { Marquee } from '@/components/motion/Marquee';
import { CAPABILITY_MARQUEE } from '@/lib/data/site';

export function CapabilityMarquee() {
  return <Marquee items={CAPABILITY_MARQUEE} />;
}
