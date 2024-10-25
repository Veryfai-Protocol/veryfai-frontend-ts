'use client';

import {
  createWebLLMStore,
  WebLLMStore,
} from '@/app/stores/authorized/webllm-store';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

export type WebLLMStoreApi = ReturnType<typeof createWebLLMStore>;

export const WebLLMStoreContext = createContext<WebLLMStoreApi | undefined>(
  undefined
);

export interface WebLLMStoreProviderProps {
  children: ReactNode;
}

export const WebLLMStoreProvider = ({ children }: WebLLMStoreProviderProps) => {
  const storeRef = useRef<WebLLMStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createWebLLMStore();
  }

  return (
    <WebLLMStoreContext.Provider value={storeRef.current}>
      {children}
    </WebLLMStoreContext.Provider>
  );
};

export const useWebLLMStore = <T,>(selector: (store: WebLLMStore) => T): T => {
  const webLLMStoreContext = useContext(WebLLMStoreContext);

  if (!webLLMStoreContext) {
    throw new Error(`useWebLLMStore must be used within WebLLMStoreProvider`);
  }

  return useStore(webLLMStoreContext, selector);
};
