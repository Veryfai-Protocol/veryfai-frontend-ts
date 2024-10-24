import React from 'react';
import { BetaBanner } from '../components/beta-banner/beta-banner';
import { SearchStoreProvider } from '../providers/unauthorized/search-store';
import '@rainbow-me/rainbowkit/styles.css';

type Props = {
  children: React.ReactNode;
};

export default function UnAuthorizedLayout({ children }: Props) {
  return (
    <>
      {/* <BetaBanner /> */}
      <SearchStoreProvider>
        <>{children}</>
      </SearchStoreProvider>
    </>
  );
}
