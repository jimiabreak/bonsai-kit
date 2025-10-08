import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gift Cards | Commonwealth Coffee',
  description: 'Send a physical Commonwealth gift card directly to your special someone. Perfect for coffee lovers.',
  openGraph: {
    title: 'Gift Cards | Commonwealth Coffee',
    description: 'Send a physical Commonwealth gift card directly to your special someone. Perfect for coffee lovers.',
    type: 'website',
  },
};

export default function GiftCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
