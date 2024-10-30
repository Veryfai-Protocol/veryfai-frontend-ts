'use client';
import React from 'react';
import { HeaderText } from './HeaderText';
import { motion } from 'framer-motion';
import VerificationCard from './LandingBot';
import ChromeExtensionSection from './ChromeExtensionDemo';
import LandingWebSection from './LandingWebDemo';

export const WhyUseSection = () => {
  const WhyUseVar = {
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
    <motion.div
      className="lg:px-[56px] w-full flex flex-col items-center justify-center md:px-[32px] px-4 py-[80px] md:py-[124px]"
      style={{
        backgroundImage: `url('/Shield.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      variants={WhyUseVar}
      initial="initial"
      whileInView="animate"
      viewport={{once : true}}
    >
      <HeaderText
        topText="why use veryfai?"
        mainText="Your shield against false claims"
        subText="Let us be your defense against misinformation with real-time verification and easy-to-use features."
      />
      <div className="flex lg:flex-row gap-6 flex-col mt-[48px] md:mt-[108px]">
        <div className='mb-5 md:mt-0'>
        <VerificationCard />
        </div>
        <div className="flex flex-col gap-5">
        <ChromeExtensionSection />
        <LandingWebSection />
        </div>
      </div>
    </motion.div>
  );
};
