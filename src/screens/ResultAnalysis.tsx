import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/nav-menu/Navbar";
import { QuoteCard } from "@/components/quote-card/quote-card";
import { StatementScore } from "@/components/statement-score/statement-score";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { VoteButton } from "@/components/vote-button/vote-button";
import { StatementAnalysisDrawer } from "@/components/analysis-drawer/analysis-drawer";
import { FactCheckingService } from "@/api/api-service/FactCheck";
import { FactCheckResultResponse } from "@/api/api-service/FactType";
//@ts-ignore
import { MdKeyboardArrowDown, MdOutlineArrowOutward } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import NoStatementsGraphic from "@/components/no-statement-graphic/no-statement-graphic";
import { BetaBanner } from "@/components/beta-banner/beta-banner";
import { NoResult } from "@/components/no-statement-graphic/no-search";

interface FactCheckResult {
  factCheckOutputDict: FactCheckResultResponse;
  timeTaken: number;
}

export const ResultAnalysis: React.FC = () => {
  // const navigate = useNavigate();
  const { task_id } = useParams<{ task_id: string }>();
  //@ts-ignore
  const [loading, setLoading] = useState(true);
  const [factCheckResult, setFactCheckResult] =
    useState<FactCheckResult | null>(null);
  const [activeTab, setActiveTab] = useState<
    "supporting" | "opposing" | "analysis"
  >("supporting");
  const [tabLoading, setTabLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState(5);
  const [timedOut, setTimedOut] = useState(false);

  const handleUpdate = useCallback((result: FactCheckResultResponse) => {
    console.log("Received update:", result);
    setFactCheckResult((prev) => ({
      factCheckOutputDict: result,
      timeTaken: prev?.timeTaken || 0,
    }));
    if (result.veryfai_score > 0) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchFactCheckResult = async () => {
      if (!task_id) {
        console.log("No task ID provided. Skipping fact check.");
        setLoading(false);
        return;
      }

      try {
        const result = await FactCheckingService.getFactCheckResult(
          task_id,
          handleUpdate
        );
        if (isMounted) {
          console.log(`Fact check completed in ${result.timeTaken} seconds`);
          setFactCheckResult(result);
          setLoading(false);
          console.log(loading);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching fact check result:", error);
          setLoading(false);
        }
      }
    };

    fetchFactCheckResult();

    const timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.log("Timeout reached, setting timedOut to true");
        setTimedOut(true);
        setLoading(false);
        abortController.abort();
      }
    }, 60000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [task_id, handleUpdate]);

  const handleShowMore = () => {
    setVisibleCards((prevCount) => prevCount + 5);
  };

  const handleTabChange = (tab: "supporting" | "opposing" | "analysis") => {
    if (tab !== activeTab) {
      setTabLoading(true);
      setActiveTab(tab);
      setTimeout(() => {
        setTabLoading(false);
      }, 1000);
    }
  };

  const filteredCardData =
    activeTab === "supporting"
      ? factCheckResult?.factCheckOutputDict.all_supporting_statements ?? []
      : activeTab === "opposing"
      ? factCheckResult?.factCheckOutputDict.all_opposing_statements ?? []
      : [];

  const StatementAnalysis: React.FC<{ onClose?: () => void }> = ({
    onClose,
  }) => (
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
        score={factCheckResult?.factCheckOutputDict.veryfai_score}
        supportCount={
          factCheckResult?.factCheckOutputDict.all_supporting_statements?.length
        }
        opposeCount={
          factCheckResult?.factCheckOutputDict.all_opposing_statements?.length
        }
      />
    </>
  );

  return (
    <div className="relative min-h-screen">
      <BetaBanner />
      <Navbar />
      <div className="flex sm:pt-32 pt-48 items-center justify-center w-full px-4 sm:px-14 py-8">
        <div className="w-full">
          {/* Mobile vote buttons */}
          {timedOut && !factCheckResult ? (
            <NoResult />
          ) : (
            <>
              {/* Existing component content */}
              {/* ... (keep the rest of the JSX as it is) */}
              <div className="flex gap-[10px] lg:hidden overflow-x-auto scrollbar-hide">
                <VoteButton
                  type="supporting"
                  count={
                    factCheckResult?.factCheckOutputDict
                      .all_supporting_statements?.length
                  }
                  onClick={() => handleTabChange("supporting")}
                  active={activeTab === "supporting"}
                />
                <VoteButton
                  type="opposing"
                  count={
                    factCheckResult?.factCheckOutputDict.all_opposing_statements
                      ?.length
                  }
                  onClick={() => handleTabChange("opposing")}
                  active={activeTab === "opposing"}
                />
                <StatementAnalysisDrawer
                  support={
                    factCheckResult?.factCheckOutputDict
                      .all_supporting_statements?.length
                  }
                  oppose={
                    factCheckResult?.factCheckOutputDict.all_opposing_statements
                      ?.length
                  }
                  type="analysis"
                  count={factCheckResult?.factCheckOutputDict.veryfai_score}
                  onClick={() => handleTabChange("analysis")}
                  active={activeTab === "analysis"}
                />
              </div>
              <div className="flex flex-col-reverse lg:flex-row lg:mt-5 mt-2 gap-0 sm:gap-2">
                <div className="w-full lg:w-2/3">
                  {/* Desktop vote buttons */}
                  <div className="lg:flex gap-4 hidden">
                    <VoteButton
                      type="supporting"
                      count={
                        factCheckResult?.factCheckOutputDict
                          ?.all_supporting_statements?.length
                      }
                      onClick={() => handleTabChange("supporting")}
                      active={activeTab === "supporting"}
                    />
                    <VoteButton
                      type="opposing"
                      count={
                        factCheckResult?.factCheckOutputDict
                          ?.all_opposing_statements?.length
                      }
                      onClick={() => handleTabChange("opposing")}
                      active={activeTab === "opposing"}
                    />
                  </div>

                  {/* Card data */}
                  <div className="space-y-6 w-full">
                    {tabLoading ? (
                      <SkeletonQuoteCards />
                    ) : (
                      <div>
                        {filteredCardData.length > 0 ? (
                          <div>
                            {filteredCardData
                              .slice(0, visibleCards)
                              .map((card, index) => (
                                <QuoteCard key={index} {...card} />
                              ))}
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
                        ) : (
                          <NoStatementsGraphic
                            type={
                              activeTab === "supporting"
                                ? "supporting"
                                : "opposing"
                            }
                            oppose={factCheckResult?.factCheckOutputDict.all_opposing_statements?.length || 0}
                            support={factCheckResult?.factCheckOutputDict?.all_supporting_statements?.length || 0}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Statement Analysis */}
                <div className="flex flex-col items-start w-full lg:w-2/3">
                  <div className="hidden lg:block w-full">
                    <StatementAnalysis />
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

const SkeletonQuoteCards: React.FC = () => (
  <>
    {[1, 2, 3].map((item) => (
      <Skeleton
        key={item}
        className="w-full mt-5 h-24 sm:h-28 md:h-[113px] rounded-lg animate-pulse"
      />
    ))}
  </>
);

// const StatementAnalysisLoader = () => (
//   <div className="lg:flex hidden flex-col lg:pt-16 pt-10 gap-4 sm:gap-6 lg:gap-8 w-full animate-pulse">
//     <Skeleton className="w-full h-64 sm:h-80 md:h-[441px] rounded-lg hidden lg:flex" />
//     <Skeleton className="w-full h-24 sm:h-28 md:h-[111px] rounded-lg" />
//   </div>
// );
