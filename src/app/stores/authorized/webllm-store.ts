import { WebLLMState } from '@/app/lib/types/webllm';
import { createStore } from 'zustand/vanilla';

export type WebLLMStoreAction = {
  setTimer: (value: unknown) => void;
  setProcessState: (states: string[]) => void;
  setConnected: (connected: boolean) => void;
  setAppLoaded: (value: boolean) => void;
};

export type WebLLMStore = WebLLMState & WebLLMStoreAction;

export const InitialState: WebLLMState = {
  timer: 0,
  processState: [],
  connected: false,
  appLoaded: false,
};

export const createWebLLMStore = (initState: WebLLMState = InitialState) => {
  return createStore<WebLLMStore>()((set) => ({
    ...initState,
    setTimer: (value: unknown) => set({ timer: value }),
    setProcessState: (value: string[]) => set({ processState: value }),
    setConnected: (value: boolean) => set({ connected: value }),
    setAppLoaded: (value: boolean) => set({ appLoaded: value }),
  }));
};
