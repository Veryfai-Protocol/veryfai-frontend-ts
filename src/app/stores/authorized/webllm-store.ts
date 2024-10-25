import { WebLLMState } from '@/app/lib/types/webllm';
import { createStore } from 'zustand/vanilla';

export type WebLLMStoreAction = {
  setTimer: (value: unknown) => void;
};

export type WebLLMStore = WebLLMState & WebLLMStoreAction;

export const InitialState: WebLLMState = {
  timer: 0,
};

export const createWebLLMStore = (initState: WebLLMState = InitialState) => {
  return createStore<WebLLMStore>()((set) => ({
    ...initState,
    setTimer: (value: unknown) => set({ timer: value }),
  }));
};
