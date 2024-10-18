import { Header } from '@/app/components/nav-menu/Header';
import { ResultBanner } from '../../components/ResultBanner';
import { ResultAnalysis } from '../_components/ResultAnalysis';

const ResultAnalysisPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="relative min-h-screen">
      <ResultAnalysis taskId={params.slug} />
    </div>
  );
};

export default ResultAnalysisPage;
