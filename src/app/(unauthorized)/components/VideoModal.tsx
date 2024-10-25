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
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   console.log('Submitted:', { name, email });
  // };

  return (
    <>
      <div className="relative w-full flex items-center justify-center  ">
        {/* Background gradient */}
        {/* <div className="absolute inset-0 z-0 rounded-full bg-gradient-radial mt-[-140px] from-blue-600 from-10% w-full to-transparent to-75% py-4 lg:p-48 md:p-32 p-10" /> */}
        <div className="absolute z-0">
          <Image
            src="/backdrop.png"
            className="w-full mask-image-gradient"
            alt="backdrop blur"
            width={1041}
            height={1041}
          />
        </div>

        {/* Main content */}
        <div className="relative z-50 lg:h-[489px] h-[261px] mx-auto px-4 bg-white border-t-[15px] rounded-[16px] border-t-[#0000000A] flex items-center justify-center radius-[16px] w-[80%] lg:w-[60%]">
          <DialogVideo />
        </div>

        {/* Video Modal */}
      </div>
    </>
  );
};

export default VideoModal;

const DialogVideo = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <div className="w-full h-full rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Image
                src="/IMG.png"
                alt="Video placeholder"
                className="w-full h-full"
                width={1096}
                height={584}
              />
            </div>
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
          {/* Replace src with your video URL */}
          <video
            width={1096}
            height={584}
            className="w-full h-full rounded-lg object-cover"
            controls
          >
            <source src="/explainer.mp4" type="video/mp4" />
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};
