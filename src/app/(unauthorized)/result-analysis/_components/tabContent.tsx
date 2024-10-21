import NoStatementsGraphic from '@/app/components/no-statement-graphic/no-statement-graphic';
import { QuoteCard } from '@/app/components/quote-card/quote-card';
import { TabsContent } from '@/app/components/ui/tabs';
import { Statement } from '@/app/lib/types/fact';

type Props = {
  statements: Statement[] | undefined;
  value: string;
};

export const Content = ({ statements, value }: Props) => {
  return (
    <TabsContent value={value}>
      {statements && statements.length > 0 ? (
        statements.map((item: Statement, ind: number) => (
          <QuoteCard key={ind} {...item} />
        ))
      ) : (
        <NoStatementsGraphic type={'supporting'} count={statements?.length} />
      )}
    </TabsContent>
  );
};
