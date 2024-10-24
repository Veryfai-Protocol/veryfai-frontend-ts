"use client"
import React from 'react'
import { motion } from "framer-motion";
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import VideoModal from './VideoModal';

export const Hero = () => {
    const heroVar = {
        initial: {
          y: 100,
          opacity: 0,
        },
        animate: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        },
      };
  return (
    <motion.div 
    className="flex flex-col w-full gap-[80px] items-center justify-center"
    variants={heroVar}
    initial="initial"
    animate="animate"
    >
          <div
           className="flex flex-col w-[80%] items-center gap-[40px]"
           >
            <h1 className="text-[#1E293B] text-center font-bold text-[32px] md:text-[56px] lg:text-[64px]">
              Verify Claims Using AI
            </h1>
            <p className=" text-[#4E5053] text-lg md:text-[24px] max-w-2xl mx-auto text-center">
              Fact-check claims in real-time and take control of your
              information landscape.
            </p>
            <form
              action=""
              className="xl:w-[40%] lg:w-[60%] md:w-[80%] w-[99%] z-50 shadow-lg bg-[#FFFFFF] rounded-[16px] border border-[#2222221A] flex flex-col gap-[24px] p-[24px]"
            >
              <Input
                type="text"
                required
                className="h-[40px] md:h-[52px] rounded-[8px]"
                placeholder="Your Name"
              />
              <Input
                type="text"
                required
                className="h-[40px] md:h-[52px] rounded-[8px]"
                placeholder="Your Email Address"
              />
              <Button type='submit' className="h-[43px] md:h-[61px] rounded-[16px] text-[14px] md:text-[24px] bg-gradient-radial from-[#4DB7FA] to-[#1E8AF2]">
                Join waitlist
              </Button>
            </form>
          </div>
          <VideoModal />
        </motion.div>
  )
}
