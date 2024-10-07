import { Navbar } from "@/components/nav-menu/Navbar";
import { QuoteCard } from "@/components/quote-card/quote-card";
import { StatementScore } from "@/components/statement-score/statement-score";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { mockData } from "./MainApp";
import { SearchTag } from "@/components/search-tags/search-tag";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ScrollingTags } from "@/components/scrolling-tag/scrolling-tag";
import { StatementAnalysisDrawer } from "@/components/analysis-drawer/analysis-drawer";
import { VoteButton } from "@/components/vote-button/vote-button";
import { useParams } from "react-router-dom";
import { FactCheckingService } from "@/api/api-service/FactCheck";
import { FactCheckResultResponse } from "@/api/api-service/FactType";
// import { useQuery } from '@tanstack/react-query'

interface StatementAnalysisProps {
  onClose?: () => void;
  support: number;
  oppose: number;
}

interface FactCheckResult {
  factCheckOutputDict: FactCheckResultResponse;
  timeTaken: number;
}

export const ResultAnalysis = () => {
  const { task_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
  const [activeTab, setActiveTab] = useState<
    "supporting" | "opposing" | "analysis"
  >("supporting");
  const [tabLoading, setTabLoading] = useState(false);
  const reversedMockData = [...mockData].reverse();
  const [visibleCards, setVisibleCards] = useState(5);

  useEffect(() => {
    const fetchFactCheckResult = async () => {
      try {
        const result = await FactCheckingService.getFactCheckResult(task_id as string);
        if(!result){
          console.log("Fact check result not found. Skipping");
          return;
        }
        console.log("Fact check result:", result);
        setFactCheckResult(result);
      } catch (error) {
        console.error("Error fetching fact check result:", error);
      } finally {
        setLoading(false);
      }
    };

    if (task_id) {
      fetchFactCheckResult();
    }
  }, [task_id]);

  const handleShowMore = () => {
    setVisibleCards((prevCount) => prevCount + 5);
  };

  const filteredCardData = activeTab === "supporting"
  ? factCheckResult?.factCheckOutputDict.all_supporting_statements ?? []
  : activeTab === "opposing"
  ? factCheckResult?.factCheckOutputDict.all_opposing_statements ?? []
  : [];

  if (loading) {
    return <SkeletonLoader />;
  }

  const handleTabChange = (tab: "supporting" | "opposing" | "analysis") => {
    if (tab !== activeTab) {
      setTabLoading(true);
      setActiveTab(tab);
      setTimeout(() => {
        setTabLoading(false);
      }, 1000);
    }
  };

  const StatementAnalysis = ({
    onClose,
  }: StatementAnalysisProps) => (
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
      <StatementScore score={factCheckResult?.factCheckOutputDict.all_veryfai_score.length} 
      supportCount={factCheckResult?.factCheckOutputDict.all_supporting_statements.length} 
      opposeCount={factCheckResult?.factCheckOutputDict.all_opposing_statements.length} />
    </>
  );

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="flex sm:pt-24 pt-40 items-center justify-center w-full px-4 sm:px-14 py-8">
        <div className="w-full">
          <div className="flex gap-[10px] lg:hidden overflow-x-auto scrollbar-hide">
            <VoteButton
              type="supporting"
              count={factCheckResult?.factCheckOutputDict.all_supporting_statements.length}
              onClick={() => handleTabChange("supporting")}
              active={activeTab === "supporting"}
            />
            <VoteButton
              type="opposing"
              count={factCheckResult?.factCheckOutputDict.all_opposing_statements.length}
              onClick={() => handleTabChange("opposing")}
              active={activeTab === "opposing"}
            />
            <StatementAnalysisDrawer
              support={factCheckResult?.factCheckOutputDict.all_supporting_statements.length}
              oppose={factCheckResult?.factCheckOutputDict.all_opposing_statements.length}
              type="analysis"
              count={factCheckResult?.factCheckOutputDict.all_veryfai_score.length}
              onClick={() => handleTabChange("analysis")}
              active={activeTab === "analysis"}
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row lg:mt-5 mt-2 gap-0 sm:gap-2 ">
            <div className="w-full">
              <div className="lg:flex gap-4 hidden">
                <VoteButton
                  type="supporting"
                  count={factCheckResult?.factCheckOutputDict.all_supporting_statements.length}
                  onClick={() => handleTabChange("supporting")}
                  active={activeTab === "supporting"}
                />
                <VoteButton
                  type="opposing"
                  count={factCheckResult?.factCheckOutputDict.all_opposing_statements.length}
                  onClick={() => handleTabChange("opposing")}
                  active={activeTab === "opposing"}
                />
              </div>
              <div className="space-y-6 w-full">
                {tabLoading ? (
                  <SkeletonQuoteCards />
                ) : (
                  filteredCardData
                    .slice(0, visibleCards)
                    .map((card, index) => <QuoteCard key={index} {...card} />)
                )}
              </div>
              {visibleCards < filteredCardData.length && (
                <div className="flex items-center justify-center w-full mt-5">
                  <Button
                    className="rounded-full text-[#1E90FF] bg-transparent hover:bg-transparent border border-[#1E90FF] w-full"
                    onClick={handleShowMore}
                  >
                    Show more results
                    <MdKeyboardArrowDown />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="hidden lg:block w-full">
                <StatementAnalysis support={14} oppose={200} />
              </div>
              <div className="lg:flex hidden flex-col">
                <div className="text-xs mt-10 text-gray-500 uppercase flex items-center space-x-1">
                  <span>Trending</span>
                  <MdOutlineArrowOutward />
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  {mockData.map((tag, index) => (
                    <SearchTag key={index} text={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex flex-col items-center">
            <div className="text-xs mt-10 text-gray-500 uppercase flex items-center space-x-1">
              <span>Trending</span>
              <MdOutlineArrowOutward />
            </div>
            <div className="w-full flex flex-col items-center justify-center md:space-y-2 space-y-1">
              <ScrollingTags tags={mockData} direction="left" />
              <ScrollingTags tags={reversedMockData} direction="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonQuoteCards = () => (
  <>
    {[1, 2, 3].map((item) => (
      <Skeleton
        key={item}
        className="w-full mt-5 h-24 sm:h-28 md:h-[113px] rounded-lg"
      />
    ))}
  </>
);

const SkeletonLoader = () => (
  <div className="w-full">
    <Navbar />
    <div className="flex sm:pt-24 pt-40 items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-14 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-7xl">
        <div className="flex gap-4 w-full justify-start pt-0 md:pt-20">
          <Skeleton className="w-36 sm:w-40 md:w-[166px] h-12 sm:h-14 md:h-[56px] rounded-full" />
          <Skeleton className="w-36 sm:w-40 md:w-[166px] h-12 sm:h-14 md:h-[56px] rounded-full" />
          <Skeleton className="w-28 sm:w-32 flex lg:hidden md:w-[146px] h-12 sm:h-14 md:h-[56px] rounded-full" />
        </div>
        <div className="flex flex-col-reverse lg:flex-row mt-5 gap-4 sm:gap-6 lg:gap-10">
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full lg:w-2/3">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                className="w-full h-24 sm:h-28 md:h-[113px] rounded-lg"
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full lg:w-1/3">
            <Skeleton className="w-full h-64 sm:h-80 md:h-[441px] rounded-lg hidden lg:flex" />
            <Skeleton className="w-full h-24 sm:h-28 md:h-[111px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
