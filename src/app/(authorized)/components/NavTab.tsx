'use client';

import {
  CHECKER_DASHBOARD,
  CHECKER_STAKE,
  CHECKER_WITHDRAW,
} from '@/site-settings/navigations';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavTab = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 w-full">
      <Link
        href={CHECKER_DASHBOARD.href}
        className={`flex items-center gap-1 px-4 py-2 rounded ${
          pathname === CHECKER_DASHBOARD.href
            ? 'bg-[#61666a3d]'
            : 'bg-transparent'
        }`}
      >
        <Image src={'/dashboard.svg'} width={24} height={24} alt="dashboard" />{' '}
        <span className="text-white">Dashboard</span>
      </Link>
      <Link
        href={CHECKER_WITHDRAW.href}
        className={`flex items-center gap-1 px-4 py-2 rounded ${
          pathname === CHECKER_WITHDRAW.href
            ? 'bg-[#61666a3d]'
            : 'bg-transparent'
        }`}
      >
        <Image src={'/withdraw.svg'} width={24} height={24} alt="withdraw" />{' '}
        <span className="text-white">Withdraw</span>
      </Link>
      <Link
        href={CHECKER_STAKE.href}
        className={`flex items-center gap-1 px-4 py-2 rounded ${
          pathname === CHECKER_STAKE.href ? 'bg-[#61666a3d]' : 'bg-transparent'
        }`}
      >
        <Image src={'/stake.svg'} width={24} height={24} alt="stake" />
        <span className="text-white">Stake</span>
      </Link>
    </div>
  );
};
