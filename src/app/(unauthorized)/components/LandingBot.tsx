import React from 'react';
import Image from 'next/image';

const VerificationCard = () => {
  return (
    <div className="max-w-2xl ">
      <div className="relative bg-white rounded-3xl overflow-hidden pt-10 lg:pt-14 pb-6 pl-6 shadow-lg">
        <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden bg-white rounded-2xl">
          <Image
            src="/twitter.png"
            alt="Verification background"
            className="object-cover rounded-2xl"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
          <div className="absolute inset-0 ml-12 mt-6 flex items-end justify-end">
            <div className="group relative cursor-pointer">
              <Image
                src="/popframe.png"
                alt="Verification icon"
                width={470}
                height={304}
                className="transform transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-[1.25rem] md:text-[1.5rem] font-bold text-[#1E293B]">Twitter bot</h2>
          <p className="text-[#4E5053] text-[1.25rem] md:text-[1.5rem]">
            Verify tweets instantly with our Twitter bot, designed to fact-check claims 
            as they emerge on social media helping you stay ahead of misinformation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;