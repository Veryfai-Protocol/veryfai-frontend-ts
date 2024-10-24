import { Header } from '@/app/components/nav-menu/Header';
import { FactSearch } from './factSearch';
import { CircleCheckBig } from 'lucide-react';
import Image from 'next/image';
import MASK from '../../../../public/mask.svg';

export const HomeBanner = () => {
  return (
    <div className="grid bg-gradient-to-r from-blue-blue2 to-blue-blue3 w-full rounded-b-3xl">
      <Header />
      <div className="grid items-center mt-[9.75rem] lg:mt-[17rem] justify-self-center w-full lg:w-11/12 pb-12 gap-y-12 lg:px-0 px-4">
        <div
          className={`flex flex-col md:flex-row justify-self-center gap-4 items-center transition-all duration-300`}
        >
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <div className="flex gap-1 lg:gap-3 bg-green-green1 rounded-lg text-white items-center px-2 lg:px-4 py-2">
              <CircleCheckBig
                size={33}
                fill="white"
                className="text-green-green1 border-none text-2xl"
              />
              <p className="lg:text-3xl text-xl font-medium">Verify</p>
            </div>
            <p className="lg:text-3xl text-xl font-medium text-white">any</p>
            <div className="flex gap-1 lg:gap-3 bg-blue-blue1 text-white rounded-lg items-center px-2 lg:px-4 py-2">
              <Image src={'/draft.svg'} alt="draft" width={30} height={20} />
              <p className="lg:text-3xl text-xl font-medium text-white">
                statement
              </p>
            </div>
          </div>
          <div className="grid items-end md:mt-8">
            <span className="lg:text-3xl text-xl text-center font-medium text-white">
              for truth and accuracy
            </span>
            <Image
              src={MASK}
              alt="marker"
              height={25}
              className="justify-self-end"
            />
          </div>
        </div>
        <FactSearch />
      </div>
    </div>
  );
};
