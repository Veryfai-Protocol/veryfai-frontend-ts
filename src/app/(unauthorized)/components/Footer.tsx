'use client';
import { Button } from '@/app/components/ui/button';
import React from 'react';
import { motion } from 'framer-motion';
import { FooterLogo } from './LandingLogo';
import Image from 'next/image';

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
    <div className="bg-[#040F1C] w-full h-full relative overflow-hidden px-[56px] pt-[80px]">
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
          <h1 className="bg-clip-text mb-[40px] text-center text-[24px] sm:text-[32px] md:text-[56px] lg:text-[64px] font-semibold lg:w-[60%] w-[90%] mx-auto text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#95CBFF]">
            Start fact-checking claims today
          </h1>

          <Button
            onClick={scrollToTop}
            className="h-[43px] md:h-[61px] rounded-[16px] z-50 text-[14px] md:text-[24px] bg-gradient-radial from-[#4DB7FA] to-[#1E8AF2]"
          >
            Join waitlist
          </Button>
        </motion.div>

        {/* Footer content */}
        <div className="mb-[40px]">
          <div className="flex md:flex-row flex-col gap-4 items-center mt-[40px] justify-between w-full">
            <FooterLogo />
            <div className="flex gap-[16px]">
              <Icon imgStr="/facebook.svg" />
              <Icon imgStr="/insta.svg" />
              <Icon imgStr="/x.svg" />
              <Icon imgStr="/linkedin.svg" />
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
};

export const Icon = ({ imgStr }: ImageString) => {
  return (
    <div>
      <Image src={imgStr} alt="" width={56} height={56} />
    </div>
  );
};
