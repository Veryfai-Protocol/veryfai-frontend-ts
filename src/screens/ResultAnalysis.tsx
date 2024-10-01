import { useParams } from "react-router-dom";
import { Navbar } from "@/components/nav-menu/Navbar";
import { QuoteCard } from "@/components/quote-card/quote-card";
import { StatementScore } from "@/components/statement-score/statement-score";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { mockData } from "./MainApp";
import { SearchTag } from "@/components/search-tags/search-tag";
import { MdOutlineArrowOutward } from "react-icons/md";

const SkeletonLoader = () => (
  <div className="w-full">
    <Navbar input="" />
    <div className="flex items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-14 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-7xl">
        <div className="flex flex-wrap gap-4 w-full justify-center sm:justify-start">
          <Skeleton className="w-36 sm:w-40 md:w-[166px] h-12 sm:h-14 md:h-[56px] rounded-full" />
          <Skeleton className="w-36 sm:w-40 md:w-[166px] h-12 sm:h-14 md:h-[56px] rounded-full" />
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
            <Skeleton className="w-full h-64 sm:h-80 md:h-[441px] rounded-lg" />
            <Skeleton className="w-full h-24 sm:h-28 md:h-[111px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
export const ResultAnalysis = () => {
  const { inputValue } = useParams();
  const [loading, setLoading] = useState(true);
  const support = 14;
  const oppose = 200;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <div>
      <Navbar input={inputValue as string} />
      <div className="flex items-center justify-center w-full px-14 py-8">
        <div className="w-full">
          <div className="flex gap-4 sm:hidden">
            <div className="rounded-full border border-black flex items-center justify-center gap-2 w-[166px] h-[56px]">
              <img src="/upvote.svg" alt="" />
              <p>Supporting {`(${support})`}</p>
            </div>
            <div className="rounded-full border border-[#D1D5DB] flex items-center justify-center gap-2 w-[166px] h-[56px]">
              <img src="/downvote.svg" alt="" />
              <p className="text-[#6B7280]">Opposing {`(${oppose})`}</p>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row mt-5 gap-4 sm:gap-6 lg:gap-10">
            <div className="w-full">
              <div className="sm:flex gap-4 hidden">
                <div className="rounded-full border border-black flex items-center justify-center gap-2 w-[166px] h-[56px]">
                  <img src="/upvote.svg" alt="" />
                  <p>Supporting {`(${support})`}</p>
                </div>
                <div className="rounded-full border border-[#D1D5DB] flex items-center justify-center gap-2 w-[166px] h-[56px]">
                  <img src="/downvote.svg" alt="" />
                  <p className="text-[#6B7280]">Opposing {`(${oppose})`}</p>
                </div>
              </div>
              <div className="space-y-6 w-full">
                {cardData.map((card, index) => (
                  <QuoteCard key={index} {...card} />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <h1 className="text-3xl flex mb-4">Statement analysis</h1>
              <StatementScore score={18} supportCount={14} opposeCount={200} />
              <div className="sm:flex hidden flex-col">
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
          <div className="sm:hidden flex flex-col">
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
    </div>
  );
};

const cardData = [
  {
    quote: "This is a quote from a source",
    summary: "This is an AI summary of the reason and context from the source.",
    source: "New York Times",
    date: "20 September, 2024",
  },
  {
    quote: "Another important statement",
    summary: "Context and explanation for the second quote.",
    source: "Washington Post",
    date: "21 September, 2024",
  },
  {
    quote: "A third perspective on the matter",
    summary: "Additional insights from a different source.",
    source: "The Guardian",
    date: "22 September, 2024",
  },
  {
    quote: "Expert opinion on the topic",
    summary: "Professional analysis of the situation.",
    source: "BBC News",
    date: "23 September, 2024",
  },
  {
    quote: "Final thoughts on the issue",
    summary: "Concluding remarks and future implications.",
    source: "Reuters",
    date: "24 September, 2024",
  },
];
