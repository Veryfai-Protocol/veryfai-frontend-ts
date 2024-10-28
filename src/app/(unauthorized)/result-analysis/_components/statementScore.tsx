import { SponsoredAd } from '@/app/components/sponsored-ad/sponsored-ad';
import { StatementScore } from '@/app/components/statement-score/statement-score';
import { WandSparkles } from 'lucide-react';
import Image from 'next/image';
import SUPPORT_IMG from '../../../../../public/upvote.svg';
import OPPOSSING_IMG from '../../../../../public/downvote.svg';
import { Separator } from '@/components/ui/separator';
import GaugeMeter from '../../components/GuageSystem';
import { useState } from 'react';
import AvatarGroup from '../../components/AvatarGroup';

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
  responseDict
}: Props) => {

  return (
    <div className="grid w-full">
      <h1 className="text-2xl font-semibold mb-6">Statement analysis</h1>
      <div className="border rounded-[16px] overflow-auto flex flex-col items-center w-full">
        <div className='border-b w-full flex items-center justify-center border-b-[#E5E7EB]'>
          <div>
        <GaugeMeter value={score} />
          </div>
        </div>
        <div className="w-full py-4 px-4">
          <SponsoredAd />
        </div>
        <div className="border rounded-[16px] w-[90%] mb-6 p-4">
          <div className="flex items-center gap-2">
            <WandSparkles size={12} />
            <span className="text-gray-gray4 font-medium">Conclusion</span>
          </div>
          <p className="text-lg my-3">
            The statement is <span className={`${supportCount > opposeCount  ? "text-green-green1" : "text-[#E45555]"}`}>{supportCount > opposeCount ? "well supported" : "not supported"}</span> by major sources.
          </p>
          <div className="border rounded p-3 bg-gray-gray2 grid gap-4">
            <div className='flex items-center justify-between'>
              <div className="flex gap-2">
                <Image src={SUPPORT_IMG} alt="supporting" /> Supporting sources
              </div>
              <AvatarGroup responseDict={responseDict} limit={4} stance='supporting' />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div className="flex gap-2">
                <Image src={OPPOSSING_IMG} alt="supporting" /> Opposing sources
              </div>
              <AvatarGroup responseDict={responseDict} limit={4} stance='opposing' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
