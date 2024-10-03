import {create} from 'zustand';

interface SearchStore {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
}));