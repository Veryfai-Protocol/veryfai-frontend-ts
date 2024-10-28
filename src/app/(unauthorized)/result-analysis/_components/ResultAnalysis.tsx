'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { NoResult } from '@/app/components/no-statement-graphic/no-search';
import { getFactCheckResult } from '@/app/lib/data-fetching/serverActions';
import { StatementAnalysis } from './statementScore';
import { Tabs, TabsList } from '@/app/components/ui/tabs';
import { FactCheckResultResponse } from '@/app/lib/types/fact';
import SUPPORT_IMG from '../../../../../public/upvote.svg';
import OPPOSSING_IMG from '../../../../../public/downvote.svg';
import SUPPORT_IMG_DIS from '../../../../../public/upvote-disabled.svg';
import OPPOSSING_IMG_DIS from '../../../../../public/downvote-disabled.svg';
import { Trigger } from './tabTrigger';
import { isObjEmpty } from '@/app/lib/utils';
import { Content } from './tabContent';
import Image from 'next/image';
import LOADER from '../../../../../public/loading.gif';
import { AnalysisMobile } from './AnalysisMobile';

export const ResultAnalysis = ({ taskId }: { taskId: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [factCheckResult, setFactCheckResult] =
    useState<FactCheckResultResponse>({} as FactCheckResultResponse);
  const [activeTab, setActiveTab] = useState<string>('supporting');

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
    <div className="flex pt-40 items-center justify-center w-full px-4 sm:px-14 py-8">
      <div className="w-full">
        {loading ? (
          <div className="grid justify-center">
            <Image src={LOADER} alt="loading" />
          </div>
        ) : !loading && isObjEmpty(factCheckResult) ? (
          <NoResult tryAgain={getFactResult} />
        ) : (
          <>
            <div className="hidden md:flex gap-20 ">
              <div className="w-full md:w-3/5">
                <Tabs
                  defaultValue="supporting"
                  onValueChange={(tab) => setActiveTab(tab)}
                >
                  <TabsList className="py-7 border-gray-gray3 bg-gray-gray2 gap-4">
                    <Trigger
                      count={factCheckResult?.all_supporting_statements?.length}
                      value={'supporting'}
                      name={'Supporting'}
                      img={
                        activeTab === 'supporting'
                          ? SUPPORT_IMG
                          : SUPPORT_IMG_DIS
                      }
                    />
                    <Trigger
                      count={factCheckResult?.all_opposing_statements?.length}
                      value={'opposing'}
                      name={'Opposing'}
                      img={
                        activeTab === 'opposing'
                          ? OPPOSSING_IMG
                          : OPPOSSING_IMG_DIS
                      }
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
              <div className="flex flex-col w-full md:w-2/5">
                <StatementAnalysis
                  score={factCheckResult.veryfai_score}
                  supportCount={
                    factCheckResult.all_supporting_statements?.length
                  }
                  opposeCount={factCheckResult.all_opposing_statements?.length}
                  responseDict={factCheckResult.fact_check_response_dict}
                />
              </div>
            </div>
            <AnalysisMobile factCheckResult={factCheckResult} />
          </>
        )}
      </div>
    </div>
  );
};
