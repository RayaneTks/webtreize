import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WebTreize | Flyer Story',
  robots: 'noindex, nofollow',
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-dvh overflow-hidden">{children}</div>;
}
