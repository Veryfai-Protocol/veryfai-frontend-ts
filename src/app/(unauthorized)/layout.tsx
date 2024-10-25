import React from 'react';
import { SearchStoreProvider } from '../providers/unauthorized/search-store';
import '@rainbow-me/rainbowkit/styles.css';

type Props = {
  children: React.ReactNode;
};

export default function UnAuthorizedLayout({ children }: Props) {
  return (
    <>
      <SearchStoreProvider>
        <>{children}</>
      </SearchStoreProvider>
    </>
  );
}
