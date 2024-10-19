import { BetaBanner } from '@/app/components/beta-banner/beta-banner';
import { ResultAnalysis } from '../_components/ResultAnalysis';
import { Navbar } from '@/app/components/nav-menu/Navbar';

const ResultAnalysisPage = async ({ params }: { params: { slug: string } }) => {
  return (
    <div className="relative min-h-screen">
      <div className="relative min-h-screen">
        <BetaBanner />
        <Navbar />
        <ResultAnalysis taskId={params.slug} />
      </div>
    </div>
  );
};

export default ResultAnalysisPage;
