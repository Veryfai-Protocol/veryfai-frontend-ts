import Image from 'next/image';

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
        <Image src={imgSrc} alt={name} className="w-5 sm:w-6 lg:w-auto" />
        <h1 className="text-xs sm:text-sm lg:text-[20px] font-sans font-medium">
          {name}
        </h1>
      </div>
      <div
        className={`rounded-full w-5 h-5 sm:w-6 sm:h-6 lg:w-[32px] lg:h-[32px] flex items-center justify-center border ${
          isSelected
            ? 'bg-blue-blue border-[#1E90FF]'
            : 'bg-white border-[#D1D5DB]'
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
