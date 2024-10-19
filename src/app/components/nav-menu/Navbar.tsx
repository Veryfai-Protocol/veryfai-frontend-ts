'use client';

import { CiSearch } from 'react-icons/ci';
import { Logo } from '../logo/logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { useSearchStore } from '@/app/providers/unauthorized/search-store';
import { RegisterLogin } from '@/app/(unauthorized)/components/auth/register-login';
import Image from 'next/image';
import MONY_ICON from '../../../../public/money.svg';
import { checkFact } from '@/app/lib/data-fetching/factChecking';
import { APIResponse } from '@/app/lib/types';
import { useRouter } from 'next/navigation';
import { RESULT_ANALYSIS } from '@/site-settings/navigations';

export const Navbar = () => {
  const { inputValue, showVerifierForm, setInputValue, setShowVerifierForm } =
    useSearchStore((state) => state);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleVerifierClick = () => {
    setShowVerifierForm(true);
  };

  const handleCheck = async () => {
    const value = inputValue.trim();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response: APIResponse = await checkFact(value);
      if (response.status > 201) {
        setErrorMessage(response.data);
      } else {
        router.replace(`${RESULT_ANALYSIS.href}/${response.data.task_id}`);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth <= 640) {
        if (currentScrollY > lastScrollY) {
          setIsLogoVisible(false);
        }

        if (currentScrollY === 0) {
          setIsLogoVisible(true);
        }
      } else {
        setIsLogoVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header className="fixed  w-full flex flex-col items-center z-50">
        <div className="bg-yellow-400 text-black py-2 px-4 text-center  z-50">
          <p className="font-bold">
            Beta Version: This site is in active development.
          </p>
        </div>
        <nav
          className={`w-full flex bg-gradient-to-r from-[#224B9F] to-[#0C1B39] flex-col sm:flex-row items-center ${
            isLogoVisible ? 'p-4' : 'p-2'
          } sm:gap-16 gap-4 px-10`}
        >
          <div className="w-full flex flex-col md:flex-row items-center gap-4">
            {isLogoVisible && (
              <div className="flex items-center justify-between w-full md:w-fit">
                {/* Conditional Rendering for Logo Animation */}

                <div
                  className={`transition-all duration-1000 ease-in-out ${
                    isLogoVisible
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                  }`}
                >
                  <Logo />
                </div>

                <div className="lg:bg-[#29457D] px-6 rounded-md md:hidden">
                  <div
                    role="button"
                    className="flex text-white items-center gap-2  px-4 py-2 rounded-md"
                    onClick={handleVerifierClick}
                  >
                    <Image src={MONY_ICON} alt="" />
                    <p className="text-[20px] hidden lg:flex text-nowrap">
                      Earn as a Fact-checker
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Input Field Animation */}
            <div
              className={`transition-all md:w-[70%] w-full duration-1000 ease-in-out`}
            >
              <form
                className="flex justify-start relative w-full"
                onKeyDown={handleKeyDown}
              >
                <Input
                  type="text"
                  className={`rounded-xl bg-[#F3F4F6] py-5 pl-6 pr-10 w-full text-gray-700 focus:outline-none`}
                  placeholder="Type your statement here"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button
                  className="bg-[#1D1D1E] absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                  disabled={isLoading}
                  onClick={handleCheck}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <CiSearch className="w-5 h-5" />
                  )}
                </Button>
              </form>
              {errorMessage && (
                <div className="text-red-500 text-center mt-4">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>

          <div className="lg:bg-[#29457D] lg:px-6 px-2 rounded-md hidden md:flex">
            <div
              role="button"
              className="flex text-white items-center gap-2  px-4 py-2 rounded-md"
              onClick={handleVerifierClick}
            >
              <Image src={MONY_ICON} alt="" className="w-[24px] h-[24px]" />
              <p className="text-[20px] lg:flex hidden text-nowrap">
                Earn as a Fact-checker
              </p>
            </div>
          </div>
        </nav>
      </header>
      {showVerifierForm && <RegisterLogin />}
    </>
  );
};
