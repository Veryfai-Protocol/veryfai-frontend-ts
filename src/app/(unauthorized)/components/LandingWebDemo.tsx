import React from 'react';
import Image from 'next/image';

const LandingWebSection = () => {
  return (
    <div className="max-w-2xl pt-6 pl-6 h-[332px] lg:h-[355px] overflow-hidden bg-white rounded-3xl">
      <div className="space-y-2">
        <h2 className="text-[1.25rem] md:text-[1.5rem] font-bold text-[#1E293B]">VeryfAI web application</h2>
        <p className="text-[#4E5053] text-[1.25rem] md:text-[1.5rem]">
         Search and find supporting or opposing sources with our web app. 
        </p>
      </div>

      {/* Browser image with hover effect */}
      <div className="group cursor-pointer">
        <Image
          src="/web.png"
          alt="Chrome extension demo"
          width={600}
          height={300}
          className="w-full transform transition-all duration-300 lg:-mt-24 ease-in-out group-hover:-translate-y-4"
        />
      </div>
    </div>
  );
};

export default LandingWebSection;