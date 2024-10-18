import React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import StackedStar from '../star-rating/star-rating';
import { Card, CardContent } from '../ui/card';

type StatementScoreType = {
  score: number | undefined;
  supportCount: number | undefined;
  opposeCount: number | undefined;
};

export const StatementScore: React.FC<StatementScoreType> = ({ score }) => {
  const actualScore = score ?? 0;
  const absoluteScore = Math.abs(actualScore);
  const isNegative = actualScore < 0;
  const color = isNegative ? '#DD2727' : '#1CA858';
  // const bgColor = isNegative ? "bg-red-500" : "bg-green-500";

  return (
    <Card className="w-full mx-auto">
      <CardContent className="pt-6 ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium text-[#6B7280] flex items-center gap-2">
            STATEMENT CREDIBILITY SCORE
            <InfoCircledIcon className="h-4 w-4 text-gray-500" />
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4 w-full pb-8">
          <div className="relative w-40 h-40 mb-6">
            <StackedStar color={color} score={absoluteScore} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
