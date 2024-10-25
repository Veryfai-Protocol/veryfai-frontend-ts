import type { Metadata } from 'next';
import './globals.css';
import { Figtree } from 'next/font/google';
import { Web3Provider } from './providers';
import Script from 'next/script';

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CGZDTB9YJF"
        ></Script>
        <Script id="google-analytics">
          {`
      window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CGZDTB9YJF');
    `}
        </Script>
      </head>
      <body className={figtree.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
