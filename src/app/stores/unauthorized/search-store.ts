import { SearchState } from '@/app/lib/types/search';
import { createStore } from 'zustand/vanilla';

export type SearchStoreAction = {
  setInputValue: (value: string) => void;
  setShowVerifierForm: (show: boolean) => void;
  setShowConnectWallet: (show: boolean) => void;
  setIsStakeSuccessful: (show: boolean) => void;
};

export type SearchStore = SearchState & SearchStoreAction;

export const InitialState: SearchState = {
  inputValue: '',
  showVerifierForm: false,
  showConnectWallet: false,
  isStakeSuccessful: false,
};

export const createSearchStore = (initState: SearchState = InitialState) => {
  return createStore<SearchStore>()((set) => ({
    ...initState,
    setInputValue: (value) => set({ inputValue: value }),
    setShowVerifierForm: (show) => set({ showVerifierForm: show }),
    setShowConnectWallet: (show) => set({ showConnectWallet: show }),
    setIsStakeSuccessful: (show) => set({ isStakeSuccessful: show }),
  }));
};
