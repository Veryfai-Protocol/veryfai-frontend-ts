'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { NoResult } from '@/app/components/no-statement-graphic/no-search';
import { SponsoredAd } from '@/app/components/sponsored-ad/sponsored-ad';
import { getFactCheckResult } from '@/app/lib/data-fetching/serverActions';
import { StatementAnalysis } from './statementScore';
import { Tabs, TabsList } from '@/app/components/ui/tabs';
import { FactCheckResultResponse } from '@/app/lib/types/fact';
import SUPPORT_IMG from '../../../../../public/upvote.svg';
import OPPOSSING_IMG from '../../../../../public/downvote.svg';
import { Trigger } from './tabTrigger';
import { isObjEmpty } from '@/app/lib/utils';
import { Content } from './tabContent';

export const ResultAnalysis = ({ taskId }: { taskId: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [factCheckResult, setFactCheckResult] =
    useState<FactCheckResultResponse>({} as FactCheckResultResponse);

  const getFactResult = useCallback(async () => {
    setLoading(true);
    const response = await getFactCheckResult(taskId);
    if (response.status <= 201) {
      setFactCheckResult(response.data);
    }
    setLoading(false);
  }, [taskId]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getFactResult();
    }
    return () => {
      isMounted = false;
    };
  }, [taskId, getFactResult]);

  return (
    <div className="flex sm:pt-32 pt-48 items-center justify-center w-full px-4 sm:px-14 py-8">
      <div className="w-full">
        {!loading && isObjEmpty(factCheckResult) ? (
          <NoResult tryAgain={getFactResult} />
        ) : (
          <>
            <div className="flex flex-col-reverse lg:flex-row lg:mt-5 mt-2 gap-0 sm:gap-6">
              <div className="w-full lg:w-[50%]">
                <SponsoredAd />
                <Tabs defaultValue="supporting">
                  <TabsList className="bg-transparent gap-4">
                    <Trigger
                      count={factCheckResult?.all_supporting_statements?.length}
                      value={'supporting'}
                      name={'Supporting'}
                      img={SUPPORT_IMG}
                    />
                    <Trigger
                      count={factCheckResult?.all_opposing_statements?.length}
                      value={'opposing'}
                      name={'Opposing'}
                      img={OPPOSSING_IMG}
                    />
                  </TabsList>
                  <Content
                    statements={factCheckResult.all_supporting_statements}
                    value={'supporting'}
                  />
                  <Content
                    statements={factCheckResult.all_opposing_statements}
                    value={'opposing'}
                  />
                </Tabs>
              </div>
              <div className="flex flex-col items-start w-full lg:w-2/3">
                <div className="hidden lg:block w-full ">
                  <StatementAnalysis
                    onClose={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    score={factCheckResult.veryfai_score}
                    supportCount={
                      factCheckResult.all_supporting_statements?.length
                    }
                    opposeCount={
                      factCheckResult.all_opposing_statements?.length
                    }
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
