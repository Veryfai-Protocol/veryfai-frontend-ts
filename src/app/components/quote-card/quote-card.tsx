import { Statement } from '@/app/lib/types/fact';

export const QuoteCard = ({ sentence, source, score, reason }: Statement) => {
  return (
    <div className="w-full mx-auto my-4 bg-white border-b border-b-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 sm:p-6">
        <span className="mr-2 truncate pb-3">{source}</span>
        <p className="text-lg sm:text-xl md:text-2xl mb-2 text-[#111827] font-medium">
          {sentence}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
          {reason}
        </p>
        <div className="flex flex-row items-center gap-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center border px-1 gap-1">
            <span className="truncate">Source score: </span>
            <span className="bg-gray-100 text-black text-[14px] text-sm text-center w-[29px] px-2 my-[0.1rem] rounded">
              {score}
            </span>
          </div>
          <div className="flex items-center border px-1 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M9.9987 1.83301C10.628 4.62693 11.718 5.83575 14.6654 6.49967C11.8714 7.12904 10.6626 8.21901 9.9987 11.1663C9.36936 8.37241 8.27936 7.16359 5.33203 6.49967C8.27936 5.83575 9.36936 4.62693 9.9987 1.83301Z"
                stroke="#4B5563"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66536 8.5C5.13959 10.6053 6.00304 11.3838 7.9987 11.8333C5.89346 12.3075 5.11491 13.171 4.66536 15.1667C4.19114 13.0614 3.32769 12.2829 1.33203 11.8333C3.43727 11.3591 4.21582 10.4957 4.66536 8.5Z"
                stroke="#4B5563"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="truncate">AI summarised</span>
          </div>
        </div>
      </div>
    </div>
  );
};
