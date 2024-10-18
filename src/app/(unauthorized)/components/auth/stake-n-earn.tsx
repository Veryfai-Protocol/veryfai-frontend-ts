import { ReadMoreText } from '@/app/components/read-more-text/read-more-text';
import { CloseButton } from './closeButton';

type StakeType = {
  closeForm: () => void;
};

export const StakeNEarn = ({ closeForm }: StakeType) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white flex flex-col items-center rounded-3xl w-full max-w-[calc(100vw-2rem)] sm:max-w-md lg:max-w-lg xl:max-w-xl max-h-[calc(100vh-2rem)] relative ">
        <div className="bg-[#1E90FF] rounded-2xl text-white flex items-center justify-center w-[83px] h-[31px] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          2/2
        </div>
        <div className="overflow-y-auto scrollbar-hide flex flex-col w-full max-w-[calc(100vw-2rem)] sm:max-w-md lg:max-w-lg xl:max-w-xl items-center rounded-3xl justify-center">
          <div className="bg-white w-[98%] pt-1 pb-4 rounded-[24px] shadow-xl relative">
            <div className="absolute top-2 right-2 z-50">
              <CloseButton onClick={closeForm} />
            </div>
            <div className="bg-gradient-to-b from-[#273037] to-[#02090F] rounded-[24px] text-white p-4">
              <div className="flex flex-col items-center py-4">
                <p className="text-sm sm:text-base">Available to stake</p>
                <h1 className="font-bold text-xl sm:text-2xl lg:text-[28px] font-sans text-center mt-2">
                  12.5 ETH
                </h1>
                <div className="bg-[#61666A3D] mt-4 sm:mt-6 flex rounded-[8px] px-2 py-2 sm:py-3 items-center justify-center gap-2 sm:gap-4">
                  <img src="/metamask.svg" alt="" className="w-6 sm:w-8" />
                  <p className="text-[20px] font-medium text-[#EFEFF0] sm:text-sm">
                    0x4ffeteg...ht56a
                  </p>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const longText = `To earn rewards, you must stake your token before performing tasks. This incentivizes participation and ensures commitment, as staking locks in your tokens, giving you the opportunity to gain additional rewards upon task completion.`;
