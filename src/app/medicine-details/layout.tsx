import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicine Information Portal',
  description: 'Search for any medicine to get comprehensive details including composition, usage, side effects, dosage, price, and verified user reviews.',
  keywords: ['medicine information', 'drug database', 'pill identifier', 'medication search', 'generic drugs'],
  openGraph: {
    title: 'Medicine Information Portal | MediQuest',
    description: 'Get detailed information about any medicine instantly.',
    url: 'https://medi-quest.online/medicine-details',
  }
};

export default function MedicineDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
