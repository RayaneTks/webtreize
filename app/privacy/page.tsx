import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | WebTreize',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  redirect('/legal/politique-confidentialite');
}
