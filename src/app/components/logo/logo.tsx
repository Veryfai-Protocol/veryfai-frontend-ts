import Image from 'next/image';
import Link from 'next/link';
import LOGO from '../../../../public/logo.svg';
import { HOME } from '@/site-settings/navigations';

export const Logo = () => {
  return (
    <div className="flex">
      <Link href={HOME.href}>
        <Image src={LOGO} alt="logo" />
      </Link>
    </div>
  );
};
