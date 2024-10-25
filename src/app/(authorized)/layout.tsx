import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { WebLLMStoreProvider } from '../providers/authorized/webllm-provider';

type Props = {
  children: React.ReactNode;
};

export default function AuthorizedLayout({ children }: Props) {
  return (
    <WebLLMStoreProvider>
      <>{children}</>
    </WebLLMStoreProvider>
  );
}
