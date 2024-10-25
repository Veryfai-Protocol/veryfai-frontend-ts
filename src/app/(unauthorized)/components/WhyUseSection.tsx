'use client';
import React from 'react';
import { HeaderText } from './HeaderText';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      className="lg:px-[56px] w-full flex flex-col items-center justify-center md:px-[32px] px-4 py-[124px]"
      style={{
        backgroundImage: `url('/shield.png')`,
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
      <div className="flex md:flex-row flex-col mt-[108px]">
        <div>
          <Image src="/twitter-bot.png" alt="" width={652} height={735} />
        </div>
        <div className="flex flex-col">
          <Image src="/chrome-extension.png" alt="" width={652} height={355} />
          <Image src="/veryfai-web.png" alt="" width={652} height={355} />
        </div>
      </div>
    </motion.div>
  );
};
