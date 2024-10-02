import { useParams } from "react-router-dom";
import { Navbar } from "@/components/nav-menu/Navbar";
import { QuoteCard } from "@/components/quote-card/quote-card";
import { StatementScore } from "@/components/statement-score/statement-score";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { mockData } from "./MainApp";
import { SearchTag } from "@/components/search-tags/search-tag";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ScrollingTags } from "@/components/scrolling-tag/scrolling-tag";

interface StatementAnalysisProps {
  onClose?: () => void;
  support: number;
  oppose: number;
}

export const ResultAnalysis = () => {
  const { inputValue } = useParams();
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const support = 14;
  const oppose = 200;
  const reversedMockData = [...mockData].reverse();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const StatementAnalysis = ({
    onClose,
    support,
    oppose,
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
      <StatementScore score={18} supportCount={support} opposeCount={oppose} />
    </>
  );

  return (
    <div className="relative min-h-screen">
      <Navbar input={inputValue as string} />
      <div className="flex items-center justify-center w-full px-4 sm:px-14 py-8">
        <div className="w-full">
          <div className="flex gap-4 lg:hidden">
            <div className="rounded-full border border-black flex items-center justify-center gap-2 w-[166px] h-[56px]">
              <img src="/upvote.svg" alt="" />
              <p>Supporting {`(${support})`}</p>
            </div>
            <div className="rounded-full border border-[#D1D5DB] flex items-center justify-center gap-2 w-[166px] h-[56px]">
              <img src="/downvote.svg" alt="" />
              <p className="text-[#6B7280]">Opposing {`(${oppose})`}</p>
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row md:mt-5 mt-2 gap-0 sm:gap-2 md:gap-10">
            <div className="w-full">
              <div className="lg:flex gap-4 hidden">
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
              <div className="flex items-center justify-center w-full mt-5">
                <Button className="rounded-full text-[#1E90FF] bg-transparent hover:bg-transparent border border-[#1E90FF] w-full">
                  Show more results
                  <MdKeyboardArrowDown />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="hidden md:block w-full">
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
      <div className="md:hidden flex flex-col">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="fixed space-x-2 bottom-4 right-4 mt-4 rounded-full w-[159px] h-[52px] bg-[#1E90FF] hover:bg-[#45b6ebf3] text-white hover:text-white shadow-lg"
            >
              <img src="/chart.svg" alt="" />
              <p>See analysis</p>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="md:hidden flex">
            <div className="p-4">
              <StatementAnalysis
                onClose={closeDrawer}
                support={14}
                oppose={200}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="w-full">
    <Navbar input="" />
    <div className="flex items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-14 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-7xl">
        <div className="flex flex-wrap gap-4 w-full justify-start">
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
            <Skeleton className="w-full h-64 sm:h-80 md:h-[441px] rounded-lg hidden md:flex" />
            <Skeleton className="w-full h-24 sm:h-28 md:h-[111px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
