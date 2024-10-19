import type { Metadata } from 'next';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { Web3Provider } from './providers';

export const metadata: Metadata = {
  title: 'VeryAi',
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
