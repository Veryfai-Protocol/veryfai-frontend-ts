import type { Metadata } from 'next';
import './globals.css';
import { Figtree } from 'next/font/google';
import { Web3Provider } from './providers';
import GoogleAnalytics from './components/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'VeryAi',
};

const figtree = Figtree({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
