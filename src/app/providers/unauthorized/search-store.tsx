'use client';

import {
  createSearchStore,
  SearchStore,
} from '@/app/stores/unauthorized/search-store';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

export type SearchStoreApi = ReturnType<typeof createSearchStore>;

export const SearchStoreContext = createContext<SearchStoreApi | undefined>(
  undefined
);

export interface SearchStoreProviderProps {
  children: ReactNode;
}

export const SearchStoreProvider = ({ children }: SearchStoreProviderProps) => {
  const storeRef = useRef<SearchStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSearchStore();
  }

  return (
    <SearchStoreContext.Provider value={storeRef.current}>
      {children}
    </SearchStoreContext.Provider>
  );
};

export const useSearchStore = <T,>(selector: (store: SearchStore) => T): T => {
  const searchStoreContext = useContext(SearchStoreContext);

  if (!searchStoreContext) {
    throw new Error(`useSearchStore must be used within SearchStoreProvider`);
  }

  return useStore(searchStoreContext, selector);
};
