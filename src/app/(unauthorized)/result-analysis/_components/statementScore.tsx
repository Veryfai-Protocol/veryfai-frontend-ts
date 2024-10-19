import { StatementScore } from '@/app/components/statement-score/statement-score';
import { Button } from '@/app/components/ui/button';
import { IoClose } from 'react-icons/io5';

type Props = {
  onClose: () => void;
  score: number;
  supportCount: number;
  opposeCount: number;
};

export const StatementAnalysis = ({
  onClose,
  supportCount,
  opposeCount,
  score,
}: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl flex mb-4">Statement analysis</h1>
        <Button
          className="bg-transparent hover:bg-transparent outline-none border-none shadow-none flex md:hidden"
          onClick={onClose}
        >
          <IoClose size={30} className="text-[#6B7280]" />
        </Button>
      </div>
      <StatementScore
        score={score}
        supportCount={supportCount}
        opposeCount={opposeCount}
      />
    </>
  );
};
