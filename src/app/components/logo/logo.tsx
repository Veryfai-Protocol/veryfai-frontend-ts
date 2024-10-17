import Image from 'next/image';
import Link from 'next/link';
import LOGO from '../../../../public/small-logo.svg';

export const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image src={LOGO} alt="logo" />
      </Link>
    </div>
  );
};
