import Image from 'next/image';
import React from 'react';

export const LandingLogo = () => {
  return (
    <Image
      src="/landing-logo.svg"
      className="lg:w-[160px] md:w-[154px] w-[121px]"
      alt="logo"
      width={160}
      height={160}
    />
  );
};

export const FooterLogo = () => {
  return (
    <Image
    src="/logo.svg"
    className="lg:w-[160px] md:w-[154px] w-[121px]"
    alt="logo"
    width={160}
    height={160}
  />
  );
};
