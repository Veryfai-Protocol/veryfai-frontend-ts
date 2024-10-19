import { Header } from '@/app/components/nav-menu/Header';
import Image from 'next/image';
import { FaFilePen, FaRegCircleCheck } from 'react-icons/fa6';
import LOGO from '../../../../public/hidden-logo.svg';
import { FactSearch } from './factSearch';

export const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#224B9F] to-[#0C1B39] w-full pt-8 rounded-b-3xl">
      <Header />
      <div className="lg:h-[90%] h-full w-full pb-12 md:px-24 px-4 pt-6 flex flex-col items-center lg:gap-10 gap-8">
        <Image
          src={LOGO}
          alt="logo"
          className={`w-full max-w-[50px] md:max-w-[100px] object-contain transition-all duration-300`}
        />

        <div
          className={`flex flex-col md:flex-row gap-4 items-center transition-all duration-300`}
        >
          <div className="flex gap-4 items-center">
            <div className="flex gap-3 bg-[#16974D] rounded-lg text-white items-center px-4 py-2">
              <FaRegCircleCheck size={20} />
              <p className="md:text-[24px]">Verify</p>
            </div>
            <p className="md:text-[24px] text-white">any</p>
            <div className="flex gap-3 bg-[#1E90FF] text-white rounded-lg items-center px-4 py-2">
              <FaFilePen size={20} />
              <p className="md:text-[24px]">statements</p>
            </div>
          </div>
          <p className="md:text-[24px] text-white">for accuracy and truth</p>
        </div>

        <FactSearch />
      </div>
    </div>
  );
};
