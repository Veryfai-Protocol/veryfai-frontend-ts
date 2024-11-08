'use client';

import { RegisterLogin } from '@/app/(unauthorized)/components/auth/register-login';
import { useSearchStore } from '@/app/providers/unauthorized/search-store';

export const Earn = () => {
  const { showVerifierForm, setShowVerifierForm } = useSearchStore(
    (state) => state
  );

  const handleClick = () => {
    setShowVerifierForm(true);
  };
  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        <span className="text-white text-xl">Earn as a Fact-checker</span>
      </div>
      {showVerifierForm && <RegisterLogin />}
    </>
  );
};
