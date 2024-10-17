'use client';

import { RegisterLogin } from '@/app/(unauthorized)/components/auth/register-login';
import { Logo } from '../logo/logo';
import { useSearchStore } from '@/app/providers/unauthorized/search-store';

export const Header = () => {
  const { showVerifierForm, setShowVerifierForm } = useSearchStore(
    (state) => state
  );

  return (
    <>
      <header className="w-full flex pt-4 items-center z-50">
        <nav
          className={`w-full flex flex-row items-center justify-between p-2 sm:gap-16 gap-4 px-10`}
        >
          {/* Conditional Rendering for Logo Animation */}
          <div className={`transition-all duration-1000 ease-in-out`}>
            <Logo />
          </div>
          <button
            onClick={() => setShowVerifierForm(!showVerifierForm)}
            className="flex text-white items-center gap-2 lg:bg-[#29457D] px-4 py-2 rounded-md"
          >
            <img src="/money.svg" alt="" />
            <p className="text-[20px] hidden lg:flex">Earn as a Fact-checker</p>
          </button>
        </nav>
      </header>
      {showVerifierForm && <RegisterLogin />}
    </>
  );
};
