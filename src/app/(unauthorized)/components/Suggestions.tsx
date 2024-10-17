import { ScrollingTags } from '@/app/components/scrolling-tag/scrolling-tag';
import { mockData } from '@/app/constants';
import { reverseMockData } from '@/app/lib/utils';

export const Suggestions = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 lg:px-20 justify-center md:space-y-2 space-y-1">
      <ScrollingTags tags={mockData} direction="left" key="left-scroll" />
      <ScrollingTags
        tags={reverseMockData()}
        direction="right"
        key="right-scroll"
      />
    </div>
  );
};
