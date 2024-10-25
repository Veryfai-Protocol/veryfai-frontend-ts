'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import VideoModal from './VideoModal';
import { submitForm } from '@/app/lib/data-fetching/factChecking';

interface FormData {
  name: string;
  email: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export const Hero = () => {
  const [data, setData] = useState<FormData>({ name: '', email: '' });
  const [toasts, setToasts] = useState<Toast[]>([]);

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

  const showToast = (message: string, type: 'success' | 'error') => {
    const newToast: Toast = { id: Date.now(), message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3000);
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.name || !data.email) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    try {
      const response = await submitForm(data);
      showToast('Successfully joined waitlist!', 'success');
      console.log(response);
      
      setData({ name: '', email: '' });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      showToast(errorMessage, 'error');
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="flex flex-col w-full gap-[80px] items-center justify-center"
      variants={heroVar}
      initial="initial"
      animate="animate"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            fixed top-4 right-4 z-50
            min-w-[200px] px-4 py-2 rounded-lg shadow-lg
            transform transition-all duration-300 ease-in-out
            ${toast.type === 'success' 
              ? 'bg-gradient-radial from-[#4DB7FA] to-[#1E8AF2]' 
              : 'bg-red-500'
            }
            text-white
          `}
        >
          {toast.message}
        </div>
      ))}
      <div className="flex flex-col w-[80%] items-center gap-[40px]">
        <h1 className="text-[#1E293B] text-center font-bold text-[32px] md:text-[56px] lg:text-[64px]">
          Verify Claims <br className="flex md:hidden" /> Using AI
        </h1>
        <p className="text-[#4E5053] text-lg md:text-[24px] max-w-2xl mx-auto text-center">
          Fact-check claims in real-time and take control of your information
          landscape.
        </p>
        <form
          onSubmit={handleClick}
          className="xl:w-[40%] lg:w-[60%] md:w-[80%] w-[99%] z-50 shadow-lg bg-[#FFFFFF] rounded-[16px] border border-[#2222221A] flex flex-col gap-[24px] p-[24px]"
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
            className="h-[43px] md:h-[61px] rounded-[16px] text-[14px] md:text-[24px] bg-gradient-radial from-[#4DB7FA] to-[#1E8AF2]"
          >
            Join waitlist
          </Button>
        </form>
      </div>
      <VideoModal />
    </motion.div>
  );
};