import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'International Country Codes & Dialing Codes | ZippCall',
  description: 'Find the international dialing code for any country. Easily look up country codes like +44 for the UK, +1 for the US/Canada, +61 for Australia.',
};

export default function CountryCodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 