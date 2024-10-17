'use client';

import { Header } from '@/app/components/nav-menu/Header';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFilePen, FaRegCircleCheck } from 'react-icons/fa6';
import LOGO from '../../../../public/hidden-logo.svg';
import { useSearchStore } from '@/app/providers/unauthorized/search-store';
import { suggestions } from '@/app/constants/suggestions';

export const HomeBanner = () => {
  const { inputValue, setInputValue } = useSearchStore((state) => state);
  const [animateUp, setAnimateUp] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheck = useCallback(async () => {
    if (inputValue.trim()) {
      setIsLoading(true);
      setErrorMessage(null);
      // try {
      //   const response = await FactCheckingService.checkFact(inputValue);
      //   console.log('Fact check response:', response);
      //   navigate(`/result-analysis/${encodeURIComponent(response.task_id)}`);
      // } catch (error: any) {
      //   if (error.response) {
      //     console.error('Error status:', error.response.status);
      //     console.error('Error data:', error.response.data);
      //     setErrorMessage(
      //       `Error: ${error.response.data.message || 'Something went wrong'}`
      //     );
      //   } else {
      //     console.error('Error message:', error.message);
      //     setErrorMessage('An unknown error occurred. Please try again.');
      //   }
      // } finally {
      //   setIsLoading(false);
      // }
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <div className="bg-gradient-to-r from-[#224B9F] to-[#0C1B39] w-full pt-8 rounded-b-3xl">
      <Header />
      <div className="lg:h-[90%] h-full w-full pb-12 md:px-24 px-4 pt-6 flex flex-col items-center lg:gap-10 gap-8">
        <Image
          src={LOGO}
          alt="logo"
          className={`w-full max-w-[50px] md:max-w-[100px] object-contain transition-all duration-300`}
        />

        <div
          className={`flex flex-col md:flex-row gap-4 items-center transition-all duration-300`}
        >
          <div className="flex gap-4 items-center">
            <div className="flex gap-3 bg-[#16974D] rounded-lg text-white items-center px-4 py-2">
              <FaRegCircleCheck size={20} />
              <p className="md:text-[24px]">Verify</p>
            </div>
            <p className="md:text-[24px] text-white">any</p>
            <div className="flex gap-3 bg-[#1E90FF] text-white rounded-lg items-center px-4 py-2">
              <FaFilePen size={20} />
              <p className="md:text-[24px]">statements</p>
            </div>
          </div>
          <p className="md:text-[24px] text-white">for accuracy and truth</p>
        </div>

        <div
          className={`lg:w-[60%] sm:w-[80%] w-[98%] ${
            inputValue.length > 0 ? 'shadow-2xl' : ''
          } relative p-2 rounded-t-xl ${
            animateUp ? 'bg-transparent shadow-none' : ''
          } transition-all duration-300`}
        >
          <div className="flex items-center">
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
              onKeyDown={handleKeyDown}
            />
            {inputValue.length > 0 && (
              <Button
                className={`absolute right-4 bg-[#1D1D1E] text-white rounded-full flex items-center gap-2 md:h-[50px] md:w-[123px] w-12 h-12 justify-center hover:bg-[#1D1D1E] transition-all duration-300 ${
                  animateUp ? 'translate-y-[-50px] opacity-0' : ''
                }`}
                onClick={handleCheck}
                disabled={isLoading}
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
          </div>

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
      </div>
    </div>
  );
};
