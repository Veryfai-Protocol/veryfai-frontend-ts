'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import VideoModal from './VideoModal';
import { submitForm } from '@/app/lib/data-fetching/factChecking';
import { useToast } from '@/app/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
}

export const Hero = () => {
  const { toast } = useToast();
  const [data, setData] = useState<FormData>({ name: '', email: '' });

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
        ease: 'easeInOut',
      },
    },
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await submitForm(data);
      
      // Success toast
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
        variant: "default",
        duration: 3000,
        className: "bg-green-500 text-white",
      });
      
      console.log(response);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error :any) {
      // Error toast
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="flex flex-col w-full gap-[80px] mt-8 items-center justify-center"
      variants={heroVar}
      initial="initial"
      animate="animate"
    >
      <div className="flex flex-col w-[80%] items-center">
        <h1 className="text-[#1E293B] text-center leading-[48px] md:leading-[5.6rem] font-bold text-[2.5rem] md:text-[56px] lg:text-[64px]">
          Verify Claims <br className="flex md:hidden" /> Using AI
        </h1>
        <p className="text-[#4E5053] mt-4 md:mt-10 text-lg md:text-[24px] max-w-2xl mx-auto text-center">
          Fact-check claims in real-time and take control of your information
          landscape.
        </p>
        <form
          onSubmit={handleClick}
          className="xl:w-[40%] lg:w-[60%] mt-8 md:mt-10 md:w-[80%] w-[99%] z-50 shadow-lg bg-[#FFFFFF] rounded-[16px] border border-[#2222221A] flex flex-col gap-[24px] p-[24px]"
        >
          <Input
            type="text"
            required
            className="h-[40px] md:h-[52px] rounded-[8px]"
            placeholder="Your Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            required
            className="h-[40px] md:h-[52px] rounded-[8px]"
            placeholder="Your Email Address"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="h-[43px] md:h-[61px] rounded-[12px] text-[14px] md:text-[24px] bg-gradient-radial from-[#4DB7FA] to-[#1E8AF2]"
            style={{
              backgroundImage: `url('/noise.png')`,
              backgroundPosition: 'center',
              backgroundColor: "#1E8AF2"
            }}
          >
            Join waitlist
          </Button>
        </form>
      </div>
      <VideoModal />
    </motion.div>
  );
};