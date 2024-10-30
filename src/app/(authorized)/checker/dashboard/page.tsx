import { EarningsStakePanel } from '../../components/EarningsStakePanel';
import { HistoryTable } from '../../components/HistoryTable';
import { TaskProcessing } from '../../components/TaskProcessing';

const DashBoard = () => {
  return (
    <div className="grid pb-32">
      <div className="grid">
        <h2 className="font-bold text-[2rem]">Dashboard</h2>
        <span className="text-xl">
          Hello there 👋 , It’s another day to tackle misinformation.
        </span>
      </div>
      <TaskProcessing />
      <EarningsStakePanel />
      <HistoryTable nullImg="/no-earnings.svg" noData="Your earnings will show here." />
    </div>
  );
};

export default DashBoard;
