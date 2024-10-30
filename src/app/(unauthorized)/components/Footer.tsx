'use client';
import { Button } from '@/app/components/ui/button';
import React from 'react';
import { motion } from 'framer-motion';
import { FooterLogo } from './LandingLogo';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };
  const footerVar = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };
  return (
    <div className="bg-[#040F1C] w-full h-full relative overflow-hidden px-[22px] md:px-[56px] pt-[80px]">
      {/* Main content section - takes up most of the space */}
      <div className="h-full flex flex-col mb-12 z-50 justify-between">
        {/* Top content */}
        <motion.div
          className="flex flex-col items-center"
          variants={footerVar}
          initial="initial"
          whileInView="animate"
          viewport={{once : true}}
        >
          <h1 className="bg-clip-text mb-[40px] leading-[48px] md:leading-[5.6rem] text-center text-[40px] md:text-[56px] lg:text-[64px] font-semibold lg:w-[60%] w-[90%] mx-auto text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#95CBFF]">
            Start Fact-Checking Claims Today
          </h1>

          <Button
            onClick={scrollToTop}
            className="h-[44px] md:h-[61px] rounded-[8px] z-50 text-[1rem] md:text-[24px] bg-gradient-radial from-[#4DB7FA] to-[#1E8AF2]"
            style={{
              backgroundImage: `url('/noise.png')`,
              backgroundPosition: 'center',
              backgroundColor: "#1E8AF2"
            }}
          >
            Join waitlist
          </Button>
        </motion.div>

        {/* Footer content */}
        <div className="mb-[40px] z-50">
          <div className="flex md:flex-row flex-col gap-4 items-center mt-[40px] justify-center md:justify-between w-full">
            <FooterLogo />
            <div className="flex gap-[16px]">
              <Icon imgStr="/x.svg" href="https://x.com/factveryfai?s=21" />
              <Icon imgStr="/linkedin.svg" href="https://www.linkedin.com/company/veryfai-io/" />
            </div>
          </div>
          <p className="text-[#C8E4FF] text-[14px] md:text-[20px] text-center mt-[40px]">
            VeryfAI © 2024 - All rights reserved
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 md:h-1/3 h-1/4 left-0 right-0 z-0">
        <Image
          src="/backdrop.png"
          className="w-full"
          alt="backdrop blur"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

type ImageString = {
  imgStr: string;
  href: string;
};

export const Icon = ({ imgStr, href }: ImageString) => {
  return (
    <div>
        <Link href={href}>
      <Image src={imgStr} alt="" width={56} height={56} />
        </Link>
    </div>
  );
};
