import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { StatementScore } from '../statement-score/statement-score';
import { IoClose } from 'react-icons/io5';

interface StatementAnalysisDrawerProps {
  support: number;
  oppose: number;
}

interface StatementAnalysisProps {
    onClose?: () => void;
    support: number;
    oppose: number;
  }
  

export const StatementAnalysisDrawer: React.FC<StatementAnalysisDrawerProps> = ({ support, oppose }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const StatementAnalysis = ({
    onClose,
    support,
    oppose,
  }: StatementAnalysisProps) => (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl flex text-nowrap mb-4">Statement analysis</h1>
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


  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="lg:hidden flex flex-col">
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="space-x-2 bottom-4 rounded-full border border-[#111827] w-[121px] h-[40px] text-[#111827] hover:text-[#111827]"
          >
            <img src="/chart.svg" alt="" />
            <p>Analysis</p>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="lg:hidden flex">
          <div className="p-4">
            <StatementAnalysis
              onClose={closeDrawer}
              support={support}
              oppose={oppose}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};