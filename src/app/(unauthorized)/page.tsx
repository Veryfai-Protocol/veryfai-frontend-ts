import { HomeBanner } from './components/HomeBanner';
import { Suggestions } from './components/Suggestions';

const Entry = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <HomeBanner />
      <div className="w-full flex flex-col items-center justify-center pt-12 pb-10">
        <div className="flex items-center justify-center w-full space-x-4">
          <div className="h-px w-[40%] bg-gray-300"></div>{' '}
          <div className="text-xs text-gray-500 flex items-center space-x-1">
            <span className="text-[#6B7280] lg:text-[20px] text-nowrap text-[15px]">
              People also searched for
            </span>
          </div>
          <div className="h-px w-[40%] bg-gray-300"></div>{' '}
        </div>
        <Suggestions />
      </div>
    </div>
  );
};

export default Entry;
