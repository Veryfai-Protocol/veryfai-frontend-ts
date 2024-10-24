import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther } from 'ethers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { longText } from './stake-n-earn';
import { useSearchStore } from '@/app/providers/unauthorized/search-store';
import { abi } from '@/app/_contracts/abi';
import { CloseButton } from './closeButton';
import { WalletConnected } from './wallectConnected';
import { useRouter } from 'next/navigation';
import { DASHBOARD } from '@/site-settings/navigations';
import Image from 'next/image';
import WALLET from '../../../../../public/wallet.svg';

type ConnectWalletType = {
  closeForm: () => void;
  onConnect: () => void;
};

export const ConnectWallet = ({ closeForm }: ConnectWalletType) => {
  const [stakeInputValue, setStakeInputValue] = useState<string | undefined>(
    undefined
  );
  const { isStakeSuccessful, setIsStakeSuccessful } = useSearchStore(
    (state) => state
  );
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);

  const { data: stake } = useReadContract({
    address: '0xf4B070EB6A6B460c4235aa4262213c2778ccE269',
    abi,
    functionName: 'totalStaked',
  });
  const router = useRouter();

  const handleStake = async () => {
    if (!stakeInputValue) {
      alert('Please enter a valid amount to stake.');
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
      router.push(DASHBOARD.href);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('An error occurred while staking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
    router.push(DASHBOARD.href);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStakeInput = (value: any) => {
    setStakeInputValue(value);
  };

  const isStakeValueValid = stakeInputValue && parseFloat(stakeInputValue) > 0;

  if (isConnected) {
    return (
      <WalletConnected
        isStakeSuccessful={isStakeSuccessful}
        handleDone={handleDone}
        handleClose={closeForm}
        setStakeInputValue={handleStakeInput}
        isStakeValueValid={isStakeValueValid}
        longText={longText}
        isLoading={isLoading}
        handleStake={handleStake}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white p-2 sm:p-[6px] flex flex-col items-center rounded-3xl w-full max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-2rem)] relative">
        <div
          className="bg-blue-blue rounded-2xl text-white flex items-center justify-center w-[83px] h-[31px] top-0 z-50"
          style={{ position: 'absolute', transform: 'translateY(-50%)' }}
        >
          1/2
        </div>
        <div className="bg-white px-4 sm:px-6 w-full pt-4 pb-4 rounded-xl shadow-xl">
          <div className="flex items-end justify-end sticky top-2 right-2 z-10">
            <CloseButton onClick={closeForm} />
          </div>
          <div className="flex flex-col items-center border-b pb-4 sm:pb-7 mt-[-30px]">
            <Image src={WALLET} alt="" className="w-12 sm:w-16" />
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
