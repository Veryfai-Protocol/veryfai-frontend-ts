import { TaskProcessing } from '../../components/TaskProcessing';

const DashBoard = () => {
  return (
    <div className="grid">
      <div className="grid">
        <h2 className="font-bold text-[2rem]">Dashboard</h2>
        <span className="text-xl">
          Hello there 👋 , It’s another day to tackle misinformation.
        </span>
      </div>
      <TaskProcessing />
    </div>
  );
};

export default DashBoard;
