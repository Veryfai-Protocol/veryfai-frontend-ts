'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import Spinner from '@/app/components/loader/loading-spinner';
import { useSearchStore } from '@/app/providers/unauthorized/search-store';
import { ConnectWallet } from './connect-wallet';
import { StakeNEarn } from './stake-n-earn';
import ModalWrapper from './ModalWrapper';
import { LogoSVG } from '@/assets/Logo';
import { CloseButton } from './closeButton';
import { LoginConnectWallet } from './login-connect-wallet';
import { MoveRight } from 'lucide-react';

export const RegisterLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showConnectWallet, setShowConnectWallet, setShowVerifierForm } =
    useSearchStore((state) => state);
  const [showLoginConnectWallet, setShowLoginConnectWallet] = useState(false);
  const [showStakeNEarn, setShowStakeNEarn] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
      setShowConnectWallet(true);
    }, 2000);
  };

  const handleLogin = () => {
    setIsLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
      setShowLoginConnectWallet(true);
    }, 2000);
  };

  const handleConnectWallet = () => {
    setIsLoading(true);
    // Simulating wallet connection
    setTimeout(() => {
      setIsLoading(false);
      setShowStakeNEarn(true);
    }, 2000);
  };

  const handleCloseForm = () => {
    setShowVerifierForm(false);
  };

  if (showStakeNEarn) {
    return <StakeNEarn closeForm={handleCloseForm} />;
  }

  if (showLoginConnectWallet) {
    return (
      <LoginConnectWallet
        closeForm={handleCloseForm}
        onConnect={handleConnectWallet}
        handleRegister={handleRegister}
      />
    );
  }

  if (showConnectWallet) {
    return (
      <ConnectWallet
        closeForm={handleCloseForm}
        onConnect={handleConnectWallet}
      />
    );
  }

  return (
    <ModalWrapper>
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl z-10">
          <div className="bg-white rounded-3xl py-6 px-8">
            <Spinner />
          </div>
        </div>
      )}
      <div className="bg-white px-6 pt-4 pb-4 rounded-xl bg-center shadow-xl bg-cover bg-no-repeat  bg-[url('/login-img.png')]">
        <div className="flex items-center justify-between">
          <LogoSVG />
          <CloseButton onClick={handleCloseForm} />
        </div>

        <div className="flex flex-col items-center gap-4 justify-center mt-36 bg-white rounded-2xl p-4">
          <h1 className="text-3xl font-bold">
            Earn as a <span className="text-[#16974D]">Fact-Checker</span>
          </h1>
          <p className="text-center text-[#6B7280]">
            Join millions of persons around the world and earn by verifying
            statements for accuracy and truth.
          </p>
          <Button
            className="w-[90%] gap-1 uppercase text-[16px] hover:bg-sky-400 bg-blue-blue1 px-4 h-[44px] rounded-lg"
            onClick={handleRegister}
            disabled={isLoading}
          >
            Register
            <MoveRight size={12} strokeWidth={3} />
          </Button>
          <Button
            className="w-[90%] outline-none border-none shadow-none uppercase text-[16px] hover:bg-transparent bg-transparent text-blue-blue1 px-4 h-[44px] rounded-lg"
            onClick={handleLogin}
            disabled={isLoading}
          >
            Login
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};
