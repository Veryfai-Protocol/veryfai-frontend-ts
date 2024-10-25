import React, { useMemo } from 'react';
import StackedStar from '../star-rating/star-rating';

type StatementScoreType = {
  score: number | undefined;
  supportCount: number | undefined;
  opposeCount: number | undefined;
};

export const StatementScore: React.FC<StatementScoreType> = ({ score }) => {
  const absoluteScore = useMemo(() => {
    const actualScore = score ?? 0;
    const absolute = Math.abs(actualScore);
    return absolute;
  }, [score]);

  const color = useMemo(() => {
    const actualScore = score ?? 0;
    const isNegative = actualScore < 0;
    return isNegative ? '#DD2727' : '#1CA858';
  }, [score]);

  return (
    <div className="w-full mx-auto border-b">
      <div className="flex flex-col items-center justify-center gap-6 w-full py-4">
        <StackedStar color={color} score={absoluteScore} />
        <h2 className="text-xl font-medium text-gray-gray4">
          Credibility score
        </h2>
      </div>
    </div>
  );
};
