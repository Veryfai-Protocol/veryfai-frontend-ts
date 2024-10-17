import type { Metadata } from 'next';
import './globals.css';
import { Alfa_Slab_One, Montserrat } from 'next/font/google';

export const metadata: Metadata = {
  title: 'VeryAi',
};
// const alfaSlab = Alfa_Slab_One({
//   preload: false,
//   weight: '300',
// });
const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
