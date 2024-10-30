'use client';

import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import Image from 'next/image';

const VideoModal = () => {
  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute z-0 -mt-44">
        <Image
          src="/backdrop.png"
          className="w-full mask-image-gradient"
          alt="backdrop blur"
          width={1041}
          height={1041}
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative z-50 w-[90%] lg:w-[60%] mx-auto px-4">
        <DialogVideo />
      </div>
      <div className="absolute inset-x-0 z-50 bottom-0 h-24 md:h-32 bg-gradient-to-t from-white from-15% via-white/80 via-30% to-transparent to-100%" />
    </div>
  );
};

const DialogVideo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border-[6px] md:border-[15px] border-[#0000000A] cursor-pointer">
          <div className="relative w-full aspect-video">
            <Image
              src="/IMG.png"
              alt="Video placeholder"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 597px, 1039px"
              priority
            />
            {/* Gradient overlay for fade effect */}
            <div className="absolute inset-x-0 z-50 bottom-0 h-24 md:h-32 bg-gradient-to-t from-white from-15% via-white/80 via-30% to-transparent to-100%" />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 max-w-4xl border-0 rounded-3xl">
        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-[16px]">
          <button
            onClick={() => {}}
            className="absolute -top-14 right-0 text-white bg-[#12121266] rounded-full p-2 hover:text-gray-300"
          >
            <X size={24} />
          </button>
          <video className="w-full h-full rounded-lg object-cover" controls>
            <source src="/explainer.mp4" type="video/mp4" />
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
