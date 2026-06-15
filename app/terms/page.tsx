import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Conditions générales | WebTreize',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  redirect('/legal/cgv');
}
