import { HOME } from '@/site-settings/navigations';
import Link from 'next/link';

export const SponsoredAd = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <h1 className="text-[12px] text-[#6B7280]">Sponsored AD</h1>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4">
            <SponsoredAdCard />
            <SponsoredAdCard />
            <SponsoredAdCard />
            <SponsoredAdCard />
            <SponsoredAdCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const SponsoredAdCard = () => {
  return (
    <div className="rounded-[16px] flex-shrink-0 w-[200px] h-[107px] bg-center bg-cover bg-no-repeat bg-[url('/sponsored.'png')]">
      <Link href={HOME.href}></Link>
    </div>
  );
};
