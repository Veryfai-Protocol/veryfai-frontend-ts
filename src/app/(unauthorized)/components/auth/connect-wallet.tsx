// import { Button } from "@/components/ui/button";
import { CloseButton } from "../Register-login";
import { useState } from "react";
import Spinner from "@/components/loader/loading-spinner";
import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseEther } from "ethers";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import { abi } from "@/contracts/abi"
import { EthStakeInput } from "./eth-stake-input";
import { longText } from "./stake-n-earn";
import { ReadMoreText } from "@/components/read-more-text/read-more-text";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "@/zustand/search-store";

type ConnectWalletType = {
  closeForm: () => void;
  onConnect: () => void;
};

export const ConnectWallet = ({ closeForm }: ConnectWalletType) => {
  const navigate = useNavigate()
  const [stakeInputValue, setStakeInputValue] = useState<string | undefined>(undefined);
  const {isStakeSuccessful, setIsStakeSuccessful} = useSearchStore();
  const {isConnected} = useAccount()
  // const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS;
  const {  writeContractAsync } = useWriteContract()
  // const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {data: stake} = useReadContract({
    address: '0xf4B070EB6A6B460c4235aa4262213c2778ccE269',
    abi,
    functionName: 'totalStaked',
  })

  const handleStake = async () => {
    if (!stakeInputValue) {
      alert("Please enter a valid amount to stake.");
      return;
    }
    setIsLoading(true);
    setIsStakeSuccessful(false);

    const ether = parseEther(stakeInputValue);
  
    try {
      await writeContractAsync({
        address: '0xf4B070EB6A6B460c4235aa4262213c2778ccE269',
        abi,
        functionName: 'stake',
        args: [],
        value: ether,
      });
      setIsStakeSuccessful(true);
      navigate("/dashboard")
    } catch (error) {
      console.error("Error while staking:", error);
      alert("An error occurred while staking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const renderStake = () => {
    if (stake === undefined) {
      return 'No stake data available';
    }
    if (typeof stake === 'bigint') {
      return `Stake: ${stake.toString()}`;
    }
    return 'Invalid stake data';
  };

  const handleDone = () => {
    navigate("/dashboard");
  }

  const isStakeValueValid = stakeInputValue && parseFloat(stakeInputValue) > 0;



   if (isConnected) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white flex flex-col items-center rounded-3xl w-full max-w-[calc(100vw-2rem)] sm:max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-2rem)] relative ">
      {isStakeSuccessful && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl z-10">
            <div className="bg-white rounded-3xl py-6 px-8 flex flex-col items-center">
                <img src="/confetti.svg" alt="" />
                <h1 className="text-[24px] font-bold text-wrap text-center">Congratulations you're <br></br> now a <span className="text-[#16974D]">Fact-checker</span>.</h1>
                <Button onClick={handleDone} className="w-full rounded-[12px] py-6 bg-[#1E90FF] hover:bg-[#1E90FF] text-[20px] font-semibold uppercase mt-8">Done</Button>
            </div>
          </div>
        )}
        <div
          className="bg-[#1E90FF] rounded-2xl text-white flex items-center justify-center w-[83px] h-[31px] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          2/2
        </div>
        <div className="overflow-y-auto scrollbar-hide flex flex-col w-full max-w-[calc(100vw-2rem)] sm:max-w-md lg:max-w-lg xl:max-w-xl items-center rounded-3xl justify-center">
        <div className="bg-white w-[98%] pt-1 pb-4 rounded-[24px] shadow-xl relative">
          <div className="absolute top-2 right-2 z-50">
            <CloseButton onClick={closeForm} />
          </div>
          <div className="bg-gradient-to-b from-[#273037] to-[#02090F] rounded-[24px] text-white p-4">
            <div className="flex items-center justify-center py-8">
             <ConnectButton />
            </div>
          </div>
          <div className="px-4 mt-4 sm:mt-6">
            <div className="font-medium bg-[#E8F2FC] p-3 sm:p-4 rounded-[16px] text-sm sm:text-base">
              <h1 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2">Stake to earn rewards.</h1>
              <ReadMoreText text={longText} limit={100} />
            </div>
            <div className="flex flex-col mt-4 sm:mt-6">
              <h1 className="text-lg sm:text-xl font-semibold pb-2">Stake</h1>
              <EthStakeInput setStakeInputValue={setStakeInputValue} />
            </div>
            <Button
              disabled={!isStakeValueValid || isLoading}
              className={`uppercase w-full rounded-[12px] ${
                !isStakeValueValid || isLoading
                  ? "bg-[#9CA3AF] hover:bg-[#9CA3AF]"
                  : "bg-[#1E90FF] hover:bg-[#1E90FF]"
              } h-[40px] sm:h-[48px] lg:h-[56px] text-sm sm:text-base lg:text-lg font-semibold mt-4 sm:mt-6 mb-2`}
              onClick={handleStake}
            >
              {isLoading ? <Spinner /> : "Stake"}
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white p-2 sm:p-[6px] flex flex-col items-center rounded-3xl w-full max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-2rem)] relative">
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
            <h1 className="font-bold text-xl sm:text-2xl lg:text-[28px] font-sans text-center mt-2">
              Connect wallet
            </h1>
            <h2 className="text-sm sm:text-base lg:text-[20px] text-center text-[#6B7280] font-sans mt-2">
              Link your Crypto wallet to veryfai.io to start earning.
            </h2>
          </div>
          <div className="mt-3">
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <ConnectButton />
              <div>{renderStake()}</div>
            </div>
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