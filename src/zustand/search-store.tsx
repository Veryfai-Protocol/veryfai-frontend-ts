import { create } from 'zustand';

interface SearchStore {
  inputValue: string;
  setInputValue: (value: string) => void;
  showVerifierForm: boolean;
  setShowVerifierForm: (show: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
  showVerifierForm: false,
  setShowVerifierForm: (show) => set({ showVerifierForm: show }),
}));