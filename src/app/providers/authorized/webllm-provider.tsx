'use client';

import {
  createWebLLMStore,
  WebLLMStore,
} from '@/app/stores/authorized/webllm-store';
import React, {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from 'react';
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
  const state = useRef();
  if (!storeRef.current) {
    storeRef.current = createWebLLMStore();
  }

  const handelMessage = (e: any) => {
    if (e.data.name === 'veryfaiMsg') {
      const data = e.data.data;
      storeRef.current?.setState({ processState: data });
    }
  };

  useEffect(() => {
    window.addEventListener('message', handelMessage);
    return () => {
      window.removeEventListener('message', handelMessage);
    };
  }, []);

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
