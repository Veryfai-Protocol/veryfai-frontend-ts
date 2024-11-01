import { Tabs, TabsContent, TabsList } from '@/app/components/ui/tabs';
import { Trigger } from './tabTrigger';
import { Content } from './tabContent';
import { StatementAnalysis } from './statementScore';
import { FactCheckResultResponse, Statement } from '@/app/lib/types/fact';
import SUPPORT_IMG from '../../../../../public/upvote.svg';
import OPPOSSING_IMG from '../../../../../public/downvote.svg';
import SUPPORT_IMG_DIS from '../../../../../public/upvote-disabled.svg';
import OPPOSSING_IMG_DIS from '../../../../../public/downvote-disabled.svg';
import ANALYSIS from '../../../../../public/note.svg';
import { useState } from 'react';
import NoStatementsGraphic from '@/app/components/no-statement-graphic/no-statement-graphic';
import { QuoteCard } from '@/app/components/quote-card/quote-card';
import { PRODUCT_NAME } from '@/app/lib/constants';

type Props = {
  factCheckResult: FactCheckResultResponse;
};

export const AnalysisMobile = ({ factCheckResult }: Props) => {
  const [activeTab, setActiveTab] = useState<string>('supporting');

  return (
    <div className="w-full md:w-3/5 md:hidden grid">
      <Tabs defaultValue="analysis" onValueChange={(tab) => setActiveTab(tab)}>
        <TabsList className="py-7 border-gray-gray3 bg-gray-gray2 gap-4">
          <Trigger
            count={factCheckResult?.all_supporting_statements?.length}
            value={'analysis'}
            name={'Analysis'}
            img={ANALYSIS}
          />
          <Trigger
            count={factCheckResult?.all_supporting_statements?.length}
            value={'supporting'}
            name={'Supporting'}
            img={activeTab === 'supporting' ? SUPPORT_IMG : SUPPORT_IMG_DIS}
          />
          <Trigger
            count={factCheckResult?.all_opposing_statements?.length}
            value={'opposing'}
            name={'Opposing'}
            img={activeTab === 'opposing' ? OPPOSSING_IMG : OPPOSSING_IMG_DIS}
          />
        </TabsList>
        <TabsContent value="analysis">
          <StatementAnalysis
            score={factCheckResult.veryfai_score}
            supportCount={factCheckResult.all_supporting_statements?.length}
            opposeCount={factCheckResult.all_opposing_statements?.length}
            responseDict={factCheckResult.fact_check_response_dict}
          />
          <div className="grid gap-2 my-6">
            <h2 className="font-semibold text-center">
              Supporting source{' '}
              {factCheckResult?.all_supporting_statements?.length !==
              undefined ? (
                <span>
                  ({factCheckResult?.all_supporting_statements?.length})
                </span>
              ) : null}
            </h2>
            {factCheckResult.all_supporting_statements &&
            factCheckResult.all_supporting_statements.length > 0 ? (
              factCheckResult.all_supporting_statements.map(
                (item: Statement, ind: number) => (
                  <QuoteCard key={ind} {...item} />
                )
              )
            ) : (
              <NoStatementsGraphic
                type={'supporting'}
                count={factCheckResult.all_supporting_statements?.length}
              />
            )}
          </div>
          <div className="grid gap-2">
            <h2 className="font-semibold text-center">
              Opposing source{' '}
              {factCheckResult?.all_opposing_statements?.length !==
              undefined ? (
                <span>
                  ({factCheckResult?.all_opposing_statements?.length})
                </span>
              ) : null}
            </h2>
            {factCheckResult.all_opposing_statements &&
            factCheckResult.all_opposing_statements.length > 0 ? (
              factCheckResult.all_opposing_statements.map(
                (item: Statement, ind: number) => (
                  <QuoteCard key={ind} {...item} />
                )
              )
            ) : (
              <NoStatementsGraphic
                type={'opposing'}
                count={factCheckResult.all_opposing_statements?.length}
              />
            )}
          </div>
        </TabsContent>
        <Content
          statements={factCheckResult.all_supporting_statements}
          value={'supporting'}
        />
        <Content
          statements={factCheckResult.all_opposing_statements}
          value={'opposing'}
        />
      </Tabs>
      <p className="mt-[40px]">{PRODUCT_NAME} © 2024. All rights reserved</p>
    </div>
  );
};
