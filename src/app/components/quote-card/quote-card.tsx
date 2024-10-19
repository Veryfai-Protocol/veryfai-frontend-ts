import { Statement } from '@/app/lib/types/fact';
import DOT from '../../../../public/dot.svg';
import Image from 'next/image';
import ARROW from '../../../../public/arrow.svg';

export const QuoteCard = ({
  article_url,
  sentence,
  source,
  score,
  reason,
}: Statement) => {
  return (
    <div className="w-full mx-auto my-4 bg-white border-b border-b-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 sm:p-6">
        <p className="text-lg sm:text-xl md:text-2xl mb-2 text-[#111827] font-medium">
          {sentence}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
          {reason}
        </p>
        <div className="flex flex-row items-center justify-between text-xs sm:text-sm text-gray-500">
          <div className="flex items-center flex-shrink-0 overflow-hidden">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full mr-2 flex-shrink-0"></div>
            <span className="mr-2 truncate">{source}</span>
            <Image src={DOT} alt="" className="mx-2 flex-shrink-0" />
            <span className="truncate">
              Source score:{' '}
              <span className="bg-black text-white text-[14px] w-[29px] px-2 h-[18px] rounded-[1px]">
                {score}
              </span>
            </span>
          </div>
          <button className="flex items-center gap-1 hover:text-blue-600 text-xs sm:text-sm ml-2 flex-shrink-0">
            <a href={article_url} target="_blank" className="hidden sm:inline">
              Check Source
            </a>
            <a href={article_url} target="_blank" className="sm:hidden">
              Source
            </a>
            <Image src={ARROW} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
