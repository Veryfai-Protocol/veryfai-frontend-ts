import { TabsTrigger } from '@/app/components/ui/tabs';
import Image from 'next/image';

type Props = {
  value: string;
  name: string;
  count: number;
  img: string;
};

export const Trigger = ({ value, name, count, img }: Props) => {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center 
      justify-center gap-2 px-4 py-2 min-w-[130px] h-[40px] transition-colors 
      duration-200 data-[state=active]:bg-white data-[state=active]:text-black 
      data-[state=inactive]:text-gray-gray1
      data-[state=inactive]:hover:border-gray-400 data-[state=inactive]:hover:text-gray-700"
    >
      <Image src={img} alt="" className="w-5 h-5" />
      <span className="text-sm flex whitespace-nowrap">
        {name}
        {count !== undefined ? (
          <span className="hidden lg:flex">({count})</span>
        ) : null}
      </span>
    </TabsTrigger>
  );
};
