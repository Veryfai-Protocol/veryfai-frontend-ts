'use client';
import { CHECKER_STAKE, CHECKER_WITHDRAW } from '@/site-settings/navigations';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaWallet } from 'react-icons/fa6';
import { IoMdInformationCircle } from "react-icons/io";
export const EarningsStakePanel = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-[32px] p-6 mt-6 gap-6">
      <div className="rounded-[24px] p-6 h-[14.25rem] flex flex-col justify-between md:w-1/2 w-full bg-gradient-to-r text-white from-[#1E90FF] to-[#278FF5]">
        <div className="flex items-center justify-between w-full">
          <p className="text-[1.25rem]">Total earnings</p>
          <FaWallet size={22} />
        </div>
        <div className="flex items-center -mt-8">
          <span className="font-medium h-8 w-8 bg-white rounded-full text-center grid justify-center items-center">
            <Image src={'/ether.svg'} width={20} height={20} alt="" />
          </span>
          <h1 className="text-[2rem] font-semibold ml-4">0.000</h1>
          <span className="text-[1rem] font-semibold mt-1 ml-2">ETH</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="bg-[#0465C4] rounded-xl h-11 flex items-center justify-center">
            <Link
              href={CHECKER_WITHDRAW.href}
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                pathname === CHECKER_WITHDRAW.href
                  ? 'bg-[#61666a3d]'
                  : 'bg-transparent'
              }`}
            >
              <Image
                src={'/withdraw.svg'}
                width={24}
                height={24}
                alt="withdraw"
              />{' '}
              <span className="text-white">Withdraw</span>
            </Link>
          </div>
          <div></div>
        </div>
      </div>

      <div className="rounded-[24px] p-6 flex flex-col justify-between md:w-1/2 w-full h-[14.25rem] bg-gradient-to-b text-white from-[#273037] to-[#02090F]">
        <div className="flex items-center justify-between w-full">
          <p className="text-[1.25rem]">Staked Amount</p>
          <div className="flex gap-[8px]">
            <Image src="/stakedmask.svg" alt="" width={24} height={24} />
            <p>1S3mvAT...wsUz2</p>
          </div>
        </div>
        <div className="flex items-center -mt-8">
          <span className="font-medium h-8 w-8 bg-white rounded-full text-center grid justify-center items-center">
            <Image src={'/ether.svg'} width={20} height={20} alt="" />
          </span>
          <h1 className="text-[2rem] font-semibold ml-4">2.500</h1>
          <span className="text-[1rem] font-semibold mt-1 ml-2">ETH</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="bg-[#34393D] rounded-xl h-11 flex items-center justify-center">
            <Link
              href={CHECKER_STAKE.href}
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                pathname === CHECKER_STAKE.href
                  ? 'bg-[#61666a3d]'
                  : 'bg-transparent'
              }`}
            >
              <Image src={'/stake.svg'} width={24} height={24} alt="stake" />
              <span className="text-white">Stake</span>
            </Link>
          </div>
          <div>
            <div className='flex items-center gap-1'>
                <span className='text-[#EFEFF0] text-[0.875rem]'>CER</span>
                <IoMdInformationCircle className='text-[#9CA3AF]' />
            </div>
            <p className='text-[#2ECC71]'>+1.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
