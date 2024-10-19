'use client';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useSearchStore } from '@/app/providers/unauthorized/search-store';
import { suggestions } from '@/app/constants/suggestions';
import { checkFact } from '@/app/lib/data-fetching/factChecking';
import { APIResponse } from '@/app/lib/types';
import { useRouter } from 'next/navigation';
import { RESULT_ANALYSIS } from '@/site-settings/navigations';

export const FactSearch = () => {
  const { inputValue, setInputValue } = useSearchStore((state) => state);
  const [animateUp, setAnimateUp] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleCheck = async () => {
    const value = inputValue.trim();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response: APIResponse = await checkFact(value);
      if (response.status > 201) {
        setErrorMessage(response.data);
      } else {
        router.push(`${RESULT_ANALYSIS.href}/${response.data.task_id}`);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.trim().length > 0);
    setAnimateUp(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const filteredSuggestions = useMemo(
    () =>
      inputValue.trim()
        ? suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
          )
        : [],
    [inputValue]
  );

  return (
    <div
      className={`lg:w-[60%] sm:w-[80%] w-[98%] ${
        inputValue.length > 0 ? 'shadow-2xl' : ''
      } relative p-2 rounded-t-xl ${
        animateUp ? 'bg-transparent shadow-none' : ''
      } transition-all duration-300`}
    >
      <form className="flex items-center" onKeyDown={handleKeyDown}>
        <Input
          type="text"
          className={`rounded-2xl transition-all duration-300 ${
            inputValue.length > 0 ? 'bg-white' : 'bg-[#F3F4F6]'
          } ${
            animateUp ? 'translate-y-[-50px] opacity-0' : ''
          } py-7 pl-6 md:pr-[140px] w-full text-gray-700 focus:outline-none`}
          placeholder="Type your statement here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue.length > 0 && (
          <Button
            className={`absolute right-4 bg-[#1D1D1E] text-white rounded-full flex items-center gap-2 md:h-[50px] md:w-[123px] w-12 h-12 justify-center hover:bg-[#1D1D1E] transition-all duration-300 ${
              animateUp ? 'translate-y-[-50px] opacity-0' : ''
            }`}
            type="submit"
            disabled={isLoading}
            onClick={handleCheck}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <CiSearch size={20} />
                <span className="hidden md:flex">Check</span>
              </>
            )}
          </Button>
        )}
      </form>

      {errorMessage && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}

      <div
        className={`absolute left-0 right-0 top-full bg-white rounded-2xl shadow-2xl rounded-b-xl z-10 overflow-hidden transition-all duration-300 ease-in-out ${
          showSuggestions && filteredSuggestions.length > 0
            ? 'max-h-[300px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        {filteredSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              setInputValue(suggestion);
              setShowSuggestions(false);
            }}
          >
            <CiSearch className="mr-2 text-gray-500" />
            <span>{suggestion}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
