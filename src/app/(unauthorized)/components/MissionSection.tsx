"use client"
import React from 'react'
import { motion } from "framer-motion";
import { TagBtn } from './TagBtn';
import { HeaderText } from './HeaderText';

export const MissionSection = () => {
    const meVar = {
        initial: {
          y: 100,
          opacity: 0,
        },
        animate: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
            ease: "easeOut",
            delay: 2.5,
          },
        },
      };
  return (
    <div className="md:py-[124px] sm:py-[14px] relative w-full flex items-center justify-center">
<div className="absolute z-0 lg:mt-10 mt-2 overflow-hidden">
    {/* First row scrolling right */}
    <div className="flex animate-scroll mb-4 whitespace-nowrap">
        <div className="flex shrink-0">
            <TagBtn imgStr="/card-one.png" />
            <TagBtn imgStr="/card-two.png" />
            <TagBtn imgStr="/card-three.png" />
            <TagBtn imgStr="/card-five.png" />
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0">
            <TagBtn imgStr="/card-one.png" />
            <TagBtn imgStr="/card-two.png" />
            <TagBtn imgStr="/card-three.png" />
            <TagBtn imgStr="/card-th.png" />
        </div>
    </div>
    
    {/* Second row scrolling left */}
    <div className="flex animate-scroll-reverse whitespace-nowrap">
        <div className="flex shrink-0">
            <TagBtn imgStr="/card-one.png" />
            <TagBtn imgStr="/card-two.png" />
            <TagBtn imgStr="/card-three.png" />
            <TagBtn imgStr="/card-five.png" />
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0">
            <TagBtn imgStr="/card-five.png" />
            <TagBtn imgStr="/card-three.png" />
            <TagBtn imgStr="/card-two.png" />
            <TagBtn imgStr="/card-one.png" />
        </div>
    </div>
</div>
    <motion.div 
    className="z-50 bg-gradient-radial rounded-full from-white from-0% via-white via-55% to-transparent lg:p-32 p-10 lg:w-[70%] w-full flex justify-center"
    variants={meVar}
    initial="initial"
    whileInView="animate"
    viewport={{once : true}}
    >
      <HeaderText
        topText="our mission"
        mainText="Taking a stand against misinformation"
        subText="Our mission is to eliminate misinformation from the world. Equip yourself with real-time fact-checking tools to counter false claims."
      />
    </motion.div>
  </div>
  )
}
