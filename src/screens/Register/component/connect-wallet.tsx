import { Button } from "@/components/ui/button";
import { CloseButton } from "../Register-login";
import { useState } from "react";
import Spinner from "@/components/loader/loading-spinner";

type ConnectWalletType = {
  closeForm: () => void;
  onConnect: () => void;
};

export const ConnectWallet = ({ closeForm, onConnect }: ConnectWalletType) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onConnect()
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white p-2 sm:p-[6px] flex flex-col items-center rounded-3xl w-full max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-2rem)]  relative">
        <div className="bg-[#1E90FF] rounded-2xl text-white flex items-center justify-center w-[83px] h-[31px] top-0 z-50"
        style={{ position: 'absolute', transform: 'translateY(-50%)' }}
        >
          1/2
        </div>
        <div className="bg-white px-4 sm:px-6 w-full pt-4 pb-4 rounded-xl shadow-xl">
          <div className="flex items-end justify-end sticky top-2 right-2 z-10">
            <CloseButton onClick={closeForm} />
          </div>
          <div className="flex flex-col items-center border-b pb-4 sm:pb-7 mt-[-30px]">
            <img src="/wallet.svg" alt="" className="w-12 sm:w-16" />
            <h1 className="font-bold text-xl sm:text-2xl lg:text-[28px] font-sans text-center mt-2">Connect wallet</h1>
            <h2 className="text-sm sm:text-base lg:text-[20px] text-center text-[#6B7280] font-sans mt-2">
              Link your Crypto wallet to veryfai.io to start earning.
            </h2>
          </div>
          <div className="mt-3">
            <h1 className="font-medium text-[#4B5563] pb-3 text-sm sm:text-base">Select wallet</h1>
            <div className="flex flex-col gap-2 sm:gap-[12px] max-h-[40vh] overflow-y-auto scrollbar-hide pr-1">
              <SelectWallet
                name="MetaMask"
                imgSrc="/metamask.svg"
                isSelected={selectedWallet === "MetaMask"}
                onSelect={() => setSelectedWallet("MetaMask")}
              />
              <SelectWallet
                name="Trust Wallet"
                imgSrc="/trustwallet.svg"
                isSelected={selectedWallet === "Trust Wallet"}
                onSelect={() => setSelectedWallet("Trust Wallet")}
              />
              <SelectWallet
                name="Phantom"
                imgSrc="/phantom.svg"
                isSelected={selectedWallet === "Phantom"}
                onSelect={() => setSelectedWallet("Phantom")}
              />
              <SelectWallet
                name="Coinbase wallet"
                imgSrc="/coin.svg"
                isSelected={selectedWallet === "Coinbase wallet"}
                onSelect={() => setSelectedWallet("Coinbase wallet")}
              />
              <SelectWallet
                name="Binance web3 wallet"
                imgSrc="/binance.svg"
                isSelected={selectedWallet === "Binance web3 wallet"}
                onSelect={() => setSelectedWallet("Binance web3 wallet")}
              />
            </div>
            <Button
              disabled={!selectedWallet || isLoading}
              className={`uppercase w-full rounded-[12px] ${!selectedWallet || isLoading ? "bg-[#9CA3AF] hover:bg-[#9CA3AF]" : "bg-[#1E90FF] hover:bg-[#1E90FF]"} h-[40px] sm:h-[48px] lg:h-[64px] text-sm sm:text-base lg:text-[20px] font-semibold mt-4 sm:mt-6`}
              onClick={handleConnect}
            >
              {isLoading ? <Spinner /> : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

type SelectWalletProps = {
  name: string;
  imgSrc: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const SelectWallet = ({
  name,
  imgSrc,
  isSelected,
  onSelect,
}: SelectWalletProps) => {
  return (
    <div
      className="flex items-center cursor-pointer justify-between bg-[#F3F4F6] rounded-lg py-2 sm:py-[14px] px-3 sm:px-[16px]"
      onClick={onSelect}
    >
      <div className="flex gap-2 sm:gap-[16px] items-center">
        <img src={imgSrc} alt={name} className="w-5 sm:w-6 lg:w-auto" />
        <h1 className="text-xs sm:text-sm lg:text-[20px] font-sans font-medium">{name}</h1>
      </div>
      <div
        className={`rounded-full w-5 h-5 sm:w-6 sm:h-6 lg:w-[32px] lg:h-[32px] flex items-center justify-center border ${
          isSelected
            ? "bg-[#1E90FF] border-[#1E90FF]"
            : "bg-white border-[#D1D5DB]"
        }`}
      >
        {isSelected && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[12px] sm:h-[12px] lg:w-[17px] lg:h-[16px]"
          >
            <rect x="0.5" width="16" height="16" rx="8" fill="white" />
          </svg>
        )}
      </div>
    </div>
  );
};