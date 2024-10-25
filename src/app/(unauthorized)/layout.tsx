import React from 'react';
import { SearchStoreProvider } from '../providers/unauthorized/search-store';
import '@rainbow-me/rainbowkit/styles.css';
import { Toaster } from '../components/ui/toaster';

type Props = {
  children: React.ReactNode;
};

export default function UnAuthorizedLayout({ children }: Props) {
  return (
    <>
      <SearchStoreProvider>
        <>{children}</>
      <Toaster />
      </SearchStoreProvider>
    </>
  );
}
