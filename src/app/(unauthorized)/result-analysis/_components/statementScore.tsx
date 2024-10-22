import { SponsoredAd } from '@/app/components/sponsored-ad/sponsored-ad';
import { StatementScore } from '@/app/components/statement-score/statement-score';
import { WandSparkles } from 'lucide-react';
import Image from 'next/image';
import SUPPORT_IMG from '../../../../../public/upvote.svg';
import OPPOSSING_IMG from '../../../../../public/downvote.svg';
import { Separator } from '@/components/ui/separator';

type Props = {
  score: number;
  supportCount: number;
  opposeCount: number;
};

export const StatementAnalysis = ({
  supportCount,
  opposeCount,
  score,
}: Props) => {
  return (
    <div className="grid w-full">
      <h1 className="text-2xl font-semibold mb-6">Statement analysis</h1>
      <div className="border rounded overflow-auto">
        <StatementScore
          score={score}
          supportCount={supportCount}
          opposeCount={opposeCount}
        />
        <div className="w-full py-4 px-4">
          <SponsoredAd />
        </div>
        <div className="border rounded mx-4 p-4">
          <div className="flex items-center gap-2">
            <WandSparkles size={12} />
            <span className="text-gray-gray4 font-medium">Conclusion</span>
          </div>
          <p className="text-lg my-3">
            The statement is <span>well supported</span> by major sources.
          </p>
          <div className="border rounded p-3 bg-gray-gray2 grid gap-4">
            <div>
              <div className="flex gap-2">
                <Image src={SUPPORT_IMG} alt="supporting" /> Supporting sources
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex gap-2">
                <Image src={OPPOSSING_IMG} alt="supporting" /> Opposing sources
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
