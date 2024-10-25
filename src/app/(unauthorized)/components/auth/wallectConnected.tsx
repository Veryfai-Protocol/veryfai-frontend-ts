import { Button } from '@/app/components/ui/button';
import { CloseButton } from './closeButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReadMoreText } from '@/app/components/read-more-text/read-more-text';
import { EthStakeInput } from './eth-stake-input';
import Spinner from '@/app/components/loader/loading-spinner';
import CONFETTI from '../../../../../public/confetti.svg';
import Image from 'next/image';

type Props = {
  isStakeSuccessful: boolean;
  handleDone: () => void;
  handleClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStakeInputValue: (value: any) => void;
  isStakeValueValid: boolean | string | undefined;
  longText: string;
  isLoading: boolean;
  handleStake: () => void;
};
export const WalletConnected = ({
  isStakeSuccessful,
  handleDone,
  handleClose,
  isStakeValueValid,
  setStakeInputValue,
  longText,
  isLoading,
  handleStake,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white flex flex-col items-center rounded-3xl w-full max-w-[calc(100vw-2rem)] sm:max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-2rem)] relative ">
        {isStakeSuccessful && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl z-10">
            <div className="bg-white rounded-3xl py-6 px-8 flex flex-col items-center">
              <Image src={CONFETTI} alt="" />
              <h1 className="text-[24px] font-bold text-wrap text-center">
                Congratulations you&apos;re <br></br> now a{' '}
                <span className="text-[#16974D]">Fact-checker</span>.
              </h1>
              <Button
                onClick={handleDone}
                className="w-full rounded-[12px] py-6 bg-blue-blue hover:bg-blue-blue text-[20px] font-semibold uppercase mt-8"
              >
                Done
              </Button>
            </div>
          </div>
        )}
        <div className="bg-blue-blue rounded-2xl text-white flex items-center justify-center w-[83px] h-[31px] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          2/2
        </div>
        <div className="overflow-y-auto scrollbar-hide flex flex-col w-full max-w-[calc(100vw-2rem)] sm:max-w-md lg:max-w-lg xl:max-w-xl items-center rounded-3xl justify-center">
          <div className="bg-white w-[98%] pt-1 pb-4 rounded-[24px] shadow-xl relative">
            <div className="absolute top-2 right-2 z-50">
              <CloseButton onClick={handleClose} />
            </div>
            <div className="bg-gradient-to-b from-[#273037] to-[#02090F] rounded-[24px] text-white p-4">
              <div className="flex items-center justify-center py-8">
                <ConnectButton />
              </div>
            </div>
            <div className="px-4 mt-4 sm:mt-6">
              <div className="font-medium bg-[#E8F2FC] p-3 sm:p-4 rounded-[16px] text-sm sm:text-base">
                <h1 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2">
                  Stake to earn rewards.
                </h1>
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
                    ? 'bg-[#9CA3AF] hover:bg-[#9CA3AF]'
                    : 'bg-blue-blue hover:bg-blue-blue'
                } h-[40px] sm:h-[48px] lg:h-[56px] text-sm sm:text-base lg:text-lg font-semibold mt-4 sm:mt-6 mb-2`}
                onClick={handleStake}
              >
                {isLoading ? <Spinner /> : 'Stake'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
