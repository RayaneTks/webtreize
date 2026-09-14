'use client';

import { useEffect } from 'react';
import { type AnalyticsEvent, track } from '@/lib/analytics';

/**
 * Émet un événement une fois, au montage de la page qui le porte.
 * Utilisé pour « visite_realisation » sur chaque étude de cas.
 */
export function TrackView({ event, props }: { event: AnalyticsEvent; props?: Record<string, string> }) {
  const serialized = props ? JSON.stringify(props) : '';

  useEffect(() => {
    track(event, serialized ? (JSON.parse(serialized) as Record<string, string>) : undefined);
  }, [event, serialized]);

  return null;
}
