import { SponsoredAd } from '@/app/components/sponsored-ad/sponsored-ad';
import Image from 'next/image';
import SUPPORT_IMG from '../../../../../public/upvote.svg';
import OPPOSSING_IMG from '../../../../../public/downvote.svg';
import { Separator } from '@/components/ui/separator';
import GaugeMeter from '../../components/GuageSystem';
import AvatarGroup from '../../components/AvatarGroup';
import { PRODUCT_NAME } from '@/app/lib/constants';

interface FactCheckSource {
  article_url: string;
  stance: string;
}

type Props = {
  score: number;
  supportCount: number;
  opposeCount: number;
  responseDict: Record<string, FactCheckSource>;
};

export const StatementAnalysis = ({
  supportCount,
  opposeCount,
  score,
  responseDict,
}: Props) => {
  return (
    <div className="grid w-full">
      <h1 className="text-2xl font-semibold mb-6">Statement analysis</h1>
      <div className="border rounded-[16px] overflow-auto flex flex-col items-center w-full">
        <div className="border-b w-full flex items-center justify-center border-b-[#E5E7EB]">
          <div>
            <GaugeMeter value={score} />
          </div>
        </div>
        <div className="w-full py-4 px-4">
          <SponsoredAd />
        </div>
        <div className="border rounded-[16px] w-[90%] mb-6 p-4">
          <div className="flex items-center gap-2">
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
            <span className="text-gray-gray4 font-medium">Conclusion</span>
          </div>
          <p className="text-lg my-3">
            The statement is{' '}
            <span
              className={`${
                supportCount > opposeCount
                  ? 'text-green-green1'
                  : 'text-[#E45555]'
              }`}
            >
              {supportCount > opposeCount ? 'well supported' : 'not supported'}
            </span>{' '}
            by major sources.
          </p>
          <div className="border rounded p-3 bg-gray-gray2 grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image src={SUPPORT_IMG} alt="supporting" /> Supporting sources
              </div>
              <AvatarGroup
                responseDict={responseDict}
                limit={4}
                stance="supporting"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image src={OPPOSSING_IMG} alt="supporting" /> Opposing sources
              </div>
              <AvatarGroup
                responseDict={responseDict}
                limit={4}
                stance="opposing"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-[40px]">{PRODUCT_NAME} © 2024. All rights reserved</p>
    </div>
  );
};
